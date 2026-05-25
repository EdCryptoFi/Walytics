"use client";

const BG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA2SCLznnj6lbYKlp0B__95tGC5zvxyLbH1izdzY4elmQJ_FXWjLrGxgaRTen0MBWZh6ms66bTokag-MK_xrm-F-KVAU-wTsrZa1RJrNeO3TRFbcO_jLEsESuUHmaT1qgmJ6QBt24wYrG2pXqiahJ2m3lkADqbQD9BJ4cRYk6nOu2D3eEQ8O7esxnPftAkf-1w3RVUWATCin2MPwt4kLf0qbQodwTBqW3ATVOxSUjmQQF-dMFudleX4t0mwlEYjJN0hRNcAt5eWiYM";

export function DetectiveBackground() {
  return (
    <>
      {/* Solid beige base — matches the paper/surface tone */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -4,
        background: "#e8e0d4",
      }}/>

      {/* Noir desk photo at 20% opacity over the beige */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -3,
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        opacity: 0.20,
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
