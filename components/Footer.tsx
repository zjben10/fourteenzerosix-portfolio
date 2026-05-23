"use client";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/zjbceramics" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zoeibenzon/" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto py-16 px-6 md:px-12"
      style={{ borderTop: "1px solid rgba(26,23,20,0.1)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Left */}
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase font-medium mb-2"
            style={{ color: "var(--brand-terracotta)" }}
          >
            fourteenzerosix studios
          </p>
          <p
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: "var(--brand-dark)", fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Let&apos;s work together.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <nav className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
                style={{ color: "rgba(26,23,20,0.45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-sage)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,23,20,0.45)")}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <p
            className="text-[10px] tracking-wider"
            style={{ color: "rgba(26,23,20,0.3)" }}
          >
            © {new Date().getFullYear()} Zoei Benzon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
