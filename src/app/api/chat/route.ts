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
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400, headers: rateLimitHeaders(limit) }
      )
    }

    const validated = validateBody(body, {
      message: { type: "string", required: true, minLength: 1, maxLength: 2000, sanitize: true },
      generateReport: { type: "boolean", required: false },
    })

    let metrics
    try {
      metrics = await getAggregatedMetrics()
    } catch (metricsError) {
      logger.error("Failed to fetch Walrus metrics", {
        route,
        ip,
        error: String(metricsError),
        duration: Date.now() - start,
      })
      return NextResponse.json(
        { error: "Unable to fetch Walrus network data. Please try again later." },
        { status: 502, headers: rateLimitHeaders(limit) }
      )
    }

    const metricsContext = JSON.stringify(metrics, null, 2)

    let response: string

    try {
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
    } catch (aiError) {
      const errorMessage = String(aiError)
      logger.error("Gemini API call failed", {
        route,
        ip,
        error: errorMessage,
        duration: Date.now() - start,
      })

      if (errorMessage.includes("API_KEY") || errorMessage.includes("api key")) {
        return NextResponse.json(
          { error: "AI service configuration error. Please contact support." },
          { status: 500, headers: rateLimitHeaders(limit) }
        )
      }
      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        return NextResponse.json(
          { error: "AI model unavailable. Please try again later." },
          { status: 502, headers: rateLimitHeaders(limit) }
        )
      }
      if (errorMessage.includes("429") || errorMessage.includes("quota")) {
        return NextResponse.json(
          { error: "AI service rate limit reached. Please wait a moment and try again." },
          { status: 429, headers: rateLimitHeaders(limit) }
        )
      }

      return NextResponse.json(
        { error: "Holmes is temporarily unavailable. Please try again." },
        { status: 502, headers: rateLimitHeaders(limit) }
      )
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

    logger.error("Chat failed unexpectedly", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
