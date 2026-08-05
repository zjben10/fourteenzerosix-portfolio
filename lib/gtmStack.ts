export type StackCategory = {
  label: string;
  tools: string[];
};

// Marketing / GTM engineering & ops stack, grouped by function. Grounded in the
// tools used across the Roebling GTM work and the AI projects. Edit freely —
// add, remove, or reorder categories and tools and the Lab grid follows.
export const gtmStack: StackCategory[] = [
  {
    label: "AI & Automation",
    tools: ["Claude Code", "Claude Skills", "n8n", "Firecrawl", "Zapier"],
  },
  {
    label: "CRM & GTM Data",
    tools: [
      "HubSpot",
      "Attio",
      "Salesforce",
      "Pipedrive",
      "Apollo",
      "ZoomInfo",
      "Clay",
      "FullEnrich",
    ],
  },
  {
    label: "Demand Gen & Outbound",
    tools: ["Instantly", "HeyReach"],
  },
  {
    label: "Analytics & SEO/AEO",
    tools: ["PostHog", "Google Analytics", "Profound", "Ahrefs", "AirOps"],
  },
  {
    label: "Program Management",
    tools: ["Figma", "Webflow", "Framer", "Notion", "Asana"],
  },
  {
    label: "Web & Dev",
    tools: ["Vercel", "GitHub", "AI-Assisted Development"],
  },
];
