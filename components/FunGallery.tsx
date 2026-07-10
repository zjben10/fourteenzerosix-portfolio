"use client";
import { useState } from "react";
import Link from "next/link";
import {
  potteryCategories,
  type PotteryPiece,
  type PotteryCategory,
} from "@/lib/pottery";

function pieceCount(n: number) {
  return `${n} ${n === 1 ? "piece" : "pieces"}`;
}

export default function FunGallery({ pieces }: { pieces: PotteryPiece[] }) {
  // Both categories on by default (show everything)
  const [active, setActive] = useState<Set<PotteryCategory>>(
    () => new Set(potteryCategories.map((c) => c.label))
  );

  const toggle = (label: PotteryCategory) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const filtered = pieces.filter((p) => active.has(p.category));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--brand-cream)" }}>

      {/* ── Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(242,238,230,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(26,23,20,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            Zoei Benzon
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.45)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* ── Gallery ── */}
      <section className="pt-28 md:pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Title */}
          <h1
            className="font-bold tracking-tight mb-2"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", color: "var(--brand-dark)" }}
          >
            Pottery
          </h1>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-8"
            style={{ color: "rgba(26,23,20,0.4)" }}
          >
            {pieceCount(filtered.length)} · handmade ceramics
          </p>

          {/* Category toggles */}
          <div
            className="flex flex-wrap gap-2.5 mb-12"
            style={{ borderTop: "1px solid rgba(26,23,20,0.1)", paddingTop: "2rem" }}
          >
            {potteryCategories.map(({ label, emoji }) => {
              const on = active.has(label);
              return (
                <button
                  key={label}
                  onClick={() => toggle(label)}
                  aria-pressed={on}
                  className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border transition-colors duration-200"
                  style={
                    on
                      ? {
                          backgroundColor: "var(--brand-sage)",
                          color: "var(--brand-cream)",
                          borderColor: "var(--brand-sage)",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "rgba(26,23,20,0.55)",
                          borderColor: "rgba(26,23,20,0.15)",
                        }
                  }
                >
                  <span aria-hidden="true">{emoji}</span>
                  {label}
                </button>
              );
            })}
          </div>

          {/* Masonry — natural aspect ratios, newest first */}
          {filtered.length > 0 ? (
            <div className="columns-2 md:columns-4 gap-4 md:gap-6">
              {filtered.map((piece) => (
                <div
                  key={piece.id}
                  className="mb-4 md:mb-6 break-inside-avoid overflow-hidden group"
                >
                  <img
                    src={piece.image}
                    alt=""
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p
              className="text-sm py-16 text-center"
              style={{ color: "rgba(26,23,20,0.3)" }}
            >
              {pieces.length === 0
                ? "Photos coming soon."
                : "Pick a category to see pieces."}
            </p>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-12 px-6 md:px-12 mt-8"
        style={{ borderTop: "1px solid rgba(26,23,20,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="https://www.linkedin.com/in/zoeibenzon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.45)")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.45)")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to work
          </Link>
        </div>
      </footer>
    </div>
  );
}
