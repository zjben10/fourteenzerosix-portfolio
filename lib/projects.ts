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
  keyOutcomes: string[];
  challenge: string;
  scope: string[];
  tools: string[];
  password?: string;
  externalUrl?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "roebling-gtm",
    year: "2026",
    date: "2026",
    title: "Roebling GTM",
    client: "Roebling",
    tags: ["B2B", "GTM", "Content"],
    description:
      "Placeholder description for this go-to-market project. Replace with your real project story and outcomes.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Go-to-market strategy",
      "Content",
      "B2B positioning",
    ],
    tools: ["Notion", "HubSpot", "Google Docs"],
    password: "capitalprojects",
  },
  {
    id: 2,
    slug: "better-with-bio-campaign",
    year: "2025",
    date: "2025",
    title: "Better with Bio Campaign",
    client: "Roebling (formerly known as Synonym)",
    tags: ["Brand", "Partnerships", "GTM"],
    description:
      "Placeholder description for this brand campaign. Replace with your real project story and outcomes.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Brand campaign",
      "Partnerships",
      "Go-to-market strategy",
    ],
    tools: ["Figma", "Notion", "Canva"],
  },
  {
    id: 3,
    slug: "community-building-outdoor-color-crew",
    year: "2024",
    date: "2024",
    title: "Community Building & Engagement",
    client: "Outdoor Color Crew",
    tags: ["Brand", "Strategy", "Partnerships"],
    description:
      "Built and launched the brand identity and community strategy for Outdoor Color Crew, driving engagement through partnerships and grassroots marketing.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Brand identity",
      "Community strategy",
      "Partnership development",
      "Launch marketing",
    ],
    tools: ["Figma", "Notion", "Instagram", "Canva"],
  },
  {
    id: 4,
    slug: "article-sustainable-rubber",
    year: "2024",
    date: "2024",
    title: "Article on Sustainable Rubber",
    client: "Climate Drift",
    tags: ["Content", "Climate Tech Accelerator"],
    description:
      "Authored a long-form article for Climate Drift exploring sustainable rubber innovation within the climate tech accelerator ecosystem.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Research",
      "Long-form writing",
      "Editorial strategy",
    ],
    tools: ["Notion", "Google Docs", "Ahrefs"],
    externalUrl: "https://climatedrift.substack.com/p/are-there-sustainable-alternatives",
  },
  {
    id: 5,
    slug: "people-nerds-webinars",
    year: "2018–2023",
    date: "2018–2023",
    title: "People Nerds Webinars",
    client: "dscout",
    tags: ["Brand", "Web", "B2B", "Digital Media"],
    description:
      "Led events and digital media strategy for the People Nerds webinar series across a five-year run, building a loyal UX research community.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Event strategy",
      "Digital media",
      "Community building",
      "Web",
    ],
    tools: ["Zoom", "Notion", "HubSpot", "Webflow"],
  },
  {
    id: 6,
    slug: "people-nerds-virtual-conference",
    year: "2022",
    date: "2022",
    title: "People Nerds Virtual Conference",
    client: "dscout",
    tags: ["Brand", "Web", "B2B", "User Conference"],
    description:
      "Produced and branded dscout's fully virtual People Nerds user conference, bringing together the UX research community online.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Event production",
      "Brand experience",
      "Web",
      "Digital programming",
    ],
    tools: ["Hopin", "Figma", "Notion", "Webflow"],
  },
  {
    id: 7,
    slug: "customer-engagement-dscout",
    year: "2020",
    date: "2020",
    title: "Customer Engagement",
    client: "dscout",
    tags: ["GTM", "B2B", "Campaign"],
    description:
      "Drove customer marketing, lifecycle email, and sales enablement programs that contributed directly to new and existing revenue at dscout.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Customer marketing",
      "Lifecycle email",
      "Sales enablement",
      "Campaign strategy",
    ],
    tools: ["HubSpot", "Klaviyo", "Notion", "Google Analytics"],
  },
  {
    id: 8,
    slug: "people-nerds-conference",
    year: "2019",
    date: "2019",
    title: "People Nerds Conference",
    client: "dscout",
    tags: ["Brand", "In-Person Events", "B2B"],
    description:
      "Designed and executed the in-person People Nerds conference — an immersive brand experience for the UX research community.",
    metric: "Generated $1.4M of new and existing revenue",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Event production",
      "Brand experience",
      "Venue & logistics",
      "Programming",
    ],
    tools: ["Eventbrite", "Figma", "Notion", "Canva"],
  },
  {
    id: 9,
    slug: "design-operations",
    year: "2019–2023",
    date: "2019 & 2023",
    title: "Design Operations",
    client: "dscout",
    tags: ["Design", "Operations"],
    description:
      "Managed design production and operations at dscout across two separate engagements, building systems that scaled creative output.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Design production",
      "Process systems",
      "Asset management",
      "Team coordination",
    ],
    tools: ["Figma", "Notion", "Airtable", "Loom"],
  },
  {
    id: 10,
    slug: "scout-stories",
    year: "2019",
    date: "2019",
    title: "Scout Stories",
    client: "dscout",
    tags: ["Video", "UX Research", "Operations"],
    description:
      "Produced Scout Stories, a content series spotlighting UX research insights and the dscout community through video and editorial.",
    metric: "Placeholder metric",
    keyOutcomes: [
      "Placeholder outcome — swap with a real result from this project.",
      "Placeholder outcome — quantify impact where possible.",
      "Placeholder outcome — focus on business value delivered.",
    ],
    challenge:
      "Describe the strategic or creative problem this project set out to solve. What was the tension, constraint, or opportunity that shaped the work?",
    scope: [
      "Video production",
      "Content strategy",
      "UX research storytelling",
      "Operations",
    ],
    tools: ["Premiere Pro", "Notion", "Frame.io", "YouTube"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
