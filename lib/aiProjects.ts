export type AiProjectStatus = "Live" | "In progress" | "Prototype" | "Archived";

export type AiProject = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  status: AiProjectStatus;
  /** Deployed app (e.g. a Vercel URL). Renders the "Live" action. */
  liveUrl?: string;
  /** Source repository. Renders the "Code" action. */
  repoUrl?: string;
};

// Placeholder AI engineering projects — swap titles, copy, and links with the
// real thing. Each project needs at least one of `liveUrl` or `repoUrl`.
export const aiProjects: AiProject[] = [
  {
    id: 1,
    title: "Conference Scout",
    tagline: "Claude skill that scores and prioritizes events for pipeline",
    description:
      "A Claude skill that ingests a conference URL, scores it against an ICP rubric, and returns a sponsor / speak / attend / skip call with reasoning — the same engine behind Roebling's 25+ event pipeline.",
    stack: ["Claude Skills", "TypeScript", "Firecrawl", "Vercel"],
    year: "2026",
    status: "Live",
    liveUrl: "https://example.vercel.app",
    repoUrl: "https://github.com/zjben10",
  },
  {
    id: 2,
    title: "Follow-up Engine",
    tagline: "Post-event outreach drafted from CRM signals",
    description:
      "Turns raw post-event contact lists into personalized, on-brand follow-up drafts by joining CRM enrichment with a brand-voice prompt chain, then queues them for review.",
    stack: ["Next.js", "Claude API", "Attio", "n8n"],
    year: "2026",
    status: "In progress",
    repoUrl: "https://github.com/zjben10",
  },
  {
    id: 3,
    title: "AEO Radar",
    tagline: "Tracks brand citations across answer engines",
    description:
      "Monitors how often a brand is cited across AI answer engines, clusters the prompts that surface it, and flags coverage gaps to feed the content roadmap.",
    stack: ["Python", "Claude API", "Playwright", "Vercel"],
    year: "2026",
    status: "Prototype",
    liveUrl: "https://example.vercel.app",
    repoUrl: "https://github.com/zjben10",
  },
];
