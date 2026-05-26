import { NextRequest, NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { validateBody, ValidationError } from "@/lib/validation"
import { getClientIp } from "@/lib/request-utils"

export const runtime = "nodejs"

const WALRUS_PUBLISHERS = [
  process.env.WALRUS_PUBLISHER_URL,
  "https://walrus-mainnet-publisher-1.staketab.org:443",
  "https://publisher.walrus-mainnet.mystenlabs.com",
  // testnet fallback — free, always available, blobs verified on walruscan.com/testnet/
  "https://publisher.walrus-testnet.walrus.space",
].filter(Boolean) as string[]

interface WalrusResult {
  blobId: string
  network: "mainnet" | "testnet"
  walruscanUrl: string
}

async function storeOnWalrus(data: object): Promise<WalrusResult | null> {
  const body = Buffer.from(JSON.stringify(data, null, 2), "utf-8")

  for (const publisherBase of WALRUS_PUBLISHERS) {
    try {
      const res = await fetch(`${publisherBase}/v1/blobs?epochs=1`, {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body,
        signal: AbortSignal.timeout(12_000),
      })

      if (!res.ok) {
        logger.warn("[Walrus] Publisher returned non-OK", { metadata: { publisher: publisherBase, status: res.status } })
        continue
      }

      const json = await res.json()
      const blobId: string | undefined =
        json?.newlyCreated?.blobObject?.blobId ||
        json?.alreadyCertified?.blobId

      if (!blobId) continue

      const isTestnet = publisherBase.includes("testnet")
      return {
        blobId,
        network: isTestnet ? "testnet" : "mainnet",
        walruscanUrl: isTestnet
          ? `https://walruscan.com/testnet/blob/${blobId}`
          : `https://walruscan.com/blob/${blobId}`,
      }
    } catch (err) {
      logger.warn("[Walrus] Publisher attempt failed", { metadata: { publisher: publisherBase }, error: String(err) })
    }
  }

  return null
}

export async function POST(req: NextRequest) {
  const start = Date.now()
  const ip = getClientIp(req)
  const route = "/api/snapshot"

  const limit = checkRateLimit(ip, route)
  if (!limit.allowed) {
    logger.warn("Rate limit exceeded", { route, ip })
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  try {
    let reportText: string | undefined
    const contentType = req.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      try {
        const body = await req.json()
        const validated = validateBody<{ reportText?: string }>(body, {
          reportText: { type: "string", required: false, maxLength: 10_000, sanitize: true },
        })
        reportText = validated.reportText
      } catch (err) {
        if (err instanceof ValidationError) {
          return NextResponse.json(
            { error: err.message },
            { status: 400, headers: rateLimitHeaders(limit) }
          )
        }
        // Non-JSON or empty body — treat as no reportText
      }
    }

    const metrics = await getAggregatedMetrics()

    const payload = {
      walytics_snapshot: true,
      version: "1.0",
      generatedAt: new Date().toISOString(),
      network: "sui-mainnet",
      ...(reportText ? { aiReport: reportText } : {}),
      metrics: {
        totalBlobs: metrics.totalBlobs,
        totalSize: metrics.totalSize,
        uniquePublishers: metrics.uniquePublishers,
        avgBlobSize: metrics.avgBlobSize,
        topPublishers: metrics.topPublishers.slice(0, 5),
        blobsOverTime: metrics.blobsOverTime,
        sizeDistribution: metrics.sizeDistribution,
      },
    }

    const walrus = await storeOnWalrus(payload)

    logger.info("Snapshot attempt completed", {
      route,
      ip,
      duration: Date.now() - start,
      metadata: { blobId: walrus?.blobId ?? "none", network: walrus?.network ?? "failed" },
    })

    const snapshotId = `snap-${Date.now()}`
    const timestamp = Math.floor(Date.now() / 1000)

    if (!walrus) {
      // No publisher available — return snapshot ready but not yet on-chain
      return NextResponse.json(
        {
          success: true,
          walrusStatus: "pending",
          message: "Snapshot prepared. Walrus write requires WAL token configuration (WALRUS_PUBLISHER_URL).",
          snapshot: {
            id: snapshotId,
            timestamp,
            blobId: null,
            network: null,
            walruscanUrl: null,
            metricsSummary: {
              totalBlobs: metrics.totalBlobs,
              totalSize: metrics.totalSize,
              uniquePublishers: metrics.uniquePublishers,
            },
          },
        },
        { headers: rateLimitHeaders(limit) }
      )
    }

    return NextResponse.json(
      {
        success: true,
        walrusStatus: "stored",
        message: `Analytics snapshot stored on Walrus ${walrus.network}`,
        snapshot: {
          id: snapshotId,
          timestamp,
          blobId: walrus.blobId,
          network: walrus.network,
          walruscanUrl: walrus.walruscanUrl,
          metricsSummary: {
            totalBlobs: metrics.totalBlobs,
            totalSize: metrics.totalSize,
            uniquePublishers: metrics.uniquePublishers,
          },
        },
      },
      { headers: rateLimitHeaders(limit) }
    )
  } catch (error) {
    logger.error("Failed to store snapshot", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "Failed to generate snapshot" },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
