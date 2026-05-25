import { RandomCharacter } from "@/components/UI/RandomCharacter";

export function Typing() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
      <div style={{
        width: 48, height: 48, flexShrink: 0,
        border: "3px solid var(--ink)", background: "var(--mint)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <RandomCharacter width={48} height={48} alt="Walytics Holmes"/>
      </div>
      <div style={{ maxWidth: "78%" }}>
        <div className="mono" style={{ fontSize: 9.5, opacity: 0.65, marginBottom: 4, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          WALYTICS HOLMES · sleuthing…
        </div>
        <div className="brut" style={{
          padding: "14px 16px", background: "var(--paper)",
          display: "flex", gap: 6, alignItems: "center"
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              width: 10, height: 10, background: "var(--ink)",
              animation: "pulse-pin 0.9s ease-in-out infinite",
              animationDelay: `${i*0.15}s`,
              display: "inline-block"
            }}/>
          ))}
          <span className="mono" style={{ fontSize: 11, marginLeft: 6, opacity: 0.6, fontStyle: "italic" }}>
            puffing pipe…
          </span>
        </div>
      </div>
    </div>
  );
}
