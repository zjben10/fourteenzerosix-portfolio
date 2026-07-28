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
          <div className="space-y-4 max-w-2xl">
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(26,23,20,0.7)" }}
            >
              I&apos;m a marketer who has spent the last 10 years in B2B SaaS in
              demand generation, brand, and field marketing. I&apos;ve previously
              worked across biotechnology, UX research, healthcare, and education
              industries.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(26,23,20,0.7)" }}
            >
              My professional past lives have been driven by curiosity. I&apos;ve
              been lucky to work in roles across the marketing org from growth,
              product, customer, event, and marketing ops. In doing so, I&apos;ve
              gained the systems-level knowledge to bring ideas to fruition and
              rapid iteration.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(26,23,20,0.7)" }}
            >
              I&apos;ve always been a creative at heart. As a part-time potter,
              I&apos;m at the pottery studio on the side perfecting my craft for
              the perfectly imperfect kyusu teapot.
            </p>
          </div>
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
