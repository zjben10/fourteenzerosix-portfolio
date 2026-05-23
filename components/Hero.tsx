export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 pt-32">
      <div className="max-w-7xl mx-auto w-full">
        {/* Label */}
        <p
          className="text-xs tracking-[0.3em] uppercase font-medium mb-6 md:mb-8"
          style={{ color: "var(--brand-terracotta)" }}
        >
          Gen Marketer
        </p>

        {/* Name — reduced from 14vw/13rem */}
        <h1
          className="font-bold leading-[0.9] tracking-tight mb-10 md:mb-14"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(3rem, 8.5vw, 8rem)",
            color: "var(--brand-dark)",
          }}
        >
          Zoei
          <br />
          Benzon
        </h1>

        {/* Divider + descriptor */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ borderTop: "1px solid rgba(26,23,20,0.15)", paddingTop: "2rem" }}
        >
          <p
            className="text-sm md:text-base leading-relaxed max-w-sm"
            style={{ color: "rgba(26,23,20,0.55)" }}
          >
            Strategic marketing across brand, content, and digital — built to connect and convert.
          </p>
          {/* Green arrow: sage = forward direction / progress in UX color theory */}
          <a
            href="#work"
            className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase font-medium group"
            style={{ color: "var(--brand-dark)" }}
          >
            View Work
            <span
              className="inline-block w-8 h-px transition-all duration-300 group-hover:w-12"
              style={{ backgroundColor: "var(--brand-sage)" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
