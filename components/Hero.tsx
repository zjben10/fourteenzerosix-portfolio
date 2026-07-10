"use client";
import type { MouseEvent } from "react";
import Link from "next/link";

const pills = [
  {
    label: "Work",
    href: "/#work",
    icon: (
      <path d="M4 6.5h10M4 6.5v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6M6.5 6.5v-1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1" />
    ),
  },
  {
    label: "Fun",
    href: "/fun",
    icon: (
      <path d="M9 14.5A5.5 5.5 0 1 0 9 3.5a5.5 5.5 0 0 0 0 11ZM6.8 7.5h.01M11.2 7.5h.01M6.5 10.5s.9 1.2 2.5 1.2 2.5-1.2 2.5-1.2" />
    ),
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: (
      <path d="M3.5 5.5h11v7h-11v-7ZM3.5 6l5.5 4 5.5-4" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zoeibenzon/",
    external: true,
    icon: (
      <path d="M5 7.5v4M5 5.5v.01M8 11.5v-4M8 9c0-1 .7-1.5 1.5-1.5S11 8 11 9v2.5M8 11.5H8" />
    ),
  },
];

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-28 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Name */}
        <h1
          className="font-bold leading-[0.95] tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "var(--brand-dark)",
          }}
        >
          Zoei Benzon
        </h1>

        {/* Descriptor */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mb-2"
          style={{ color: "rgba(26,23,20,0.7)" }}
        >
          Strategic marketing across brand, content, and digital.
        </p>
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: "rgba(26,23,20,0.4)" }}
        >
          Projects I&apos;ve built &amp; launched, below.
        </p>

        {/* Pill nav */}
        <nav
          className="mt-8 flex flex-wrap gap-2.5"
          style={{ borderTop: "1px solid rgba(26,23,20,0.1)", paddingTop: "2rem" }}
        >
          {pills.map((pill) => {
            const inner = (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {pill.icon}
                </svg>
                {pill.label}
              </>
            );
            const className =
              "inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border transition-colors duration-200";
            const style = {
              borderColor: "rgba(26,23,20,0.15)",
              color: "rgba(26,23,20,0.7)",
            };
            const onEnter = (e: MouseEvent<HTMLElement>) => {
              e.currentTarget.style.color = "var(--brand-sage)";
              e.currentTarget.style.borderColor = "var(--brand-sage)";
            };
            const onLeave = (e: MouseEvent<HTMLElement>) => {
              e.currentTarget.style.color = "rgba(26,23,20,0.7)";
              e.currentTarget.style.borderColor = "rgba(26,23,20,0.15)";
            };

            return pill.external ? (
              <a
                key={pill.label}
                href={pill.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={pill.label}
                href={pill.href}
                className={className}
                style={style}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {inner}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
