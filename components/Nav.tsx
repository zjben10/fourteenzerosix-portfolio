"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
        <nav className="flex gap-8">
          <a
            href="/#work"
            className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            style={{ color: "rgba(26,23,20,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.5)")}
          >
            Work
          </a>
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
