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
    title: "Sales Copilot",
    tagline: "A sales follow-up view with marketing's context built in",
    description:
      "Gives each sales rep a focused, actionable follow-up list of the people they booked or met, with marketing's context attached to every card. Each contact carries the event that sourced them, the campaign that brought them in, and everyone else the team is working at the same company. When a contact turns into an opportunity, it pushes to the CRM once, so marketing no longer has to re-enter it by hand.",
    stack: ["Claude Code", "Next.js", "TypeScript", "Vercel"],
    year: "2026",
    status: "Live",
    liveUrl: "https://sales-copilot-kappa-lime.vercel.app/",
  },
];
