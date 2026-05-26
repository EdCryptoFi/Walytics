"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/components/Layout/ThemeProvider";
import { Footer } from "@/components/Layout/Footer";
import { Bubble } from "@/components/Chat/Bubble";
import { Typing } from "@/components/Chat/Typing";
import { Composer } from "@/components/Chat/Composer";
import { CasePanel } from "@/components/Chat/CasePanel";
import { SuggestedCases } from "@/components/Chat/SuggestedCases";
import { CaseSidebar } from "@/components/Layout/CaseSidebar";
import { RandomCharacter } from "@/components/UI/RandomCharacter";
import type { CSSProperties } from "react";

export default function ChatPage() {
  const { messages, loading, handleSend, handleGenerateReport, generatingReport } = useChat();
  const { animations } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = (msg: string) => handleSend(msg);

  return (
    <div className="page-surface">
      <div className="with-sidebar">
        <CaseSidebar activePage="chat"/>

        <div className="sidebar-main" style={{ padding: "32px 32px 0" }}>
          {/* Intelligence log header + Metric Scan card */}
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap" }}>
            <div
              className="animate-on-load"
              style={{
                "--initial-rotation": "-1deg",
                animationDelay: "0.1s",
                background: "var(--surface)",
                border: "4px solid var(--ink)",
                boxShadow: "8px 8px 0 0 rgba(0,0,0,0.65)",
                padding: "24px 28px",
                position: "relative",
                maxWidth: 500,
                flex: "1 1 340px",
              } as CSSProperties}
            >
              {/* Pushpin */}
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#ba1a1a" }}>push_pin</span>
              </div>
              <h1 className="h-display" style={{ fontSize: 22, marginBottom: 8 }}>
                INTELLIGENCE LOG: #{messages.length > 0 ? messages.length * 17 + 700 : 724}
              </h1>
              <p className="mono" style={{ fontSize: 13, opacity: 0.6, marginBottom: 12 }}>
                Subject: Deep Blob Analysis · Session Recorded
              </p>
              <span className="stamp stamp-red" style={{ display: "inline-block" }}>CLASSIFIED</span>
            </div>

            {/* METRIC SCAN card */}
            <div
              className="animate-on-load"
              style={{
                "--initial-rotation": "1.2deg",
                animationDelay: "0.25s",
                background: "var(--peach)",
                border: "3px solid var(--ink)",
                boxShadow: "5px 5px 0 0 rgba(0,0,0,0.55)",
                padding: "16px 20px",
                position: "relative",
                width: 200,
                flex: "0 0 auto",
              } as CSSProperties}
            >
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, marginBottom: 8, opacity: 0.7 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 4 }}>query_stats</span>
                METRIC SCAN
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="h-display" style={{ fontSize: 32, color: "var(--ink)" }}>94</span>
                <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>% ACCURACY</span>
              </div>
              <div style={{
                marginTop: 8, height: 4, background: "var(--paper-2)",
                border: "1px solid var(--ink)", position: "relative", overflow: "hidden",
              }}>
                <div style={{ width: "94%", height: "100%", background: "var(--ink)" }}/>
              </div>
              <div className="mono" style={{ fontSize: 9, marginTop: 6, opacity: 0.5, letterSpacing: "0.1em" }}>
                CONFIDENCE: HIGH
              </div>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "minmax(0, 2.2fr) minmax(280px, 1fr)", alignItems: "flex-start", gap: 24, marginBottom: 32 }}>

            {/* Chat area */}
            <div style={{
              border: "4px solid var(--ink)",
              boxShadow: "8px 8px 0 0 rgba(0,0,0,0.65)",
              background: "var(--surface)",
              overflow: "hidden",
            }}>
              {/* Header strip */}
              <div style={{
                padding: "10px 20px",
                background: "var(--ink)", color: "var(--tusk)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                flexWrap: "wrap", gap: 8,
              }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", fontWeight: 700 }}>
                  ● INTERROGATION: SUI_NETWORK_ANALYST
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={handleGenerateReport}
                    disabled={generatingReport || loading}
                    className="mono"
                    style={{
                      fontSize: 9.5, letterSpacing: "0.1em", fontWeight: 700,
                      background: generatingReport ? "rgba(255,255,255,0.1)" : "var(--gold)",
                      color: "var(--ink)", border: "1.5px solid var(--tusk)",
                      padding: "4px 10px", cursor: generatingReport ? "wait" : "pointer",
                      display: "flex", alignItems: "center", gap: 5,
                      opacity: (generatingReport || loading) ? 0.6 : 1,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                      {generatingReport ? "sync" : "summarize"}
                    </span>
                    {generatingReport ? "FILING REPORT…" : "GENERATE REPORT"}
                  </button>
                  <div className="mono" style={{ fontSize: 10, opacity: 0.55 }}>
                    {messages.length} EXCHANGES
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} style={{
                padding: "20px 20px 12px",
                maxHeight: 540,
                overflowY: "auto",
                display: "flex", flexDirection: "column", gap: 14,
                position: "relative",
              }}>
                {/* Decorative floating bubbles */}
                {animations && (
                  <>
                    <div className="bubble-anim" style={{
                      position: "absolute", top: 30, right: 20,
                      width: 18, height: 18, borderRadius: "50%",
                      border: "2px solid var(--ink)", opacity: 0.07,
                      pointerEvents: "none", zIndex: 0,
                      animationDelay: "0s",
                    }}/>
                    <div className="bubble-anim" style={{
                      position: "absolute", top: 80, right: 50,
                      width: 10, height: 10, borderRadius: "50%",
                      border: "2px solid var(--ink)", opacity: 0.05,
                      pointerEvents: "none", zIndex: 0,
                      animationDelay: "1.5s",
                    }}/>
                    <div className="bubble-anim" style={{
                      position: "absolute", top: 55, right: 32,
                      width: 14, height: 14, borderRadius: "50%",
                      border: "2px solid var(--ink)", opacity: 0.06,
                      pointerEvents: "none", zIndex: 0,
                      animationDelay: "0.8s",
                    }}/>
                  </>
                )}
                {messages.map((m, i) => <Bubble key={i} msg={m}/>)}
                {loading && <Typing/>}
              </div>

              <SuggestedCases onSend={send} disabled={loading}/>

              {/* Input */}
              <div style={{
                padding: "14px 20px",
                background: "var(--surface-c)",
                borderTop: "4px solid var(--ink)",
              }}>
                <Composer onSend={send} disabled={loading}/>
              </div>
            </div>

            <CasePanel/>
          </div>

          <Footer/>
        </div>
      </div>

      {animations && (
        <div style={{ position: "fixed", bottom: 0, right: 12, zIndex: 1, pointerEvents: "none", opacity: 0.88 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <RandomCharacter width={82} height={82} alt="Walytics Holmes" style={{ borderTop: "2px solid var(--ink)", borderLeft: "2px solid var(--ink)" }}/>
        </div>
      )}
    </div>
  );
}
