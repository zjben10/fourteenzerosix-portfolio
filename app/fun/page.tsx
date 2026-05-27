"use client";
import { useState } from "react";
import Link from "next/link";
import { pottery, potteryYears, type PotteryPiece } from "@/lib/pottery";

const ALL = "all";

function ImageCell({ piece }: { piece: PotteryPiece }) {
  return (
    <div className="group cursor-pointer">
      {/* Square image / placeholder */}
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio: "1" }}
      >
        {piece.image ? (
          <img
            src={piece.image}
            alt={piece.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(26,23,20,0.04)",
              border: "1px dashed rgba(26,23,20,0.15)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 40 40"
              fill="none"
              className="opacity-20"
            >
              <rect x="4" y="8" width="32" height="24" rx="2" stroke="#1A1714" strokeWidth="1.5" />
              <circle cx="14" cy="17" r="3" stroke="#1A1714" strokeWidth="1.5" />
              <path d="M4 28l8-6 6 5 6-8 12 9" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mt-2.5">
        <p
          className="text-sm font-medium leading-snug"
          style={{ color: "var(--brand-dark)" }}
        >
          {piece.title}
        </p>
        {piece.type && (
          <p
            className="text-[10px] tracking-[0.12em] uppercase mt-0.5"
            style={{ color: "rgba(26,23,20,0.4)" }}
          >
            {piece.type}
          </p>
        )}
      </div>
    </div>
  );
}

export default function FunPage() {
  const [activeYear, setActiveYear] = useState<string>(ALL);

  const filtered =
    activeYear === ALL
      ? pottery
      : pottery.filter((p) => p.year === activeYear);

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
            fourteenzerosix
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

      {/* ── Hero — full-bleed image placeholder ── */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          minHeight: "75vh",
          paddingTop: "64px", /* clear fixed nav */
          backgroundColor: "rgba(26,23,20,0.04)",
          borderBottom: "1px dashed rgba(26,23,20,0.12)",
        }}
      >
        <div className="text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="mx-auto mb-3 opacity-20"
          >
            <rect x="4" y="8" width="32" height="24" rx="2" stroke="#1A1714" strokeWidth="1.5" />
            <circle cx="14" cy="17" r="3" stroke="#1A1714" strokeWidth="1.5" />
            <path d="M4 28l8-6 6 5 6-8 12 9" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(26,23,20,0.25)" }}
          >
            Hero image
          </p>
        </div>
      </div>

      {/* ── Gallery ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Year toggles */}
          <div className="flex flex-wrap gap-2 mb-12">
            {/* All */}
            <button
              onClick={() => setActiveYear(ALL)}
              className="text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-200"
              style={
                activeYear === ALL
                  ? { backgroundColor: "var(--brand-sage)", color: "rgba(242,238,230,0.95)", border: "1px solid var(--brand-sage)" }
                  : { backgroundColor: "transparent", color: "rgba(26,23,20,0.4)", border: "1px solid rgba(26,23,20,0.15)" }
              }
            >
              All
            </button>

            {potteryYears.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className="text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={
                  activeYear === year
                    ? { backgroundColor: "var(--brand-sage)", color: "rgba(242,238,230,0.95)", border: "1px solid var(--brand-sage)" }
                    : { backgroundColor: "transparent", color: "rgba(26,23,20,0.4)", border: "1px solid rgba(26,23,20,0.15)" }
                }
              >
                {year}
              </button>
            ))}
          </div>

          {/* 4-column image grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((piece) => (
              <ImageCell key={piece.id} piece={piece} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              className="text-sm py-16 text-center"
              style={{ color: "rgba(26,23,20,0.3)" }}
            >
              Nothing here yet.
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
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            fourteenzerosix studios
          </span>
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
