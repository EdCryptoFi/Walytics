"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface EvidenceCardProps {
  children: ReactNode;
  rotation?: number;       // degrees, default random ±1.5
  delay?: number;
  accent?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function EvidenceCard({
  children,
  rotation,
  delay = 0,
  accent = "var(--surface)",
  style,
  onClick,
}: EvidenceCardProps) {
  const rot = rotation ?? (Math.random() - 0.5) * 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: rot }}
      animate={{ opacity: 1, y: 0, rotate: rot }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        rotate: rot * 0.3,
        boxShadow: "10px 10px 0 0 rgba(0,0,0,0.75)",
        transition: { duration: 0.18 },
      }}
      onClick={onClick}
      style={{
        background: accent,
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 0 rgba(0,0,0,0.55)",
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
