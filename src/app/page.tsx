"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useTheme } from "@/components/Layout/ThemeProvider";
import { useFlashlight } from "@/components/Layout/FlashlightOverlay";
import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";
import { ClueTicker } from "@/components/Dashboard/ClueTicker";
import { Connection } from "@/components/Dashboard/Connection";
import { BlobTimeline } from "@/components/Dashboard/BlobTimeline";
import { SizeDistribution } from "@/components/Dashboard/SizeDistribution";
import { TopPublishers } from "@/components/Dashboard/TopPublishers";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { RandomCharacter } from "@/components/UI/RandomCharacter";
import { motion } from "framer-motion";
import { formatBytes } from "@/lib/utils";
import Link from "next/link";
import type { CSSProperties } from "react";

function Pushpin() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 3, filter: "drop-shadow(1px 3px 3px rgba(0,0,0,0.5))" }}>
      <circle cx="14" cy="12" r="9" fill="#ba1a1a" stroke="#000" strokeWidth="1.5"/>
      <rect x="12.5" y="19" width="3" height="8" rx="1.5" fill="#3a2010"/>
    </svg>
  );
}

function FolderTab() {
  return (
    <div style={{
      position: "absolute", top: -22, left: 0,
      width: 96, height: 22,
      background: "var(--gold)",
      clipPath: "polygon(0 0, 80% 0, 100% 100%, 0% 100%)",
      border: "2px solid var(--ink)", borderBottom: "none",
    }}/>
  );
}


