"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  RUBRIC,
  DEFAULT_VERTICALS,
  STORAGE_KEY,
  seedEvents,
  totalOf,
  verdictOf,
  verdictColors,
  statusMeta,
  initials,
  avatarColor,
  fmtMonth,
  fmtDay,
  dateRange,
  costText,
  regionFromLoc,
  estimateScores,
  type TrackedEvent,
  type RubricCriterion,
  type EventStatus,
  type Scores,
  type ScoreDraft,
  type EventFacts,
} from "@/lib/roeblingEvents";

const MONO = '"Aptos Mono", var(--font-mono), ui-monospace, SFMono-Regular, monospace';
type CSS = React.CSSProperties;

type View =
  | "dashboard"
  | "all"
  | "detail"
  | "submit"
  | "review"
  | "scheduled"
  | "rubric";

type Filters = {
  search: string;
  vertical: string;
  verdict: string;
  status: string;
  region: string;
  sort: string;
};

type FormState = {
  name: string;
  website: string;
  start: string;
  end: string;
  location: string;
  type: string;
  industry: string;
  notes: string;
};

const blankForm = (): FormState => ({
  name: "",
  website: "",
  start: "",
  end: "",
  location: "",
  type: "Conference",
  industry: "",
  notes: "",
});

// ── style helpers ───────────────────────────────────────────────────────
function chip(bg: string, fg: string): CSS {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 9px",
    borderRadius: 5,
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: "0.04em",
    background: bg,
    color: fg,
    whiteSpace: "nowrap",
  };
}

function avatarStyle(name: string, size = 26, opts?: { stack?: boolean; plain?: boolean }): CSS {
  const s: CSS = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: avatarColor(name),
    color: "#f7f9f8",
    fontSize: size * 0.38,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
  if (!opts?.plain) {
    s.border = "2px solid #fff";
    if (opts?.stack) s.marginLeft = -6;
  }
  return s;
}

function regionStyle(r: string): CSS {
  const c =
    r === "US hub"
      ? { bg: "#e4f7e8", fg: "#1a7d2a" }
      : r === "International"
      ? { bg: "var(--tk-accent-soft)", fg: "var(--tk-accent-deep-alt)" }
      : { bg: "#ededed", fg: "#6a6a6a" };
  return {
    display: "inline-flex",
    marginTop: 4,
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: 9.5,
    fontWeight: 600,
    letterSpacing: "0.03em",
    background: c.bg,
    color: c.fg,
  };
}

function moreStyle(size = 26): CSS {
  return {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "#d6d6d6",
    color: "#5a5a5a",
    fontSize: size * 0.36,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "2px solid #fff",
    marginLeft: -6,
  };
}

function goingAvatars(list: string[] | undefined, cap: number, size: number) {
  const arr = (list || []).slice(0, cap).map((n) => ({
    key: n,
    initials: initials(n),
    style: avatarStyle(n, size, { stack: true }),
  }));
  const more = (list || []).length > cap ? "+" + ((list || []).length - cap) : "";
  return { arr, more };
}

const cardStyle: CSS = {
  background: "#fff",
  border: "1px solid rgba(35,35,35,0.08)",
  borderRadius: 10,
  boxShadow: "0 1px 2px rgba(35,35,35,0.05)",
};

const selectStyle: CSS = {
  padding: "9px 12px",
  background: "#f2f2f2",
  border: "1px solid rgba(35,35,35,0.08)",
  borderRadius: 6,
  fontSize: 12.5,
  fontWeight: 500,
  color: "#333333",
  cursor: "pointer",
};

const labelStyle: CSS = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#6a6a6a",
  marginBottom: 7,
};

const inputStyle: CSS = {
  width: "100%",
  padding: "11px 13px",
  background: "#f2f2f2",
  border: "1px solid rgba(35,35,35,0.1)",
  borderRadius: 7,
  fontSize: 14,
};

