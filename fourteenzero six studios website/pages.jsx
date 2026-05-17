/* global React, POTTERY, MARKETING */
const { useState, useMemo } = React;

// ---------- Placeholder (warm-tan striped SVG with monospace tag) ----------
function Placeholder({ label, color }) {
  return (
    <div className="placeholder" style={{ ["--ph-bg"]: color || "var(--tan)", width: "100%", height: "100%" }}>
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

// ============================================================
// POTTERY PAGE — fourteenzerosix studios
// ============================================================
const SPANS = [
  "col-7 wide", "col-5 sq",
  "col-4 port", "col-4 sq",   "col-4 tall",
  "col-6 wide", "col-6 sq",
  "col-3 tall", "col-5 sq",   "col-4 port",
  "col-8 wide", "col-4 tall",
  "col-4 sq",   "col-4 port", "col-4 sq",
  "col-12 wide",
];

function PotteryPage() {
  const [year, setYear] = useState("All");
  const years = ["All", "2026", "2024", "2023", "2022"];
  const items = useMemo(
    () => year === "All" ? POTTERY : POTTERY.filter(p => String(p.year) === year),
    [year]
  );
  return (
    <div className="pot">
      <header className="pot__nav">
        <a href="index.html" className="pageback">← Back</a>
        <a href="#top" className="pot__mark">
          <span className="dot" /> fourteenzerosix <small>studios</small>
        </a>
        <nav className="pot__navlinks">
          <a href="#work">Work</a>
          <a href="#bottom">Studio</a>
          <a href="https://instagram.com">Instagram ↗</a>
        </nav>
      </header>

      <section className="pot__hero" id="top">
        <h1>
          fourteen<br />
          zero<em>six</em><br />
          studios
        </h1>
        <div>
          <p>
            Hand-thrown stoneware made one piece at a time, out of a small Logan Square studio in Chicago.
            Vessels for the everyday — close cousins, never copies.
          </p>
          <div className="meta">
            <span>Est. <b>2021</b></span>
            <span>Firing <b>Cone 10 reduction</b></span>
            <span>Working <b>Stoneware &amp; porcelain</b></span>
            <span>Currently <b>Spring '26 collection</b></span>
          </div>
        </div>
      </section>

      <section className="pot__filters" id="work">
        <div className="label">Filter by year</div>
        <div className="filter-row">
          {years.map(y => (
            <button key={y} className="chip" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
        <div className="label">{items.length} piece{items.length === 1 ? "" : "s"}</div>
      </section>

      <section className="pot__gallery">
        {items.map((p, i) => (
          <article key={p.id} className={`pgi ${SPANS[i % SPANS.length]}`}>
            <Placeholder label={`${p.id} · ${p.form.toLowerCase()}`} color={p.color} />
            {p.badge && <span className={`piece__badge ${p.badge}`}>{p.badge}</span>}
            <div className="pgi-cap">
              <div>
                <div className="t">{p.name}</div>
                <div className="s">{p.glaze} · {p.dimensions} · {p.year}</div>
              </div>
              <div className="p">{p.price}</div>
            </div>
          </article>
        ))}
      </section>

      <section className="pot__bottom" id="bottom">
        <h2>
          One pair of <em>hands</em>, fourteen-hour firings, every piece logged.
        </h2>
        <div className="small">
          Wheel-thrown one at a time. Glazes hand-mixed from ash, iron and feldspar — most recipes are years deep.
          Studio visits by appointment, Thursday through Saturday.
        </div>
      </section>
    </div>
  );
}

// ============================================================
// ZOEI BENZON PAGE — marketing portfolio
// ============================================================
const SERVICES = [
  { num: "01", name: "Brand Strategy",  desc: "Positioning, naming, messaging frameworks, and brand systems for studios and indie makers.", tags: ["Positioning", "Naming", "Messaging", "Visual identity"] },
  { num: "02", name: "Marketing &amp; Lifecycle", desc: "Campaign concepting, paid social, email &amp; lifecycle programs designed around moments of intent.", tags: ["Campaigns", "CRM", "Paid", "Copy"] },
  { num: "03", name: "Launch &amp; Go-to-Market", desc: "End-to-end launch programs — site, sales kits, wholesale playbooks and onboarding for new channels.", tags: ["GTM", "DTC + Wholesale", "Site", "Decks"] },
];

const PRESS = [
  { yr: "2025", title: "On craft &amp; brand", pub: "Cereal Magazine" },
  { yr: "2024", title: "Small studios, big love", pub: "Sight Unseen" },
  { yr: "2024", title: "The slow brand", pub: "It's Nice That" },
  { yr: "2023", title: "Founders we love", pub: "Kinfolk (forthcoming)" },
];

function ZoeiPage() {
  return (
    <div className="z">
      <header className="z__nav">
        <a href="index.html" className="pageback" style={{ color: "var(--ink)" }}>← Back</a>
        <a href="#top" className="z__brand">
          <span className="dot" /> Zoei Benzon <small>brand &amp; marketing</small>
        </a>
        <nav className="z__navlinks">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="z__hero" id="top">
        <div>
          <div className="eyebrow">Brand &amp; marketing · Chicago</div>
          <h1>
            Hi, I'm <em>Zoei</em> — I help small makers and studios find their voice and grow without losing it.
          </h1>
          <div className="role">
            <span>Brand strategy</span>
            <span>Marketing</span>
            <span>Campaigns</span>
            <span>Lifecycle</span>
            <span>GTM</span>
          </div>
          <p>
            I run brand &amp; marketing for studios, food &amp; beverage producers, and other one- or
            two-person teams who want to talk to their people without the corporate gloss. I take
            four to six projects a year and stay close to the work the whole way through.
          </p>
          <div className="cta-row">
            <a href="#work" className="btn btn--primary">See selected work <span className="arrow">→</span></a>
            <a href="#contact" className="btn btn--secondary">Get in touch</a>
          </div>
        </div>
        <aside className="z__side">
          <div className="status"><span className="pulse" /> Open for Q3 ’26 projects</div>
          <div className="now">
            <h3>Currently</h3>
            <div className="row"><span>Building</span><b>Hearth &amp; Hand launch</b></div>
            <div className="row"><span>Reading</span><b>The Creative Act</b></div>
            <div className="row"><span>Listening</span><b>Studio sessions, vol. 4</b></div>
            <div className="row"><span>Based</span><b>Chicago, IL</b></div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Previously</div>
            <div className="small" style={{ color: "rgba(247,249,248,0.78)", lineHeight: 1.55 }}>
              Brand &amp; marketing lead at two independent studios. Earlier — agency strategy for
              consumer brands. Self-taught the rest of the way.
            </div>
          </div>
        </aside>
      </section>

      <section className="z__section z__section--dark" id="work">
        <div className="z__sec-head">
          <div>
            <div className="eyebrow">Selected work</div>
            <h2>Projects I’ve built &amp; <em>launched</em>.</h2>
          </div>
          <div className="small" style={{ maxWidth: 360 }}>
            Six recent engagements — brand work, campaigns, lifecycle programs, and a self-published zine in there too.
          </div>
        </div>
        <div className="z__list">
          {MARKETING.map(m => (
            <article key={m.id} className="z__row">
              <div className="yr">{m.year}</div>
              <div>
                <h3 className="ttl">{m.title}</h3>
                <div className="cl">{m.client} · {m.role}</div>
                <div className="tags">{m.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <div className="bl">
                {m.blurb}
                <div className="metric">{m.metric}</div>
              </div>
              <div className="arr">↗</div>
            </article>
          ))}
        </div>
      </section>

      <section className="z__section" id="services">
        <div className="z__sec-head">
          <div>
            <div className="eyebrow">What I do</div>
            <h2>Three practices, one <em>way</em> of working.</h2>
          </div>
          <div className="small" style={{ maxWidth: 360, color: "var(--brown)" }}>
            Projects typically run 6–14 weeks. Retainers available for ongoing partners.
          </div>
        </div>
        <div className="z__services">
          {SERVICES.map(s => (
            <div className="z__service" key={s.num}>
              <span className="num">{s.num}</span>
              <h3 dangerouslySetInnerHTML={{ __html: s.name }} />
              <p dangerouslySetInnerHTML={{ __html: s.desc }} />
              <ul>{s.tags.map(t => <li key={t}>— {t}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="z__section">
        <div className="z__sec-head">
          <div>
            <div className="eyebrow">Press &amp; mentions</div>
            <h2>A few <em>features</em>.</h2>
          </div>
        </div>
        <div className="z__list">
          {PRESS.map((p, i) => (
            <article key={i} className="z__row" style={{ gridTemplateColumns: "80px 1.5fr 1fr 60px" }}>
              <div className="yr">{p.yr}</div>
              <div><h3 className="ttl" dangerouslySetInnerHTML={{ __html: p.title }} /></div>
              <div className="bl">{p.pub}</div>
              <div className="arr">↗</div>
            </article>
          ))}
        </div>
      </section>

      <section className="z__section z__section--dark" id="contact">
        <div className="z__sec-head">
          <div>
            <div className="eyebrow">Get in touch</div>
            <h2>Let's make something <em>together</em>.</h2>
            <p className="lead" style={{ color: "rgba(247,249,248,0.78)", maxWidth: 600, marginTop: 28 }}>
              Brand &amp; marketing projects, press, or just hello — the fastest way to reach me is wherever you already are.
            </p>
          </div>
        </div>
        <div className="z__contact-row">
          <a className="z__cta" href="mailto:hello@zoeibenzon.com">
            <span className="ey">Email</span>
            <span className="ha">hello@zoeibenzon.com</span>
            <span className="ar">↗</span>
          </a>
          <a className="z__cta" href="https://instagram.com" target="_blank" rel="noreferrer">
            <span className="ey">Instagram</span>
            <span className="ha">@zoeibenzon</span>
            <span className="ar">↗</span>
          </a>
          <a className="z__cta" href="https://linkedin.com" target="_blank" rel="noreferrer">
            <span className="ey">LinkedIn</span>
            <span className="ha">/in/zoeibenzon</span>
            <span className="ar">↗</span>
          </a>
        </div>
      </section>

      <footer className="z__footer">
        <div>Zoei Benzon · brand &amp; marketing · Chicago</div>
        <div>© 2026 · part of fourteenzerosix studios</div>
      </footer>
    </div>
  );
}

Object.assign(window, { PotteryPage, ZoeiPage });
