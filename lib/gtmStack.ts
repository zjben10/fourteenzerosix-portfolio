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
    tools: ["Claude Code", "Claude Skills", "Claude API", "MCP", "n8n", "Firecrawl"],
  },
  {
    label: "CRM & GTM Data",
    tools: ["HubSpot", "Attio", "Salesforce", "Clay", "FullEnrich"],
  },
  {
    label: "Demand Gen & Outbound",
    tools: ["Instantly", "HeyReach", "Klaviyo"],
  },
  {
    label: "Analytics & AEO",
    tools: ["PostHog", "Google Analytics", "Profound", "Ahrefs"],
  },
  {
    label: "Content & Design",
    tools: ["Figma", "Canva", "Webflow", "Notion"],
  },
  {
    label: "Web & Dev",
    tools: ["Next.js", "React", "TypeScript", "Vercel", "GitHub"],
  },
];
