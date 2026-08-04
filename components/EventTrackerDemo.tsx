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
  rubricCredit: "a consistent rubric",
  calibrationNote: "reading the event and applying the evaluator’s calibration",
  estimator: estimateScoresDemo,
};

export default function EventTrackerDemo() {
  return <EventsTracker config={demoConfig} />;
}