const stepBtnStyle: CSS = {
  width: 28,
  height: 28,
  borderRadius: 6,
  background: "#ededed",
  color: "#5a5a5a",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ─────────────────────────────────────────────────────────────────────────
// Config surface: the tracker is brand-agnostic. It ships with the Roebling
// setup as the default so the case-study route is unchanged, and a second
// route can pass a de-branded config (its own brand, rubric, verticals, seed,
// and estimator). When `pipelineHref` is omitted, the contact-pipeline links
// are hidden entirely.
export type TrackerTheme = {
  accent: string; // primary accent (buttons, active nav, links)
  accentDeep: string; // deeper accent for text on soft backgrounds
  accentDeepAlt: string; // secondary deep accent (hover states)
  accentSoft: string; // soft accent background
};

export type TrackerConfig = {
  brandName: string;
  brandLogo?: string;
  subtitle: string;
  reviewerName: string;
  seed: TrackedEvent[];
  rubric: RubricCriterion[];
  verticals: string[];
  storageKey: string;
  rubricCredit: string;
  calibrationNote: string;
  pipelineHref?: string;
  theme: TrackerTheme;
  estimator: (facts: EventFacts, verticals: string[]) => ScoreDraft;
};

// The original Roebling blue, kept as the default so the case-study route is
// unchanged. Each value maps 1:1 to the literal it replaces.
const ROEBLING_THEME: TrackerTheme = {
  accent: "#1e90ff",
  accentDeep: "#1268c9",
  accentDeepAlt: "#0f74d4",
  accentSoft: "#e7f2ff",
};

const DEFAULT_CONFIG: TrackerConfig = {
  brandName: "roebling",
  brandLogo: "/images/roebling-logo-white.png",
  subtitle: "events tracker",
  reviewerName: "Zoei",
  seed: seedEvents,
  rubric: RUBRIC,
  verticals: DEFAULT_VERTICALS,
  storageKey: STORAGE_KEY,
  rubricCredit: "the Roebling rubric",
  calibrationNote: "reading the event and applying Roebling’s calibration",
  pipelineHref: "/projects/roebling-gtm/events/pipeline",
  theme: ROEBLING_THEME,
  estimator: estimateScores,
};

export default function EventsTracker({
  config = DEFAULT_CONFIG,
}: {
  config?: TrackerConfig;
}) {
  const [loaded, setLoaded] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const logoRef = useRef<HTMLImageElement>(null);
  // Catch a broken logo that errored before hydration attached onError.
  useEffect(() => {
    const img = logoRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLogoOk(false);
  }, []);
  const [view, setView] = useState<View>("dashboard");
  const [isReviewer, setIsReviewer] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [verticals, setVerticals] = useState<string[]>(config.verticals.slice());
  const [rubric, setRubric] = useState<RubricCriterion[]>(config.rubric.map((c) => ({ ...c })));
  const [filters, setFilters] = useState<Filters>({
    search: "",
    vertical: "All",
    verdict: "All",
    status: "All",
    region: "All",
    sort: "date",
  });
  const [form, setForm] = useState<FormState>(blankForm());
  const [scoring, setScoring] = useState(false);
  const [scoreDraft, setScoreDraft] = useState<ScoreDraft | null>(null);
  const [submitScoreErr, setSubmitScoreErr] = useState("");
  const [editingScores, setEditingScores] = useState(false);
  const [detailScoring, setDetailScoring] = useState(false);
  const [personInput, setPersonInput] = useState("");
  const [newVertical, setNewVertical] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── load / persist ──
  useEffect(() => {
    let saved: {
      events?: TrackedEvent[];
      verticals?: string[];
      rubric?: RubricCriterion[];
    } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(config.storageKey) || "null");
    } catch {}
    if (saved && saved.events && saved.events.length) {
      setEvents(saved.events);
      setVerticals(saved.verticals || config.verticals.slice());
      setRubric(saved.rubric || config.rubric.map((c) => ({ ...c })));
    } else {
      setEvents(config.seed.map((e) => ({ ...e })));
    }
    setLoaded(true);
  }, []);

  const persist = (
    nextEvents: TrackedEvent[],
    nextVerticals = verticals,
    nextRubric = rubric
  ) => {
    try {
      localStorage.setItem(
        config.storageKey,
        JSON.stringify({ events: nextEvents, verticals: nextVerticals, rubric: nextRubric })
      );
    } catch {}
  };

  const saveEvents = (next: TrackedEvent[]) => {
    setEvents(next);
    persist(next);
  };

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  // ── navigation ──
  const goView = (v: View) => {
    setSelectedId((prev) => (v === view ? prev : null));
    setView(v);
  };
  const open = (id: string) => {
    setSelectedId(id);
    setEditingScores(false);
    setPersonInput("");
    setView("detail");
  };
  const selected = () => events.find((e) => e.id === selectedId);

  // ── filters ──
  const setFilter = (k: keyof Filters, v: string) => setFilters((f) => ({ ...f, [k]: v }));
  const filteredEvents = useMemo(() => {
    const f = filters;
    let list = events.slice();
    const q = f.search.trim().toLowerCase();
    if (q)
      list = list.filter((e) =>
        (e.name + " " + e.location + " " + e.industry + " " + (e.notes || ""))
          .toLowerCase()
          .includes(q)
      );
    if (f.vertical !== "All") list = list.filter((e) => (e.verticals || []).includes(f.vertical));
    if (f.verdict !== "All") list = list.filter((e) => e.verdict === f.verdict);
    if (f.status !== "All") list = list.filter((e) => statusMeta(e.status).label === f.status);
    if (f.region !== "All") list = list.filter((e) => e.region === f.region);
    if (f.sort === "score") list.sort((a, b) => (b.total || 0) - (a.total || 0));
    else if (f.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999"));
    return list;
  }, [events, filters]);

  // ── scoring (submit flow) ──
  const runScore = () => {
    if (scoring) return;
    if (!form.name.trim()) {
      setSubmitScoreErr("add an event name first.");
      return;
    }
    setScoring(true);
    setSubmitScoreErr("");
    // Deterministic rubric estimate that feels considered without a round-trip.
    setTimeout(() => {
      setScoreDraft(config.estimator(form, verticals));
      setScoring(false);
    }, 550);
  };
  const adjustDraft = (key: keyof Scores, delta: number) => {
    setScoreDraft((d) => {
      if (!d) return d;
      return {
        ...d,
        scores: { ...d.scores, [key]: Math.max(1, Math.min(5, (d.scores[key] || 3) + delta)) },
      };
    });
  };
  const submitForReview = () => {
    if (!scoreDraft) return;
    const total = totalOf(scoreDraft.scores);
    const region = regionFromLoc(form.location);
    const ev: TrackedEvent = {
      id: "u" + Date.now(),
      name: form.name.trim(),
      start: form.start,
      end: form.end,
      website: form.website,
      location: form.location || "–",
      region,
      type: form.type,
      industry: form.industry || "–",
      verticals: scoreDraft.verticals,
      submitter: isReviewer ? config.reviewerName : "You",
      submittedRole: "Attendee",
      sponsorCost: "",
      regCost: "",
      notes: form.notes,
      status: "in_review",
      scored: true,
      scores: scoreDraft.scores,
      total,
      verdict: verdictOf(total),
      whosGoing: [],
      reviewNotes: scoreDraft.rationale,
      actionItems: scoreDraft.actionItems,
    };
    saveEvents([ev, ...events]);
    setForm(blankForm());
    setScoreDraft(null);
    setView("review");
    flash("sent to the review queue");
  };
  // Team members submit unscored; the marketing team scores it in review.
  const submitUnscored = () => {
    if (!form.name.trim()) {
      setSubmitScoreErr("add an event name first.");
      return;
    }
    const region = regionFromLoc(form.location);
    const ev: TrackedEvent = {
      id: "u" + Date.now(),
      name: form.name.trim(),
      start: form.start,
      end: form.end,
      website: form.website,
      location: form.location || "–",
      region,
      type: form.type,
      industry: form.industry || "–",
      verticals: [],
      submitter: "You",
      submittedRole: "Attendee",
      sponsorCost: "",
      regCost: "",
      notes: form.notes,
      status: "submitted",
      scored: false,
      whosGoing: [],
    };
    saveEvents([ev, ...events]);
    setForm(blankForm());
    setScoreDraft(null);
    setSubmitScoreErr("");
    setView("review");
    flash("submitted for review");
  };

  // ── detail actions ──
  const toggleEdit = () => {
    setEditingScores((on) => {
      if (on) flash("scores saved");
      return !on;
    });
  };
  const adjustEventScore = (id: string, key: keyof Scores, delta: number) => {
    const next = events.map((e) => {
      if (e.id !== id || !e.scores) return e;
      const scores = {
        ...e.scores,
        [key]: Math.max(1, Math.min(5, (e.scores[key] || 3) + delta)),
      };
      const total = totalOf(scores);
      return { ...e, scores, total, verdict: verdictOf(total) };
    });
    saveEvents(next);
  };
  const scoreThis = () => {
    const e = selected();
    if (!e || detailScoring) return;
    setDetailScoring(true);
    setTimeout(() => {
      const d = config.estimator(e, verticals);
      const total = totalOf(d.scores);
      const next = events.map((x) =>
        x.id === e.id
          ? {
              ...x,
              scores: d.scores,
              total,
              verdict: verdictOf(total),
              verticals: d.verticals,
              scored: true,
              status: x.status === "submitted" ? ("in_review" as EventStatus) : x.status,
              reviewNotes: d.rationale,
              actionItems: d.actionItems,
            }
          : x
      );
      saveEvents(next);
      setDetailScoring(false);
      flash("scored, verdict: " + verdictOf(total));
    }, 550);
  };
  const addPerson = () => {
    const name = personInput.trim();
    const e = selected();
    if (!name || !e) return;
    saveEvents(
      events.map((x) => (x.id === e.id ? { ...x, whosGoing: [...(x.whosGoing || []), name] } : x))
    );
    setPersonInput("");
  };
  const moveStatus = (id: string, status: EventStatus, msg: string) => {
    saveEvents(events.map((e) => (e.id === id ? { ...e, status } : e)));
    flash(msg);
  };

  // ── rubric editing ──
  const updateCriterion = (key: string, v: string) => {
    const next = rubric.map((c) => (c.key === key ? { ...c, desc: v } : c));
    setRubric(next);
    persist(events, verticals, next);
  };
  const addVertical = () => {
    const v = newVertical.trim();
    if (!v || verticals.includes(v)) return;
    const next = [...verticals, v];
    setVerticals(next);
    setNewVertical("");
    persist(events, next);
  };
  const removeVertical = (v: string) => {
    const next = verticals.filter((x) => x !== v);
    setVerticals(next);
    persist(events, next);
  };

  // ── derived nav ──
  const reviewCount = events.filter(
    (e) => e.status === "submitted" || e.status === "in_review"
  ).length;
  const navItems: { id: View; label: string; badge?: number }[] = [
    { id: "dashboard", label: "overview" },
    { id: "all", label: "all events" },
    { id: "review", label: isReviewer ? "review queue" : "pending review", badge: reviewCount },
    { id: "scheduled", label: "scheduled" },
    { id: "rubric", label: "rubric & verticals" },
  ];

  const meName = isReviewer ? config.reviewerName : "Team member";
  const meRoleLabel = isReviewer ? "marketing · reviewer" : "submits events";

  // ─────────────────────────────────────────────────────────────────────
  return (
    <div
      data-rt
      className="rt-root"
      style={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: "#eaeaea",
        color: "#232323",
        ["--tk-accent" as string]: config.theme.accent,
        ["--tk-accent-deep" as string]: config.theme.accentDeep,
        ["--tk-accent-deep-alt" as string]: config.theme.accentDeepAlt,
        ["--tk-accent-soft" as string]: config.theme.accentSoft,
      } as CSS}
    >
      <style>{`
        .rt-scroll::-webkit-scrollbar{width:10px;height:10px;}
        .rt-scroll::-webkit-scrollbar-thumb{background:rgba(35,35,35,0.16);border-radius:5px;}
        .rt-row{transition:background 140ms;}
        .rt-row-brown:hover{background:color-mix(in srgb, var(--tk-accent) 4%, transparent);}
        .rt-row-green:hover{background:rgba(42,195,60,0.05);}
        .rt-primary{transition:background 140ms;}
        .rt-primary:hover{background:var(--tk-accent-deep-alt) !important;}
        .rt-ghost:hover{background:#f2f2f2 !important;}
        .rt-pipeline-link:hover{background:color-mix(in srgb, var(--tk-accent) 22%, transparent) !important;}
        .rt-fade{animation:rtFade 320ms cubic-bezier(0.22,0.61,0.36,1);}
        @keyframes rtFade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
        @keyframes rtSpin{to{transform:rotate(360deg);}}
        @keyframes rtToast{from{opacity:0;transform:translate(-50%,12px);}to{opacity:1;transform:translate(-50%,0);}}
        /* Visible keyboard focus (a11y): mouse clicks stay clean, keyboard shows a ring. */
        [data-rt] :focus-visible{outline:2px solid var(--tk-accent);outline-offset:2px;border-radius:5px;}
        [data-rt] :focus:not(:focus-visible){outline:none;}
        [data-rt] input:focus,[data-rt] select:focus,[data-rt] textarea:focus{border-color:color-mix(in srgb, var(--tk-accent) 55%, transparent);}
        [data-rt] [style*="uppercase"]{font-family:"Aptos Mono",var(--font-mono),ui-monospace,SFMono-Regular,monospace;}
        @media (prefers-reduced-motion: reduce){
          .rt-fade{animation:none;}
          [data-rt] *{transition:none !important;}
        }
        @media (max-width: 768px){
          [data-rt].rt-root{flex-direction:column !important;height:auto !important;min-height:100dvh;overflow:visible !important;}
          [data-rt] .rt-main{overflow-y:visible !important;height:auto !important;}
          [data-rt] .rt-sidebar{width:100% !important;min-width:0 !important;height:auto !important;padding:18px 16px 14px !important;}
          [data-rt] .rt-nav{flex-direction:row !important;overflow-x:auto;gap:8px !important;padding-bottom:6px;}
          [data-rt] .rt-nav button{width:auto !important;white-space:nowrap;flex:0 0 auto;}
          [data-rt] .rt-me{display:none !important;}
          [data-rt] .rt-grid-4{grid-template-columns:1fr 1fr !important;}
          [data-rt] .rt-grid-2{grid-template-columns:1fr !important;}
          [data-rt] .rt-scorebar{grid-template-columns:1fr auto !important;gap:12px !important;}
          [data-rt] .rt-table{overflow-x:auto !important;overflow-y:hidden !important;-webkit-overflow-scrolling:touch;}
          [data-rt] .rt-table > div, [data-rt] .rt-table > button{min-width:680px;}
          [data-rt] .rt-fade{padding-left:18px !important;padding-right:18px !important;}
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside
        className="rt-sidebar"
        style={{
          width: 248,
          minWidth: 248,
          height: "100%",
          background: "#232323",
          color: "#f7f9f8",
          display: "flex",
          flexDirection: "column",
          padding: "26px 18px 18px",
        }}
      >
        <div style={{ padding: "0 8px 4px" }}>
          {logoOk && config.brandLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={logoRef}
              src={config.brandLogo}
              alt={config.brandName}
              onError={() => setLogoOk(false)}
              style={{ height: 24, width: "auto", display: "block", borderRadius: 4 }}
            />
          ) : (
            <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {config.brandName}
            </div>
          )}
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--tk-accent)",
              marginTop: 7,
            }}
          >
            {config.subtitle}
          </div>
        </div>

        <button
          onClick={() => goView("submit")}
          className="rt-primary"
          style={{
            margin: "26px 4px 22px",
            padding: "13px 16px",
            background: "var(--tk-accent)",
            color: "#f7f9f8",
            border: "none",
            cursor: "pointer",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>+</span> submit an event
        </button>

        <nav className="rt-nav" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((n) => {
            const active = view === n.id || (n.id === "all" && view === "detail");
            const showBadge = n.id === "review" && (n.badge || 0) > 0;
            return (
              <button
                key={n.id}
                onClick={() => goView(n.id)}
                aria-current={active ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "11px 14px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 500,
                  transition: "background 140ms,color 140ms",
                  background: active ? "color-mix(in srgb, var(--tk-accent) 90%, transparent)" : "transparent",
                  color: active ? "#f7f9f8" : "rgba(247,249,248,0.72)",
                }}
              >
                <span>{n.label}</span>
                {showBadge && (
                  <span
                    style={{
                      background: active ? "rgba(247,249,248,0.25)" : "var(--tk-accent)",
                      color: "#f7f9f8",
                      fontSize: 11,
                      fontWeight: 600,
                      minWidth: 20,
                      height: 20,
                      padding: "0 6px",
                      borderRadius: 8,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {config.pipelineHref && (
        <Link
          href={config.pipelineHref}
          className="rt-pipeline-link"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 8,
            border: "1px solid color-mix(in srgb, var(--tk-accent) 40%, transparent)",
            background: "color-mix(in srgb, var(--tk-accent) 12%, transparent)",
            color: "#f7f9f8",
            fontSize: 13.5,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 140ms",
          }}
        >
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span>contact pipeline</span>
            <span style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(247,249,248,0.55)" }}>
              BD · sales · marketing
            </span>
          </span>
          <span style={{ fontSize: 15, color: "var(--tk-accent)" }}>→</span>
        </Link>
        )}

        <div
          style={{
            marginTop: "auto",
            padding: "14px 10px 4px",
            borderTop: "1px solid rgba(247,249,248,0.12)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(247,249,248,0.45)",
              marginBottom: 10,
            }}
          >
            viewing as
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(247,249,248,0.07)",
              borderRadius: 7,
              padding: 3,
            }}
          >
            {(["member", "reviewer"] as const).map((role) => {
              const on = role === "reviewer" ? isReviewer : !isReviewer;
              return (
                <button
                  key={role}
                  onClick={() => setIsReviewer(role === "reviewer")}
                  aria-pressed={on}
                  style={{
                    flex: 1,
                    padding: "8px 6px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 6,
                    fontSize: 11.5,
                    fontWeight: 600,
                    transition: "all 140ms",
                    background: on ? "var(--tk-accent)" : "transparent",
                    color: on ? "#f7f9f8" : "rgba(247,249,248,0.6)",
                  }}
                >
                  {role === "member" ? "team member" : "reviewer"}
                </button>
              );
            })}
          </div>
          <div className="rt-me" style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14, padding: "0 2px" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--tk-accent)",
                color: "#f7f9f8",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {initials(meName)}
            </div>
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#f7f9f8" }}>{meName}</div>
              <div style={{ fontSize: 11, color: "rgba(247,249,248,0.5)" }}>{meRoleLabel}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="rt-scroll rt-main" style={{ flex: 1, height: "100%", overflowY: "auto", position: "relative" }}>
        {!loaded && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#6a6a6a",
              fontSize: 14,
            }}
          >
            loading the tracker…
          </div>
        )}

        {loaded && view === "dashboard" && Dashboard()}
        {loaded && view === "all" && AllEvents()}
        {loaded && view === "detail" && Detail()}
        {loaded && view === "submit" && Submit()}
        {loaded && view === "review" && Review()}
        {loaded && view === "scheduled" && Scheduled()}
        {loaded && view === "rubric" && Rubric()}

        {toast && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position: "fixed",
              bottom: 26,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#232323",
              color: "#f7f9f8",
              padding: "13px 22px",
              borderRadius: 8,
              fontSize: 13.5,
              fontWeight: 500,
              boxShadow: "0 10px 30px rgba(35,35,35,0.25)",
              animation: "rtToast 260ms cubic-bezier(0.22,0.61,0.36,1)",
              zIndex: 50,
            }}
          >
            {toast}
          </div>
        )}
      </main>
    </div>
  );

  // ─── Views (closures over state) ──────────────────────────────────────
  function SectionEyebrow({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#5a5a5a",
        }}
      >
        {children}
      </div>
    );
  }

  function ScoreBars({
    scores,
    editing,
    onDec,
    onInc,
  }: {
    scores: Scores;
    editing: boolean;
    onDec: (k: keyof Scores) => void;
    onInc: (k: keyof Scores) => void;
  }) {
    return (
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
        {rubric.map((cr) => {
          const sc = scores[cr.key] || 0;
          return (
            <div
              key={cr.key}
              className="rt-scorebar"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr auto",
                gap: 18,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#232323" }}>{cr.label}</div>
                <div style={{ fontSize: 11.5, color: "#6a6a6a", lineHeight: 1.35, marginTop: 3 }}>
                  {cr.desc}
                </div>
              </div>
              <div style={{ height: 9, background: "#e6e6e6", borderRadius: 5, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(sc / 5) * 100}%`,
                    background: "var(--tk-accent)",
                    borderRadius: 5,
                    transition: "width 240ms cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                />
              </div>
              {editing ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    aria-label={`Decrease ${cr.label} score`}
                    style={{ ...stepBtnStyle, border: "none", cursor: "pointer" }}
                    onClick={() => onDec(cr.key)}
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span aria-label={`${cr.label}: ${sc} out of 5`} style={{ fontSize: 15, fontWeight: 600, width: 16, textAlign: "center" }}>
                    {sc}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${cr.label} score`}
                    style={{ ...stepBtnStyle, border: "none", cursor: "pointer" }}
                    onClick={() => onInc(cr.key)}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: 14, fontWeight: 600, width: 40, textAlign: "right", color: "#5a5a5a" }}>
                  {sc}/5
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function Dashboard() {
    const scored = events.filter((e) => e.scored && e.scores);
    const scheduled = events.filter((e) => e.status === "scheduled");
    const pipeline = events.filter((e) =>
      ["submitted", "in_review", "considering"].includes(e.status)
    );
    const avg = scored.length
      ? Math.round(scored.reduce((a, e) => a + (e.total || 0), 0) / scored.length)
      : 0;
    const statCards = [
      { label: "tracked", value: events.length, sub: "events in 2026", subColor: "#6a6a6a" },
      { label: "in pipeline", value: pipeline.length, sub: "submitted or considering", subColor: "var(--tk-accent-deep-alt)" },
      { label: "scheduled", value: scheduled.length, sub: "approved & planning", subColor: "#1a7d2a" },
      { label: "avg score", value: avg, sub: "out of 30", subColor: "#6a6a6a" },
    ];
    const dist = (["Strong Pursue", "Selective Pursue", "Monitor", "Skip"] as const).map((v) => {
      const count = scored.filter((e) => e.verdict === v).length;
      const c = verdictColors(v);
      const pct = scored.length ? Math.round((count / scored.length) * 100) : 0;
      return { label: v, count, dot: c.dot, pct };
    });
    const reviewPreview = pipeline.slice(0, 4);
    const upcoming = scheduled
      .filter((e) => e.start)
      .sort((a, b) => a.start.localeCompare(b.start))
      .slice(0, 5);
    const load: Record<string, number> = {};
    scheduled.forEach((e) => (e.whosGoing || []).forEach((p) => (load[p] = (load[p] || 0) + 1)));
    const peopleLoad = Object.entries(load)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    return (
      <div className="rt-fade" style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 48px 64px" }}>
        <SectionEyebrow>overview</SectionEyebrow>
        <h1 style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0", lineHeight: 1.05 }}>
          {isReviewer ? `good morning, ${config.reviewerName}` : "the events, at a glance"}
        </h1>
        <p style={{ fontSize: 15, color: "#5a5a5a", margin: "9px 0 0", maxWidth: 620 }}>
          every event the team is tracking for 2026, scored against {config.rubricCredit} so go / no-go
          decisions stay consistent.
        </p>

        <div className="rt-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 30 }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ ...cardStyle, padding: "20px 22px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6a6a6a",
                }}
              >
                {s.label}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 42, lineHeight: 1, marginTop: 12, color: "#232323" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12.5, color: s.subColor, marginTop: 8 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="rt-grid-2" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 22, marginTop: 24 }}>
          <div style={{ ...cardStyle, padding: "26px 26px 12px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                {isReviewer ? "needs your review" : "pending review"}
              </h2>
              <button
                onClick={() => goView("review")}
                style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tk-accent)", background: "none", border: "none", cursor: "pointer" }}
              >
                {isReviewer ? "open queue →" : "see all →"}
              </button>
            </div>
            <div style={{ marginTop: 16 }}>
              {reviewPreview.map((e) => {
                const sm = statusMeta(e.status);
                const c = verdictColors(e.verdict);
                return (
                  <button
                    key={e.id}
                    onClick={() => open(e.id)}
                    className="rt-row rt-row-brown"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 4px",
                      background: "none",
                      border: "none",
                      borderTop: "1px solid rgba(35,35,35,0.07)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={chip(sm.bg, sm.fg)}>{sm.label}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {e.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 2 }}>
                        {dateRange(e.start, e.end)} · {e.location}
                      </div>
                    </div>
                    <div style={e.scored ? chip(c.soft, c.softFg) : chip("#f2f2f2", "#6a6a6a")}>
                      {e.scored ? (e.total || 0) + "/30" : isReviewer ? "score it" : "pending"}
                    </div>
                  </button>
                );
              })}
              {reviewPreview.length === 0 && (
                <div
                  style={{
                    padding: "22px 4px 26px",
                    color: "#6a6a6a",
                    fontSize: 13.5,
                    borderTop: "1px solid rgba(35,35,35,0.07)",
                  }}
                >
                  nothing waiting. the queue is clear.
                </div>
              )}
            </div>
          </div>

          <div style={{ ...cardStyle, padding: 26 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
              rubric verdicts
            </h2>
            <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 4 }}>
              across {scored.length} scored events
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {dist.map((v) => (
                <div key={v.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      marginBottom: 7,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: v.dot, display: "inline-block" }} />
                      <span style={{ fontWeight: 600, color: "#232323" }}>{v.label}</span>
                    </span>
                    <span style={{ color: "#6a6a6a", fontWeight: 600 }}>{v.count}</span>
                  </div>
                  <div style={{ height: 8, background: "#e6e6e6", borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${v.pct}%`, background: v.dot, borderRadius: 5 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rt-grid-2" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 22, marginTop: 22 }}>
          <div style={{ ...cardStyle, padding: "26px 26px 14px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                up next · scheduled
              </h2>
              <button
                onClick={() => goView("scheduled")}
                style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tk-accent)", background: "none", border: "none", cursor: "pointer" }}
              >
                see all →
              </button>
            </div>
            <div style={{ marginTop: 14 }}>
              {upcoming.map((e) => {
                const g = goingAvatars(e.whosGoing, 3, 24);
                return (
                  <button
                    key={e.id}
                    onClick={() => open(e.id)}
                    className="rt-row rt-row-green"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      width: "100%",
                      textAlign: "left",
                      padding: "13px 4px",
                      background: "none",
                      border: "none",
                      borderTop: "1px solid rgba(35,35,35,0.07)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ textAlign: "center", minWidth: 46 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--tk-accent)",
                        }}
                      >
                        {fmtMonth(e.start)}
                      </div>
                      <div style={{ fontFamily: MONO, fontSize: 24, lineHeight: 1, color: "#232323" }}>
                        {fmtDay(e.start)}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {e.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 2 }}>{e.location}</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {g.arr.map((p) => (
                        <div key={p.key} style={p.style}>
                          {p.initials}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: "#232323", borderRadius: 10, padding: 26, color: "#f7f9f8" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, color: "#f7f9f8" }}>
              who&apos;s out there
            </h2>
            <div style={{ fontSize: 12.5, color: "rgba(247,249,248,0.55)", marginTop: 4 }}>
              team members on scheduled events
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 2 }}>
              {peopleLoad.map(([name, n]) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderTop: "1px solid rgba(247,249,248,0.1)",
                  }}
                >
                  <div style={avatarStyle(name, 30, { plain: true })}>{initials(name)}</div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#f7f9f8" }}>{name}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(247,249,248,0.6)" }}>
                    {n + (n === 1 ? " event" : " events")}
                  </div>
                </div>
              ))}
              {peopleLoad.length === 0 && (
                <div style={{ fontSize: 13, color: "rgba(247,249,248,0.5)", paddingTop: 8 }}>
                  no one assigned yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AllEvents() {
    const opts = (arr: string[]) => arr.map((x) => ({ value: x, label: x }));
    const list = filteredEvents;
    const filtersActive =
      filters.search ||
      (["vertical", "verdict", "status", "region"] as const).some((k) => filters[k] !== "All");
    const gridCols = "2.4fr 1fr 1.4fr 1fr 0.9fr 1fr 0.8fr";

    return (
      <div className="rt-fade" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px 64px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <SectionEyebrow>the tracker</SectionEyebrow>
            <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0" }}>
              all events
            </h1>
          </div>
          <div style={{ fontSize: 13, color: "#6a6a6a", paddingBottom: 4 }}>
            {list.length} of {events.length} events
          </div>
        </div>

        <div
          className="rt-input"
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: 24,
            background: "#fff",
            border: "1px solid rgba(35,35,35,0.08)",
            borderRadius: 9,
            padding: "12px 14px",
            boxShadow: "0 1px 2px rgba(35,35,35,0.04)",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <input
              type="search"
              aria-label="Search events, cities, and notes"
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              placeholder="search events, cities, notes…"
              style={{
                width: "100%",
                padding: "9px 12px 9px 34px",
                background: "#f2f2f2",
                border: "1px solid rgba(35,35,35,0.08)",
                borderRadius: 6,
                fontSize: 13.5,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6a6a6a",
                fontSize: 13,
              }}
            >
              ⌕
            </span>
          </div>
          <select aria-label="Filter by vertical" value={filters.vertical} onChange={(e) => setFilter("vertical", e.target.value)} style={selectStyle}>
            {opts(["All", ...verticals]).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select aria-label="Filter by verdict" value={filters.verdict} onChange={(e) => setFilter("verdict", e.target.value)} style={selectStyle}>
            {opts(["All", "Strong Pursue", "Selective Pursue", "Monitor", "Skip"]).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select aria-label="Filter by status" value={filters.status} onChange={(e) => setFilter("status", e.target.value)} style={selectStyle}>
            {opts(["All", "Submitted", "In review", "Considering", "Scheduled", "Skipped"]).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select aria-label="Filter by region" value={filters.region} onChange={(e) => setFilter("region", e.target.value)} style={selectStyle}>
            {opts(["All", "US hub", "Other US", "International"]).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select aria-label="Sort events" value={filters.sort} onChange={(e) => setFilter("sort", e.target.value)} style={selectStyle}>
            <option value="date">sort: by date</option>
            <option value="score">sort: by score</option>
            <option value="name">sort: A–Z</option>
          </select>
          {filtersActive && (
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  vertical: "All",
                  verdict: "All",
                  status: "All",
                  region: "All",
                  sort: filters.sort,
                })
              }
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--tk-accent)",
                padding: "8px 10px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              clear
            </button>
          )}
        </div>

        <div className="rt-table" style={{ ...cardStyle, marginTop: 16, overflow: "hidden", borderRadius: 9 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: 14,
              padding: "13px 22px",
              background: "#f2f2f2",
              borderBottom: "1px solid rgba(35,35,35,0.08)",
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "#6a6a6a",
            }}
          >
            <div>event</div>
            <div>when</div>
            <div>where</div>
            <div>verticals</div>
            <div>score</div>
            <div>verdict</div>
            <div>going</div>
          </div>
          {list.map((e) => {
            const c = verdictColors(e.verdict);
            const g = goingAvatars(e.whosGoing, 2, 24);
            const vChips = (e.verticals || []).slice(0, 2);
            return (
              <button
                key={e.id}
                onClick={() => open(e.id)}
                className="rt-row rt-row-brown"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  gap: 14,
                  alignItems: "center",
                  width: "100%",
                  textAlign: "left",
                  padding: "15px 22px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(35,35,35,0.06)",
                  cursor: "pointer",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "#232323",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {e.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#6a6a6a",
                      marginTop: 3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {e.industry}
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "#5a5a5a" }}>{dateRange(e.start, e.end)}</div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "#232323",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {e.location}
                  </div>
                  <div style={regionStyle(e.region)}>{e.region}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {vChips.map((v) => (
                    <span key={v} style={chip("#ededed", "#5a5a5a")}>
                      {v}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: e.scored ? "#232323" : "#b0b0b0" }}>
                  {e.scored ? String(e.total) : "–"}
                </div>
                <div>
                  <span style={e.scored ? chip(c.soft, c.softFg) : chip("#f2f2f2", "#6a6a6a")}>
                    {e.scored ? e.verdict : "needs review"}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  {g.arr.map((p) => (
                    <div key={p.key} style={p.style}>
                      {p.initials}
                    </div>
                  ))}
                  {g.more && <div style={moreStyle(24)}>{g.more}</div>}
                </div>
              </button>
            );
          })}
          {list.length === 0 && (
            <div style={{ padding: 48, textAlign: "center", color: "#6a6a6a", fontSize: 14 }}>
              no events match these filters.
            </div>
          )}
        </div>
      </div>
    );
  }

  function Detail() {
    const e = selected();
    if (!e) {
      return (
        <div className="rt-fade" style={{ maxWidth: 940, margin: "0 auto", padding: "30px 48px 72px" }}>
          <button
            onClick={() => setView("all")}
            style={{ fontSize: 13, fontWeight: 600, color: "#5a5a5a", background: "none", border: "none", cursor: "pointer" }}
          >
            ← back
          </button>
          <p style={{ color: "#6a6a6a", marginTop: 24 }}>event not found.</p>
        </div>
      );
    }
    const c = verdictColors(e.verdict);
    const sm = statusMeta(e.status);
    const showActions =
      isReviewer && ["submitted", "in_review", "considering"].includes(e.status) && e.scored;
    const showReopen = isReviewer && (e.status === "scheduled" || e.status === "skip");
    const speaks = e.speaking || (e.submittedRole === "Speaker" ? "Yes" : "–");

    return (
      <div className="rt-fade" style={{ maxWidth: 940, margin: "0 auto", padding: "30px 48px 72px" }}>
        <button
          onClick={() => setView("all")}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#5a5a5a",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 0",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← back
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 24,
            marginTop: 14,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={chip(sm.bg, sm.fg)}>{sm.label}</span>
              {(e.verticals || []).map((v) => (
                <span key={v} style={chip("#ededed", "#5a5a5a")}>
                  {v}
                </span>
              ))}
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", margin: "14px 0 0", lineHeight: 1.08 }}>
              {e.name}
            </h1>
            <div style={{ fontSize: 14, color: "#5a5a5a", marginTop: 10, display: "flex", gap: 18, flexWrap: "wrap" }}>
              <span>{dateRange(e.start, e.end)}</span>
              <span>·</span>
              <span>{e.location}</span>
              <span>·</span>
              <span>{e.type}</span>
            </div>
            {e.website && (
              <a
                href={e.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--tk-accent)",
                  borderBottom: "1px solid currentColor",
                  display: "inline-block",
                  marginTop: 12,
                  textDecoration: "none",
                }}
              >
                visit event site →
              </a>
            )}
            {config.pipelineHref && e.status === "scheduled" && (
              <div style={{ marginTop: 16 }}>
                <Link
                  href={`${config.pipelineHref}?event=${e.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    background: "#232323",
                    color: "#f7f9f8",
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  open contact pipeline →
                </Link>
                <span style={{ fontSize: 12, color: "#6a6a6a", marginLeft: 10 }}>
                  capture, sales follow-up &amp; marketing attribution for this event
                </span>
              </div>
            )}
          </div>
          <div
            style={{
              textAlign: "right",
              background: e.scored ? c.bg : "#ededed",
              color: e.scored ? c.fg : "#6a6a6a",
              borderRadius: 10,
              padding: "18px 24px",
              minWidth: 180,
            }}
          >
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.72 }}>
              rubric verdict
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 8 }}>
              {e.scored ? e.verdict : "not scored"}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 34, lineHeight: 1, marginTop: 8 }}>
              {e.scored ? String(e.total) : "–"}
              <span style={{ fontSize: 16, opacity: 0.65 }}> / 30</span>
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle, padding: "26px 28px", marginTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>the score card</h2>
            {e.scored && isReviewer && (
              <button
                onClick={toggleEdit}
                style={{
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 600,
                  background: editingScores ? "var(--tk-accent)" : "#ededed",
                  color: editingScores ? "#f7f9f8" : "#5a5a5a",
                }}
              >
                {editingScores ? "save scores" : "adjust scores"}
              </button>
            )}
          </div>

          {!e.scored ? (
            <div style={{ marginTop: 18, padding: 26, background: "#f2f2f2", borderRadius: 9, textAlign: "center" }}>
              <div style={{ fontSize: 14.5, color: "#5a5a5a", maxWidth: 420, margin: isReviewer ? "0 auto 16px" : "0 auto" }}>
                {isReviewer
                  ? "this event hasn’t been scored yet. run it through the rubric to get a verdict."
                  : "this event hasn’t been scored yet. a reviewer will run it through the rubric."}
              </div>
              {isReviewer && (
                <button
                  onClick={scoreThis}
                  style={{
                    padding: "12px 26px",
                    background: "var(--tk-accent)",
                    color: "#f7f9f8",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    opacity: detailScoring ? 0.7 : 1,
                  }}
                >
                  {detailScoring ? "scoring…" : "score with the rubric"}
                </button>
              )}
            </div>
          ) : (
            e.scores && (
              <ScoreBars
                scores={e.scores}
                editing={editingScores}
                onDec={(k) => adjustEventScore(e.id, k, -1)}
                onInc={(k) => adjustEventScore(e.id, k, 1)}
              />
            )
          )}
        </div>

        <div className="rt-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <div style={{ ...cardStyle, padding: 24, boxShadow: "none" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 12px" }}>
              why we&apos;re looking at it
            </h3>
            <p style={{ fontSize: 14, color: "#333333", lineHeight: 1.5, margin: 0 }}>
              {e.notes || "no notes were added for this event."}
            </p>
            <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 16 }}>
              submitted by <b style={{ color: "#5a5a5a" }}>{e.submitter}</b> · {e.submittedRole || "Attendee"}
            </div>
          </div>
          <div style={{ ...cardStyle, padding: 24, boxShadow: "none" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 14px" }}>who&apos;s going</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {(e.whosGoing || []).map((n) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "#f2f2f2",
                    borderRadius: 8,
                    padding: "4px 12px 4px 4px",
                  }}
                >
                  <div style={avatarStyle(n, 24)}>{initials(n)}</div>
                  <span style={{ fontSize: 12.5, fontWeight: 500 }}>{n}</span>
                </div>
              ))}
              {!(e.whosGoing || []).length && (
                <span style={{ fontSize: 13, color: "#6a6a6a" }}>no one assigned yet</span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <input
                aria-label="Add a person going to this event"
                value={personInput}
                onChange={(ev) => setPersonInput(ev.target.value)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") addPerson();
                }}
                placeholder="add a name…"
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "#f2f2f2",
                  border: "1px solid rgba(35,35,35,0.08)",
                  borderRadius: 6,
                  fontSize: 13,
                }}
              />
              <button
                onClick={addPerson}
                style={{
                  padding: "8px 16px",
                  background: "#232323",
                  color: "#f7f9f8",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 6,
                  fontSize: 12.5,
                  fontWeight: 600,
                }}
              >
                add
              </button>
            </div>
          </div>
        </div>

        {e.status === "scheduled" && (
          <div style={{ ...cardStyle, padding: 24, marginTop: 20, boxShadow: "none" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 16px" }}>logistics</h3>
            <div className="rt-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {[
                { l: "speaking", v: speaks },
                { l: "registration", v: e.regStatus || "–" },
                { l: "est. cost", v: costText(e) },
                { l: "collateral", v: e.collateral || "–" },
              ].map((x) => (
                <div key={x.l}>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6a6a6a",
                    }}
                  >
                    {x.l}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6, color: "#333333" }}>{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showActions && (
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => moveStatus(e.id, "scheduled", "approved & scheduled")}
              className="rt-primary"
              style={{
                padding: "13px 26px",
                background: "var(--tk-accent)",
                color: "#f7f9f8",
                border: "none",
                cursor: "pointer",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              approve &amp; schedule
            </button>
            <button
              onClick={() => moveStatus(e.id, "skip", "marked as skip")}
              className="rt-ghost"
              style={{
                padding: "13px 24px",
                background: "#fff",
                color: "#5a5a5a",
                border: "1px solid rgba(35,35,35,0.16)",
                cursor: "pointer",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              mark as skip
            </button>
            <span style={{ fontSize: 12.5, color: "#6a6a6a" }}>
              reviewer decision moves this to the scheduled list
            </span>
          </div>
        )}
        {showReopen && (
          <div style={{ display: "flex", gap: 12, marginTop: 24, alignItems: "center" }}>
            <button
              onClick={() => moveStatus(e.id, "in_review", "moved back to review")}
              className="rt-ghost"
              style={{
                padding: "12px 22px",
                background: "#fff",
                color: "#5a5a5a",
                border: "1px solid rgba(35,35,35,0.16)",
                cursor: "pointer",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              move back to review
            </button>
            <span style={{ fontSize: 12.5, color: "#6a6a6a" }}>
              {e.status === "scheduled" ? "currently on the scheduled list" : "currently skipped"}
            </span>
          </div>
        )}
      </div>
    );
  }

  function Submit() {
    const bind = (k: keyof FormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: ev.target.value }));
    const d = scoreDraft;

    return (
      <div className="rt-fade" style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px 72px" }}>
        <SectionEyebrow>new submission</SectionEyebrow>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0" }}>
          submit an event
        </h1>
        <p style={{ fontSize: 15, color: "#5a5a5a", margin: "9px 0 0", maxWidth: 560 }}>
          {isReviewer
            ? "add the details, then let the rubric score it. you can adjust every score before it goes to the review queue."
            : "add the details and send it to the marketing team, and they’ll score it against the rubric."}
        </p>

        <div style={{ ...cardStyle, padding: 28, marginTop: 26 }}>
          <div className="rt-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>event name</label>
              <input value={form.name} onChange={bind("name")} placeholder="e.g. Reindustrialize 3.0" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                website{" "}
                <span style={{ color: "#a0a0a0", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                  · the rubric reads this to score
                </span>
              </label>
              <input value={form.website} onChange={bind("website")} placeholder="https://…" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>start date</label>
              <input type="date" value={form.start} onChange={bind("start")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>end date</label>
              <input type="date" value={form.end} onChange={bind("end")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>location</label>
              <input value={form.location} onChange={bind("location")} placeholder="city, country" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>event type</label>
              <select value={form.type} onChange={bind("type")} style={inputStyle}>
                {["Conference", "Tradeshow", "Expo", "Summit", "Workshop", "Other"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>industry / focus</label>
              <input
                value={form.industry}
                onChange={bind("industry")}
                placeholder="e.g. Biomanufacturing, Critical Minerals"
                style={inputStyle}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>why do you want to attend? who&apos;s there?</label>
              <textarea
                value={form.notes}
                onChange={bind("notes")}
                rows={3}
                placeholder="context helps the rubric: audience, competitors, stacking, contacts in the region…"
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.45 }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              marginTop: 22,
              paddingTop: 20,
              borderTop: "1px solid rgba(35,35,35,0.08)",
            }}
          >
            {isReviewer ? (
              <>
                <button
                  onClick={runScore}
                  className="rt-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "13px 26px",
                    background: "var(--tk-accent)",
                    color: "#f7f9f8",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    opacity: scoring ? 0.75 : 1,
                  }}
                >
                  {scoring && (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: "2px solid rgba(247,249,248,0.4)",
                        borderTopColor: "#f7f9f8",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "rtSpin 0.7s linear infinite",
                        marginRight: 8,
                      }}
                    />
                  )}
                  {scoring ? "applying the rubric…" : d ? "re-score with the rubric" : "score with the rubric"}
                </button>
                <span style={{ fontSize: 12.5, color: "#6a6a6a" }}>
                  {scoring
                    ? config.calibrationNote
                    : "the rubric reads the details and scores all six criteria"}
                </span>
              </>
            ) : (
              <>
                <button
                  onClick={submitUnscored}
                  className="rt-primary"
                  style={{
                    padding: "13px 26px",
                    background: "var(--tk-accent)",
                    color: "#f7f9f8",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  send to review queue
                </button>
                <span style={{ fontSize: 12.5, color: "#6a6a6a" }}>
                  the marketing team will score it against the rubric
                </span>
              </>
            )}
          </div>
          {submitScoreErr && (
            <div
              style={{
                fontSize: 13,
                color: "#d13a4f",
                marginTop: 14,
                background: "#fdeef0",
                padding: "12px 14px",
                borderRadius: 6,
              }}
            >
              {submitScoreErr}
            </div>
          )}
        </div>

        {isReviewer && d && (
          <div className="rt-fade" style={{ ...cardStyle, padding: 28, marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>the rubric says…</h2>
                <div style={{ fontSize: 13, color: "#6a6a6a", marginTop: 4 }}>
                  adjust any score and the verdict recalculates live
                </div>
              </div>
              {(() => {
                const total = totalOf(d.scores);
                const v = verdictOf(total);
                const c = verdictColors(v);
                return (
                  <div style={{ textAlign: "right", background: c.bg, color: c.fg, borderRadius: 9, padding: "14px 20px" }}>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{v}</div>
                    <div style={{ fontFamily: MONO, fontSize: 30, lineHeight: 1, marginTop: 4 }}>
                      {total}
                      <span style={{ fontSize: 15, opacity: 0.65 }}> / 30</span>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div style={{ marginTop: 22 }}>
              <ScoreBars
                scores={d.scores}
                editing
                onDec={(k) => adjustDraft(k, -1)}
                onInc={(k) => adjustDraft(k, 1)}
              />
            </div>
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid rgba(35,35,35,0.08)" }}>
              <label style={labelStyle}>rationale</label>
              <textarea
                value={d.rationale}
                onChange={(ev) => setScoreDraft((cur) => (cur ? { ...cur, rationale: ev.target.value } : cur))}
                rows={2}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.45 }}
              />
            </div>
            {d.actionItems.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>suggested action items</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
                  {d.actionItems.map((a, i) => (
                    <div key={i} style={{ fontSize: 13.5, color: "#333333", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--tk-accent)" }}>·</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={submitForReview}
                className="rt-primary"
                style={{
                  padding: "13px 28px",
                  background: "var(--tk-accent)",
                  color: "#f7f9f8",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                send to review queue
              </button>
              <button
                onClick={() => {
                  setScoreDraft(null);
                  setSubmitScoreErr("");
                }}
                className="rt-ghost"
                style={{
                  padding: "13px 22px",
                  background: "#fff",
                  color: "#5a5a5a",
                  border: "1px solid rgba(35,35,35,0.16)",
                  cursor: "pointer",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                start over
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  function Review() {
    const queue = events
      .filter((e) => e.status === "submitted" || e.status === "in_review")
      .sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999"));
    return (
      <div className="rt-fade" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 48px 64px" }}>
        <SectionEyebrow>{isReviewer ? "marketing review" : "the pipeline"}</SectionEyebrow>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0" }}>
          {isReviewer ? "review queue" : "pending review"}
        </h1>
        <p style={{ fontSize: 15, color: "#5a5a5a", margin: "9px 0 0", maxWidth: 560 }}>
          {isReviewer
            ? "events waiting on a go / no-go. adjust the scores if you disagree, then approve to schedule or skip."
            : "events you and the team have submitted, waiting on the marketing team to review and schedule."}
        </p>

        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
          {queue.map((e) => {
            const c = verdictColors(e.verdict);
            const sm = statusMeta(e.status);
            return (
              <div key={e.id} style={{ ...cardStyle, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={chip(sm.bg, sm.fg)}>{sm.label}</span>
                      <span style={{ fontSize: 12, color: "#6a6a6a" }}>from {e.submitter}</span>
                    </div>
                    <button
                      onClick={() => open(e.id)}
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        marginTop: 9,
                        textAlign: "left",
                        display: "block",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#232323",
                        padding: 0,
                      }}
                    >
                      {e.name}
                    </button>
                    <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 5 }}>
                      {dateRange(e.start, e.end)} · {e.location} · {e.industry}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {e.scored ? (
                      <>
                        <div style={chip(c.soft, c.softFg)}>{e.verdict}</div>
                        <div style={{ fontFamily: MONO, fontSize: 26, lineHeight: 1, marginTop: 8, color: "#232323" }}>
                          {String(e.total)}
                          <span style={{ fontSize: 13, color: "#6a6a6a" }}> / 30</span>
                        </div>
                      </>
                    ) : (
                      <span style={chip("#f2f2f2", "#6a6a6a")}>needs scoring</span>
                    )}
                  </div>
                </div>
                {e.scored && e.scores && (
                  <div style={{ display: "flex", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
                    {rubric.map((cr) => (
                      <div key={cr.key} style={{ flex: 1, minWidth: 90 }}>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: "#6a6a6a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {cr.label.split(" ")[0]}
                        </div>
                        <div style={{ height: 6, background: "#e6e6e6", borderRadius: 3, marginTop: 5, overflow: "hidden" }}>
                          <div
                            style={{
                              height: "100%",
                              width: `${((e.scores![cr.key] || 0) / 5) * 100}%`,
                              background: "var(--tk-accent)",
                              borderRadius: 3,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 18,
                    paddingTop: 16,
                    borderTop: "1px solid rgba(35,35,35,0.07)",
                    flexWrap: "wrap",
                  }}
                >
                  {isReviewer && (e.scored ? (
                    <>
                      <button
                        onClick={() => moveStatus(e.id, "scheduled", "approved & scheduled")}
                        className="rt-primary"
                        style={{
                          padding: "10px 20px",
                          background: "var(--tk-accent)",
                          color: "#f7f9f8",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: 7,
                          fontSize: 12.5,
                          fontWeight: 600,
                        }}
                      >
                        approve &amp; schedule
                      </button>
                      <button
                        onClick={() => moveStatus(e.id, "skip", "marked as skip")}
                        className="rt-ghost"
                        style={{
                          padding: "10px 18px",
                          background: "#fff",
                          color: "#5a5a5a",
                          border: "1px solid rgba(35,35,35,0.16)",
                          cursor: "pointer",
                          borderRadius: 7,
                          fontSize: 12.5,
                          fontWeight: 600,
                        }}
                      >
                        skip
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => open(e.id)}
                      style={{
                        padding: "10px 20px",
                        background: "#232323",
                        color: "#f7f9f8",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: 7,
                        fontSize: 12.5,
                        fontWeight: 600,
                      }}
                    >
                      open to score
                    </button>
                  ))}
                  <button
                    onClick={() => open(e.id)}
                    style={{
                      padding: "10px 18px",
                      color: "#5a5a5a",
                      fontSize: 12.5,
                      fontWeight: 600,
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    open detail →
                  </button>
                </div>
              </div>
            );
          })}
          {queue.length === 0 && (
            <div style={{ ...cardStyle, padding: 56, textAlign: "center", color: "#6a6a6a", fontSize: 14.5 }}>
              the queue is clear. nothing waiting on review.
            </div>
          )}
        </div>
      </div>
    );
  }

  function Scheduled() {
    const sch = events
      .filter((e) => e.status === "scheduled")
      .sort((a, b) => (a.start || "9999").localeCompare(b.start || "9999"));
    const gridCols = "64px 2.2fr 1.5fr 1fr 0.9fr 1.1fr";
    return (
      <div className="rt-fade" style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 48px 64px" }}>
        <SectionEyebrow>confirmed</SectionEyebrow>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0" }}>scheduled events</h1>
        <p style={{ fontSize: 15, color: "#5a5a5a", margin: "9px 0 0", maxWidth: 560 }}>
          {sch.length} events approved and in planning. tracking who&apos;s going, speaking, and what
          collateral they need.
        </p>

        <div className="rt-table" style={{ ...cardStyle, marginTop: 26, overflow: "hidden", borderRadius: 9 }}>
          {sch.map((e) => {
            const c = verdictColors(e.verdict);
            const g = goingAvatars(e.whosGoing, 3, 26);
            const speaks = e.speaking ? /yes/i.test(e.speaking) : e.submittedRole === "Speaker";
            return (
              <button
                key={e.id}
                onClick={() => open(e.id)}
                className="rt-row rt-row-green"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  gap: 16,
                  alignItems: "center",
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(35,35,35,0.06)",
                  cursor: "pointer",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--tk-accent)",
                    }}
                  >
                    {fmtMonth(e.start)}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 26, lineHeight: 1 }}>{fmtDay(e.start)}</div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14.5,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {e.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 3 }}>{e.location}</div>
                </div>
                <div style={{ display: "flex" }}>
                  {g.arr.map((p) => (
                    <div key={p.key} style={p.style}>
                      {p.initials}
                    </div>
                  ))}
                  {g.more && <div style={moreStyle(26)}>{g.more}</div>}
                  {!(e.whosGoing || []).length && (
                    <span style={{ fontSize: 12, color: "#a0a0a0" }}>tbd</span>
                  )}
                </div>
                <div>
                  <span style={speaks ? chip("#e4f7e8", "#1a7d2a") : chip("#ededed", "#6a6a6a")}>
                    {speaks ? "speaking" : "attending"}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#5a5a5a" }}>{costText(e)}</div>
                <div>
                  <span style={e.scored ? chip(c.soft, c.softFg) : chip("#f2f2f2", "#6a6a6a")}>
                    {e.scored ? e.verdict : "–"}
                  </span>
                </div>
              </button>
            );
          })}
          {sch.length === 0 && (
            <div style={{ padding: 48, textAlign: "center", color: "#6a6a6a", fontSize: 14 }}>
              nothing scheduled yet.
            </div>
          )}
        </div>
      </div>
    );
  }

  function Rubric() {
    const canEdit = isReviewer;
    const thresholds = [
      { label: "Strong Pursue", desc: "seek speaking and/or sponsorship", range: "25–30", v: "Strong Pursue" },
      { label: "Selective Pursue", desc: "attend + speak if low-cost", range: "18–24", v: "Selective Pursue" },
      { label: "Monitor", desc: "send one person if it’s easy", range: "12–17", v: "Monitor" },
      { label: "Skip", desc: "does not justify time or budget", range: "< 12", v: "Skip" },
    ];
    return (
      <div className="rt-fade" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 48px 72px" }}>
        <SectionEyebrow>the model</SectionEyebrow>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0" }}>rubric &amp; verticals</h1>
        <p style={{ fontSize: 15, color: "#5a5a5a", margin: "9px 0 0", maxWidth: 600 }}>
          {canEdit
            ? "the same six-criteria model the tracker applies. edit the definitions and verticals, and changes flow into every new score."
            : "the six-criteria model the tracker applies to every event. switch to the reviewer role to edit it."}
        </p>

        <div style={{ ...cardStyle, padding: 28, marginTop: 26 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
            six criteria · 30 points
          </h2>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
            {rubric.map((c, i) => (
              <div key={c.key} style={{ display: "flex", gap: 16, padding: "16px 0", borderTop: "1px solid rgba(35,35,35,0.08)" }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: "#f2f2f2",
                    color: "var(--tk-accent)",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{c.label}</div>
                  {canEdit ? (
                    <textarea
                      value={c.desc}
                      onChange={(ev) => updateCriterion(c.key, ev.target.value)}
                      rows={2}
                      style={{
                        width: "100%",
                        marginTop: 8,
                        padding: "9px 12px",
                        background: "#f2f2f2",
                        border: "1px solid rgba(35,35,35,0.08)",
                        borderRadius: 6,
                        fontSize: 13,
                        lineHeight: 1.4,
                        resize: "vertical",
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 13, color: "#5a5a5a", lineHeight: 1.45, marginTop: 5 }}>{c.desc}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rt-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <div style={{ ...cardStyle, padding: 26, boxShadow: "none" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 4px" }}>verticals</h2>
            <div style={{ fontSize: 12.5, color: "#6a6a6a" }}>weighted equally when scoring</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
              {verticals.map((v) => (
                <div
                  key={v}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#f2f2f2",
                    border: "1px solid rgba(35,35,35,0.08)",
                    borderRadius: 8,
                    padding: "6px 8px 6px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {v}
                  {canEdit && (
                    <button
                      onClick={() => removeVertical(v)}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(35,35,35,0.1)",
                        color: "#5a5a5a",
                        fontSize: 12,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {canEdit ? (
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <input
                  value={newVertical}
                  onChange={(ev) => setNewVertical(ev.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") addVertical();
                  }}
                  placeholder="add a vertical…"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: "#f2f2f2",
                    border: "1px solid rgba(35,35,35,0.08)",
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                />
                <button
                  onClick={addVertical}
                  style={{
                    padding: "8px 16px",
                    background: "#232323",
                    color: "#f7f9f8",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 6,
                    fontSize: 12.5,
                    fontWeight: 600,
                  }}
                >
                  add
                </button>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#a0a0a0", marginTop: 16 }}>
                switch to the reviewer role to edit the rubric and verticals.
              </div>
            )}
          </div>
          <div style={{ background: "#232323", borderRadius: 10, padding: 26, color: "#f7f9f8" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#f7f9f8" }}>
              verdict thresholds
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {thresholds.map((t) => (
                <div
                  key={t.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderTop: "1px solid rgba(247,249,248,0.1)",
                  }}
                >
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: verdictColors(t.v).dot,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(247,249,248,0.55)", marginTop: 2 }}>{t.desc}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(247,249,248,0.85)" }}>{t.range}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
