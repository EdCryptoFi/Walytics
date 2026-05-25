"use client";

import { useEffect, useRef } from "react";

export function ThemeMusic() {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const audio = new Audio("/panther.mp3");
    audio.volume = 0.3;
    // Autoplay may be blocked by browsers — play on first user interaction as fallback
    const tryPlay = () => {
      audio.play().catch(() => {
        const playOnce = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", playOnce);
          document.removeEventListener("keydown", playOnce);
        };
        document.addEventListener("click", playOnce, { once: true });
        document.addEventListener("keydown", playOnce, { once: true });
      });
    };
    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}
