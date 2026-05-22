"use client";

import { useMemo } from "react";
import { WalrusHeadMini } from "@/components/Mascot/WalrusHeadMini";

const witticisms = [
  "Elementary, my dear Walrus.",
  "The game is a blob!",
  "When you have eliminated the impossible, whatever remains, however improbable, must be the blob.",
  "Data, data, data! I cannot make bricks without clay.",
  "You see, but you do not observe — the publisher field, Watson!",
];

export function Footer() {
  const pick = useMemo(() => witticisms[Math.floor(Math.random() * witticisms.length)], []);
  return (
    <footer style={{
      borderTop: "3px solid var(--ink)",
      marginTop: 48,
      padding: "24px 0 36px",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <WalrusHeadMini size={36}/>
        <div>
          <div className="h-display" style={{ fontSize: 18 }}>Walytics</div>
          <div className="mono" style={{ fontSize: 11, opacity: 0.7 }}>Walrus Storage · Sui · Tatum</div>
        </div>
      </div>
      <div className="mono" style={{ fontSize: 11, opacity: 0.7, fontStyle: "italic", textAlign: "right", maxWidth: 360 }}>
        &ldquo;{pick}&rdquo;<br/>— W. Holmes, Consulting Walrus
      </div>
    </footer>
  );
}
