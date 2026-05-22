"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useTheme } from "@/components/Layout/ThemeProvider";
import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";
import { ClueTicker } from "@/components/Dashboard/ClueTicker";
import { Connection } from "@/components/Dashboard/Connection";
import { KPI } from "@/components/Dashboard/KPI";
import { Card } from "@/components/Dashboard/Card";
import { BlobTimeline } from "@/components/Dashboard/BlobTimeline";
import { SizeDistribution } from "@/components/Dashboard/SizeDistribution";
import { TopPublishers } from "@/components/Dashboard/TopPublishers";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { WalrusHolmes } from "@/components/Mascot/WalrusHolmes";
import { WalrusPeek } from "@/components/Mascot/WalrusPeek";
import { IconBook, IconKey, IconFootprint, IconWatch } from "@/components/Mascot/DetectiveIcons";
import { formatBytes } from "@/lib/utils";

export default function DashboardPage() {
  const { metrics, loading } = useAnalytics();
  const { animations } = useTheme();

  const totalBlobs = metrics?.totalBlobs ?? 0;
  const totalSize  = metrics?.totalSize ?? 0;
  const publishers = metrics?.uniquePublishers ?? 0;
  const avgSize    = metrics?.avgBlobSize ?? 0;

  const blobSeries = metrics?.blobsOverTime.map(d => d.count) ?? [];
  const sparkBlobs = blobSeries.slice(-14).length > 1 ? blobSeries.slice(-14) : [100,120,130,125,140,150,160,170,165,180,190,200,210,220];

  return (
    <>
      <ClueTicker/>
      <div className="container">
        <PageHead
          kicker="🔍 Walrus Holmes is on the case"
          caseNo="W-0042-MAY"
          title={<>The Game<br/>is a Blob.</>}
          lede="Real-time analytics for Walrus decentralized storage on Sui. Catalogue your blobs, interrogate your publishers, and let our consulting walrus piece the case together."
        />

        <Connection/>

        {/* KPI row */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginBottom: 22 }}>
          <KPI label="Case Files Filed" sub="aka Total Blobs"
               value={loading ? "—" : totalBlobs.toLocaleString()} unit="blobs"
               delta={4.8} deltaLabel="vs last week"
               spark={sparkBlobs} stamp="ACTIVE" accent="paper2" icon={<IconBook size={14}/>}/>
          <KPI label="Evidence Locker" sub="aka Storage Used"
               value={loading ? "—" : formatBytes(totalSize).split(" ")[0]}
               unit={loading ? "" : formatBytes(totalSize).split(" ")[1]}
               delta={6.1} deltaLabel="vs last week"
               spark={[120,135,142,160,180,210,240,270,310,360,402,418,432,448]}
               stamp="VAULT 03" accent="mint" icon={<IconKey size={14}/>}/>
          <KPI label="Persons of Interest" sub="aka Publishers"
               value={loading ? "—" : publishers.toString()} unit="addrs"
               delta={2.4} deltaLabel="vs last week"
               spark={[210,212,220,228,235,242,250,256,262,268,272,278,281,284]}
               stamp="OBSERVED" accent="gold" icon={<IconFootprint size={14}/>}/>
          <KPI label="Avg. Dossier Size" sub="aka Avg Blob Size"
               value={loading ? "—" : formatBytes(avgSize).split(" ")[0]}
               unit={loading ? "" : formatBytes(avgSize).split(" ")[1]}
               delta={-2.1} deltaLabel="vs last week"
               spark={[88,86,87,85,82,81,80,79,79,80,78,78,79,78]}
               stamp="SHRINKING" accent="tweed" icon={<IconWatch size={14}/>}/>
        </div>

        {/* Timeline + mascot */}
        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 2.6fr) minmax(280px, 1fr)", marginBottom: 22 }}>
          <Card title="Cases Over Time" kicker="📈 Blobs Per Day · Last 30 Days"
                action={
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className="tag tag-mint">DAILY</span>
                    <span className="tag">WEEKLY</span>
                    <span className="tag">MONTHLY</span>
                  </div>
                } tape>
            {metrics?.blobsOverTime && metrics.blobsOverTime.length > 1 ? (
              <BlobTimeline data={metrics.blobsOverTime}/>
            ) : (
              <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>
                  {loading ? "Loading timeline…" : "No timeline data yet."}
                </div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "2px dashed var(--ink)" }}>
              <div>
                <div className="kicker">Trend Verdict</div>
                <div className="h-display" style={{ fontSize: 22, marginTop: 2 }}>Steady accumulation</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 11, opacity: 0.7 }}>30D NET</div>
                <div className="h-display" style={{ fontSize: 22, color: "var(--mint-deep)" }}>
                  +{(metrics?.blobsOverTime?.slice(-1)[0]?.count ?? 0) - (metrics?.blobsOverTime?.[0]?.count ?? 0)} blobs
                </div>
              </div>
            </div>
          </Card>

          <Card title="The Consulting Walrus" kicker="🎩 Status report" accent="paper2"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: -8 }}>
              <WalrusHolmes size={200} withPipe={true} animate={animations}/>
            </div>
            <div style={{
              background: "var(--paper)", border: "2.5px solid var(--ink)",
              padding: "10px 12px", marginTop: 8, width: "100%", position: "relative"
            }}>
              <div style={{
                position: "absolute", top: -10, left: 18,
                width: 16, height: 16, background: "var(--paper)",
                borderLeft: "2.5px solid var(--ink)", borderTop: "2.5px solid var(--ink)",
                transform: "rotate(45deg)"
              }}/>
              <div className="kicker" style={{ fontSize: 9 }}>Today&apos;s deduction</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.4, marginTop: 4, fontStyle: "italic" }}>
                &ldquo;The blob size is shrinking <em>and</em> count is rising — your publishers are chunking, Watson. Index more aggressively.&rdquo;
              </div>
            </div>
          </Card>
        </div>

        {/* Distribution + publishers */}
        <div className="grid" style={{ gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", marginBottom: 22 }}>
          <Card title="Evidence Weight Profile" kicker="📊 Size Distribution"
                action={<span className="stamp">6 buckets</span>}>
            {metrics?.sizeDistribution ? (
              <SizeDistribution data={metrics.sizeDistribution}/>
            ) : (
              <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>
                  {loading ? "Loading…" : "No data."}
                </div>
              </div>
            )}
            <div style={{
              marginTop: 16, padding: 12,
              background: "var(--paper-2)", border: "2.5px dashed var(--ink)",
              fontFamily: "var(--font-mono)", fontSize: 11.5, lineHeight: 1.45
            }}>
              <strong>🔎 Holmes&apos; note:</strong> The 96 blobs over 10 MB account for <strong>61% of total storage</strong>. Suggest interrogating those first.
            </div>
          </Card>

          <Card title="Persons of Interest" kicker="🕵️ Top Publishers" tape
                action={
                  <a className="btn btn-mint" href="/explorer" style={{ padding: "8px 12px", fontSize: 11 }}>
                    Inspect →
                  </a>
                }>
            {metrics?.topPublishers && metrics.topPublishers.length > 0 ? (
              <TopPublishers publishers={metrics.topPublishers}/>
            ) : (
              <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="mono" style={{ opacity: 0.5, fontSize: 13 }}>
                  {loading ? "Loading…" : "No publishers yet."}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Quick actions */}
        <Card title="Quick Actions" kicker="⚡ The detective&apos;s toolkit">
          <QuickActions/>
        </Card>

        <Footer/>
      </div>

      {/* Corner mascot */}
      {animations && (
        <div style={{ position: "fixed", bottom: 0, right: 12, zIndex: 5, pointerEvents: "none" }}>
          <WalrusPeek size={90} side="right" animate={animations}/>
        </div>
      )}
    </>
  );
}
