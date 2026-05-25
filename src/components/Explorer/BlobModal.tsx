"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBytes } from "@/lib/utils";
import type { BlobInfo } from "@/types";

interface BlobModalProps {
  blob: BlobInfo | null;
  onClose: () => void;
}

const BLOB_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCDrB3Jd3hB50FV10zgL9B2wvI42IcD0PxGQkZzv8hqRtP3-rkpwPwWd9qtoSVoob_F4GeqKdWHH6gaXqxW_TsaHeBjze8PSC35YCO-lq9CBDiB0LGagGkcws80ZhBpg9LDz3ySgxcezKJ81JOQacO6usdsJIMkdMedsaX8C5UtHU0pSXvESvGmYuF5RlXGwDbuT78c-EvRD1OL4IzHxLP0w9Rje2HLyr7md-Ioq0ot3NgBK_5BN5b2-DhldcdFdf4RgbqggioA4aE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-rBXWSxxgVn2s9YfsYWYSh3sR_5IU6sokHA7efQxuq3yvv3LWKw_zyHS4YnhnhSW1OMUvLLKneGywY6dNXO3lvwIEgzKhGxHobE5l_N5eBpsxt7uJwjhDsuj_-KkGvt4puTYLLfdLmD3MRxo8TpGD1lIkh8ahIRdL5qYI6S13jh3fGGvBncqrDxT8GnfKA_HjNmA5ukcjGwr_IcEhwqW6ib6JDVJ5w9ryX_EPoBe78ANAT7MeBSUvELxIt-7w7TW1bmTv55S_exI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABv9w30XilXzgbQ3TP1_O_AEBfrPBM5uF3MHn09ohTGzQ76jXYDOP0-SeUNq2vPMOoh_qfvARQYXVb_QBLLkmbz2YpcFfwjEF_sLc8wHy0uZWjLwdpvS8YGd5V6B-RScdhQdVNZRWzUFhFbmrIbC92C3IrEvYNEo4si_B79DGq0FO_kpPXk-WhfqY1wYmsZAJARtu8n3OHp7PUoqR-MPXD7AMm3PJwIfnOHKIoWGpKJra-QIDraNZ38ufakE_ha8wCMbKYPV_K1d8",
];

