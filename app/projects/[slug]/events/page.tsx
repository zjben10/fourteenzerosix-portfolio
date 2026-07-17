import Link from "next/link";
import { notFound } from "next/navigation";
import { Inter, Geist_Mono } from "next/font/google";
import { getProjectBySlug } from "@/lib/projects";
import EventsTracker from "@/components/EventsTracker";

// Inter for body/headings; Geist Mono as the technical accent (Aptos Mono
// is first in the CSS stack in the component, so a self-hosted Aptos Mono
// would take over automatically).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Only the Roebling GTM project carries the events tracker.
const EVENTS_SLUG = "roebling-gtm";

export function generateStaticParams() {
  return [{ slug: EVENTS_SLUG }];
}

export const metadata = {
  title: "Roebling Events Tracker | Zoei Benzon",
  description:
    "Internal tool built for Roebling's event function: every 2026 event scored against the Roebling go/no-go rubric.",
};

export default async function EventsTrackerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (slug !== EVENTS_SLUG || !project) notFound();

  const tracker = (
    <div
      className={`${inter.variable} ${geistMono.variable}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <EventsTracker />
      <Link
        href={`/projects/${EVENTS_SLUG}`}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 60,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 16px",
          borderRadius: 10,
          background: "rgba(35,35,35,0.92)",
          color: "#ffffff",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.02em",
          textDecoration: "none",
          boxShadow: "0 8px 24px rgba(35,35,35,0.22)",
          backdropFilter: "blur(6px)",
        }}
      >
        ← back to case study
      </Link>
    </div>
  );

  // No separate gate here — the only password is entering the Roebling
  // portfolio (the case study). The tracker is only linked from there.
  return tracker;
}
