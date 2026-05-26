"use client"

import { useEffect, useState } from "react"
import type { WalrusMetrics } from "@/types"

const POLL_INTERVAL = 60_000 // 60s

export interface UseAnalyticsReturn {
  metrics: WalrusMetrics | null
  loading: boolean
  error: string | null
  isReal: boolean
  lastUpdated: Date | null
}

export function useAnalytics(): UseAnalyticsReturn {
  const [metrics, setMetrics] = useState<WalrusMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReal, setIsReal] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchMetrics() {
      try {
        const res = await fetch("/api/analytics")
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `HTTP ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) {
          setMetrics(data)
          setIsReal(data.isReal === true)
          setLastUpdated(new Date())
          setError(null)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load analytics")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMetrics()
    const timer = setInterval(fetchMetrics, POLL_INTERVAL)
    return () => { cancelled = true; clearInterval(timer) }
  }, [])

  return { metrics, loading, error, isReal, lastUpdated }
}
