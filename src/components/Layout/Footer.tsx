"use client";

import { useState, useEffect } from "react";
import { RandomCharacter } from "@/components/UI/RandomCharacter";

const witticisms = [
  "Elementary, my dear Walrus.",
  "The game is a blob!",
  "When you have eliminated the impossible, whatever remains, however improbable, must be the blob.",
  "Data, data, data! I cannot make bricks without clay.",
  "You see, but you do not observe — the publisher field, Watson!",
];

export function Footer() {
  const [pick, setPick] = useState(witticisms[0]);
  useEffect(() => {
    setPick(witticisms[Math.floor(Math.random() * witticisms.length)]);
  }, []);
  return (
    <footer style={{
      borderTop: "4px solid var(--ink)",
      marginTop: 56,
      padding: "24px 0 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
      flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <RandomCharacter width={48} height={48} alt="Walytics" style={{ border: "1px solid var(--ink)" }}/>
        <div>
          <div className="h-display" style={{ fontSize: 20, color: "var(--ink)" }}>Walytics</div>
          <div className="mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.12em" }}>
            WALRUS PROTOCOL · SUI · TATUM RPC
          </div>
        </div>
      </div>
      <div className="mono" style={{
        fontSize: 12, opacity: 0.65, fontStyle: "italic",
        textAlign: "right", maxWidth: 380, lineHeight: 1.5,
      }}>
        &ldquo;{pick}&rdquo;<br/>
        <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          — Walytics Holmes, Consulting Analyst
        </span>
      </div>
    </footer>
  );
}
