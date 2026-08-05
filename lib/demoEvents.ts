// ─────────────────────────────────────────────────────────────────────────
// De-branded demo dataset for the standalone Event Tracker & Evaluator.
// No client data: a generic B2B / GTM rubric, verticals, sample events, and a
// matching estimator. This is what powers the public /ai-projects/event-tracker
// demo so it can show the tool end to end without exposing any real pipeline.
// ─────────────────────────────────────────────────────────────────────────
import {
  regionFromLoc,
  totalOf,
  verdictOf,
  type EventFacts,
  type RubricCriterion,
  type ScoreDraft,
  type Scores,
  type TrackedEvent,
} from "./roeblingEvents";

export const demoRubric: RubricCriterion[] = [
  {
    key: "strategicFit",
    label: "Strategic Fit",
    desc: "Aligns with the current GTM motion and target segments; reaches decision-makers rather than a general crowd.",
  },
  {
    key: "icpCoverage",
    label: "ICP Coverage",
    desc: "How many target personas attend: economic buyers, champions, practitioners, and technical evaluators.",
  },
  {
    key: "icpComposition",
    label: "ICP Composition",
    desc: "What share of attendees are ICP. A curated 300-person room beats a 15k expo. Density over headcount.",
  },
  {
    key: "fuelEngine",
    label: "Content & Pipeline Fit",
    desc: "Can we create content and drive pipeline: speaking, demos, case studies, and follow-up meetings?",
  },
  {
    key: "quality",
    label: "Quality of Interaction",
    desc: "Speaking > sponsoring > booth > attending. Curated and structured beats an open trade-show floor.",
  },
  {
    key: "cost",
    label: "Cost / ROI",
    desc: "All-in cost vs. expected qualified conversations. Home hubs score high; long-haul travel needs stacked meetings.",
  },
];

export const demoVerticals = [
  "SaaS",
  "Fintech",
  "Martech",
  "DevTools",
  "AI/ML",
  "Cybersecurity",
  "Healthtech",
];

export const DEMO_STORAGE_KEY = "demo_event_tracker_v1";

