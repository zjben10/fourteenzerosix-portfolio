"use client";
import { useState } from "react";
import Link from "next/link";
import { pottery, potteryYears, type PotteryPiece } from "@/lib/pottery";

function PotteryRow({ piece }: { piece: PotteryPiece }) {
  return (
    <div
      className="grid grid-cols-[1fr_2rem] md:grid-cols-[1fr_1fr_2rem] gap-x-6 md:gap-x-10 py-8 md:py-10 items-start group"
      style={{ borderTop: "1px solid rgba(26,23,20,0.08)" }}
    >
      {/* Title + type tag */}
      <div>
        <h3
          className="text-xl md:text-2xl font-semibold leading-snug mb-2 transition-opacity group-hover:opacity-60"
          style={{ color: "var(--brand-dark)" }}
        >
          {piece.title}
        </h3>
        {piece.type && (
          <span
            className="inline-block text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full border"
            style={{
              borderColor: "var(--brand-sage)",
              color: "var(--brand-sage)",
            }}
          >
            {piece.type.toUpperCase()}
          </span>
        )}
        {piece.description && (
          <p
            className="mt-3 text-sm leading-relaxed md:hidden"
            style={{ color: "rgba(26,23,20,0.55)" }}
          >
            {piece.description}
          </p>
        )}
      </div>

      {/* Description desktop */}
      <p
        className="hidden md:block text-sm leading-relaxed"
        style={{ color: "rgba(26,23,20,0.55)" }}
      >
        {piece.description}
      </p>

      {/* Arrow */}
      <div className="flex items-start justify-end pt-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "rgba(26,23,20,0.2)" }}
        >
          <path
            d="M3 15L15 3M15 3H6M15 3V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function FunPage() {
  const [activeYear, setActiveYear] = useState<string>(potteryYears[0]);
  const filtered = pottery.filter((p) => p.year === activeYear);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--brand-cream)" }}>

      {/* ── Fixed nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(93,122,85,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(242,238,230,0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "rgba(242,238,230,0.75)" }}
          >
            fourteenzerosix
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-60"
            style={{ color: "rgba(242,238,230,0.6)" }}
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

      {/* ── Hero ── */}
      <section
        className="px-6 md:px-12 pt-36 pb-20 flex flex-col justify-end"
        style={{
          backgroundColor: "var(--brand-sage)",
          minHeight: "55vh",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p
            className="text-xs tracking-[0.3em] uppercase font-medium mb-6 md:mb-8"
            style={{ color: "rgba(242,238,230,0.55)" }}
          >
            Just for fun
          </p>

          <h1
            className="font-bold leading-[0.9] tracking-tight mb-10 md:mb-14"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(3rem, 8.5vw, 8rem)",
              color: "rgba(242,238,230,0.95)",
            }}
          >
            Clay &amp;
            <br />
            ceramics.
          </h1>

          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            style={{ borderTop: "1px solid rgba(242,238,230,0.2)", paddingTop: "2rem" }}
          >
            <p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: "rgba(242,238,230,0.6)" }}
            >
              Started throwing in 2022. Still centering the clay.
            </p>
            <a
              href="https://www.instagram.com/zjbceramics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase font-medium group"
              style={{ color: "rgba(242,238,230,0.8)" }}
            >
              @zjbceramics
              <span
                className="inline-block h-px transition-all duration-300 group-hover:w-12"
                style={{ width: "2rem", backgroundColor: "rgba(242,238,230,0.5)" }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "var(--brand-cream)" }}>
        <div className="max-w-7xl mx-auto">

          {/* Year toggles */}
          <div className="flex flex-wrap gap-2 mb-14">
            {potteryYears.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className="text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={
                  activeYear === year
                    ? {
                        backgroundColor: "var(--brand-sage)",
                        color: "rgba(242,238,230,0.95)",
                        border: "1px solid var(--brand-sage)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(26,23,20,0.4)",
                        border: "1px solid rgba(26,23,20,0.15)",
                      }
                }
              >
                {year}
              </button>
            ))}
          </div>

          {/* Pieces */}
          <div>
            {filtered.map((piece) => (
              <PotteryRow key={piece.id} piece={piece} />
            ))}
            <div style={{ borderTop: "1px solid rgba(26,23,20,0.08)" }} />
          </div>

          {filtered.length === 0 && (
            <p
              className="text-sm py-12"
              style={{ color: "rgba(26,23,20,0.35)" }}
            >
              Nothing here yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-12 px-6 md:px-12"
        style={{ borderTop: "1px solid rgba(26,23,20,0.1)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            fourteenzerosix studios
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-60"
            style={{ color: "rgba(26,23,20,0.4)" }}
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
