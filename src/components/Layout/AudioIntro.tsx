"use client";

import { useEffect, useRef } from "react";

const MAX_PLAY_MS = 10_000;

export function AudioIntro() {
  const playedRef = useRef(false);

  useEffect(() => {
    if (playedRef.current) return;
    playedRef.current = true;

    const audio = new Audio("/panther.mp3");
    audio.volume = 0.35;

    // Stop after 10 seconds
    const timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, MAX_PLAY_MS);

    // Try autoplay — if blocked, play on first user interaction
    audio.play().catch(() => {
      const playOnInteraction = () => {
        audio.play().catch(() => {});
        document.removeEventListener("click", playOnInteraction);
        document.removeEventListener("keydown", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction, { once: true });
      document.addEventListener("keydown", playOnInteraction, { once: true });
    });

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}
