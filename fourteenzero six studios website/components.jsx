/* global React, POTTERY, POTTERY_FILTERS, MARKETING, PROCESS, MARQUEE_WORDS */
const { useState, useEffect, useRef, useMemo } = React;

// ---------- placeholder (warm-tan striped SVG with a monospace tag) ----------
function Placeholder({ label, color, ratio }) {
  return (
    <div
      className="placeholder"
      style={{ ["--ph-bg"]: color || "var(--tan)", aspectRatio: ratio || "auto" }}
    >
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, mixBlendMode: "multiply" }}>
        <ellipse cx="100" cy="170" rx="58" ry="62" fill="#232323" />
        <ellipse cx="100" cy="110" rx="36" ry="14" fill="#232323" />
        <path d="M64 112 L70 168 Q72 232 100 232 Q128 232 130 168 L136 112 Z" fill="#232323" />
      </svg>
      <span className="placeholder__label">{label}</span>
    </div>
  );
}

// ---------- hero vessel SVG (silhouette) ----------
function HeroVessel() {
  return (
    <svg className="hero__vessel" viewBox="0 0 300 400" aria-hidden="true">
      <defs>
        <linearGradient id="vg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"  stopColor="#A56435" />
          <stop offset="55%" stopColor="#8c5028" />
          <stop offset="100%" stopColor="#6F5950" />
        </linearGradient>
        <radialGradient id="vs" cx="0.32" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#E7C69E" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#E7C69E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M120 30 Q150 18 180 30 L186 70 Q210 88 218 142 Q230 220 200 320 Q188 372 150 380 Q112 372 100 320 Q70 220 82 142 Q90 88 114 70 Z"
        fill="url(#vg)"
      />
      <path
        d="M120 30 Q150 18 180 30 L186 70 Q210 88 218 142 Q230 220 200 320 Q188 372 150 380 Q112 372 100 320 Q70 220 82 142 Q90 88 114 70 Z"
        fill="url(#vs)"
      />
      <ellipse cx="150" cy="30" rx="32" ry="6" fill="#3b2316" />
    </svg>
  );
}

// ---------- nav ----------
function Nav({ onCommission, openSplit }) {
  return (
    <nav className="nav" data-comment-anchor="nav">
      <a href="#top" className="nav__brand">
        <span className="dot" />
        fourteenzerosix <small>studios</small>
      </a>
      <div className="nav__links">
        <a href="#pottery">Pottery</a>
        <a href="#marketing">Marketing</a>
        <a href="#about">About</a>
        <span className="nav__status"><span className="pulse" /> open · spring ‘26</span>
        <button className="btn btn--primary nav__cta" onClick={onCommission}>
          Commission <span className="arrow">→</span>
        </button>
      </div>
    </nav>
  );
}

