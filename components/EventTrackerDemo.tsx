"use client";

import EventsTracker, { type TrackerConfig } from "@/components/EventsTracker";
import {
  demoRubric,
  demoVerticals,
  demoSeedEvents,
  estimateScoresDemo,
  DEMO_STORAGE_KEY,
} from "@/lib/demoEvents";

// De-branded config for the public demo. No logo (text wordmark), no contact
// pipeline (that layer stays in the case study), and a generic rubric,
// verticals, sample events, and estimator.
const demoConfig: TrackerConfig = {
  brandName: "event tracker",
  subtitle: "evaluator",
  reviewerName: "Zoei",
  seed: demoSeedEvents,
  rubric: demoRubric,
  verticals: demoVerticals,
  storageKey: DEMO_STORAGE_KEY,
  dashboardBlurb: "every event the team is tracking for 2026.",
  calibrationNote: "reading the event and applying the evaluator’s calibration",
  pipelineHref: "/ai-projects/event-tracker/pipeline",
  pipelineLabel: "contact pipeline",
  pipelineSubtext: "add contacts · sales follow-up",
  pipelineDetailNote: "add contacts and work the sales follow-up for this event",
  // Sage palette (the portfolio brand) instead of Roebling's blue. Swapping
  // these four values re-themes the whole demo.
  theme: {
    accent: "#5D7A55",
    accentDeep: "#47603F",
    accentDeepAlt: "#3B5233",
    accentSoft: "#E9EFE4",
  },
  estimator: estimateScoresDemo,
};

export default function EventTrackerDemo() {
  return <EventsTracker config={demoConfig} />;
}
