interface WalrusHolmesProps {
  size?: number;
  withPipe?: boolean;
  withLoupe?: boolean;
  animate?: boolean;
}

export function WalrusHolmes({ size = 220, withPipe = true, withLoupe = false, animate = true }: WalrusHolmesProps) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 200 230" style={{ overflow: "visible" }}>
      <g>
        <rect x="78" y="180" width="18" height="36" fill="#2E4A3B" stroke="#0E1411" strokeWidth="2"/>
        <rect x="104" y="180" width="18" height="36" fill="#2E4A3B" stroke="#0E1411" strokeWidth="2"/>
        <ellipse cx="86" cy="218" rx="13" ry="6" fill="#5C3A1E" stroke="#0E1411" strokeWidth="2"/>
        <ellipse cx="114" cy="218" rx="13" ry="6" fill="#5C3A1E" stroke="#0E1411" strokeWidth="2"/>
        <path d="M50 110 Q50 80 100 80 Q150 80 150 110 L150 185 Q150 200 100 200 Q50 200 50 185 Z"
              fill="#2E4A3B" stroke="#0E1411" strokeWidth="2.5"/>
        <g opacity="0.5" stroke="#0E1411" strokeWidth="0.6">
          <path d="M60 90 L60 195 M75 85 L75 198 M105 80 L105 200 M125 80 L125 200 M145 95 L145 190"/>
          <path d="M50 105 L150 105 M50 130 L150 130 M50 155 L150 155 M50 180 L150 180"/>
        </g>
        <path d="M85 100 Q70 130 80 175 L95 175 L95 110 Z" fill="#1B2E25" stroke="#0E1411" strokeWidth="2"/>
        <path d="M115 100 Q130 130 120 175 L105 175 L105 110 Z" fill="#1B2E25" stroke="#0E1411" strokeWidth="2"/>
        <path d="M88 105 Q100 95 112 105 L108 122 Q100 128 92 122 Z" fill="#7A2A2A" stroke="#0E1411" strokeWidth="2"/>
        <polygon points="100,113 103,118 100,121 97,118" fill="#C9A24A" stroke="#0E1411" strokeWidth="1"/>
        <path d="M120 140 Q130 150 135 160" stroke="#C9A24A" strokeWidth="2" fill="none" strokeDasharray="2 2"/>
        <circle cx="138" cy="165" r="6" fill="#C9A24A" stroke="#0E1411" strokeWidth="1.5"/>
        <circle cx="138" cy="165" r="3" fill="#F1E4C6"/>
        <path d="M138 162 L138 165 L140 167" stroke="#0E1411" strokeWidth="0.7"/>
        <path d="M55 115 Q40 140 45 170 Q50 175 60 170 Q65 145 70 125 Z"
              fill="#2E4A3B" stroke="#0E1411" strokeWidth="2"/>
        <circle cx="48" cy="172" r="9" fill="#8CC4BE" stroke="#0E1411" strokeWidth="2"/>
        <path d="M145 115 Q160 130 155 155 Q150 160 142 158 Q138 140 130 125 Z"
              fill="#2E4A3B" stroke="#0E1411" strokeWidth="2"/>
        <circle cx="152" cy="158" r="9" fill="#8CC4BE" stroke="#0E1411" strokeWidth="2"/>
      </g>
      <g>
        <ellipse cx="100" cy="60" rx="42" ry="38" fill="#8CC4BE" stroke="#0E1411" strokeWidth="2.5"/>
        <ellipse cx="84" cy="75" rx="14" ry="11" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
        <ellipse cx="116" cy="75" rx="14" ry="11" fill="#A8D4CE" stroke="#0E1411" strokeWidth="1.5"/>
        <ellipse cx="100" cy="72" rx="5" ry="4" fill="#0E1411"/>
        <ellipse cx="98" cy="71" rx="1.4" ry="1" fill="#F2E8D2" opacity="0.6"/>
        <path d="M78 80 Q72 88 65 84 Q72 86 78 82" fill="#0E1411"/>
        <path d="M122 80 Q128 88 135 84 Q128 86 122 82" fill="#0E1411"/>
        <path d="M92 80 L88 110 L96 110 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.5"/>
        <path d="M108 80 L112 110 L104 110 Z" fill="#F1E4C6" stroke="#0E1411" strokeWidth="1.5"/>
        <g className={animate ? "anim-blink" : ""}>
          <circle cx="84" cy="55" r="4" fill="#fff" stroke="#0E1411" strokeWidth="1.5"/>
          <circle cx="116" cy="55" r="4" fill="#fff" stroke="#0E1411" strokeWidth="1.5"/>
          <circle cx="85" cy="56" r="2" fill="#0E1411"/>
          <circle cx="117" cy="56" r="2" fill="#0E1411"/>
          <circle cx="85.5" cy="55" r="0.6" fill="#fff"/>
          <circle cx="117.5" cy="55" r="0.6" fill="#fff"/>
        </g>
        <path d="M76 46 Q84 43 92 47" stroke="#0E1411" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M108 47 Q116 43 124 46" stroke="#0E1411" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <g>
          <ellipse cx="58" cy="38" rx="9" ry="6" fill="#5C6B45" stroke="#0E1411" strokeWidth="2"/>
          <ellipse cx="142" cy="38" rx="9" ry="6" fill="#5C6B45" stroke="#0E1411" strokeWidth="2"/>
          <ellipse cx="100" cy="30" rx="50" ry="9" fill="#5C6B45" stroke="#0E1411" strokeWidth="2.5"/>
          <path d="M65 28 Q65 8 100 8 Q135 8 135 28 Q135 35 100 35 Q65 35 65 28Z"
                fill="#7A8854" stroke="#0E1411" strokeWidth="2.5"/>
          <g opacity="0.5" stroke="#0E1411" strokeWidth="0.7">
            <path d="M75 12 L77 32 M88 8 L90 33 M100 8 L100 33 M110 8 L110 33 M122 9 L125 32"/>
            <path d="M67 18 L133 18 M65 26 L135 26"/>
          </g>
          <circle cx="100" cy="6" r="3.5" fill="#5C6B45" stroke="#0E1411" strokeWidth="1.8"/>
        </g>
        {withPipe && (
          <g className={animate ? "anim-bob" : ""} style={{ transformOrigin: "140px 90px" }}>
            <path d="M132 78 L155 90 L155 96 L132 84 Z" fill="#5C3A1E" stroke="#0E1411" strokeWidth="1.5"/>
            <ellipse cx="157" cy="88" rx="6" ry="8" fill="#5C3A1E" stroke="#0E1411" strokeWidth="1.5" transform="rotate(20 157 88)"/>
            {animate && (
              <>
                <circle className="anim-puff" cx="160" cy="78" r="3" fill="#0E1411" fillOpacity="0.25" style={{ animationDelay: "0s" }}/>
                <circle className="anim-puff" cx="163" cy="78" r="2.5" fill="#0E1411" fillOpacity="0.2" style={{ animationDelay: "0.8s" }}/>
                <circle className="anim-puff" cx="159" cy="78" r="2" fill="#0E1411" fillOpacity="0.18" style={{ animationDelay: "1.6s" }}/>
              </>
            )}
          </g>
        )}
        {withLoupe && (
          <g className={animate ? "anim-loupe" : ""} style={{ transformOrigin: "55px 175px" }}>
            <circle cx="40" cy="180" r="14" fill="#F1E4C6" fillOpacity="0.4" stroke="#0E1411" strokeWidth="2.5"/>
            <circle cx="40" cy="180" r="14" fill="none" stroke="#C9A24A" strokeWidth="2"/>
            <path d="M50 190 L62 200" stroke="#C9A24A" strokeWidth="4" strokeLinecap="round"/>
            <path d="M50 190 L62 200" stroke="#0E1411" strokeWidth="1"/>
          </g>
        )}
      </g>
    </svg>
  );
}
