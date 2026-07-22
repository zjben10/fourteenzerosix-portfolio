import { notFound } from "next/navigation";
import { Inter, Geist_Mono } from "next/font/google";
import { getProjectBySlug } from "@/lib/projects";
import EventPipeline from "@/components/EventPipeline";

// Same fonts as the tracker so the pipeline is visually one app, not a second
// product bolted on.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

// The pipeline lives under the same Roebling GTM project as the tracker.
const EVENTS_SLUG = "roebling-gtm";

export function generateStaticParams() {
  return [{ slug: EVENTS_SLUG }];
}

export const metadata = {
  title: "Roebling Event Pipeline | Zoei Benzon",
  description:
    "The tracker's contact layer: one event object, three role-aware views (BD, sales, marketing) turning event outreach into pipeline.",
};

export default async function EventPipelinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (slug !== EVENTS_SLUG || !project) notFound();

  return (
    <div className={`${inter.variable} ${geistMono.variable}`}>
      <EventPipeline />
    </div>
  );
}
