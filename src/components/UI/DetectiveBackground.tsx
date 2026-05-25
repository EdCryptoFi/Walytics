"use client";

const BG_URL = "/bkg.png";

export function DetectiveBackground() {
  return (
    <>
      {/* Solid beige base — matches the paper/surface tone */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -4,
        background: "#e8e0d4",
      }}/>

      {/* Noir desk photo at 80% opacity over the beige */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -3,
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        opacity: 0.80,
        filter: "sepia(0.15) saturate(0.7)",
      }}/>

      {/* Subtle vignette for depth */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: `
          radial-gradient(ellipse 60% 40% at 50% 0%, rgba(180,120,50,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.15) 100%)
        `,
        pointerEvents: "none",
      }}/>
    </>
  );
}
