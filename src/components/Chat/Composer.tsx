"use client";

import { useState, KeyboardEvent } from "react";
import { IconLoupe } from "@/components/Mascot/DetectiveIcons";

interface ComposerProps {
  onSend: (msg: string) => void;
  disabled: boolean;
}

export function Composer({ onSend, disabled }: ComposerProps) {
  const [v, setV] = useState("");
  const submit = () => {
    if (!v.trim() || disabled) return;
    onSend(v.trim());
    setV("");
  };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };
  return (
    <div style={{ position: "sticky", bottom: 18, marginTop: 18, background: "var(--paper)", padding: 0 }}>
      <div className="brut brut-thick" style={{ display: "flex", gap: 0, alignItems: "stretch", padding: 0, background: "var(--paper)" }}>
        <div style={{
          background: "var(--ink)", color: "var(--mint)",
          padding: "0 14px", display: "flex", alignItems: "center",
          fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 11, letterSpacing: "0.15em",
          lineHeight: 1.3
        }}>
          ASK<br/>HOLMES
        </div>
        <textarea
          value={v}
          onChange={e => setV(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type your inquiry, Watson. Shift+Enter for a new line."
          style={{
            flex: 1, border: "none", outline: "none",
            padding: "14px 14px",
            fontFamily: "var(--font-body)", fontSize: 15,
            background: "transparent", color: "var(--ink)",
            resize: "none", minHeight: 60, maxHeight: 160
          }}
          disabled={disabled}
        />
        <button onClick={submit} disabled={disabled || !v.trim()} className="btn btn-primary" style={{
          margin: 6, padding: "0 18px", border: "3px solid var(--ink)",
          boxShadow: "3px 3px 0 0 var(--gold)",
          opacity: (!v.trim() || disabled) ? 0.4 : 1
        }}>
          <IconLoupe size={16}/> SEND
        </button>
      </div>
    </div>
  );
}
