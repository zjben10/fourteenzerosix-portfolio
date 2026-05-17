/* global React, ReactDOM, Nav, Hero, Marquee, About, Pottery, Marketing, Contact, Footer, SplitLanding, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakToggle */
const { useState, useEffect, useRef } = React;

const PALETTES = {
  studio:    { terracotta: "#A56435", tan: "#E7C69E", sage: "#688662", dark: "#282D2A", cream: "#F7F9F8", ink: "#232323", brown: "#6F5950" },
  kiln:      { terracotta: "#B5532B", tan: "#EBC58F", sage: "#7A8C5F", dark: "#1F1815", cream: "#F4EFE6", ink: "#1F1815", brown: "#6F4A3A" },
  ash:       { terracotta: "#7E6A57", tan: "#D8C7AC", sage: "#9AA68F", dark: "#2A2B27", cream: "#F0EDE3", ink: "#2A2B27", brown: "#5A4E40" },
  porcelain: { terracotta: "#9C6F4E", tan: "#E8D6B8", sage: "#8B9C82", dark: "#1B2228", cream: "#FBFAF6", ink: "#1B2228", brown: "#6B5544" },
};

const TYPE_PAIRS = {
  default: { display: '"DM Serif Display", serif', sans: '"DM Sans", system-ui, sans-serif', body: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  serifLed: { display: '"DM Serif Display", serif', sans: '"DM Serif Display", serif',         body: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  modern:  { display: '"DM Sans", system-ui, sans-serif', sans: '"DM Sans", system-ui, sans-serif', body: '"DM Sans", system-ui, sans-serif' },
};

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "studio",
  "typePair": "default",
  "density": "medium",
  "layout": "single",
  "showMarquee": true
}/*EDITMODE-END*/;

function applyTokens(palette, typePair) {
  const r = document.documentElement.style;
  const p = PALETTES[palette] || PALETTES.studio;
  r.setProperty("--terracotta", p.terracotta);
  r.setProperty("--tan",        p.tan);
  r.setProperty("--sage",       p.sage);
  r.setProperty("--dark",       p.dark);
  r.setProperty("--cream",      p.cream);
  r.setProperty("--ink",        p.ink);
  r.setProperty("--brown",      p.brown);
  const t = TYPE_PAIRS[typePair] || TYPE_PAIRS.default;
  r.setProperty("--display", t.display);
  r.setProperty("--sans",    t.sans);
  r.setProperty("--body",    t.body);
}

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const [splitChose, setSplitChose] = useState(null); // null | 'pottery' | 'marketing'
  const heroRef = useRef(null);

  // apply palette + type
  useEffect(() => { applyTokens(t.palette, t.typePair); }, [t.palette, t.typePair]);

  // reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".section, .marquee, .hero__mark").forEach(el => {
      el.classList.add("reveal");
      io.observe(el);
    });
    // hero loads in immediately
    const m = document.querySelector(".hero__mark");
    if (m) requestAnimationFrame(() => m.classList.add("in"));
    return () => io.disconnect();
  }, [t.layout]);

  // gentle parallax — hero vessel + section labels
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vessel = document.querySelector(".hero__vessel");
        if (vessel) vessel.style.transform = `translateY(${y * 0.18}px) rotate(${y * 0.01}deg)`;
        const word = document.querySelector(".hero__wordmark");
        if (word) word.style.transform = `translateY(${y * 0.06}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [t.layout]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // SPLIT LANDING mode
  if (t.layout === "split" && !splitChose) {
    return (
      <React.Fragment>
        <SplitLanding onPick={(which) => { setSplitChose(which); setTimeout(() => scrollTo(which), 60); }} />
        <Tweaks t={t} setTweak={setTweak} />
      </React.Fragment>
    );
  }

  return (
    <div className="page">
      <Nav onCommission={() => scrollTo("contact")} />
      <div ref={heroRef}><Hero /></div>
      {t.showMarquee && <Marquee />}
      <About />
      <Pottery density={t.density} />
      <Marketing />
      <Contact />
      <Footer />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

function Tweaks({ t, setTweak }) {
  const paletteKeys = Object.keys(PALETTES);
  const paletteOpts = paletteKeys.map(k => {
    const p = PALETTES[k];
    return [p.terracotta, p.tan, p.sage, p.dark, p.cream];
  });
  const currentPalette = paletteOpts[paletteKeys.indexOf(t.palette)] || paletteOpts[0];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakColor
          label="Color story"
          value={currentPalette}
          options={paletteOpts}
          onChange={(arr) => {
            const idx = paletteOpts.findIndex(o => o[0] === arr[0]);
            setTweak("palette", paletteKeys[idx] || "studio");
          }}
        />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio
          label="Landing"
          value={t.layout}
          onChange={v => setTweak("layout", v)}
          options={[
            { value: "single", label: "Single-scroll" },
            { value: "split",  label: "Split landing" },
          ]}
        />
        <TweakRadio
          label="Pottery grid"
          value={t.density}
          onChange={v => setTweak("density", v)}
          options={[
            { value: "airy",   label: "Airy" },
            { value: "medium", label: "Medium" },
            { value: "dense",  label: "Dense" },
          ]}
        />
        <TweakToggle
          label="Marquee band"
          value={t.showMarquee}
          onChange={v => setTweak("showMarquee", v)}
        />
      </TweakSection>
      <TweakSection label="Typography">
        <TweakSelect
          label="Type pair"
          value={t.typePair}
          onChange={v => setTweak("typePair", v)}
          options={[
            { value: "default",  label: "DM Sans + Helvetica (brand)" },
            { value: "serifLed", label: "DM Serif headings + Helvetica body" },
            { value: "modern",   label: "All DM Sans" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