// ── Sample pipeline (all fictional / public conferences, no client data) ────
export const demoSeedEvents: TrackedEvent[] = [
  {
    id: "d1",
    name: "SaaStr Annual 2026",
    start: "2026-09-08",
    end: "2026-09-10",
    website: "https://www.saastrannual.com/",
    location: "San Francisco, CA",
    region: "US hub",
    type: "Conference",
    industry: "SaaS",
    verticals: ["SaaS"],
    submitter: "Zoei",
    submittedRole: "Marketing",
    sponsorCost: "35000",
    regCost: "1499",
    notes: "Highest ICP density of the year for SaaS GTM leaders. Speaking track worth pursuing.",
    status: "scheduled",
    scored: true,
    scores: { strategicFit: 5, icpCoverage: 5, icpComposition: 4, fuelEngine: 5, quality: 4, cost: 4 },
    total: 27,
    verdict: "Strong Pursue",
    whosGoing: ["Zoei", "Marcus Lee"],
    reviewNotes: "Home-hub, high density, content-rich. Lock a session.",
  },
  {
    id: "d2",
    name: "HubSpot INBOUND 2026",
    start: "2026-09-01",
    end: "2026-09-03",
    website: "https://www.inbound.com/",
    location: "San Francisco, CA",
    region: "US hub",
    type: "Conference",
    industry: "Martech",
    verticals: ["Martech", "SaaS"],
    submitter: "Zoei",
    submittedRole: "Marketing",
    sponsorCost: "40000",
    regCost: "675",
    notes: "Strong martech practitioner audience. Good for content capture and demos.",
    status: "scheduled",
    scored: true,
    scores: { strategicFit: 5, icpCoverage: 4, icpComposition: 3, fuelEngine: 5, quality: 4, cost: 4 },
    total: 25,
    verdict: "Strong Pursue",
    whosGoing: ["Zoei"],
    reviewNotes: "",
  },
  {
    id: "d3",
    name: "RevOps Co-op Dinner, NYC",
    start: "2026-02-12",
    end: "2026-02-12",
    website: "",
    location: "New York, NY",
    region: "US hub",
    type: "Dinner",
    industry: "RevOps",
    verticals: ["SaaS"],
    submitter: "Priya Shah",
    submittedRole: "RevOps",
    sponsorCost: "6000",
    regCost: "",
    notes: "Curated operator dinner, roughly 30 seats. Late-stage relationship building.",
    status: "scheduled",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 5, fuelEngine: 4, quality: 5, cost: 5 },
    total: 27,
    verdict: "Strong Pursue",
    whosGoing: ["Zoei", "Priya Shah"],
    reviewNotes: "Small, curated, cheap. Ideal quality of interaction.",
  },
  {
    id: "d4",
    name: "Pavilion GTM Summit 2026",
    start: "2026-03-24",
    end: "2026-03-25",
    website: "https://www.joinpavilion.com/",
    location: "Austin, TX",
    region: "Other US",
    type: "Summit",
    industry: "GTM / SaaS",
    verticals: ["SaaS"],
    submitter: "Marcus Lee",
    submittedRole: "Sales",
    sponsorCost: "20000",
    regCost: "1200",
    notes: "Executive GTM audience, curated format. Speaking would be ideal.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 4, fuelEngine: 4, quality: 4, cost: 3 },
    total: 23,
    verdict: "Selective Pursue",
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d5",
    name: "Forrester B2B Summit North America 2026",
    start: "2026-05-04",
    end: "2026-05-06",
    website: "https://www.forrester.com/event/b2b-summit-north-america/",
    location: "Nashville, TN",
    region: "Other US",
    type: "Summit",
    industry: "B2B / SaaS",
    verticals: ["SaaS", "Martech"],
    submitter: "Zoei",
    submittedRole: "Marketing",
    sponsorCost: "30000",
    regCost: "3195",
    notes: "Analyst-led, buyer-heavy. Good for positioning and enterprise pipeline.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 4, fuelEngine: 4, quality: 4, cost: 3 },
    total: 23,
    verdict: "Selective Pursue",
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d6",
    name: "Money20/20 USA 2026",
    start: "2026-10-25",
    end: "2026-10-28",
    website: "https://www.money2020.com/",
    location: "Las Vegas, NV",
    region: "Other US",
    type: "Conference",
    industry: "Fintech",
    verticals: ["Fintech"],
    submitter: "Devin Cole",
    submittedRole: "Sales",
    sponsorCost: "45000",
    regCost: "2999",
    notes: "The fintech event of record. Large, but strong buyer presence if we target meetings.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 3, fuelEngine: 4, quality: 3, cost: 3 },
    total: 21,
    verdict: "Selective Pursue",
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d7",
    name: "AWS re:Invent 2026",
    start: "2026-11-30",
    end: "2026-12-04",
    website: "https://reinvent.awsevents.com/",
    location: "Las Vegas, NV",
    region: "Other US",
    type: "Conference",
    industry: "Cloud / DevTools",
    verticals: ["DevTools", "AI/ML"],
    submitter: "Priya Shah",
    submittedRole: "Product",
    sponsorCost: "50000",
    regCost: "2099",
    notes: "Huge developer audience. Only worth it with a strong meeting plan and a hosted session.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 3, fuelEngine: 4, quality: 3, cost: 3 },
    total: 21,
    verdict: "Selective Pursue",
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d8",
    name: "B2B Marketing Exchange 2026",
    start: "2026-02-23",
    end: "2026-02-25",
    website: "https://www.b2bmx.com/",
    location: "Scottsdale, AZ",
    region: "Other US",
    type: "Summit",
    industry: "Martech",
    verticals: ["Martech"],
    submitter: "Zoei",
    submittedRole: "Marketing",
    sponsorCost: "18000",
    regCost: "1795",
    notes: "Practitioner-heavy demand gen crowd. Good content and speaking opportunities.",
    status: "scheduled",
    scored: true,
    scores: { strategicFit: 4, icpCoverage: 4, icpComposition: 4, fuelEngine: 4, quality: 4, cost: 3 },
    total: 23,
    verdict: "Selective Pursue",
    whosGoing: ["Devin Cole"],
    reviewNotes: "",
  },
  {
    id: "d9",
    name: "Web Summit 2026",
    start: "2026-11-02",
    end: "2026-11-05",
    website: "https://websummit.com/",
    location: "Lisbon, Portugal",
    region: "International",
    type: "Conference",
    industry: "Technology",
    verticals: ["SaaS", "AI/ML"],
    submitter: "Marcus Lee",
    submittedRole: "Sales",
    sponsorCost: "35000",
    regCost: "950",
    notes: "Massive and broad. ICP density is low and travel is expensive; hard to justify.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 3, icpCoverage: 3, icpComposition: 2, fuelEngine: 3, quality: 2, cost: 2 },
    total: 15,
    verdict: "Monitor",
    whosGoing: [],
    reviewNotes: "Only if we can stack customer meetings in EU.",
  },
  {
    id: "d10",
    name: "RSA Conference 2026",
    start: "2026-04-27",
    end: "2026-04-30",
    website: "https://www.rsaconference.com/",
    location: "San Francisco, CA",
    region: "US hub",
    type: "Conference",
    industry: "Cybersecurity",
    verticals: ["Cybersecurity"],
    submitter: "Devin Cole",
    submittedRole: "Sales",
    sponsorCost: "60000",
    regCost: "1795",
    notes: "Enormous expo floor dilutes density. Home hub helps, but sponsorship is pricey.",
    status: "considering",
    scored: true,
    scores: { strategicFit: 3, icpCoverage: 4, icpComposition: 2, fuelEngine: 3, quality: 2, cost: 3 },
    total: 17,
    verdict: "Monitor",
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d11",
    name: "Martech Expo Global 2026",
    start: "2026-08-12",
    end: "2026-08-13",
    website: "",
    location: "Anaheim, CA",
    region: "Other US",
    type: "Expo",
    industry: "Martech",
    verticals: ["Martech"],
    submitter: "Marcus Lee",
    submittedRole: "Sales",
    sponsorCost: "12000",
    regCost: "0",
    notes: "Open expo, mixed audience, low ICP concentration. Not worth the time.",
    status: "skip",
    scored: true,
    scores: { strategicFit: 2, icpCoverage: 3, icpComposition: 1, fuelEngine: 2, quality: 1, cost: 2 },
    total: 11,
    verdict: "Skip",
    whosGoing: [],
    reviewNotes: "Density too low for the effort.",
  },
  {
    id: "d12",
    name: "HLTH 2026",
    start: "2026-10-18",
    end: "2026-10-21",
    website: "https://www.hlth.com/",
    location: "Las Vegas, NV",
    region: "Other US",
    type: "Conference",
    industry: "Healthtech",
    verticals: ["Healthtech"],
    submitter: "Marcus Lee",
    submittedRole: "Sales",
    sponsorCost: "",
    regCost: "",
    notes: "Rep flagged interest for the healthtech push. Needs scoring and a decision.",
    status: "submitted",
    scored: false,
    whosGoing: [],
    reviewNotes: "",
  },
  {
    id: "d13",
    name: "AI Dev World 2026",
    start: "2026-10-27",
    end: "2026-10-29",
    website: "",
    location: "Santa Clara, CA",
    region: "Other US",
    type: "Conference",
    industry: "AI / DevTools",
    verticals: ["AI/ML", "DevTools"],
    submitter: "Priya Shah",
    submittedRole: "Product",
    sponsorCost: "",
    regCost: "",
    notes: "Strong developer and AI audience. Evaluate for the DevTools motion.",
    status: "submitted",
    scored: false,
    whosGoing: [],
    reviewNotes: "",
  },
];

