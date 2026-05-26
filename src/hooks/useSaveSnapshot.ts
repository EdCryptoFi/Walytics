"use client"

import { useState } from "react"

export interface SnapshotResult {
  blobId: string | null
  network: "mainnet" | "testnet" | null
  walruscanUrl: string | null
  walrusStatus?: "stored" | "pending"
  metricsSummary: { totalBlobs: number; totalSize: number; uniquePublishers: number }
}

export type SaveState = "idle" | "loading" | "success" | "error"

export interface UseSaveSnapshotReturn {
  state: SaveState
  result: SnapshotResult | null
  errorMsg: string | null
  save: () => Promise<void>
}

export function useSaveSnapshot(): UseSaveSnapshotReturn {
  const [state, setState] = useState<SaveState>("idle")
  const [result, setResult] = useState<SnapshotResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function save() {
    if (state === "loading") return
    setState("loading")
    setResult(null)
    setErrorMsg(null)

    try {
      const res = await fetch("/api/snapshot", { method: "POST" })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? "Unknown error")
        setState("error")
        return
      }

      setResult({ ...data.snapshot, walrusStatus: data.walrusStatus })
      setState("success")
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Network error")
      setState("error")
    }
  }

  return { state, result, errorMsg, save }
}
