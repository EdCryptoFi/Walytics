"use client"

import { useState } from "react"

interface SnapshotResult {
  blobId: string | null
  network: "mainnet" | "testnet" | null
  walruscanUrl: string | null
  walrusStatus?: "stored" | "pending"
  metricsSummary: { totalBlobs: number; totalSize: number; uniquePublishers: number }
}

export function SaveToWalrus() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<SnapshotResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSave() {
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

  return (
    <div style={{ marginTop: 20 }}>
      <button
        className="btn"
        onClick={handleSave}
        disabled={state === "loading"}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          opacity: state === "loading" ? 0.7 : 1,
          cursor: state === "loading" ? "wait" : "pointer",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          {state === "loading" ? "sync" : state === "success" ? "check_circle" : "cloud_upload"}
        </span>
        {state === "loading" ? "STORING ON WALRUS…" : state === "success" ? "SNAPSHOT STORED" : "SAVE SNAPSHOT TO WALRUS"}
      </button>

      {/* Success card */}
      {state === "success" && result && (
        <div
          className="animate-on-load"
          style={{
            "--initial-rotation": "0deg",
            marginTop: 16,
            background: "var(--mint)",
            border: "3px solid var(--ink)",
            boxShadow: "4px 4px 0 0 var(--ink)",
            padding: "14px 18px",
          } as React.CSSProperties}
        >
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
              {result.walrusStatus === "stored" ? "verified" : "schedule"}
            </span>
            {result.walrusStatus === "stored"
              ? `BLOB CERTIFIED · WALRUS ${result.network?.toUpperCase()}`
              : "SNAPSHOT READY · AWAITING WALRUS WRITE"}
          </div>

          {result.blobId && (
            <div style={{ marginBottom: 10 }}>
              <div className="mono" style={{ fontSize: 9, opacity: 0.6, marginBottom: 2 }}>BLOB ID</div>
              <div className="mono" style={{
                fontSize: 10, wordBreak: "break-all", lineHeight: 1.4,
                background: "rgba(0,0,0,0.06)", padding: "4px 8px",
                border: "1px solid rgba(0,0,0,0.15)",
              }}>
                {result.blobId}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 10, opacity: 0.75, marginBottom: 12 }} className="mono">
            <span>BLOBS: {result.metricsSummary.totalBlobs.toLocaleString()}</span>
            <span>PUBLISHERS: {result.metricsSummary.uniquePublishers}</span>
          </div>

          {result.walruscanUrl ? (
            <a
              href={result.walruscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ fontSize: 11, display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
              VERIFY ON WALRUSCAN
            </a>
          ) : (
            <div className="mono" style={{ fontSize: 9, opacity: 0.6 }}>
              Configure WALRUS_PUBLISHER_URL to enable on-chain storage
            </div>
          )}
        </div>
      )}

      {/* Error card */}
      {state === "error" && (
        <div style={{
          marginTop: 12,
          background: "var(--peach)",
          border: "2px solid var(--ink)",
          boxShadow: "3px 3px 0 0 var(--ink)",
          padding: "10px 14px",
        }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.1em", marginBottom: 4, color: "var(--error)" }}>
            ✕ PUBLISHER UNAVAILABLE
          </div>
          <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>{errorMsg}</div>
          <button
            className="mono"
            onClick={handleSave}
            style={{ marginTop: 8, fontSize: 9.5, textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            RETRY
          </button>
        </div>
      )}
    </div>
  )
}
