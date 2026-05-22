function Snippet({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px dashed rgba(0,0,0,0.2)", paddingTop: 6 }}>
      <span className="mono" style={{ fontSize: 10, opacity: 0.65, letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</span>
      <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{v}</span>
    </div>
  );
}

export function CasePanel() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 80 }}>
      <div className="brut brut-paper2" style={{ padding: 16 }}>
        <div className="kicker">Current Case</div>
        <div className="h-display" style={{ fontSize: 22, marginTop: 4, lineHeight: 1 }}>
          W-0042<br/>
          <span style={{ fontSize: 13, opacity: 0.7 }}>&ldquo;The Inflating Locker&rdquo;</span>
        </div>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <Snippet k="Opened" v="22 May 2026"/>
          <Snippet k="Status" v={<span className="tag" style={{ background: "var(--mint)", fontSize: 10 }}>● OPEN</span>}/>
          <Snippet k="Evidence" v="5,688 blobs · 448 GB"/>
          <Snippet k="Suspects" v="284 publishers"/>
          <Snippet k="Confidence" v={<span style={{ fontWeight: 800 }}>78% (Holmes Idx)</span>}/>
        </div>
      </div>

      <div className="brut" style={{ padding: 16, background: "var(--mint)" }}>
        <div className="kicker">Holmes&apos; Modus Operandi</div>
        <ul className="mono" style={{ fontSize: 11, lineHeight: 1.6, paddingLeft: 16, margin: "8px 0 0", fontWeight: 600 }}>
          <li>Cites every claim with evidence</li>
          <li>Reads from Walrus + Tatum live</li>
          <li>Refuses to speculate without data</li>
          <li>Smokes pipe between answers</li>
        </ul>
      </div>

      <div className="brut" style={{ padding: 16, background: "var(--gold)" }}>
        <div className="kicker">Tonight&apos;s Brief</div>
        <p style={{ fontSize: 13, lineHeight: 1.4, margin: "6px 0 0", fontStyle: "italic" }}>
          &ldquo;Storage is up 6.1% this week. Either we have a new resident in the locker — or someone is hiding something. Find out which, Watson.&rdquo;
        </p>
      </div>
    </aside>
  );
}
