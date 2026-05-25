"use client";

import { useState, useMemo } from "react";
import { useBlobs } from "@/hooks/useBlobs";
import { useFlashlight } from "@/components/Layout/FlashlightOverlay";
import { Footer } from "@/components/Layout/Footer";
import { CaseSidebar } from "@/components/Layout/CaseSidebar";
import { BlobModal } from "@/components/Explorer/BlobModal";
import { Inspector } from "@/components/Explorer/Inspector";
import { motion } from "framer-motion";
import { formatBytes } from "@/lib/utils";
import type { BlobInfo } from "@/types";
import type { CSSProperties } from "react";

const VERDICTS = [
  { label: "OPEN CASE",    color: "#ba1a1a" },
  { label: "SOLVED",       color: "#2e6b63" },
  { label: "ARCHIVED",     color: "#747878" },
  { label: "RED HERRING",  color: "#9b4a1a" },
  { label: "OF INTEREST",  color: "#6f5a4a" },
];

function getVerdict(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return VERDICTS[h % VERDICTS.length];
}

const BLOB_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrB3Jd3hB50FV10zgL9B2wvI42IcD0PxGQkZzv8hqRtP3-rkpwPwWd9qtoSVoob_F4GeqKdWHH6gaXqxW_TsaHeBjze8PSC35YCO-lq9CBDiB0LGagGkcws80ZhBpg9LDz3ySgxcezKJ81JOQacO6usdsJIMkdMedsaX8C5UtHU0pSXvESvGmYuF5RlXGwDbuT78c-EvRD1OL4IzHxLP0w9Rje2HLyr7md-Ioq0ot3NgBK_5BN5b2-DhldcdFdf4RgbqggioA4aE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-rBXWSxxgVn2s9YfsYWYSh3sR_5IU6sokHA7efQxuq3yvv3LWKw_zyHS4YnhnhSW1OMUvLLKneGywY6dNXO3lvwIEgzKhGxHobE5l_N5eBpsxt7uJwjhDsuj_-KkGvt4puTYLLfdLmD3MRxo8TpGD1lIkh8ahIRdL5qYI6S13jh3fGGvBncqrDxT8GnfKA_HjNmA5ukcjGwr_IcEhwqW6ib6JDVJ5w9ryX_EPoBe78ANAT7MeBSUvELxIt-7w7TW1bmTv55S_exI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABv9w30XilXzgbQ3TP1_O_AEBfrPBM5uF3MHn09ohTGzQ76jXYDOP0-SeUNq2vPMOoh_qfvARQYXVb_QBLLkmbz2YpcFfwjEF_sLc8wHy0uZWjLwdpvS8YGd5V6B-RScdhQdVNZRWzUFhFbmrIbC92C3IrEvYNEo4si_B79DGq0FO_kpPXk-WhfqY1wYmsZAJARtu8n3OHp7PUoqR-MPXD7AMm3PJwIfnOHKIoWGpKJra-QIDraNZ38ufakE_ha8wCMbKYPV_K1d8",
];

const STAMP_LABELS = ["CONFIDENTIAL", "VERIFIED", "CLASSIFIED", "TOP SECRET", "EVIDENCE"];
const STAMP_ROTATIONS = [-6, 4, -3, 7, -5];
const STAMP_COLORS = ["var(--error)", "var(--mint-deep)", "var(--secondary)", "var(--rust)", "var(--tweed)"];

