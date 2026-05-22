"use client";

import { useTheme } from "@/components/Layout/ThemeProvider";

interface BlobTimelineProps {
  data: { date: string; count: number }[];
}

const peaks = [
  { label: "Walrus Mainnet" },
  { label: "TUSK Drop" },
  { label: "Whodunit?" },
];

export function BlobTimeline({ data }: BlobTimelineProps) {
  const { animations } = useTheme();
  const counts = data.map(d => d.count);
  const W = 900, H = 280, PAD = 36;
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts, 0);
  const range = max - min || 1;
  const stepX = (W - PAD * 2) / (counts.length - 1);
  const yVal = (v: number) => H - PAD - ((v - min) / range) * (H - PAD * 2);
  const path = counts.map((v, i) => (i === 0 ? "M" : "L") + (PAD + i * stepX).toFixed(1) + " " + yVal(v).toFixed(1)).join(" ");
  const area = path + ` L ${PAD + (counts.length - 1) * stepX} ${H - PAD} L ${PAD} ${H - PAD} Z`;

  const peakIdxs = counts.length >= 3
    ? [Math.floor(counts.length * 0.27), Math.floor(counts.length * 0.63), Math.floor(counts.length * 0.9)]
    : [];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.8" opacity="0.3"/>
        </pattern>
      </defs>
      {/* gridlines */}
      <g stroke="var(--ink)" strokeWidth="0.6" opacity="0.18">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={PAD} x2={W-PAD} y1={PAD + i*((H-PAD*2)/4)} y2={PAD + i*((H-PAD*2)/4)} strokeDasharray="3 4"/>
        ))}
      </g>
      {/* y axis labels */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-soft)">
        {[0,1,2,3,4].map(i => {
          const v = Math.round(max - (i/4)*(max-min));
          return <text key={i} x={PAD-8} y={PAD + i*((H-PAD*2)/4) + 3} textAnchor="end">{v.toLocaleString()}</text>;
        })}
      </g>
      {/* area fill */}
      <path d={area} fill="var(--mint)" fillOpacity="0.55" stroke="none"/>
      <path d={area} fill="url(#hatch)" stroke="none" opacity="0.5"/>
      {/* line */}
      <path d={path} fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
      {/* dots every 3 */}
      {counts.map((v, i) => i % 3 === 0 && (
        <circle key={i} cx={PAD + i * stepX} cy={yVal(v)} r="2.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
      ))}
      {/* peak pins */}
      {peakIdxs.map((pi, k) => pi < counts.length && (
        <g key={k} className={animations ? "anim-pulse" : ""} style={{ transformOrigin: `${PAD + pi*stepX}px ${yVal(counts[pi])}px` }}>
          <line x1={PAD + pi * stepX} y1={yVal(counts[pi]) - 6} x2={PAD + pi * stepX} y2={yVal(counts[pi]) - 32}
                stroke="var(--burgundy)" strokeWidth="2"/>
          <rect x={PAD + pi * stepX - 38} y={yVal(counts[pi]) - 50} width="76" height="20"
                fill="var(--burgundy)" stroke="var(--ink)" strokeWidth="2"/>
          <text x={PAD + pi * stepX} y={yVal(counts[pi]) - 36}
                fontFamily="var(--font-mono)" fontSize="9" fontWeight="700"
                fill="var(--tusk)" textAnchor="middle" letterSpacing="0.05em">{peaks[k]?.label}</text>
          <circle cx={PAD + pi * stepX} cy={yVal(counts[pi])} r="6"
                  fill="var(--burgundy)" stroke="var(--ink)" strokeWidth="2"/>
        </g>
      ))}
      {/* x axis */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-soft)">
        {counts.map((_, i) => i % Math.max(1, Math.floor(counts.length / 6)) === 0 && (
          <text key={i} x={PAD + i * stepX} y={H - PAD + 16} textAnchor="middle">
            {data[i]?.date?.split("-").slice(1).join("/") || `D-${counts.length - i}`}
          </text>
        ))}
      </g>
      {/* footprint trail */}
      <g opacity="0.35" fill="var(--ink)">
        {[0.1, 0.25, 0.4, 0.6, 0.75, 0.9].map((pct, i) => (
          <g key={i} transform={`translate(${PAD + pct * (W - PAD*2)}, ${H - 14}) rotate(${i%2?15:-15})`}>
            <ellipse cx="0" cy="0" rx="3" ry="4"/>
            <circle cx="-3" cy="-4" r="0.9"/>
            <circle cx="3" cy="-4" r="0.9"/>
          </g>
        ))}
      </g>
    </svg>
  );
}
