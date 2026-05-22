import { WalrusPeek } from "@/components/Mascot/WalrusPeek";
import { IconMagnify, IconKey, IconBook } from "@/components/Mascot/DetectiveIcons";
import { formatBytes, shortenAddress, formatTimestamp } from "@/lib/utils";
import type { BlobInfo } from "@/types";

const TYPE_ICONS: Record<string, string> = {
  "image/png": "🖼", "image/jpeg": "📷", "video/mp4": "🎬",
  "text/plain": "📜", "application/pdf": "📄", "application/json": "🧾",
  "model/gltf-binary": "🧊", "audio/mp3": "🎵"
};

const VERDICTS = [
  { label: "OPEN CASE",   color: "var(--burgundy)", fg: "var(--tusk)" },
  { label: "SOLVED",      color: "var(--mint)",     fg: "var(--ink)"  },
  { label: "ARCHIVED",    color: "var(--paper-2)",  fg: "var(--ink)"  },
  { label: "RED HERRING", color: "var(--gold)",     fg: "var(--ink)"  },
  { label: "OF INTEREST", color: "var(--tweed)",    fg: "var(--tusk)" },
];

function getVerdict(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return VERDICTS[h % VERDICTS.length];
}

interface InspectorProps {
  blob: BlobInfo | null;
  idx: number;
  animate: boolean;
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="kicker" style={{ fontSize: 9 }}>{label}</div>
      <div style={{
        fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
        fontSize: 13, fontWeight: 700, marginTop: 2, wordBreak: "break-all"
      }}>{value}</div>
    </div>
  );
}

export function Inspector({ blob, idx, animate }: InspectorProps) {
  if (!blob) {
    return (
      <div className="brut brut-paper2" style={{
        padding: 22, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", minHeight: 500, position: "sticky", top: 80
      }}>
        <div style={{ width: 140 }}><WalrusPeek size={140} animate={animate}/></div>
        <h3 className="h-display" style={{ fontSize: 22, margin: "12px 0 4px" }}>Pick a blob, Watson.</h3>
        <p className="mono" style={{ fontSize: 11.5, opacity: 0.75, maxWidth: 220 }}>
          Click any row to bring the evidence to the magnifying glass.
        </p>
      </div>
    );
  }

  const verdict = getVerdict(blob.id);
  const typeIcon = TYPE_ICONS[blob.storageType] ?? "📦";

  return (
    <div className="brut brut-paper2" style={{ padding: 0, position: "sticky", top: 80, overflow: "hidden" }}>
      <div style={{
        height: 200,
        background: "var(--mint)",
        borderBottom: "3px solid var(--ink)",
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 10px, transparent 10px 20px)"
      }}>
        <div style={{ fontSize: 84, filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.3))" }}>{typeIcon}</div>
        <span style={{
          position: "absolute", top: 10, left: 10,
          background: "var(--ink)", color: "var(--paper)", padding: "4px 8px",
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", fontWeight: 800
        }}>EVIDENCE № {String(idx + 1).padStart(4, "0")}</span>
        <span className="stamp anim-stamp" style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(255,255,255,0.4)"
        }}>{verdict.label}</span>
        <div className={animate ? "anim-loupe" : ""} style={{ position: "absolute", bottom: -10, right: -10 }}>
          <IconMagnify size={64} color="var(--ink)"/>
        </div>
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <div className="kicker">Blob ID</div>
        <div className="mono" style={{ fontSize: 15, fontWeight: 800, wordBreak: "break-all", marginTop: 2 }}>{shortenAddress(blob.id)}</div>

        <hr className="divider" style={{ margin: "14px 0" }}/>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="MIME Type" value={blob.storageType}/>
          <Field label="Size" value={formatBytes(blob.size)} mono/>
          <Field label="Publisher" value={shortenAddress(blob.publisher)}/>
          <Field label="Filed" value={formatTimestamp(blob.timestamp)} mono/>
          <Field label="Digest" value={shortenAddress(blob.digest)} mono/>
          <Field label="Replicas" value="3 / 3" mono/>
        </div>

        <hr className="divider" style={{ margin: "14px 0" }}/>

        <div className="kicker">Holmes&apos; notes</div>
        <div style={{
          marginTop: 6, padding: 10,
          background: "var(--paper)", border: "2.5px solid var(--ink)",
          fontStyle: "italic", fontSize: 12.5, lineHeight: 1.4
        }}>
          &ldquo;{blob.size > 5_000_000
            ? "Heavy blob, Watson. The bulk of our evidence locker may sleep here."
            : "Routine catalogue entry. File and monitor."}&rdquo;
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: "10px 12px", fontSize: 11 }}>
            <IconKey size={14}/> Unseal
          </button>
          <button className="btn" style={{ flex: 1, padding: "10px 12px", fontSize: 11 }}>
            <IconBook size={14}/> Add to file
          </button>
        </div>
      </div>
    </div>
  );
}
