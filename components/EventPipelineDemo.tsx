"use client";

import EventPipeline, { type PipelineConfig } from "@/components/EventPipeline";
import {
  demoPipelineEvents,
  demoEventById,
  buildDemoContacts,
  DEMO_PIPELINE_EVENT_ID,
  DEMO_PIPELINE_STORAGE_KEY,
} from "@/lib/demoPipeline";

// De-branded config: the capture (In-Event) and sales follow-up views of the
// pipeline, themed to match the demo tracker (sage) and linking back into the
// AI projects pages. Opens on the sales view; In-Event is where contacts get
// added from an event (one at a time or via paste/CSV import).
const demoPipelineConfig: PipelineConfig = {
  brandName: "event tracker",
  subtitle: "contact pipeline",
  caseStudyHref: "/ai-projects",
  caseStudyLabel: "← AI projects",
  trackerHref: "/ai-projects/event-tracker",
  storageKey: DEMO_PIPELINE_STORAGE_KEY,
  events: demoPipelineEvents(),
  demoEventId: DEMO_PIPELINE_EVENT_ID,
  seedContacts: buildDemoContacts,
  lookupEvent: demoEventById,
  defaultRole: "sales",
  roles: ["bd", "sales"],
  theme: {
    accent: "#5D7A55",
    accentDeep: "#47603F",
    accentDeepAlt: "#3B5233",
    accentSoft: "#E9EFE4",
  },
};

export default function EventPipelineDemo() {
  return <EventPipeline config={demoPipelineConfig} />;
}
