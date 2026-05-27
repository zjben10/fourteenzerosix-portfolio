"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FUN_YEARS = ["2022", "2023", "2024", "2026"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [funOpen, setFunOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(242, 238, 230, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,23,20,0.08)" : "none",
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

        <nav className="flex items-center gap-8">
          {/* Work */}
          <a
            href="/#work"
            className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.5)")}
          >
            Work
          </a>

          {/* Fun — with year dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFunOpen(true)}
            onMouseLeave={() => setFunOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
              style={{ color: funOpen ? "var(--brand-sage)" : "rgba(26,23,20,0.5)" }}
            >
              Fun
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                className="transition-transform duration-200"
                style={{ transform: funOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path
                  d="M1.5 3L4.5 6L7.5 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="absolute top-full right-0 mt-2 py-1 min-w-[72px] transition-all duration-200"
              style={{
                backgroundColor: "var(--brand-dark)",
                border: "1px solid rgba(242,238,230,0.08)",
                pointerEvents: funOpen ? "auto" : "none",
                opacity: funOpen ? 1 : 0,
                transform: funOpen ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              {FUN_YEARS.map((year) => (
                <a
                  key={year}
                  href={`/#fun-${year}`}
                  className="block px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{ color: "rgba(242,238,230,0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,238,230,0.5)")}
                  onClick={() => setFunOpen(false)}
                >
                  {year}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <a
            href="/#contact"
            className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.5)")}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
