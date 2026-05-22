"use client"

import { useEffect, useState } from "react"
import type { WalrusMetrics } from "@/types"

export interface UseAnalyticsReturn {
  metrics: WalrusMetrics | null
  loading: boolean
  error: string | null
}

export function useAnalytics(): UseAnalyticsReturn {
  const [metrics, setMetrics] = useState<WalrusMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        if (!cancelled) setMetrics(data)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load analytics")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMetrics()
    return () => { cancelled = true }
  }, [])

  return { metrics, loading, error }
}
