import { NextRequest, NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { getClientIp } from "@/lib/request-utils"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const start = Date.now()
  const ip = getClientIp(req)
  const route = "/api/analytics"

  const limit = checkRateLimit(ip, route)
  if (!limit.allowed) {
    logger.warn("Rate limit exceeded", { route, ip })
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitHeaders(limit),
      }
    )
  }

  try {
    const metrics = await getAggregatedMetrics()
    logger.info("Analytics fetched successfully", {
      route,
      ip,
      duration: Date.now() - start,
    })
    return NextResponse.json(metrics, {
      headers: rateLimitHeaders(limit),
    })
  } catch (error) {
    logger.error("Failed to fetch analytics", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
