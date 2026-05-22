"use client";

import { useTatumStatus } from "@/hooks/useTatumStatus";
import { useTheme } from "@/components/Layout/ThemeProvider";

export function Connection() {
  const { status, blockHeight } = useTatumStatus();
  const { animations } = useTheme();

  const statusText = status === "loading"
    ? "CONNECTING TO TATUM…"
    : status === "connected"
    ? `TATUM ONLINE · WALRUS MAINNET · BLOCK ${blockHeight?.toLocaleString() ?? "—"}`
    : "TATUM OFFLINE — RETRYING…";

  const dotColor = status === "connected" ? "var(--mint-deep)" : status === "error" ? "var(--burgundy)" : "var(--gold)";

  return (
    <div className="brut" style={{
      background: status === "connected" ? "var(--mint)" : status === "error" ? "rgba(122,42,42,0.12)" : "var(--paper-2)",
      padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 14, margin: "0 0 22px"
    }}>
      <span style={{
        width: 12, height: 12, borderRadius: 0,
        background: dotColor,
        boxShadow: `0 0 0 3px var(--paper), 0 0 0 5px ${dotColor}`
      }} className={animations ? "anim-pulse" : ""}/>
      <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em" }}>
        {statusText}
      </span>
      <span style={{ marginLeft: "auto" }} className="stamp stamp-tweed">
        {status === "connected" ? "All Systems Sniffing" : status === "error" ? "Check API Key" : "Warming Up"}
      </span>
    </div>
  );
}
