import Link from "next/link";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import EventTrackerDemo from "@/components/EventTrackerDemo";

// Same fonts as the case-study tracker so the demo reads as the same app.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Event Tracker & Evaluator | Zoei Benzon",
  description:
    "A working demo of the Event Tracker & Evaluator: submit an event, score it against a consistent go / no-go rubric, and track the pipeline. Sample data only.",
  alternates: { canonical: "/ai-projects/event-tracker" },
};

export default function EventTrackerDemoPage() {
  return (
    <div
      className={`${inter.variable} ${geistMono.variable}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <EventTrackerDemo />
      <Link
        href="/ai-projects"
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
        ← back to AI projects
      </Link>
    </div>
  );
}
