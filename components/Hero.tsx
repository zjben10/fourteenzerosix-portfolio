"use client";
import type { MouseEvent } from "react";
import Link from "next/link";

const pills = [
  { label: "Work", href: "/#work", emoji: "💻" },
  { label: "Fun", href: "/fun", emoji: "🏺" },
];

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-28 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Intro */}
        <div>
          {/* Name */}
          <h1
            className="font-bold leading-[0.95] tracking-tight mb-4"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              color: "var(--brand-dark)",
            }}
          >
            Hey, I&apos;m Zoei <span aria-hidden="true">👋</span>
          </h1>

          {/* Descriptor */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl mb-1.5"
            style={{ color: "rgba(26,23,20,0.7)" }}
          >
            Strategic marketing across demand gen, brand, and field marketing.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(26,23,20,0.4)" }}
          >
            I&apos;ve previously worked in biotechnology, UX research, healthcare, and education.
          </p>
        </div>

        {/* Pill nav */}
        <nav
          className="mt-8 flex flex-wrap gap-2.5"
          style={{ borderTop: "1px solid rgba(26,23,20,0.1)", paddingTop: "2rem" }}
        >
          {pills.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border transition-colors duration-200"
              style={{ borderColor: "rgba(26,23,20,0.15)", color: "rgba(26,23,20,0.7)" }}
              onMouseEnter={(e: MouseEvent<HTMLElement>) => {
                e.currentTarget.style.color = "var(--brand-sage)";
                e.currentTarget.style.borderColor = "var(--brand-sage)";
              }}
              onMouseLeave={(e: MouseEvent<HTMLElement>) => {
                e.currentTarget.style.color = "rgba(26,23,20,0.7)";
                e.currentTarget.style.borderColor = "rgba(26,23,20,0.15)";
              }}
            >
              <span aria-hidden="true">{pill.emoji}</span>
              {pill.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
