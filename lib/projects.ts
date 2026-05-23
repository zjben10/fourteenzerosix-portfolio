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
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "community-building-outdoor-color-crew",
    year: "2024",
    date: "2024",
    title: "Community Building & Engagement",
    client: "Outdoor Color Crew · Brand marketing, identity, launch, and partnerships",
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
    id: 2,
    slug: "article-sustainable-rubber",
    year: "2024",
    date: "2024",
    title: "Article on Sustainable Rubber",
    client: "Climate Drift · Climate tech accelerator program",
    tags: ["Content"],
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
  },
  {
    id: 3,
    slug: "people-nerds-webinars",
    year: "2018–2023",
    date: "2018–2023",
    title: "People Nerds Webinars",
    client: "dscout · Events and digital media strategy",
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
    id: 4,
    slug: "people-nerds-virtual-conference",
    year: "2022",
    date: "2022",
    title: "People Nerds Virtual Conference",
    client: "dscout · Brand event",
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
    id: 5,
    slug: "customer-engagement-dscout",
    year: "2020",
    date: "2020",
    title: "Customer Engagement",
    client: "dscout · Customer marketing, email, sales enablement",
    tags: ["GTM", "B2B", "Campaign"],
    description:
      "Drove customer marketing, lifecycle email, and sales enablement programs that contributed directly to new and existing revenue at dscout.",
    metric: "Generated $1.4M of new and existing revenue",
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
    id: 6,
    slug: "people-nerds-conference",
    year: "2019",
    date: "2019",
    title: "People Nerds Conference",
    client: "dscout · Brand event and experience",
    tags: ["Brand", "In-Person Events", "B2B"],
    description:
      "Designed and executed the in-person People Nerds conference — an immersive brand experience for the UX research community.",
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
      "Venue & logistics",
      "Programming",
    ],
    tools: ["Eventbrite", "Figma", "Notion", "Canva"],
  },
  {
    id: 7,
    slug: "design-operations",
    year: "2019–2023",
    date: "2019 & 2023",
    title: "Design Operations",
    client: "dscout · Design production",
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
    id: 8,
    slug: "scout-stories",
    year: "2019",
    date: "2019",
    title: "Scout Stories",
    client: "dscout · Content production",
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