// ── Generic estimator ───────────────────────────────────────────────────
// Same transparent, deterministic approach as the case-study estimator, but
// with generic B2B / GTM ICP signals instead of any client-specific ones.
const DEMO_ICP_TERMS = [
  "vp",
  "director",
  "head of",
  "founder",
  "ceo",
  "cmo",
  "cro",
  "revops",
  "rev ops",
  "demand gen",
  "growth",
  "practitioner",
  "buyer",
  "operator",
  "enterprise",
  "platform",
  "developer",
  "engineer",
  "gtm",
  "marketer",
  "sales",
];

const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));

export function estimateScoresDemo(
  facts: EventFacts,
  verticalsList: string[] = demoVerticals
): ScoreDraft {
  const hay = `${facts.industry || ""} ${facts.notes || ""} ${facts.name || ""}`.toLowerCase();
  const region = regionFromLoc(facts.location || "");
  const type = (facts.type || "").toLowerCase();

  const matchedVerticals = verticalsList.filter((v) => hay.includes(v.toLowerCase()));
  const icpHits = DEMO_ICP_TERMS.filter((t) => hay.includes(t)).length;

  const strategicFit = clamp(2.5 + Math.min(matchedVerticals.length, 3) * 0.6 + icpHits * 0.2);
  const icpCoverage = clamp(2 + icpHits * 0.5);

  const curated = /summit|forum|invitational|dinner|roundtable|workshop|mastermind/.test(type);
  const expo = /expo|tradeshow|trade show|fair/.test(type);
  const icpComposition = clamp(3 + (curated ? 1 : 0) - (expo ? 1 : 0) + Math.min(icpHits, 3) * 0.2);

  const fuelEngine = clamp(2.5 + Math.min(icpHits, 4) * 0.4 + matchedVerticals.length * 0.2);
  const quality = clamp(3 + (curated ? 1 : 0) - (expo ? 1 : 0));
  const cost = clamp(region === "US hub" ? 4 : region === "Other US" ? 3.5 : 2.5);

  const scores: Scores = { strategicFit, icpCoverage, icpComposition, fuelEngine, quality, cost };

  const verticals = matchedVerticals.length ? matchedVerticals.slice(0, 3) : ["Cross-industry"];
  const total = totalOf(scores);
  const verdict = verdictOf(total);

  const rationale =
    `Rubric estimate: ${verdict.toLowerCase()} (${total}/30). ` +
    (region === "US hub"
      ? "Home hub keeps cost efficient. "
      : region === "International"
      ? "International, so justify with customer meetings or event-stacking. "
      : "") +
    (matchedVerticals.length
      ? `Reaches ${matchedVerticals.slice(0, 3).join(", ")}. `
      : "Segment fit unclear from the details. ") +
    (curated
      ? "Curated format concentrates ICP density."
      : expo
      ? "Open expo floor dilutes ICP density."
      : "Adjust each score against what you know.");

  const actionItems: string[] = [];
  if (quality >= 4) actionItems.push("Pursue a speaking slot or hosted session.");
  else actionItems.push("Confirm the format and whether speaking is available.");
  if (region !== "US hub") actionItems.push("Stack customer meetings around the dates to justify travel.");
  actionItems.push("Verify all-in cost against expected qualified conversations.");

  return { scores, verticals, rationale, actionItems: actionItems.slice(0, 3) };
}
