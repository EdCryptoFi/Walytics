type WindowKey = string

interface WindowEntry {
  count: number
  resetAt: number
}

const windows = new Map<WindowKey, WindowEntry>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup(): void {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of windows) {
    if (now >= entry.resetAt) {
      windows.delete(key)
    }
  }
}

function getClientKey(ip: string, identifier?: string): string {
  return identifier ? `${ip}:${identifier}` : ip
}

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 60,
  windowMs: 60_000,
}

const ROUTE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/analytics": { maxRequests: 30, windowMs: 60_000 },
  "/api/blobs": { maxRequests: 30, windowMs: 60_000 },
  "/api/chat": { maxRequests: 15, windowMs: 60_000 },
  "/api/tatum": { maxRequests: 20, windowMs: 60_000 },
  "/api/snapshot": { maxRequests: 10, windowMs: 60_000 },
}

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfter?: number
}

export function checkRateLimit(
  ip: string,
  route: string,
  identifier?: string
): RateLimitResult {
  cleanup()

  const config = ROUTE_LIMITS[route] || DEFAULT_CONFIG
  const key = `${route}:${getClientKey(ip, identifier)}`
  const now = Date.now()

  const entry = windows.get(key)
  if (!entry || now >= entry.resetAt) {
    windows.set(key, { count: 1, resetAt: now + config.windowMs })
    return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count++
  return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    ...(result.retryAfter ? { "Retry-After": String(result.retryAfter) } : {}),
  }
}
