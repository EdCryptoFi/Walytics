"use client"

import { useEffect, useState } from "react"
import type { BlobInfo } from "@/types"

const POLL_INTERVAL = 30_000 // 30s

export interface UseBlobsReturn {
  blobs: BlobInfo[]
  loading: boolean
  error: string | null
  isReal: boolean
  lastUpdated: Date | null
}

export function useBlobs(): UseBlobsReturn {
  const [blobs, setBlobs] = useState<BlobInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReal, setIsReal] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchBlobs() {
      try {
        const res = await fetch("/api/blobs")
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `HTTP ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) {
          if (data.blobs && Array.isArray(data.blobs)) {
            setBlobs(data.blobs)
            setIsReal(data.isReal === true)
            setLastUpdated(new Date())
            setError(null)
          } else {
            setError("No blob data available")
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load blobs")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchBlobs()
    const timer = setInterval(fetchBlobs, POLL_INTERVAL)
    return () => { cancelled = true; clearInterval(timer) }
  }, [])

  return { blobs, loading, error, isReal, lastUpdated }
}
