import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import EventPipelineDemo from "@/components/EventPipelineDemo";

// Same fonts as the tracker so the pipeline reads as one app.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sales Follow-Up | Event Tracker & Evaluator — Zoei Benzon",
  description:
    "The sales follow-up view of the Event Tracker & Evaluator demo: a rep's booked and met contacts with the source event, campaign, and same-company context attached, plus a mocked CRM push. Sample data only.",
  alternates: { canonical: "/ai-projects/event-tracker/pipeline" },
};

export default function EventPipelineDemoPage() {
  return (
    <div className={`${inter.variable} ${geistMono.variable}`}>
      <EventPipelineDemo />
    </div>
  );
}
