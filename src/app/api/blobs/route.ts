import { NextRequest, NextResponse } from "next/server"
import { queryWalrusBlobs } from "@/lib/walrus"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { getClientIp } from "@/lib/request-utils"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const start = Date.now()
  const ip = getClientIp(req)
  const route = "/api/blobs"

  const limit = checkRateLimit(ip, route)
  if (!limit.allowed) {
    logger.warn("Rate limit exceeded", { route, ip })
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined
    const limitParam = Math.min(
      Math.max(parseInt(req.nextUrl.searchParams.get("limit") || "100", 10) || 100, 1),
      200
    )

    const { blobs, nextCursor } = await queryWalrusBlobs(cursor, limitParam)

    logger.info("Blobs fetched successfully", {
      route,
      ip,
      duration: Date.now() - start,
      metadata: { count: blobs.length, cursor },
    })

    return NextResponse.json(
      { blobs, nextCursor },
      { headers: rateLimitHeaders(limit) }
    )
  } catch (error) {
    logger.error("Failed to fetch blobs", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "Failed to fetch blobs" },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
