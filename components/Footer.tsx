const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:zoei@fourteenzerosix.com" },
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
          <a
            href="mailto:zoei@fourteenzerosix.com"
            className="inline-block mt-3 text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{ color: "var(--brand-dark)" }}
          >
            zoei@fourteenzerosix.com
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <nav className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs tracking-[0.15em] uppercase font-medium opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: "var(--brand-dark)" }}
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
