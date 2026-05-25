"use client";

const BG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA2SCLznnj6lbYKlp0B__95tGC5zvxyLbH1izdzY4elmQJ_FXWjLrGxgaRTen0MBWZh6ms66bTokag-MK_xrm-F-KVAU-wTsrZa1RJrNeO3TRFbcO_jLEsESuUHmaT1qgmJ6QBt24wYrG2pXqiahJ2m3lkADqbQD9BJ4cRYk6nOu2D3eEQ8O7esxnPftAkf-1w3RVUWATCin2MPwt4kLf0qbQodwTBqW3ATVOxSUjmQQF-dMFudleX4t0mwlEYjJN0hRNcAt5eWiYM";

export function DetectiveBackground() {
  return (
    <>
      {/* Base dark layer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -3,
        background: "#0e0b08",
      }}/>

      {/* Detective board photo — fills viewport, no tiling */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -2,
        backgroundImage: `url('/desk-bg.jpg'), url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        opacity: 0.5,
        filter: "brightness(0.85) saturate(0.8) sepia(0.2)",
      }}/>

      {/* Soft vignette overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
        pointerEvents: "none",
      }}/>
    </>
  );
}