function BlobCard({ blob, idx, onClick, onAnalyze, active }: { blob: BlobInfo; idx: number; onClick: () => void; onAnalyze: () => void; active: boolean }) {
  const verdict = getVerdict(blob.id);
  const shortId = blob.id.slice(0, 8).toUpperCase();
  // Natural polaroid tilt: vary between -3 and +3 degrees
  const tilts = [-2.8, 1.6, -1.2, 2.4, -0.8, 3.0, -2.0, 1.0, -3.2, 2.0];
  const tilt = tilts[idx % tilts.length];
  const imgSrc = BLOB_IMAGES[idx % BLOB_IMAGES.length];
  const dateStr = new Date(blob.timestamp * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });

  // Deterministic stamp selection per card
  const stampIdx = Math.abs(shortId.charCodeAt(0) + shortId.charCodeAt(1)) % STAMP_LABELS.length;
  const stampLabel = STAMP_LABELS[stampIdx];
  const stampRotation = STAMP_ROTATIONS[stampIdx];
  const stampColor = STAMP_COLORS[stampIdx];

  return (
    <div
      className="polaroid animate-on-load"
      onClick={onClick}
      style={{
        "--initial-rotation": `${tilt}deg`,
        animationDelay: `${0.08 + idx * 0.035}s`,
        transform: `rotate(${tilt}deg)`,
        outline: active ? "3px solid var(--secondary)" : "none",
        outlineOffset: 4,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
      } as CSSProperties}
    >
      {/* SVG Pushpin */}
      <div style={{
        position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)",
        zIndex: 4, filter: "drop-shadow(1px 3px 4px rgba(0,0,0,0.55))",
      }}>
        <svg width="22" height="28" viewBox="0 0 22 28">
          <circle cx="11" cy="10" r="8" fill="#ba1a1a" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
          <circle cx="8.5" cy="7.5" r="2.5" fill="rgba(255,255,255,0.28)"/>
          <line x1="11" y1="17" x2="11" y2="27" stroke="#3a2010" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Fingerprint watermark */}
      <span className="material-symbols-outlined fingerprint-watermark" aria-hidden="true">
        fingerprint
      </span>

      {/* Stamp badge (CONFIDENTIAL, VERIFIED, etc.) */}
      <div className="evidence-stamp-badge" style={{
        bottom: 48, left: 6,
        color: stampColor,
        transform: `rotate(${stampRotation}deg)`,
        background: "rgba(247,244,239,0.85)",
      }}>{stampLabel}</div>

      {/* Photo area */}
      <div className="polaroid-photo" style={{ aspectRatio: "1/1", marginBottom: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt="Evidence"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "sepia(0.35) contrast(1.1) brightness(0.88)",
            display: "block",
          }}
        />

        {/* Verdict stamp on photo */}
        <div style={{
          position: "absolute", top: 10, left: 10,
          border: `2.5px solid ${verdict.color}`,
          outline: `1.5px solid ${verdict.color}`,
          outlineOffset: 2,
          color: verdict.color,
          padding: "3px 7px",
          fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          transform: "rotate(-5deg)",
          background: "rgba(247,244,239,0.92)",
          boxShadow: "1px 1px 4px rgba(0,0,0,0.25)",
        }}>{verdict.label}</div>

        {/* ID watermark */}
        <div style={{
          position: "absolute", bottom: 5, right: 8,
          fontFamily: "var(--font-mono)", fontSize: 8,
          color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em",
          textShadow: "0 1px 2px rgba(0,0,0,0.8)",
        }}>#{shortId}</div>
      </div>

      {/* Polaroid caption strip */}
      <div style={{
        paddingTop: 8,
        display: "flex", flexDirection: "column", gap: 4, alignItems: "center",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
          color: "#3a2a1a", letterSpacing: "0.04em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%",
        }}>
          {blob.publisher.slice(0, 16)}{blob.publisher.length > 16 ? "..." : ""}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#6a5a4a",
        }}>
          {dateStr} · {formatBytes(blob.size)}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onAnalyze(); }}
          style={{
            marginTop: 4,
            padding: "4px 14px",
            background: "var(--ink)", color: "#f4f0ef",
            fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.28)",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.15s ease",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>search</span>
            ANALYZE
          </span>
        </button>
      </div>
    </div>
  );
}

