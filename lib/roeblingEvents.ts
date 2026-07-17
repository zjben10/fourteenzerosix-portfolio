import seed from "./roeblingEventsData.json";

// ── Types ──────────────────────────────────────────────────────────────
export type RubricKey =
  | "strategicFit"
  | "icpCoverage"
  | "icpComposition"
  | "fuelEngine"
  | "quality"
  | "cost";

export type Scores = Record<RubricKey, number>;

export type EventStatus =
  | "submitted"
  | "in_review"
  | "considering"
  | "scheduled"
  | "skip";

export type Verdict = "Strong Pursue" | "Selective Pursue" | "Monitor" | "Skip";

export type TrackedEvent = {
  id: string;
  name: string;
  start: string;
  end: string;
  website?: string;
  location: string;
  region: string;
  type: string;
  industry: string;
  verticals: string[];
  submitter: string;
  submittedRole?: string;
  sponsorCost?: string;
  regCost?: string;
  notes?: string;
  status: EventStatus;
  scored: boolean;
  scores?: Scores;
  total?: number;
  verdict?: Verdict;
  whosGoing?: string[];
  reviewNotes?: string;
  actionItems?: string[];
  speaking?: string;
  regStatus?: string;
  collateral?: string;
};

export type RubricCriterion = { key: RubricKey; label: string; desc: string };

// ── Model constants (from the Roebling event evaluator) ─────────────────
export const RUBRIC: RubricCriterion[] = [
  {
    key: "strategicFit",
    label: "Strategic Fit",
    desc: "Aligns with the LP / EAP phase and active verticals; reaches decision-makers rather than a general crowd.",
  },
  {
    key: "icpCoverage",
    label: "ICP Coverage",
    desc: "How many target personas attend: process engineers, technical founders, CapEx managers, capital stakeholders.",
  },
  {
    key: "icpComposition",
    label: "ICP Composition",
    desc: "What share of attendees are ICP. A curated 300-person room beats a 15k expo. Density over headcount.",
  },
  {
    key: "fuelEngine",
    label: "Fuel & Engine Fit",
    desc: "Can we make content and drive pipeline: speaking, demos, case studies, follow-up meetings?",
  },
  {
    key: "quality",
    label: "Quality of Interaction",
    desc: "Speaking > sponsoring > booth > attending. Curated and structured beats an open trade-show floor.",
  },
  {
    key: "cost",
    label: "Cost / ROI",
    desc: "All-in cost vs. expected conversations. US hubs score high; international needs meetings or stacking.",
  },
];

export const DEFAULT_VERTICALS = [
  "Bio",
  "Food/Ag",
  "Chemicals",
  "Minerals",
  "Energy",
  "Decarbonization",
  "Materials",
];

export const STORAGE_KEY = "roebling_events_v3";

export const seedEvents = seed as TrackedEvent[];

// ── Verdict / totals ────────────────────────────────────────────────────
export function totalOf(scores: Scores, rubric: RubricCriterion[] = RUBRIC) {
  return rubric.reduce((a, c) => a + (scores[c.key] || 0), 0);
}

export function verdictOf(total: number): Verdict {
  return total >= 25
    ? "Strong Pursue"
    : total >= 18
    ? "Selective Pursue"
    : total >= 12
    ? "Monitor"
    : "Skip";
}

export type VerdictColors = {
  bg: string;
  fg: string;
  dot: string;
  soft: string;
  softFg: string;
};

export function verdictColors(v?: string): VerdictColors {
  if (v === "Strong Pursue")
    return { bg: "#2ac33c", fg: "#0f3d17", dot: "#2ac33c", soft: "#e4f7e8", softFg: "#1a7d2a" };
  if (v === "Selective Pursue")
    return { bg: "#1e90ff", fg: "#ffffff", dot: "#1e90ff", soft: "#e7f2ff", softFg: "#1268c9" };
  if (v === "Monitor")
    return { bg: "#ff882d", fg: "#3a1c05", dot: "#ff882d", soft: "#fff0e2", softFg: "#b3560f" };
  return { bg: "#e5e5e5", fg: "#5a5a5a", dot: "#909090", soft: "#ededed", softFg: "#6a6a6a" };
}

export function statusMeta(s: EventStatus) {
  const m: Record<string, { label: string; bg: string; fg: string }> = {
    submitted: { label: "Submitted", bg: "#e7f2ff", fg: "#1268c9" },
    in_review: { label: "In review", bg: "#fff0e2", fg: "#b3560f" },
    considering: { label: "Considering", bg: "#ededed", fg: "#5a5a5a" },
    scheduled: { label: "Scheduled", bg: "#e4f7e8", fg: "#1a7d2a" },
    skip: { label: "Skipped", bg: "#ededed", fg: "#8a8a8a" },
  };
  return m[s] || m.submitted;
}

// ── Presentation helpers ────────────────────────────────────────────────
export function initials(name: string) {
  const p = (name || "").trim().split(/\s+/);
  return (
    ((p[0] || "")[0] || "?").toUpperCase() +
    (p.length > 1 ? (p[p.length - 1][0] || "").toUpperCase() : "")
  );
}

const AVATAR_PALETTE = ["#1e90ff", "#1a7d2a", "#c96a1f", "#5a5a5a", "#c0304f", "#232323"];

export function avatarColor(name: string) {
  let s = 0;
  for (const c of name || "") s += c.charCodeAt(0);
  return AVATAR_PALETTE[s % AVATAR_PALETTE.length];
}

