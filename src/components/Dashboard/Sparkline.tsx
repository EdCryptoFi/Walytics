interface SparklineProps {
  data: number[];
  color?: string;
  fill?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color = "var(--ink)", fill = "var(--mint)", width = 220, height = 60 }: SparklineProps) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => [i * step, height - 6 - ((v - min) / range) * (height - 12)] as [number, number]);
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = path + ` L ${width} ${height} L 0 ${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <path d={area} fill={fill} fillOpacity="0.35" stroke="none"/>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={last[0]} cy={last[1]} r="5" fill={fill} stroke={color} strokeWidth="2"/>
      <circle cx={last[0]} cy={last[1]} r="9" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}
