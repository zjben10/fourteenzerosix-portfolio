"use client";
import { pottery, potteryYears, type PotteryPiece } from "@/lib/pottery";

function PotteryRow({ piece }: { piece: PotteryPiece }) {
  return (
    <div
      className="grid grid-cols-[1fr_2rem] md:grid-cols-[1fr_1fr_2rem] gap-x-6 md:gap-x-10 py-8 md:py-10 items-start group cursor-default"
      style={{ borderTop: "1px solid rgba(242,238,230,0.12)" }}
    >
      {/* Title + type tag */}
      <div>
        <h3
          className="text-xl md:text-2xl font-semibold leading-snug mb-2 transition-opacity group-hover:opacity-70"
          style={{ color: "rgba(242,238,230,0.95)" }}
        >
          {piece.title}
        </h3>
        {piece.type && (
          <span
            className="inline-block text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full border"
            style={{
              borderColor: "rgba(242,238,230,0.25)",
              color: "rgba(242,238,230,0.55)",
            }}
          >
            {piece.type.toUpperCase()}
          </span>
        )}
        {/* Description on mobile */}
        {piece.description && (
          <p
            className="mt-3 text-sm leading-relaxed md:hidden"
            style={{ color: "rgba(242,238,230,0.65)" }}
          >
            {piece.description}
          </p>
        )}
      </div>

      {/* Description on desktop */}
      <p
        className="hidden md:block text-sm leading-relaxed"
        style={{ color: "rgba(242,238,230,0.65)" }}
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
          className="fun-arrow transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

export default function Fun() {
  const grouped = potteryYears.reduce(
    (acc, year) => {
      acc[year] = pottery.filter((p) => p.year === year);
      return acc;
    },
    {} as Record<string, PotteryPiece[]>
  );

  return (
    <section
      id="fun"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--brand-sage)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p
            className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
            style={{ color: "rgba(242,238,230,0.55)" }}
          >
            Just for fun
          </p>
          <h2
            className="text-3xl md:text-5xl font-semibold leading-tight"
            style={{ color: "rgba(242,238,230,0.95)" }}
          >
            Clay &amp; ceramics.
          </h2>
        </div>

        {/* Year sections */}
        {potteryYears.map((year) => {
          const pieces = grouped[year];
          if (!pieces || pieces.length === 0) return null;
          return (
            <div key={year} id={`fun-${year}`} className="mb-16 md:mb-20 last:mb-0">
              {/* Year label */}
              <p
                className="text-xs tracking-[0.3em] uppercase font-medium mb-2"
                style={{ color: "rgba(242,238,230,0.45)" }}
              >
                {year}
              </p>

              {/* Pieces */}
              <div>
                {pieces.map((piece) => (
                  <PotteryRow key={piece.id} piece={piece} />
                ))}
                <div style={{ borderTop: "1px solid rgba(242,238,230,0.12)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
