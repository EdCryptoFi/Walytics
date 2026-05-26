"use client"

interface DataSourceBadgeProps {
  isReal: boolean
  lastUpdated: Date | null
  pollInterval?: number // seconds
  loading?: boolean
}

export function DataSourceBadge({ isReal, lastUpdated, pollInterval, loading }: DataSourceBadgeProps) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--"

  return (
    <div className="mono" style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "4px 10px",
      border: "2px solid var(--ink)",
      background: isReal ? "var(--mint)" : "var(--gold)",
      fontSize: 9.5, letterSpacing: "0.1em",
      boxShadow: "2px 2px 0 0 var(--ink)",
      whiteSpace: "nowrap",
    }}>
      {/* status dot */}
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: loading ? "var(--secondary)" : isReal ? "#2e6b63" : "#9b4a1a",
        border: "1.5px solid var(--ink)",
        display: "inline-block",
        animation: loading ? "none" : "pulse-dot 2s infinite",
      }}/>

      <span style={{ fontWeight: 700 }}>
        {loading ? "FETCHING…" : isReal ? "LIVE · SUI MAINNET" : "SIMULATED · DEMO DATA"}
      </span>

      {!loading && (
        <>
          <span style={{ opacity: 0.5 }}>·</span>
          <span style={{ opacity: 0.7 }}>
            {timeStr}
          </span>
          {pollInterval && (
            <>
              <span style={{ opacity: 0.5 }}>·</span>
              <span style={{ opacity: 0.7 }}>↻ {pollInterval}s</span>
            </>
          )}
        </>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
