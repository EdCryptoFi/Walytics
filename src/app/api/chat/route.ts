import { NextRequest, NextResponse } from "next/server"
import { getAggregatedMetrics } from "@/lib/walrus"
import { chatWithContext, generateReport } from "@/lib/gemini"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { validateBody, ValidationError } from "@/lib/validation"
import { getClientIp } from "@/lib/request-utils"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const start = Date.now()
  const ip = getClientIp(req)
  const route = "/api/chat"

  const limit = checkRateLimit(ip, route)
  if (!limit.allowed) {
    logger.warn("Rate limit exceeded", { route, ip })
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending another message." },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  try {
    const body = await req.json()

    const validated = validateBody(body, {
      message: { type: "string", required: true, minLength: 1, maxLength: 2000, sanitize: true },
      generateReport: { type: "boolean", required: false },
    })

    const metrics = await getAggregatedMetrics()
    const metricsContext = JSON.stringify(metrics, null, 2)

    let response: string

    if (validated.generateReport) {
      response = await generateReport(metricsContext)
      logger.info("Report generated", {
        route,
        ip,
        duration: Date.now() - start,
      })
    } else {
      response = await chatWithContext(String(validated.message), metricsContext)
      logger.info("Chat response sent", {
        route,
        ip,
        duration: Date.now() - start,
      })
    }

    return NextResponse.json(
      { response },
      { headers: rateLimitHeaders(limit) }
    )
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: rateLimitHeaders(limit) }
      )
    }

    logger.error("Chat failed", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "Chat failed. Please try again." },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