function parseDate(iso?: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

export function fmtMonth(iso?: string) {
  const d = parseDate(iso);
  return d ? d.toLocaleString("en-US", { month: "short" }).toLowerCase() : "";
}

export function fmtDay(iso?: string): string {
  const d = parseDate(iso);
  return d ? String(d.getDate()) : "·";
}

export function dateRange(a?: string, b?: string) {
  const da = parseDate(a);
  if (!da) return "date tbd";
  const mo = da.toLocaleString("en-US", { month: "short" });
  const db = parseDate(b);
  if (!db || b === a) return `${mo} ${da.getDate()}`;
  const mo2 = db.toLocaleString("en-US", { month: "short" });
  if (mo === mo2) return `${mo} ${da.getDate()}–${db.getDate()}`;
  return `${mo} ${da.getDate()} – ${mo2} ${db.getDate()}`;
}

export function costText(e: TrackedEvent) {
  const raw = e.regCost || e.sponsorCost || "";
  if (!raw) return "–";
  const n = parseFloat(raw);
  if (!isNaN(n) && String(raw).trim() === String(n)) return "$" + n.toLocaleString();
  return raw.length > 24 ? raw.slice(0, 22) + "…" : raw;
}

export function regionFromLoc(loc: string) {
  const l = (loc || "").toLowerCase();
  if (/houston|chicago|new york|nyc|san francisco|\bsf\b|boston|cambridge|detroit/.test(l))
    return "US hub";
  if (
    /france|paris|amsterdam|bangkok|thailand|vienna|india|germany|berlin|singapore|hong kong|switzerland|rotterdam|london|toronto|europe|japan|zurich|australia|canada|mexico|china|korea/.test(
      l
    )
  )
    return "International";
  if (l.trim() === "") return "Unknown";
  return "Other US";
}

// ── Rubric estimator ────────────────────────────────────────────────────
// A deterministic, transparent stand-in for the Claude-scored prototype.
// It reads the same signals the evaluator prompt described: region, event
// type, ICP keywords, cross-vertical reach, returning a 1-5 per criterion
// that a reviewer then adjusts. It never inflates; the reviewer owns the call.
export type EventFacts = {
  name: string;
  website?: string;
  start?: string;
  end?: string;
  location?: string;
  type?: string;
  industry?: string;
  notes?: string;
};

export type ScoreDraft = {
  scores: Scores;
  verticals: string[];
  rationale: string;
  actionItems: string[];
};

const ICP_TERMS = [
  "process engineer",
  "capex",
  "capital",
  "techno-economic",
  "tea",
  "scale-up",
  "scaleup",
  "pilot",
  "commercial",
  "fid",
  "offtake",
  "founder",
  "r&d",
  "investor",
  "plant",
  "manufacturing",
  "infrastructure",
  "decarbon",
];

const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));

export function estimateScores(
  facts: EventFacts,
  verticalsList: string[] = DEFAULT_VERTICALS
): ScoreDraft {
  const hay = `${facts.industry || ""} ${facts.notes || ""} ${facts.name || ""}`.toLowerCase();
  const region = regionFromLoc(facts.location || "");
  const type = (facts.type || "").toLowerCase();

  const matchedVerticals = verticalsList.filter((v) => hay.includes(v.toLowerCase()));
  const icpHits = ICP_TERMS.filter((t) => hay.includes(t)).length;

  // Strategic fit: cross-vertical + ICP language.
  const strategicFit = clamp(2.5 + Math.min(matchedVerticals.length, 3) * 0.6 + icpHits * 0.2);

  // ICP coverage: breadth of personas implied by ICP keyword hits.
  const icpCoverage = clamp(2 + icpHits * 0.5);

  // ICP composition: curated formats concentrate the right room.
  const curated = /summit|forum|invitational|dinner|roundtable|workshop/.test(type);
  const expo = /expo|tradeshow|trade show|fair/.test(type);
  const icpComposition = clamp(3 + (curated ? 1 : 0) - (expo ? 1 : 0) + Math.min(icpHits, 3) * 0.2);

  // Fuel & engine: content + pipeline potential rises with ICP density.
  const fuelEngine = clamp(2.5 + Math.min(icpHits, 4) * 0.4 + matchedVerticals.length * 0.2);

  // Quality of interaction: speaking/curated beats an open floor.
  const quality = clamp(3 + (curated ? 1 : 0) - (expo ? 1 : 0));

  // Cost / ROI: US hubs score high; international needs justification.
  const cost = clamp(region === "US hub" ? 4 : region === "Other US" ? 3.5 : 2.5);

  const scores: Scores = {
    strategicFit,
    icpCoverage,
    icpComposition,
    fuelEngine,
    quality,
    cost,
  };

  const verticals = matchedVerticals.length ? matchedVerticals.slice(0, 3) : ["Cross-industry"];
  const total = totalOf(scores);
  const verdict = verdictOf(total);

  const rationale =
    `Rubric estimate: ${verdict.toLowerCase()} (${total}/30). ` +
    (region === "US hub"
      ? "US hub keeps cost efficient. "
      : region === "International"
      ? "International, so justify with client meetings or event-stacking. "
      : "") +
    (matchedVerticals.length
      ? `Reaches ${matchedVerticals.slice(0, 3).join(", ")}. `
      : "Vertical fit unclear from the details. ") +
    (curated
      ? "Curated format concentrates ICP density."
      : expo
      ? "Open expo floor dilutes ICP density."
      : "Adjust each score against what you know.");

  const actionItems: string[] = [];
  if (quality >= 4) actionItems.push("Pursue a speaking slot or hosted session.");
  else actionItems.push("Confirm the format and whether speaking is available.");
  if (region !== "US hub") actionItems.push("Stack client meetings around the dates to justify travel.");
  actionItems.push("Verify all-in cost against expected qualified conversations.");

  return { scores, verticals, rationale, actionItems: actionItems.slice(0, 3) };
}
