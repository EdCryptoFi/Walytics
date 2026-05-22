import { WalrusHeadMini } from "@/components/Mascot/WalrusHeadMini";
import { CitedCard } from "./CitedCard";
import type { ChatMessage } from "@/types";

interface BubbleProps {
  msg: ChatMessage & { cited?: { kind: string; label?: string; count?: number } };
  time?: string;
}

export function Bubble({ msg, time }: BubbleProps) {
  const isUser = msg.role === "user";
  const formatted = msg.content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code style="font-family:var(--font-mono);background:rgba(0,0,0,0.08);padding:1px 5px;font-size:0.92em">$1</code>');

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
        {isUser ? "YOU" : <WalrusHeadMini size={36}/>}
      </div>
      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
        <div className="mono" style={{ fontSize: 9.5, opacity: 0.65, marginBottom: 4, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          {isUser ? `WATSON · ${time ?? ""}` : `WALRUS HOLMES · ${time ?? ""}`}
        </div>
        <div className="brut" style={{
          padding: "12px 14px",
          background: isUser ? "var(--gold)" : "var(--paper)",
          boxShadow: "4px 4px 0 0 var(--ink)",
          fontSize: 14, lineHeight: 1.5,
          whiteSpace: "pre-wrap"
        }} dangerouslySetInnerHTML={{ __html: formatted }}/>
        {(msg as { cited?: { kind: string; label?: string; count?: number } }).cited && (
          <CitedCard cited={(msg as { cited: { kind: string; label?: string; count?: number } }).cited}/>
        )}
      </div>
    </div>
  );
}
