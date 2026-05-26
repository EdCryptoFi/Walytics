import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"
import { validateBody, ValidationError } from "@/lib/validation"
import { getClientIp } from "@/lib/request-utils"

const TATUM_API_KEY = process.env.TATUM_API_KEY || ""

const ALLOWED_METHODS = new Set([
  "sui_getLatestCheckpointSequenceNumber",
  "suix_getOwnedObjects",
  "sui_getObject",
])

export async function POST(req: NextRequest) {
  const start = Date.now()
  const ip = getClientIp(req)
  const route = "/api/tatum"

  const limit = checkRateLimit(ip, route)
  if (!limit.allowed) {
    logger.warn("Rate limit exceeded", { route, ip })
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  try {
    const body = await req.json()

    const validated = validateBody(body, {
      method: { type: "string", required: true, maxLength: 100 },
      params: { type: "array", required: false, maxLength: 20 },
    })

    if (!ALLOWED_METHODS.has(String(validated.method))) {
      throw new ValidationError(`Unsupported RPC method: ${String(validated.method)}`)
    }

    if (!TATUM_API_KEY) {
      throw new Error("Tatum API key not configured")
    }

    const res = await fetch("https://sui-mainnet.gateway.tatum.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": TATUM_API_KEY,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: String(validated.method),
        params: (validated.params as unknown[]) || [],
      }),
    })

    if (!res.ok) {
      throw new Error(`Tatum RPC responded with ${res.status}`)
    }

    const data = await res.json()

    if (data.error) {
      throw new Error(`Tatum RPC error: ${data.error.message}`)
    }

    logger.info("Tatum RPC call succeeded", {
      route,
      ip,
      method: String(validated.method),
      duration: Date.now() - start,
    })

    return NextResponse.json(data, {
      headers: rateLimitHeaders(limit),
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: rateLimitHeaders(limit) }
      )
    }

    logger.error("Tatum RPC call failed", {
      route,
      ip,
      error: String(error),
      duration: Date.now() - start,
    })
    return NextResponse.json(
      { error: "RPC call failed" },
      { status: 500, headers: rateLimitHeaders(limit) }
    )
  }
}
