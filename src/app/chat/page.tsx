"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/components/Layout/ThemeProvider";
import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";
import { Bubble } from "@/components/Chat/Bubble";
import { Typing } from "@/components/Chat/Typing";
import { Composer } from "@/components/Chat/Composer";
import { CasePanel } from "@/components/Chat/CasePanel";
import { SuggestedCases } from "@/components/Chat/SuggestedCases";
import { WalrusPeek } from "@/components/Mascot/WalrusPeek";

export default function ChatPage() {
  const { messages, input, setInput, loading, handleSend } = useChat();
  const { animations } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = (msg: string) => handleSend(msg);

  return (
    <div className="container">
        <PageHead
          kicker="🚬 Interrogation chamber"
          caseNo="W-0042-AI"
          title={<>Interrogate<br/>the Walrus.</>}
          lede="Walrus Holmes reads the Walrus storage network live and speaks plainly. Ask about publishers, blobs, anomalies, growth — he'll cite the evidence."
        />

        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 2.2fr) minmax(280px, 1fr)", alignItems: "flex-start" }}>
          {/* Chat column */}
          <div>
            <div className="brut" style={{ padding: 0, background: "var(--paper)" }}>
              {/* Header */}
              <div style={{
                padding: "10px 16px",
                background: "var(--ink)", color: "var(--paper)",
                borderBottom: "3px solid var(--ink)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 700 }}>
                  ● TRANSCRIPT · ENCRYPTED · {messages.length} EXCHANGES
                </div>
                <div className="mono" style={{ fontSize: 10, opacity: 0.6 }}>baker st. 221B</div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} style={{ padding: 22, maxHeight: 560, overflowY: "auto" }}>
                {messages.map((m, i) => (
                  <Bubble key={i} msg={m}/>
                ))}
                {loading && <Typing/>}
              </div>

              {/* Suggestions */}
              <SuggestedCases onSend={send} disabled={loading}/>
            </div>

            <Composer
              onSend={send}
              disabled={loading}
            />
          </div>

          <CasePanel/>
        </div>

        <Footer/>

      {animations && (
        <div style={{ position: "fixed", bottom: 0, right: 12, zIndex: 1, pointerEvents: "none", opacity: 0.85 }}>
          <WalrusPeek size={86} animate={animations}/>
        </div>
      )}
    </div>
  );
}
