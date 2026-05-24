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
  videos?: { label: string; url: string }[];
  heroImage?: string;
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
    metric: "",
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
    metric: "1,500+ attendees at first digital-only event",
    keyOutcomes: [
      "Secured 100+ sales meetings across pre-, during-, and post-event promotion — meeting Q3 2023 business goals.",
      "Produced dscout's first digital-only event with 1,500+ attendees.",
      "Created case study pieces and 20+ evergreen content pieces for the People Nerds blog, feeding the content engine for quarterly themes.",
    ],
    challenge:
      "Support the sales team in booking 100+ meetings from the event, feed the content engine with repurposable material for quarterly evergreen themes, and announce new dscout platform features — all in a fully virtual format. Working with Leadership, Marketing, and Sales, the challenge was to produce a first-of-its-kind digital-only conference that delivered on both pipeline and content goals simultaneously.",
    scope: [
      "Virtual event production",
      "Content strategy",
      "Sales enablement",
      "Digital programming",
    ],
    tools: ["Hopin", "Figma", "Notion", "Webflow"],
    heroImage: "/images/people nerds 2022.jpg",
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
    metric: "Generated $1.4M in new and existing business revenue",
    keyOutcomes: [
      "Generated $1.4M in new and existing business revenue.",
      "Achieved a 70% attendee show rate.",
      "Retrenched brand high ground and created a stronger link between People Nerds and the dscout platform, driving measurable platform usage and reducing churn.",
      "Translated a design-forward vision into a $500,000 on-budget reality — educating cross-functional teams on event marketing goals and establishing systems across the marketing tool stack for budgeting, design, and stakeholder collaboration.",
    ],
    challenge:
      "Link the People Nerds brand with the dscout platform, reduce churn through platform education, and get researchers in a room to share best practices — all at scale, live, in San Francisco. Working with Leadership, Marketing, and Sales, the challenge was to create dscout's inaugural in-person conference: curate a speaker program, build a design-forward experience, and execute it within budget.",
    scope: [
      "Inaugural event strategy",
      "Speaker programming",
      "Budget management ($500K)",
      "Cross-functional coordination",
    ],
    tools: ["Eventbrite", "Figma", "Notion", "Canva"],
    heroImage: "/images/PN 2019 Image .001.jpeg",
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
    metric: "4 full-length videos produced for brand event",
    keyOutcomes: [
      "Increased participant “Scout” panel growth through community-centered video storytelling.",
      "Produced evergreen video content used to promote the participant platform on an ongoing basis.",
      "Project managed timelines from survey creation through post-production, ensuring timely delivery for event debut.",
      "Led creative direction and post-production edits across four full-length Scout profile videos, aired live at brand event.",
    ],
    challenge:
      "Showcase core platform elements to increase usage of dscout's participant management tool. With stakeholders across the CEO, Content, and External Editors, the project needed to produce compelling, evergreen video content that spotlighted the Scout community — driving participant panel growth and giving the brand a human story to tell.",
    scope: [
      "Project management",
      "Creative direction",
      "Video production",
      "Post-production",
    ],
    tools: ["Premiere Pro", "Notion", "Frame.io", "YouTube"],
    videos: [
      { label: "JJ", url: "https://www.youtube.com/watch?v=FZkmQhIB9Sc" },
      { label: "Caroline", url: "https://www.youtube.com/watch?v=tZfJEyS4xxs" },
      { label: "Steph", url: "https://www.youtube.com/watch?v=dmcfZC9BER8" },
      { label: "Joyce", url: "https://www.youtube.com/watch?v=sXuC88bGaY0" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
