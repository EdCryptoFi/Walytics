"use client"

import { useEffect, useState } from "react"

export interface TatumStatusState {
  status: "loading" | "connected" | "error"
  blockHeight: string | null
  errorMessage: string | null
}

export function useTatumStatus(): TatumStatusState {
  const [state, setState] = useState<TatumStatusState>({
    status: "loading",
    blockHeight: null,
    errorMessage: null,
  })

  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const res = await fetch("/api/tatum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "sui_getLatestCheckpointSequenceNumber",
            params: [],
          }),
        })

        if (cancelled) return

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          setState({
            status: "error",
            blockHeight: null,
            errorMessage: body.error || `HTTP ${res.status}`,
          })
          return
        }

        const json = await res.json()
        if (json.result) {
          setState({
            status: "connected",
            blockHeight: Number(json.result).toLocaleString(),
            errorMessage: null,
          })
        } else {
          setState({
            status: "error",
            blockHeight: null,
            errorMessage: json.error || "Unknown error",
          })
        }
      } catch (e) {
        if (!cancelled) {
          setState({
            status: "error",
            blockHeight: null,
            errorMessage: e instanceof Error ? e.message : "Connection failed",
          })
        }
      }
    }

    check()
    return () => { cancelled = true }
  }, [])

  return state
}