export default function ExplorerPage() {
  const { blobs, loading } = useBlobs();
  const { toggle: toggleFlashlight } = useFlashlight();

  const [q, setQ]           = useState("");
  const [publisher, setPub]  = useState("ALL AGENTS");
  const [sizeFilter, setSize] = useState("ALL SIZES");
  const [typeFilter, setType] = useState("ALL FILES");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalBlob, setModalBlob] = useState<BlobInfo | null>(null);

  const filtered = useMemo(() => {
    return blobs.filter(b => {
      if (q) {
        const s = q.toLowerCase();
        if (!b.id.toLowerCase().includes(s) && !b.publisher.toLowerCase().includes(s)) return false;
      }
      if (publisher !== "ALL AGENTS" && !b.publisher.startsWith(publisher)) return false;
      if (sizeFilter === "MEGA-SCALE (>10MB)" && b.size < 10_000_000) return false;
      if (sizeFilter === "MICRO-INTEL (<1KB)" && b.size >= 1024) return false;
      if (sizeFilter === "VAULT-SIZED" && b.size < 1_000_000) return false;
      if (typeFilter !== "ALL FILES" && (b.storageType || "").toUpperCase() !== typeFilter) return false;
      return true;
    });
  }, [blobs, q, publisher, sizeFilter, typeFilter]);

  const active = filtered.find(b => b.id === activeId) ?? filtered[0] ?? null;
  const activeIdx = filtered.findIndex(b => b.id === activeId);

  return (
    <div className="page-surface">
      <div className="with-sidebar">
        <CaseSidebar activePage="explorer"/>

        <div className="sidebar-main" style={{ padding: "32px 32px 0" }}>

          {/* Search Warrant section — rotated dossier */}
          <section
            className="animate-on-load ink-bleed tape-corner"
            style={{
              "--initial-rotation": "-1deg",
              animationDelay: "0.1s",
              background: "var(--surface)",
              backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 4px, rgba(0,0,0,0.012) 5px)",
              border: "4px solid var(--ink)",
              boxShadow: "8px 8px 0 0 rgba(0,0,0,0.15)",
              padding: "28px 32px 32px",
              marginBottom: 32,
              position: "relative",
            } as CSSProperties}
          >
            {/* bottom tape corners */}
            <div style={{ position: "absolute", bottom: -6, left: -10, width: 46, height: 16, background: "rgba(220,194,140,0.45)", transform: "rotate(16deg)", border: "1px solid rgba(0,0,0,0.08)", zIndex: 2 }}/>
            <div style={{ position: "absolute", bottom: -6, right: -10, width: 46, height: 16, background: "rgba(220,194,140,0.45)", transform: "rotate(-12deg)", border: "1px solid rgba(0,0,0,0.08)", zIndex: 2 }}/>

            {/* Faded watermark text behind header */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%) rotate(-12deg)",
              fontFamily: "var(--font-display)", fontSize: 72,
              fontWeight: 800, textTransform: "uppercase",
              color: "var(--ink)", opacity: 0.03,
              letterSpacing: "0.1em", whiteSpace: "nowrap",
              pointerEvents: "none", userSelect: "none",
            }}>EVIDENCE LOCKER</div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: "var(--ink)" }}>gavel</span>
                  <h1 className="h-display" style={{ fontSize: 30, borderBottom: "2px solid var(--ink)", paddingBottom: 4, marginBottom: 0 }}>
                    Evidence Search Warrant
                  </h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <p className="mono" style={{ fontSize: 12, fontStyle: "italic", opacity: 0.55, margin: 0 }}>
                    Serial No: BLOB-992-DELTA
                  </p>
                  <span className="mono" style={{ fontSize: 9, opacity: 0.4, letterSpacing: "0.1em" }}>
                    ISSUED: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <button
                  className="btn"
                  onClick={toggleFlashlight}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>flashlight_on</span>
                  Investigate
                </button>
                <span className="mono" style={{ fontSize: 8, opacity: 0.35, letterSpacing: "0.12em" }}>
                  {filtered.length} ITEMS IN EVIDENCE
                </span>
              </div>
            </div>

            {/* Search field */}
            <div style={{ position: "relative", marginBottom: 24 }}>
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="IDENTIFY TARGET BLOB ID OR ADDRESS..."
                className="mono"
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.5)",
                  border: "2px dashed var(--ink)",
                  padding: "14px 56px 14px 16px",
                  fontSize: 14,
                  outline: "none",
                  letterSpacing: "0.04em",
                }}
              />
              <span className="material-symbols-outlined" style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                fontSize: 28, color: "var(--ink)",
              }}>fingerprint</span>
            </div>

            {/* Sticky note filters */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {/* Yellow — Publisher */}
              <div className="bubble-anim" style={{
                background: "var(--sticky)", padding: 14,
                width: 150, height: 150,
                boxShadow: "3px 4px 8px rgba(0,0,0,0.2)",
                transform: "rotate(2deg)",
                borderTop: "3px solid #e6d54a",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative",
                animationDelay: "0s",
              }}>
                <div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#854d0e", marginBottom: 2, display: "block" }}>person_search</span>
                  <span className="mono" style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "#854d0e", letterSpacing: "0.08em" }}>Publisher</span>
                </div>
                <select value={publisher} onChange={e => setPub(e.target.value)}
                  className="mono"
                  style={{ background: "transparent", border: "none", fontSize: 12, outline: "none", width: "100%", cursor: "pointer", color: "#854d0e" }}>
                  <option>ALL AGENTS</option>
                  {[...new Set(blobs.map(b => b.publisher.slice(0, 16)))].slice(0, 8).map(p => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                {/* Tape fold effect */}
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.06) 50%)" }}/>
              </div>

              {/* Blue — Size */}
              <div className="bubble-anim" style={{
                background: "#dbeafe", padding: 14,
                width: 150, height: 150,
                boxShadow: "3px 4px 8px rgba(0,0,0,0.2)",
                transform: "rotate(-1deg)",
                borderTop: "3px solid #93c5fd",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative",
                animationDelay: "0.6s",
              }}>
                <div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#1e3a8a", marginBottom: 2, display: "block" }}>scale</span>
                  <span className="mono" style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "#1e3a8a", letterSpacing: "0.08em" }}>Blob Size</span>
                </div>
                <select value={sizeFilter} onChange={e => setSize(e.target.value)}
                  className="mono"
                  style={{ background: "transparent", border: "none", fontSize: 12, outline: "none", width: "100%", cursor: "pointer", color: "#1e3a8a" }}>
                  <option>ALL SIZES</option>
                  <option>MEGA-SCALE (&gt;10MB)</option>
                  <option>MICRO-INTEL (&lt;1KB)</option>
                  <option>VAULT-SIZED</option>
                </select>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.06) 50%)" }}/>
              </div>

              {/* Green — Type */}
              <div className="bubble-anim" style={{
                background: "#dcfce7", padding: 14,
                width: 150, height: 150,
                boxShadow: "3px 4px 8px rgba(0,0,0,0.2)",
                transform: "rotate(3deg)",
                borderTop: "3px solid #86efac",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative",
                animationDelay: "1.2s",
              }}>
                <div>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#14532d", marginBottom: 2, display: "block" }}>folder_special</span>
                  <span className="mono" style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "#14532d", letterSpacing: "0.08em" }}>Evidence Type</span>
                </div>
                <select value={typeFilter} onChange={e => setType(e.target.value)}
                  className="mono"
                  style={{ background: "transparent", border: "none", fontSize: 12, outline: "none", width: "100%", cursor: "pointer", color: "#14532d" }}>
                  <option>ALL FILES</option>
                  <option>SMART_CONTRACT</option>
                  <option>META_BLOB</option>
                </select>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.06) 50%)" }}/>
              </div>
            </div>
          </section>

          {/* Evidence card grid + Inspector */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

            {/* Card grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {loading ? (
                <div style={{ padding: 60, textAlign: "center" }}>
                  <div className="mono" style={{ color: "var(--tusk)", opacity: 0.6 }}>Loading evidence…</div>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 60, textAlign: "center" }}>
                  <div style={{ fontSize: 48 }}>🥽</div>
                  <h3 className="h-display" style={{ fontSize: 22, color: "var(--tusk)", margin: "12px 0 4px" }}>Case dismissed.</h3>
                  <p className="mono" style={{ fontSize: 12, color: "var(--tusk)", opacity: 0.6 }}>No blobs match the filter.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 48, paddingTop: 32, paddingBottom: 24 }}>
                  {filtered.slice(0, 30).map((b, i) => (
                    <BlobCard
                      key={b.id}
                      blob={b}
                      idx={i}
                      active={active?.id === b.id}
                      onClick={() => setActiveId(b.id)}
                      onAnalyze={() => setModalBlob(b)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Inspector panel */}
            <div style={{ width: 300, flexShrink: 0, position: "sticky", top: 16 }}>
              <Inspector blob={active} idx={activeIdx >= 0 ? activeIdx : 0} animate={false}/>
            </div>

          </div>

          <Footer/>
        </div>
      </div>

      <BlobModal blob={modalBlob} onClose={() => setModalBlob(null)}/>
    </div>
  );
}
