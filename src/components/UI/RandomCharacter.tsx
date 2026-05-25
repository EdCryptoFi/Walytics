"use client";

import { useState, useEffect, type CSSProperties } from "react";

const CHARS = ["/way1.png", "/way2.png", "/way3.png", "/way4.png"];

interface RandomCharacterProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  alt?: string;
}

export function RandomCharacter({ width, height, style, alt = "Walytics Holmes" }: RandomCharacterProps) {
  const [src, setSrc] = useState(CHARS[0]);

  useEffect(() => {
    setSrc(CHARS[Math.floor(Math.random() * CHARS.length)]);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ width, height, objectFit: "contain", display: "block", ...style }}
    />
  );
}
