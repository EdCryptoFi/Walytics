"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface PinnedNoteProps {
  children: ReactNode;
  color?: string;          // note background
  pinColor?: string;       // pin head color
  rotation?: number;
  delay?: number;
  style?: CSSProperties;
}

export function PinnedNote({
  children,
  color = "#fffd82",
  pinColor = "#ba1a1a",
  rotation = 0,
  delay = 0,
  style,
}: PinnedNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ rotate: rotation * 0.4, scale: 1.03, transition: { duration: 0.15 } }}
      style={{
        background: color,
        padding: "16px 14px 12px",
        boxShadow: "3px 4px 10px rgba(0,0,0,0.35)",
        position: "relative",
        ...style,
      }}
    >
      {/* Pin */}
      <div style={{
        position: "absolute",
        top: -13,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 4,
      }}>
        <svg width="22" height="28" viewBox="0 0 22 28">
          <circle cx="11" cy="10" r="8" fill={pinColor} stroke="rgba(0,0,0,0.4)" strokeWidth="1.5"/>
          <circle cx="9" cy="8" r="2.5" fill="rgba(255,255,255,0.25)"/>
          <line x1="11" y1="18" x2="11" y2="28" stroke="#3a2010" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      {children}
    </motion.div>
  );
}