function hashId(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const VERDICTS = ["OPEN CASE", "SOLVED", "ARCHIVED", "RED HERRING", "OF INTEREST"];
const VERDICT_COLORS = ["#ba1a1a", "#2e6b63", "#747878", "#9b4a1a", "#6f5a4a"];

export function BlobModal({ blob, onClose }: BlobModalProps) {
  const [copied, setCopied] = useState(false);

  if (!blob) return null;

  function copyId() {
    navigator.clipboard.writeText(blob!.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const h = hashId(blob.id);
  const imgSrc = BLOB_IMAGES[h % BLOB_IMAGES.length];
  const verdict = VERDICTS[h % VERDICTS.length];
  const verdictColor = VERDICT_COLORS[h % VERDICT_COLORS.length];
  const shortId = blob.id.slice(0, 12).toUpperCase();
  const walruscanId = blob.id.startsWith("0x") ? blob.id : `0x${blob.id}`;

  return (
    <AnimatePresence>
      {blob && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 300,
              background: "rgba(10,8,6,0.82)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 40, rotate: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", zIndex: 301,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(680px, 94vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--surface)",
              border: "4px solid var(--ink)",
              boxShadow: "12px 12px 0 0 rgba(0,0,0,0.8)",
            }}
          >
            {/* Header strip */}
            <div style={{
              background: "var(--ink)", color: "var(--tusk)",
              padding: "12px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div className="mono" style={{ fontSize: 9, opacity: 0.6, letterSpacing: "0.15em" }}>EVIDENCE ANALYSIS · REF #{shortId}</div>
                <div className="h-display" style={{ fontSize: 18, marginTop: 2 }}>BLOB DOSSIER</div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "var(--error)", color: "var(--tusk)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  padding: "4px 12px", cursor: "pointer",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                }}
              >✕ CLOSE</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {/* Left: image */}
              <div style={{ position: "relative", background: "#1a1510", minHeight: 220 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} alt="Evidence" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, mixBlendMode: "luminosity" }}/>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, transparent 60%, var(--surface))",
                }}/>
                {/* Verdict stamp */}
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  border: `3px solid ${verdictColor}`,
                  outline: `2px solid ${verdictColor}`,
                  outlineOffset: 3,
                  color: verdictColor,
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  transform: "rotate(-4deg)",
                  background: "rgba(255,255,255,0.94)",
                  boxShadow: `inset 0 0 0 1px ${verdictColor}`,
                }}>{verdict}</div>
              </div>

              {/* Right: details */}
              <div style={{ padding: "20px 20px 20px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="BLOB ID" value={blob.id} mono truncate/>
                <Field label="PUBLISHER" value={blob.publisher} mono truncate/>
                <Field label="FILE SIZE" value={formatBytes(blob.size)}/>
                <Field label="EVIDENCE TYPE" value={blob.storageType || "Unknown"}/>
                <Field label="DATE FILED" value={new Date(blob.timestamp * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}/>
                <Field label="ENCODING" value={blob.erasureCodeType || "RedStuff"}/>
              </div>
            </div>

            {/* Full blob ID section */}
            <div style={{ padding: "16px 20px", borderTop: "2px solid var(--ink)", background: "var(--paper-2)" }}>
              <div className="mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.12em", marginBottom: 6 }}>FULL EVIDENCE HASH</div>
              <div className="mono" style={{ fontSize: 11, wordBreak: "break-all", letterSpacing: "0.04em" }}>
                {blob.id}
              </div>
              {blob.digest && (
                <>
                  <div className="mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.12em", marginBottom: 6, marginTop: 12 }}>CONTENT DIGEST</div>
                  <div className="mono" style={{ fontSize: 11, wordBreak: "break-all", letterSpacing: "0.04em" }}>
                    {blob.digest}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div style={{
              padding: "14px 20px",
              borderTop: "2px solid var(--ink)",
              display: "flex", gap: 12, flexWrap: "wrap",
            }}>
              {/* UNSEAL — copies blob ID to clipboard */}
              <button
                onClick={copyId}
                style={{
                  padding: "10px 18px",
                  background: copied ? "var(--secondary)" : "var(--ink)", color: "var(--tusk)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  border: "2px solid var(--ink)",
                  borderBottom: "4px solid rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", gap: 6,
                  cursor: "pointer", transition: "background 0.2s",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  {copied ? "check" : "key"}
                </span>
                {copied ? "Copied!" : "Unseal"}
              </button>

              {/* ADD TO FILE — opens Walruscan */}
              <a
                href={`https://walruscan.com/blob/${walruscanId}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: "10px 18px",
                  background: "var(--paper-2)", color: "var(--ink)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none",
                  border: "2px solid var(--ink)",
                  borderBottom: "4px solid rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>book_2</span>
                Add to File
              </a>

              {/* View on Walruscan */}
              <a
                href={`https://walruscan.com/blob/${walruscanId}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: "10px 18px",
                  background: "transparent", color: "var(--ink)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none",
                  border: "2px dashed var(--ink)",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
                Walruscan
              </a>

              <button
                onClick={onClose}
                style={{
                  padding: "10px 18px",
                  background: "transparent", color: "var(--ink)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  border: "2px solid var(--ink)",
                  cursor: "pointer", marginLeft: "auto",
                }}
              >
                Close File
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, mono, truncate }: { label: string; value: string; mono?: boolean; truncate?: boolean }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.12em", marginBottom: 3 }}>{label}</div>
      <div style={{
        fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
        fontSize: mono ? 11 : 13,
        fontWeight: 700,
        wordBreak: truncate ? "break-all" : "normal",
        overflow: truncate ? "hidden" : "visible",
        display: truncate ? "-webkit-box" : "block",
        WebkitLineClamp: truncate ? 2 : undefined,
        WebkitBoxOrient: truncate ? "vertical" : undefined,
      } as React.CSSProperties}>{value}</div>
    </div>
  );
}