// ---------- hero ----------
function Hero({ heroOffset }) {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero__meta">
        <div />
        <div className="small" style={{ textAlign: "right" }}>
          41.9228° N<br />
          87.7079° W
        </div>
      </div>

      <div className="hero__mark">
        <h1 className="hero__wordmark">
          fourteen<br />
          zero<em>six</em>
        </h1>
        <div className="hero__tag">
          <p className="lead" style={{ margin: 0 }}>
            Pottery made by hand and marketing made with care — both out of a small studio
            in <em style={{ fontFamily: "var(--display)" }}>Chicago</em>.
          </p>
          <div className="small" style={{ textAlign: "right", minWidth: 120 }}>
            Index ↘<br />
            01 / 06
          </div>
        </div>
        <div className="hero__bot">
          <div className="hero__scroll">
            <svg width="18" height="32" viewBox="0 0 18 32" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="16" height="30" rx="8" stroke="currentColor" />
              <circle cx="9" cy="9" r="2" fill="currentColor">
                <animate attributeName="cy" values="9;22;9" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span className="eyebrow muted">Scroll to explore</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#pottery" className="btn btn--secondary">View pottery <span className="arrow">→</span></a>
            <a href="#marketing" className="btn btn--ghost">Marketing work <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- marquee ----------
function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((w, i) => (
          <React.Fragment key={i}>
            <span dangerouslySetInnerHTML={{ __html: w }} />
            <span className="star">✶</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ---------- about ----------
function About() {
  return (
    <section className="section" id="about" data-screen-label="02 About">
      <div className="section-label"><span className="bar" /> 02 — About</div>
      <div className="about">
        <div className="about__col">
          <div className="eyebrow muted" style={{ marginBottom: 16 }}>The studio</div>
          <h2 className="h2">
            Handcrafted with <em style={{ fontFamily: "var(--display)", color: "var(--terracotta)" }}>intention</em> in Chicago.
          </h2>
          <p className="body" style={{ marginTop: 28 }}>
            Every piece from fourteenzerosix studios is thoughtfully created, celebrating the
            natural imperfections that make handmade pottery unique. The work embraces organic
            textures and warm earth tones — connecting us to ancient craft traditions while
            living comfortably in a modern kitchen.
          </p>
          <p className="body">
            On the other side of the studio, I run brand &amp; marketing work for small makers:
            studios, food producers, and other one- or two-person operations who want to talk to
            their people without the corporate gloss.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <a href="#contact" className="btn btn--primary">Get in touch <span className="arrow">→</span></a>
            <a href="#process" className="btn btn--secondary">See the process</a>
          </div>
        </div>
        <div className="about__col">
          <Placeholder label="studio portrait · 4:5" ratio="4 / 5" color="var(--tan)" />
          <dl style={{ marginTop: 40 }}>
            <div className="label-row"><dt>Founded</dt><dd>2021, Logan Square</dd></div>
            <div className="label-row"><dt>Disciplines</dt><dd>Wheel-thrown stoneware · Brand &amp; marketing</dd></div>
            <div className="label-row"><dt>Clients</dt><dd>Small makers, food &amp; bev, independent studios</dd></div>
            <div className="label-row"><dt>Press</dt><dd>Sight Unseen, Cereal, Kinfolk (forthcoming)</dd></div>
            <div className="label-row"><dt>Currently</dt><dd>Taking commissions for spring ’26</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

// ---------- pottery ----------
function Pottery({ density }) {
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () => filter === "All" ? POTTERY : POTTERY.filter(p => String(p.year) === filter),
    [filter]
  );
  return (
    <section className="section" id="pottery" data-screen-label="03 Pottery">
      <div className="section-label"><span className="bar" /> 03 — Pottery</div>
      <div className="pottery__head">
        <div>
          <div className="eyebrow muted" style={{ marginBottom: 14 }}>Current collection</div>
          <h2 className="h2" style={{ maxWidth: "14ch" }}>
            Vessels for <em style={{ fontFamily: "var(--display)", color: "var(--terracotta)" }}>everyday</em> ritual.
          </h2>
        </div>
        <div style={{ display: "grid", gap: 16, justifyItems: "end" }}>
          <div className="small" style={{ maxWidth: 320, textAlign: "right" }}>
            Sixteen pieces in the kiln this season. Each is one-of-one — close cousins, not copies.
          </div>
          <div className="filter-row">
            {POTTERY_FILTERS.map(f => (
              <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="pottery__grid" data-density={density}>
        {items.map(p => <Piece key={p.id} piece={p} />)}
      </div>
    </section>
  );
}

function Piece({ piece }) {
  return (
    <article className="piece" data-comment-anchor={`piece-${piece.id}`}>
      <div className="piece__media">
        <Placeholder label={`${piece.id} · ${piece.form.toLowerCase()}`} color={piece.color} />
        {piece.badge && (
          <span className={`piece__badge ${piece.badge}`}>{piece.badge}</span>
        )}
        <div className="piece__overlay">
          <div>
            <div className="eyebrow tan" style={{ marginBottom: 6 }}>{piece.form2}</div>
            <div className="small" style={{ color: "rgba(247,249,248,0.85)" }}>{piece.dimensions} · {piece.glaze}</div>
          </div>
          <span className="piece__price" style={{ color: "var(--tan)" }}>{piece.price}</span>
        </div>
      </div>
      <div className="piece__meta">
        <div>
          <div className="piece__title">{piece.name}</div>
          <div className="piece__sub">{piece.glaze} · {piece.year}</div>
        </div>
        <span className="piece__price">{piece.price}</span>
      </div>
    </article>
  );
}

// ---------- marketing ----------
function Marketing() {
  return (
    <section className="section section--dark" id="marketing" data-screen-label="04 Marketing">
      <div className="section-label"><span className="bar" /> 04 — Marketing &amp; brand</div>
      <div className="case__head">
        <div>
          <div className="eyebrow tan" style={{ marginBottom: 14 }}>Selected work</div>
          <h2 className="h2" style={{ color: "var(--cream)" }}>
            Brand &amp; marketing for <em style={{ fontFamily: "var(--display)", color: "var(--tan)" }}>small</em> teams.
          </h2>
        </div>
        <div style={{ maxWidth: 360 }}>
          <p className="body" style={{ color: "rgba(247,249,248,0.78)" }}>
            Strategy, identity, and lifecycle work for studios and indie makers. I take 4–6 projects a year
            and stay close to the work the whole way through.
          </p>
        </div>
      </div>
      <div className="case-list" style={{ borderColor: "rgba(247,249,248,0.15)" }}>
        {MARKETING.map(m => <Case key={m.id} item={m} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40 }}>
        <div className="small">Booking new work for Q3 2026.</div>
        <a href="#contact" className="btn" style={{ background: "var(--tan)", color: "var(--ink)" }}>
          Start a project <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

function Case({ item }) {
  return (
    <article className="case" data-comment-anchor={`case-${item.id}`} style={{ borderColor: "rgba(247,249,248,0.15)" }}>
      <div className="case__year" style={{ color: "var(--tan)" }}>{item.year}</div>
      <div>
        <h3 className="case__title" style={{ color: "var(--cream)" }}>{item.title}</h3>
        <div className="case__client" style={{ color: "rgba(247,249,248,0.6)" }}>{item.client} · {item.role}</div>
        <div className="case__tags">
          {item.tags.map(t => (
            <span key={t} className="case__tag" style={{ color: "rgba(247,249,248,0.7)", borderColor: "rgba(247,249,248,0.25)" }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="case__blurb" style={{ color: "rgba(247,249,248,0.8)" }}>
        {item.blurb}
        <div className="eyebrow tan" style={{ marginTop: 12 }}>{item.metric}</div>
      </div>
      <div className="case__arrow" style={{ color: "var(--tan)" }}>↗</div>
    </article>
  );
}

// ---------- process ----------
function ProcessSection() {
  return (
    <section className="section section--dark" id="process" data-screen-label="05 Process" style={{ paddingTop: 0 }}>
      <div className="section-label"><span className="bar" /> 05 — Process</div>
      <div className="case__head" style={{ marginBottom: 40 }}>
        <div>
          <div className="eyebrow tan" style={{ marginBottom: 14 }}>From clay to kiln</div>
          <h2 className="h2" style={{ color: "var(--cream)" }}>
            Four steps, fourteen <em style={{ fontFamily: "var(--display)", color: "var(--tan)" }}>hours</em>, one pair of hands.
          </h2>
        </div>
        <div style={{ maxWidth: 360 }}>
          <p className="body" style={{ color: "rgba(247,249,248,0.78)" }}>
            Every piece passes through the same four steps. The kiln does the last 30%.
          </p>
        </div>
      </div>
      <div className="process">
        {PROCESS.map(s => (
          <div className="process__step" key={s.num}>
            <span className="process__num">{s.num}</span>
            <div className="process__name">{s.name}</div>
            <div className="process__desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- contact ----------
function Contact() {
  return (
    <section className="section section--dark" id="contact" data-screen-label="05 Contact">
      <div className="section-label"><span className="bar" /> 05 — Contact</div>
      <div className="contact__head">
        <div className="eyebrow tan" style={{ marginBottom: 14 }}>Get in touch</div>
        <h2 className="h2" style={{ color: "var(--cream)" }}>
          Let's make something <em style={{ fontFamily: "var(--display)", color: "var(--tan)" }}>together</em>.
        </h2>
        <p className="lead" style={{ color: "rgba(247,249,248,0.78)", maxWidth: 560, marginTop: 28 }}>
          Pottery commissions, brand &amp; marketing projects, press, or studio visits —
          the fastest way to reach me is wherever you already are.
        </p>
      </div>
      <div className="contact__cta-row">
        <a className="contact__cta" href="mailto:hello@fourteenzerosix.studio">
          <span className="contact__cta-eyebrow">Email</span>
          <span className="contact__cta-handle">hello@fourteenzerosix.studio</span>
          <span className="contact__cta-arrow">↗</span>
        </a>
        <a className="contact__cta" href="https://instagram.com" target="_blank" rel="noreferrer">
          <span className="contact__cta-eyebrow">Instagram</span>
          <span className="contact__cta-handle">@fourteenzerosixstudios</span>
          <span className="contact__cta-arrow">↗</span>
        </a>
        <a className="contact__cta" href="https://linkedin.com" target="_blank" rel="noreferrer">
          <span className="contact__cta-eyebrow">LinkedIn</span>
          <span className="contact__cta-handle">/in/fourteenzerosix</span>
          <span className="contact__cta-arrow">↗</span>
        </a>
      </div>
    </section>
  );
}

// ---------- footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div>fourteenzerosix studios · made with love in Chicago</div>
      <div>© 2026 · all pieces one-of-one</div>
    </footer>
  );
}

// ---------- split-landing variant ----------
function SplitLanding({ onPick }) {
  return (
    <section className="split-landing" data-screen-label="00 Split landing">
      <div className="split-landing__half pottery" onClick={() => { window.location.href = "pottery.html"; }}>
        <div className="meta">
          <span>01 — Pottery</span>
          <span />
        </div>
        <div>
          <div className="eyebrow tan">fourteenzerosix studios</div>
          <h2 className="h2" style={{ color: "var(--cream)", marginTop: 14, maxWidth: "16ch" }}>
            Hand-thrown stoneware, one piece at a <em style={{ fontFamily: "var(--display)" }}>time</em>.
          </h2>
          <p className="body" style={{ maxWidth: 380, color: "rgba(247,249,248,0.85)", marginTop: 18 }}>
            Wheel-thrown vessels, mugs, bowls and vases — fired cone 10 in a Logan Square studio.
          </p>
        </div>
        <div className="meta">
          <span>Enter fourteenzerosix</span>
          <span className="glyph">→</span>
        </div>
      </div>
      <div className="split-landing__half marketing" onClick={() => { window.location.href = "zoei.html"; }}>
        <div className="meta">
          <span>02 — Marketing</span>
          <span />
        </div>
        <div>
          <div className="eyebrow tan">Zoei Benzon</div>
          <h2 className="h2" style={{ color: "var(--cream)", marginTop: 14, maxWidth: "16ch" }}>
            Brand &amp; marketing for <em style={{ fontFamily: "var(--display)" }}>small</em> teams.
          </h2>
          <p className="body" style={{ maxWidth: 380, color: "rgba(247,249,248,0.85)", marginTop: 18 }}>
            Strategy, identity, and lifecycle work for studios and independent makers.
          </p>
        </div>
        <div className="meta">
          <span>See projects</span>
          <span className="glyph">→</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Nav, Hero, Marquee, About, Pottery, Marketing, ProcessSection, Contact, Footer, SplitLanding,
});
