export function WalrusHeadMini({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ overflow: "visible" }}>
      <g>
        <ellipse cx="32" cy="20" rx="20" ry="7" fill="#5C6B45" stroke="#0E1411" strokeWidth="2"/>
        <path d="M14 18 Q32 4 50 18 Q50 25 32 25 Q14 25 14 18Z" fill="#7A8854" stroke="#0E1411" strokeWidth="2"/>
        <path d="M22 12 L26 22 M30 9 L32 23 M38 9 L36 23 M44 13 L40 22" stroke="#0E1411" strokeWidth="0.7" opacity="0.5"/>
        <circle cx="32" cy="7" r="2" fill="#5C6B45" stroke="#0E1411" strokeWidth="1.5"/>
      </g>
      <path d="M16 28 Q16 50 32 52 Q48 50 48 28 Q40 25 32 25 Q24 25 16 28Z"
            fill="#8CC4BE" stroke="#0E1411" strokeWidth="2"/>
      <ellipse cx="26" cy="42" rx="6" ry="5" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
      <ellipse cx="38" cy="42" rx="6" ry="5" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
      <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#0E1411"/>
      <path d="M22 44 Q26 47 30 46 M42 44 Q38 47 34 46" stroke="#0E1411" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M28 45 L26 56 L29 56 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.2"/>
      <path d="M36 45 L38 56 L35 56 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.2"/>
      <g className="anim-blink">
        <circle cx="26" cy="35" r="1.8" fill="#0E1411"/>
        <circle cx="38" cy="35" r="1.8" fill="#0E1411"/>
        <circle cx="26.5" cy="34.5" r="0.6" fill="#fff"/>
        <circle cx="38.5" cy="34.5" r="0.6" fill="#fff"/>
      </g>
    </svg>
  );
}
