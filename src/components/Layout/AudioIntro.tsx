"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 10000;

export function AudioIntro() {
  const playedRef = useRef(false);

  useEffect(() => {
    if (playedRef.current) return;
    playedRef.current = true;

    const audio = new Audio("/panther.mp3");
    audio.volume = 0.45;

    const timer = setTimeout(() => { audio.pause(); }, DURATION_MS);

    audio.play().catch(() => { clearTimeout(timer); });

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []);

  return null;
}
