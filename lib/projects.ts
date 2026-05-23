export type Project = {
  id: number;
  slug: string;
  year: string;
  date: string;
  title: string;
  client: string;
  tags: string[];
  description: string;
  metric: string;
  // project page content
  keyOutcomes: string[];
  challenge: string;
  scope: string[];
  tools: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "brand-campaign",
    year: "2025",
    date: "March 2025",
    title: "Brand Campaign",
    client: "Project Client · Brand strategy, identity, launch",
    tags: ["Brand", "Web", "Strategy"],
    description:
      "Placeholder description for this brand campaign project. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Brand strategy",
      "Creative direction",
      "Copywriting",
      "Campaign rollout",
    ],
    tools: ["Figma", "Notion", "Meta Ads Manager", "Mailchimp"],
  },
  {
    id: 2,
    slug: "seasonal-campaign",
    year: "2025",
    date: "January 2025",
    title: "Seasonal Campaign",
    client: "Project Client · Creative direction, copy, paid social",
    tags: ["Campaign", "Copy", "Paid"],
    description:
      "Placeholder description for this seasonal campaign. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Creative direction",
      "Copy",
      "Paid social",
      "Email",
    ],
    tools: ["Figma", "Meta Ads Manager", "Klaviyo", "Google Analytics"],
  },
  {
    id: 3,
    slug: "launch-playbook",
    year: "2024",
    date: "September 2024",
    title: "Launch Playbook",
    client: "Project Client · Go-to-market, sales collateral",
    tags: ["GTM", "B2B"],
    description:
      "Placeholder description for this launch playbook project. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Go-to-market strategy",
      "Sales deck",
      "Onboarding system",
      "Channel planning",
    ],
    tools: ["Notion", "Canva", "HubSpot", "Loom"],
  },
  {
    id: 4,
    slug: "growth-campaign",
    year: "2024",
    date: "June 2024",
    title: "Growth Campaign",
    client: "Project Client · Digital marketing, lifecycle",
    tags: ["Digital", "Email", "Paid"],
    description:
      "Placeholder description for this growth campaign. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Lifecycle email",
      "Paid acquisition",
      "Landing pages",
      "A/B testing",
    ],
    tools: ["Klaviyo", "Google Ads", "Unbounce", "Hotjar"],
  },
  {
    id: 5,
    slug: "brand-identity",
    year: "2024",
    date: "March 2024",
    title: "Brand Identity",
    client: "Project Client · Brand strategy, visual identity",
    tags: ["Brand", "Strategy"],
    description:
      "Placeholder description for this brand identity project. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Brand positioning",
      "Visual identity",
      "Tone of voice",
      "Brand guidelines",
    ],
    tools: ["Figma", "Adobe Illustrator", "Notion", "Miro"],
  },
  {
    id: 6,
    slug: "content-system",
    year: "2024",
    date: "January 2024",
    title: "Content System",
    client: "Project Client · Content strategy, editorial",
    tags: ["Content", "Editorial"],
    description:
      "Placeholder description for this content system project. Replace with your real project story and outcomes.",
    metric: "Placeholder Metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Content strategy",
      "Editorial calendar",
      "SEO",
      "Social playbook",
    ],
    tools: ["Notion", "Ahrefs", "Buffer", "Webflow"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
