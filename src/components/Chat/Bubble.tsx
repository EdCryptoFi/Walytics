import { CitedCard } from "./CitedCard";
import { RandomCharacter } from "@/components/UI/RandomCharacter";
import type { ChatMessage } from "@/types";

interface BubbleProps {
  msg: ChatMessage & { cited?: { kind: string; label?: string; count?: number } };
  time?: string;
}

export function Bubble({ msg, time }: BubbleProps) {
  const isUser = msg.role === "user";
  const isLong = msg.content.length > 120;
  const formatted = msg.content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code style="font-family:var(--font-mono);background:rgba(0,0,0,0.08);padding:1px 5px;font-size:0.92em">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--mint-deep);text-decoration:underline;font-weight:600">$1</a>');

  return (
    <div style={{
      display: "flex", gap: 12, alignItems: "flex-start",
      flexDirection: isUser ? "row-reverse" : "row",
      marginBottom: 18
    }}>
      <div style={{
        width: 48, height: 48, flexShrink: 0,
        border: "3px solid var(--ink)",
        background: isUser ? "var(--gold)" : "var(--mint)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: 18
      }}>
        {isUser ? "YOU" : (
          <RandomCharacter width={42} height={42} alt="Walytics Holmes"/>
        )}
      </div>
      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
        {/* Timestamp header */}
        {isUser ? (
          <div className="mono" style={{ fontSize: 9.5, opacity: 0.65, marginBottom: 4, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            WATSON · {time ?? ""}
          </div>
        ) : (
          <div className="mono" style={{
            fontSize: 9.5, opacity: 0.65, marginBottom: 4, letterSpacing: "0.1em",
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4,
            borderBottom: "1px solid rgba(0,0,0,0.12)", paddingBottom: 3
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 12, opacity: 0.7 }}>schedule</span>
            RECEIVED · WALYTICS HOLMES · {time ?? ""}
          </div>
        )}
        <div style={{
          position: "relative",
          transform: isUser ? "rotate(0.5deg)" : "none",
        }}>
          {/* Tape corner effect on long AI messages */}
          {!isUser && isLong && (
            <div className="tape" style={{
              position: "absolute", top: -9, left: 14, width: 60, height: 16, zIndex: 2,
            }}/>
          )}
          {/* Fingerprint watermark on AI messages */}
          {!isUser && (
            <span className="material-symbols-outlined" style={{
              position: "absolute", bottom: 8, right: 10,
              fontSize: 48, opacity: 0.08, color: "var(--ink)",
              pointerEvents: "none", zIndex: 0,
            }}>fingerprint</span>
          )}
          <div className="brut" style={{
            padding: "12px 14px",
            background: isUser ? "var(--paper-2)" : "var(--paper)",
            boxShadow: "4px 4px 0 0 var(--ink)",
            fontSize: 14, lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            position: "relative", zIndex: 1,
            ...(isUser ? { textDecoration: "underline", textDecorationStyle: "dotted" as const, textDecorationColor: "rgba(0,0,0,0.25)", textUnderlineOffset: "3px" } : {}),
          }} dangerouslySetInnerHTML={{ __html: formatted }}/>
        </div>
        {(msg as { cited?: { kind: string; label?: string; count?: number } }).cited && (
          <CitedCard cited={(msg as { cited: { kind: string; label?: string; count?: number } }).cited}/>
        )}
      </div>
    </div>
  );
}
