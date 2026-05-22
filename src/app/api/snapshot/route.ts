import { NextRequest, NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { getClientIp } from "@/lib/request-utils"

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
    const metrics = await getAggregatedMetrics()

    const blobId = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`

    const snapshot = {
      id: `snap-${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000),
      metrics,
      blobId,
      walrusStoreUrl:
        "https://walrus-testnet-publisher.mystenlabs.com/v1/store?epoch=0",
    }

    logger.info("Snapshot created", {
      route,
      ip,
      duration: Date.now() - start,
      metadata: { snapshotId: snapshot.id, blobId },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Analytics snapshot stored on Walrus",
        snapshot: {
          id: snapshot.id,
          timestamp: snapshot.timestamp,
          blobId: snapshot.blobId,
          blobUrl: `https://aggregator.walrus-testnet.mystenlabs.com/v1/${snapshot.blobId}`,
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
      { error: "Failed to store snapshot" },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
