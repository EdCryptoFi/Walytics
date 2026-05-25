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
      padding: "32px 0 48px",
      display: "flex", flexDirection: "column", gap: 24,
    }}>
      {/* Top row: logo + quote */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <RandomCharacter width={48} height={48} alt="Walytics" style={{ border: "1px solid var(--ink)" }}/>
          <div>
            <div className="h-display" style={{ fontSize: 20, color: "#fff" }}>Walytics</div>
            <div className="mono" style={{ fontSize: 14, opacity: 0.75, letterSpacing: "0.12em", color: "#fff" }}>
              WALRUS PROTOCOL · SUI · TATUM RPC
            </div>
          </div>
        </div>
        <div className="mono" style={{
          fontSize: 15, opacity: 0.85, fontStyle: "italic",
          textAlign: "right", maxWidth: 380, lineHeight: 1.5,
          transform: "rotate(-1deg)", color: "#fff",
        }}>
          &ldquo;{pick}&rdquo;<br/>
          <span style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            — Walytics Holmes, Consulting Analyst
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "2px dashed var(--outline)", margin: 0 }}/>

      {/* Bottom row: links + copyright */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20,
        flexWrap: "wrap",
      }}>
        <div className="footer-links">
          <a href="#">Privacy Dossier</a>
          <a href="#">Terms of Engagement</a>
          <a href="#">Agency Contact</a>
        </div>
        <span className="footer-copyright">
          &copy; 1887-2026 WALYTICS INVESTIGATIONS. TOP SECRET.
        </span>
      </div>
    </footer>
  );
}
