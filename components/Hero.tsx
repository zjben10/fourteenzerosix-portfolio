"use client";
import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import faviconPhoto from "@/app/icon.jpg";

const pills = [
  { label: "Work", href: "/#work", emoji: "💻" },
  { label: "Fun", href: "/fun", emoji: "🏺" },
];

/* 35mm film frame — sprocket-hole strip, stock label, hand-caption */
function FilmFrame() {
  return (
    <figure
      className="w-full max-w-md rounded-md overflow-hidden select-none"
      style={{ backgroundColor: "var(--brand-dark)", padding: "0.85rem" }}
    >
      {/* Top sprocket row */}
      <div
        aria-hidden="true"
        style={{
          height: "10px",
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(0,0,0,0.6) 0 8px, transparent 8px 16px)",
        }}
      />

      {/* Top labels */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase py-2">
        <span style={{ color: "#C9A25E" }}>01</span>
        <span style={{ color: "rgba(242,238,230,0.5)" }}>Gold 200</span>
      </div>

      {/* Photo with film treatment */}
      <div className="relative overflow-hidden">
        <Image
          src={faviconPhoto}
          alt="Zoei tucked inside a boulder in the desert"
          placeholder="blur"
          sizes="(max-width: 1024px) 90vw, 28rem"
          className="block w-full h-auto"
          style={{ filter: "contrast(1.06) saturate(1.08) sepia(0.06) brightness(1.02)" }}
        />
        {/* Warm film cast */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(61,32,16,0.28) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(201,162,94,0.08)", mixBlendMode: "overlay" }}
        />
      </div>

      {/* Bottom labels */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase py-2">
        <span style={{ color: "rgba(242,238,230,0.85)" }}>Zoei Benzon</span>
        <span style={{ color: "rgba(242,238,230,0.5)" }}>Feb &rsquo;23</span>
      </div>

      {/* Bottom sprocket row */}
      <div
        aria-hidden="true"
        style={{
          height: "10px",
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(0,0,0,0.6) 0 8px, transparent 8px 16px)",
        }}
      />
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-28 md:pt-32 pb-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left — intro */}
          <div>
            {/* Name */}
            <h1
              className="font-bold leading-[0.95] tracking-tight mb-4"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                color: "var(--brand-dark)",
              }}
            >
              Hey, I&apos;m Zoei{" "}
              <Image
                src="/images/croissant-zoei.png"
                alt=""
                width={500}
                height={432}
                aria-hidden="true"
                className="inline-block w-12 md:w-16 h-auto align-middle"
              />
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

          {/* Right — film frame */}
          <div className="flex justify-center lg:justify-end">
            <FilmFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
