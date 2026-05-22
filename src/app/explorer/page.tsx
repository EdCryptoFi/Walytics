"use client";

import { useState, useMemo } from "react";
import { useBlobs } from "@/hooks/useBlobs";
import { useTheme } from "@/components/Layout/ThemeProvider";
import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";
import { FilterBar } from "@/components/Explorer/FilterBar";
import { BlobRow } from "@/components/Explorer/BlobRow";
import { Inspector } from "@/components/Explorer/Inspector";
import { formatBytes } from "@/lib/utils";
import type { BlobInfo } from "@/types";

function MiniHist({ blobs }: { blobs: BlobInfo[] }) {
  const bins = [0,0,0,0,0,0];
  blobs.forEach(b => {
    if (b.size < 1024) bins[0]++;
    else if (b.size < 10240) bins[1]++;
    else if (b.size < 102400) bins[2]++;
    else if (b.size < 1048576) bins[3]++;
    else if (b.size < 10485760) bins[4]++;
    else bins[5]++;
  });
  const max = Math.max(...bins, 1);
  const colors = ["var(--mint)","var(--gold)","var(--tweed)","var(--burgundy)","var(--rust)","var(--ink)"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 50 }}>
      {bins.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v/max)*100}%`,
          background: colors[i], border: "2px solid var(--ink)",
          position: "relative", minHeight: 4
        }}>
          <span className="mono" style={{
            position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
            fontSize: 9, fontWeight: 800
          }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function ExplorerPage() {
  const { blobs, loading } = useBlobs();
  const { animations } = useTheme();

  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [verdict, setVerdict] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const VERDICTS = [
    { label: "OPEN CASE" }, { label: "SOLVED" }, { label: "ARCHIVED" },
    { label: "RED HERRING" }, { label: "OF INTEREST" },
  ];
  const getVerdict = (id: string) => {
    let h = 0;
    for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return VERDICTS[h % VERDICTS.length];
  };

  const filtered = useMemo(() => {
    let arr = blobs.filter(b => {
      if (type && b.storageType !== type) return false;
      if (verdict && getVerdict(b.id).label !== verdict) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!b.id.toLowerCase().includes(s) && !b.publisher.toLowerCase().includes(s)) return false;
      }
      return true;
    });
    arr.sort((a, b) => {
      if (sortBy === "size-d") return b.size - a.size;
      if (sortBy === "size-a") return a.size - b.size;
      if (sortBy === "pub")    return a.publisher.localeCompare(b.publisher);
      return b.timestamp - a.timestamp;
    });
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobs, q, type, verdict, sortBy]);

  const active = filtered.find(b => b.id === activeId) ?? filtered[0] ?? null;
  const activeIdx = filtered.findIndex(b => b.id === activeId);

  const toggle = (id: string) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  const totalWeight = filtered.reduce((s, b) => s + b.size, 0);

  return (
    <div className="container">
        <PageHead
          kicker="🔍 Through the magnifying glass"
          caseNo="W-0042-EXP"
          title={<>The Evidence<br/>Locker.</>}
          lede="Every blob filed to Walrus, catalogued and cross-referenced. Sift, sort, subpoena. Holmes will assist."
        />

        {/* Summary strip */}
        <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div className="brut" style={{ padding: 16, background: "var(--paper-2)" }}>
            <div className="kicker">Size histogram · &lt;1KB → &gt;10MB</div>
            <div style={{ marginTop: 22 }}><MiniHist blobs={filtered}/></div>
          </div>
          <div className="brut" style={{ padding: 16, background: "var(--mint)" }}>
            <div className="kicker">Showing</div>
            <div className="h-display" style={{ fontSize: 38, marginTop: 4 }}>
              {loading ? "…" : filtered.length}
              <span style={{ fontSize: 14, opacity: 0.6 }}> / {blobs.length}</span>
            </div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>blobs in view</div>
          </div>
          <div className="brut" style={{ padding: 16, background: "var(--gold)" }}>
            <div className="kicker">Selected</div>
            <div className="h-display" style={{ fontSize: 38, marginTop: 4 }}>{selected.size}</div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>ready to subpoena</div>
          </div>
          <div className="brut" style={{ padding: 16, background: "var(--tweed)", color: "var(--tusk)" }}>
            <div className="kicker" style={{ color: "var(--tusk)" }}>Total weight</div>
            <div className="h-display" style={{ fontSize: 28, marginTop: 4 }}>
              {formatBytes(totalWeight)}
            </div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>filtered evidence</div>
          </div>
        </div>

        <FilterBar q={q} setQ={setQ} type={type} setType={setType} verdict={verdict} setVerdict={setVerdict} sortBy={sortBy} setSortBy={setSortBy}/>

        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 1.7fr) minmax(280px, 1fr)", alignItems: "flex-start" }}>
          {/* Table */}
          <div className="brut" style={{ padding: 0, overflow: "hidden", background: "var(--paper)" }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "28px 36px 1.5fr 1fr 90px 110px 120px",
              alignItems: "center", gap: 12,
              padding: "12px 14px",
              background: "var(--ink)", color: "var(--paper)",
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em"
            }}>
              <span/><span/>
              <span>BLOB ID</span>
              <span>PUBLISHER</span>
              <span style={{ textAlign: "right" }}>SIZE</span>
              <span>FILED</span>
              <span>VERDICT</span>
            </div>
            <div style={{ maxHeight: 720, overflow: "auto" }}>
              {loading ? (
                <div style={{ padding: 60, textAlign: "center", opacity: 0.6 }}>
                  <div className="mono" style={{ fontSize: 13 }}>Loading evidence…</div>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 60, textAlign: "center", opacity: 0.6 }}>
                  <div style={{ fontSize: 48 }}>🥽</div>
                  <h3 className="h-display" style={{ fontSize: 22, margin: "12px 0 4px" }}>Case dismissed.</h3>
                  <p className="mono" style={{ fontSize: 12 }}>No blobs match the filter. Loosen the cuffs?</p>
                </div>
              ) : filtered.map((b, i) => (
                <BlobRow key={b.id} blob={b} idx={i}
                  selected={selected.has(b.id)}
                  onSelect={() => toggle(b.id)}
                  active={active?.id === b.id}
                  onClick={() => setActiveId(b.id)}/>
              ))}
            </div>
          </div>

          {/* Inspector */}
          <Inspector blob={active} idx={activeIdx >= 0 ? activeIdx : 0} animate={animations}/>
        </div>

        <Footer/>
    </div>
  );
}
