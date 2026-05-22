interface WalrusPeekProps {
  size?: number;
  side?: "left" | "right";
  animate?: boolean;
}

export function WalrusPeek({ size = 120, side = "right", animate = true }: WalrusPeekProps) {
  const flip = side === "left" ? "scaleX(-1)" : "none";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: flip, overflow: "visible" }}>
      <g className={animate ? "anim-bob" : ""} style={{ transformOrigin: "60px 80px" }}>
        <ellipse cx="60" cy="100" rx="35" ry="22" fill="#2E4A3B" stroke="#0E1411" strokeWidth="2.5"/>
        <ellipse cx="60" cy="60" rx="34" ry="30" fill="#8CC4BE" stroke="#0E1411" strokeWidth="2.5"/>
        <ellipse cx="48" cy="72" rx="10" ry="8" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
        <ellipse cx="72" cy="72" rx="10" ry="8" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
        <ellipse cx="60" cy="70" rx="3.5" ry="3" fill="#0E1411"/>
        <path d="M54 76 L51 95 L57 95 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.2"/>
        <path d="M66 76 L69 95 L63 95 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.2"/>
        <path d="M48 78 Q42 84 38 80 M72 78 Q78 84 82 80" stroke="#0E1411" strokeWidth="1.5" fill="none"/>
        <g className={animate ? "anim-blink" : ""}>
          <circle cx="50" cy="55" r="2.5" fill="#0E1411"/>
          <circle cx="70" cy="55" r="2.5" fill="#0E1411"/>
          <circle cx="50.5" cy="54.5" r="0.8" fill="#fff"/>
          <circle cx="70.5" cy="54.5" r="0.8" fill="#fff"/>
        </g>
        <ellipse cx="60" cy="34" rx="38" ry="7" fill="#5C6B45" stroke="#0E1411" strokeWidth="2"/>
        <path d="M34 32 Q34 14 60 14 Q86 14 86 32 Q86 37 60 37 Q34 37 34 32Z" fill="#7A8854" stroke="#0E1411" strokeWidth="2"/>
        <circle cx="60" cy="12" r="2.8" fill="#5C6B45" stroke="#0E1411" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}