export default function DashboardPage() {
  const { metrics, loading } = useAnalytics();
  const { animations } = useTheme();
  const { toggle: toggleFlashlight } = useFlashlight();

  const totalBlobs = metrics?.totalBlobs ?? 0;
  const totalSize  = metrics?.totalSize ?? 0;
  const publishers = metrics?.uniquePublishers ?? 0;
  const avgSize    = metrics?.avgBlobSize ?? 0;

  return (
    /* page is transparent — dark wood desk shows through */
    <div className="page-surface" style={{ position: "relative" }}>
      <ClueTicker/>

      {/* Decorative magnifying glass — left side, hidden on small screens */}
      <div style={{
        position: "absolute", top: 320, left: -30, zIndex: 0,
        opacity: 0.06, transform: "rotate(-18deg)",
        pointerEvents: "none", display: "var(--show-decorative, block)",
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: 260, color: "var(--ink)" }}>search</span>
      </div>

      <div className="container" style={{ paddingTop: 0, position: "relative", zIndex: 1 }}>

        {/* Hero dossier — with character on right */}
        <div
          className="animate-on-load ink-bleed classified-watermark"
          style={{
            "--initial-rotation": "0.12deg",
            animationDelay: "0.1s",
            background: "var(--paper)",
            border: "4px solid var(--ink)",
            boxShadow: "10px 10px 0 0 rgba(0,0,0,0.7)",
            padding: "40px 40px 32px",
            marginTop: 32,
            marginBottom: 36,
            position: "relative",
            overflow: "visible",
            minHeight: 320,
          } as CSSProperties}
        >
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {/* Left: text content */}
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <PageHead
                kicker="Walytics Holmes is on the case"
                caseNo="W-0042-MAY"
                title={<>The Game<br/>is a Blob.</>}
                lede="Real-time analytics for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers, and let Walytics Holmes piece the case together."
              />
              <Connection/>
            </div>
            {/* Right: Walytics Holmes character art — large */}
            <div style={{ flex: "1 1 420px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/index.png" alt="Walytics Holmes Characters" style={{
                width: "100%",
                maxWidth: 540,
                objectFit: "contain",
                filter: "drop-shadow(4px 6px 12px rgba(0,0,0,0.4))",
              }}/>
            </div>
          </div>
        </div>

        {/* KPI row — each card with a distinct tilt */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", marginBottom: 32, gap: 24 }}>

          {/* 1 — Folder card */}
          <div style={{ position: "relative", paddingTop: 22 }}>
            <FolderTab/>
            <div
              className="paper-hover animate-on-load"
              style={{
                "--initial-rotation": "0.8deg",
                animationDelay: "0.2s",
                background: "var(--paper-2)",
                border: "4px solid var(--ink)",
                boxShadow: "7px 7px 0 0 rgba(0,0,0,0.7)",
                padding: "22px 20px 20px",
                minHeight: 200,
              } as CSSProperties}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div className="kicker" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.7 }}>folder_open</span>
                    Case Files Filed
                  </div>
                  <div className="mono" style={{ fontSize: 14, opacity: 0.6 }}>aka Total Blobs</div>
                </div>
                <span className="stamp">ACTIVE</span>
              </div>
              <div className="h-display" style={{ fontSize: 50, lineHeight: 1, marginBottom: 10 }}>
                {loading ? "—" : totalBlobs.toLocaleString()}
                <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.55 }}> blobs</span>
              </div>
              <div className="mono" style={{ fontSize: 15, color: "#2e6b63" }}>▲ 4.8% vs last week</div>
            </div>
          </div>

          {/* 2 — Polaroid card */}
          <div
            className="paper-hover animate-on-load"
            style={{
              "--initial-rotation": "0.92deg",
              animationDelay: "0.3s",
              background: "var(--cream)",
              border: "4px solid var(--ink)",
              boxShadow: "7px 7px 0 0 rgba(0,0,0,0.7)",
              padding: "12px 16px 20px",
              minHeight: 200,
            } as CSSProperties}
          >
            <div style={{
              background: "var(--surface-c)", aspectRatio: "4/3",
              marginBottom: 12, border: "1px solid rgba(0,0,0,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              maxHeight: 80, overflow: "hidden",
            }}>
              <div className="kicker" style={{ fontSize: 13 }}>VAULT 03</div>
            </div>
            <div className="kicker" style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.7 }}>lock</span>
              Evidence Locker
            </div>
            <div className="h-display" style={{ fontSize: 38, lineHeight: 1, marginBottom: 6 }}>
              {loading ? "—" : formatBytes(totalSize).split(" ")[0]}
              <span style={{ fontSize: 15, fontWeight: 400, opacity: 0.55 }}>
                {" "}{loading ? "" : formatBytes(totalSize).split(" ")[1]}
              </span>
            </div>
            <div className="mono" style={{ fontSize: 15, color: "#2e6b63" }}>▲ 6.1% vs last week</div>
          </div>

          {/* 3 — Pinned note (peach) */}
          <div style={{ position: "relative" }}>
            <Pushpin/>
            <div
              className="paper-hover animate-on-load"
              style={{
                "--initial-rotation": "1.21deg",
                animationDelay: "0.4s",
                background: "var(--peach)",
                border: "4px solid var(--ink)",
                boxShadow: "7px 7px 0 0 rgba(0,0,0,0.7)",
                padding: "24px 20px 20px",
                minHeight: 200,
              } as CSSProperties}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div className="kicker" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.7 }}>groups</span>
                    Persons of Interest
                  </div>
                  <div className="mono" style={{ fontSize: 14, opacity: 0.6 }}>aka Publishers</div>
                </div>
                <span className="stamp">OBSERVED</span>
              </div>
              <div className="h-display" style={{ fontSize: 50, lineHeight: 1, marginBottom: 10 }}>
                {loading ? "—" : publishers.toString()}
                <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.55 }}> addrs</span>
              </div>
              <div className="mono" style={{ fontSize: 15, color: "#2e6b63" }}>▲ 2.4% vs last week</div>
            </div>
          </div>

          {/* 4 — Yellow sticky note */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, right: 0, zIndex: 2,
              width: 30, height: 30,
              background: "rgba(0,0,0,0.12)",
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}/>
            <div
              className="paper-hover animate-on-load"
              style={{
                "--initial-rotation": "-2.8deg",
                animationDelay: "0.5s",
                background: "var(--sticky)",
                border: "2px solid var(--ink)",
                boxShadow: "7px 7px 0 0 rgba(0,0,0,0.6)",
                padding: "20px 20px 22px",
                minHeight: 200,
              } as CSSProperties}
            >
              <div className="kicker" style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, opacity: 0.7 }}>straighten</span>
                Avg. Dossier Size
              </div>
              <div className="mono" style={{ fontSize: 14, opacity: 0.6, marginBottom: 14 }}>aka Avg Blob Size</div>
              <div className="h-display" style={{ fontSize: 38, lineHeight: 1, marginBottom: 10 }}>
                {loading ? "—" : formatBytes(avgSize).split(" ")[0]}
                <span style={{ fontSize: 15, fontWeight: 400, opacity: 0.55 }}>
                  {" "}{loading ? "" : formatBytes(avgSize).split(" ")[1]}
                </span>
              </div>
              <div className="mono" style={{ fontSize: 15, color: "var(--error)" }}>▼ 2.1% shrinking</div>
            </div>
          </div>

        </div>

        {/* Timeline + Consulting Walrus */}
        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 2.6fr) minmax(280px, 1fr)", marginBottom: 32, gap: 24, alignItems: "flex-start" }}>

          <div
            className="paper-hover animate-on-load ink-bleed wire-decoration"
            style={{
              "--initial-rotation": "-0.43deg",
              animationDelay: "0.6s",
              background: "var(--surface)",
              border: "4px solid var(--ink)",
              boxShadow: "8px 8px 0 0 rgba(0,0,0,0.65)",
              padding: "28px 28px 24px",
            } as CSSProperties}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div className="kicker" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: 0.7 }}>timeline</span>
                  Blobs per day · Last 30 Days
                </div>
                <h2 className="h-display" style={{ fontSize: 28, margin: "4px 0 0" }}>Cases Over Time</h2>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span className="tag tag-mint">DAILY</span>
                <span className="tag">WEEKLY</span>
                <span className="tag">MONTHLY</span>
              </div>
            </div>
            {metrics?.blobsOverTime && metrics.blobsOverTime.length > 1 ? (
              <BlobTimeline data={metrics.blobsOverTime}/>
            ) : (
              <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed var(--outline)" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>
                  {loading ? "Loading timeline…" : "No timeline data yet."}
                </div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "3px dashed var(--ink)" }}>
              <div>
                <div className="kicker">Trend Verdict</div>
                <div className="h-display" style={{ fontSize: 22, marginTop: 2 }}>Steady Accumulation</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 14, opacity: 0.6 }}>30D NET</div>
                <div className="h-display" style={{ fontSize: 24, color: "#2e6b63" }}>
                  +{(metrics?.blobsOverTime?.slice(-1)[0]?.count ?? 0) - (metrics?.blobsOverTime?.[0]?.count ?? 0)} blobs
                </div>
              </div>
            </div>
          </div>

          {/* The Consulting Walrus */}
          <div
            className="paper-hover animate-on-load ink-bleed"
            style={{
              "--initial-rotation": "0.5deg",
              animationDelay: "0.7s",
              background: "var(--surface-c)",
              border: "4px solid var(--ink)",
              boxShadow: "8px 8px 0 0 rgba(0,0,0,0.65)",
              padding: "22px",
              display: "flex", flexDirection: "column", gap: 14,
            } as CSSProperties}
          >
            <div>
              <div className="kicker">Status Report</div>
              <h2 className="h-display" style={{ fontSize: 22, margin: "4px 0 0" }}>Walytics Holmes</h2>
            </div>
            <div style={{
              background: "#fff", border: "3px solid var(--ink)",
              padding: "20px 16px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
              position: "relative", overflow: "hidden", minHeight: 280,
              borderRadius: 2,
            }}>
              {/* Logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Walytics Holmes" style={{ width: "100%", maxWidth: 140, objectFit: "contain", zIndex: 1 }}/>
              {/* Character — floating animation, larger */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginTop: -40, zIndex: 2 }}
              >
                <RandomCharacter width={260} height={300} alt="Walytics Holmes" style={{ objectFit: "contain" }}/>
              </motion.div>
            </div>
            <div style={{
              background: "var(--paper)", border: "2px solid var(--ink)",
              padding: "12px 14px", position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -9, left: 20,
                width: 14, height: 14, background: "var(--paper)",
                borderLeft: "2px solid var(--ink)", borderTop: "2px solid var(--ink)",
                transform: "rotate(45deg)",
              }}/>
              <div className="kicker" style={{ fontSize: 13, marginBottom: 6 }}>Today&apos;s deduction</div>
              <p className="mono" style={{ fontSize: 12.5, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>
                &ldquo;The blob size is shrinking <em>and</em> count is rising — your publishers are chunking, Watson. Index more aggressively.&rdquo;
              </p>
            </div>
            <button className="investigate-btn" onClick={toggleFlashlight} style={{ width: "100%", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search_insights</span>
              Investigate
            </button>
          </div>

        </div>

        {/* Size distribution + Publishers */}
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", marginBottom: 32, gap: 24 }}>

          <div
            className="paper-hover animate-on-load coffee-ring"
            style={{
              "--initial-rotation": "0.21deg",
              animationDelay: "0.8s",
              background: "var(--surface)",
              border: "4px solid var(--ink)",
              boxShadow: "6px 6px 0 0 rgba(0,0,0,0.65)",
              padding: "24px 24px 22px",
            } as CSSProperties}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
              <div>
                <div className="kicker">Size Distribution</div>
                <h2 className="h-display" style={{ fontSize: 24, margin: "4px 0 0" }}>Evidence Weight Profile</h2>
              </div>
              <span className="stamp">6 BUCKETS</span>
            </div>
            {metrics?.sizeDistribution ? (
              <SizeDistribution data={metrics.sizeDistribution}/>
            ) : (
              <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed var(--outline)" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>{loading ? "Loading…" : "No data."}</div>
              </div>
            )}
            <div style={{
              marginTop: 16, padding: "12px 14px",
              background: "var(--paper-2)", border: "2px dashed var(--ink)",
              fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5,
            }}>
              <strong>Holmes&apos; note:</strong> The 96 blobs over 10 MB account for{" "}
              <strong>61% of total storage</strong>. Suggest interrogating those first.
            </div>
          </div>

          <div
            className="paper-hover animate-on-load"
            style={{
              "--initial-rotation": "0.85deg",
              animationDelay: "0.9s",
              background: "var(--paper)",
              border: "4px solid var(--ink)",
              boxShadow: "6px 6px 0 0 rgba(0,0,0,0.65)",
              padding: "24px 24px 22px",
              position: "relative",
            } as CSSProperties}
          >
            <span className="tape"/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
              <div>
                <div className="kicker">Top Publishers</div>
                <h2 className="h-display" style={{ fontSize: 24, margin: "4px 0 0" }}>Persons of Interest</h2>
              </div>
              <a className="btn btn-ghost" href="/explorer" style={{ padding: "6px 12px", fontSize: 12 }}>Inspect →</a>
            </div>
            {metrics?.topPublishers && metrics.topPublishers.length > 0 ? (
              <TopPublishers publishers={metrics.topPublishers}/>
            ) : (
              <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed var(--outline)" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>{loading ? "Loading…" : "No publishers yet."}</div>
              </div>
            )}
          </div>

        </div>

        {/* Quick actions */}
        <div
          className="animate-on-load"
          style={{
            "--initial-rotation": "0deg",
            animationDelay: "1s",
            padding: "28px 24px 22px",
          } as CSSProperties}
        >
          <div className="kicker" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <motion.span
              className="material-symbols-outlined"
              animate={animations ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              style={{ fontSize: 16, color: "var(--gold)" }}
            >bolt</motion.span>
            The Detective&apos;s Toolkit
          </div>
          <h2 className="h-display noir-spotlight" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: "0 0 20px", color: "var(--cream, #f5f0e8)", position: "relative" }}>Quick Actions</h2>
          <div style={{
            background: "var(--paper-2)",
            border: "3px solid var(--ink)",
            boxShadow: "4px 4px 0 0 rgba(0,0,0,0.6)",
            padding: "22px 24px",
          }}>
            <QuickActions/>
          </div>
        </div>

        <Footer/>
      </div>


      {animations && (
        <div style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 5, pointerEvents: "none",
        }}>
          <span className="material-symbols-outlined mag-glow" style={{
            fontSize: 48,
            color: "var(--gold)",
            opacity: 0.85,
          }}>search</span>
        </div>
      )}
    </div>
  );
}
