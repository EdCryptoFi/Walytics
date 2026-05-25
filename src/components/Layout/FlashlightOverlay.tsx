"use client";

import { useEffect, useRef } from "react";

export function FlashlightOverlay() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = document.getElementById("flashlight-overlay");
    const cursor = cursorRef.current;
    if (!overlay) return;

    const onMove = (e: MouseEvent) => {
      overlay.style.setProperty("--mouse-x", `${e.clientX}px`);
      overlay.style.setProperty("--mouse-y", `${e.clientY}px`);
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      id="flashlight-cursor"
      aria-hidden
      style={{
        position: "fixed",
        width: 56,
        height: 56,
        pointerEvents: "none",
        zIndex: 9999,
        display: "none",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Lens ring */}
      <svg width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="21" stroke="rgba(255,255,255,0.85)" strokeWidth="3" fill="none"/>
        <circle cx="24" cy="24" r="21" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.04)"/>
        {/* Glint */}
        <circle cx="16" cy="14" r="4" fill="rgba(255,255,255,0.18)"/>
        {/* Handle */}
        <line x1="39" y1="39" x2="54" y2="68" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round"/>
        <line x1="39" y1="39" x2="54" y2="68" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export function useFlashlight() {
  const toggle = () => {
    const overlay = document.getElementById("flashlight-overlay");
    const cursor = document.getElementById("flashlight-cursor");
    if (!overlay) return;

    const isActive = overlay.classList.toggle("active");
    document.body.style.cursor = isActive ? "none" : "";
    if (cursor) cursor.style.display = isActive ? "block" : "none";
  };
  return { toggle };
}
