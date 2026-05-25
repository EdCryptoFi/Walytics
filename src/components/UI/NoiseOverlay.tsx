"use client";

/* Film grain + scanlines — fixed overlay, pointer-events: none */
export function NoiseOverlay() {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply"/>
        </filter>
      </svg>
      {/* Grain layer */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        opacity: 0.06,
        pointerEvents: "none",
        zIndex: 200,
        mixBlendMode: "overlay",
      }}/>
      {/* Scanlines */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        pointerEvents: "none",
        zIndex: 201,
      }}/>
      {/* Vignette */}
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        pointerEvents: "none",
        zIndex: 202,
      }}/>
    </>
  );
}
