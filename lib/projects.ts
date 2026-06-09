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
    tags: ["B2B", "GTM"],
    description:
      "First marketing hire at Roebling — led the Synonym-to-Roebling rebrand and built the company's entire marketing function from zero ahead of its July 2025 self-service launch.",
    metric: "Supported $300K revenue in first months post-rebrand",
    keyOutcomes: [
      "Led the end-to-end rebrand from Synonym to Roebling — .co to .com domain migration, brand guidelines (Attila Sans Sharp + Inter, navy/gold), design engagement with Archie, and the brand voice framework with 'numbers that hold' as the positioning anchor — supporting 8 pre-self-service deals and $300K in revenue in the first months post-rebrand.",
      "Ran an intensive CRO and analytics push ahead of the July 1 self-service launch: installed PostHog, diagnosed a zero-conversion tracking gap and a split EAP URL issue (/eap vs /early-access-program), and correctly identified a messaging and offer gap — not a demand problem — then overhauled the homepage and use-case landing pages (Capital Projects, R&D, Equipment Manufacturers) grounded in Attio call recordings and Edward's actual vocabulary.",
      "Owned end-to-end event strategy across 25+ annual tradeshows and conferences — including target account selection, pre-event outreach (automating attendee list scraping to build targeted sequences), on-site execution, and post-event conversion. Created the Steel in the Ground dinner series to push late-stage pipeline and early-stage prospects down the funnel.",
      "Built the full Q2 demand gen slate (two Roland Berger co-hosted webinars, ChemE Show, Reindustrialize Detroit, R&D-to-FID gated asset, EAP drip campaign), the nine-piece blog series across three content pillars, and the 'R&D to FID in the Age of AI' handbook. Built a tiered media list of 30 reporters and podcast pitch workflow with Clay and FullEnrich.",
      "Built a marketing tech stack from zero — PostHog, Clay, FullEnrich, and custom Claude skills for conference scoring, prioritization, and post-event follow-up — reducing manual work and grounding every decision in real call data. Onboarded a GTM engineer delivering weekly pipeline and marketing campaign reports to executive leadership.",
    ],
    challenge:
      "Roebling sells a technically complex product — process simulation and engineering decision support — to chemical engineers and capital project teams who are deeply skeptical of marketing that doesn't hold up. The job wasn't just to run campaigns. It was to build the entire marketing function from scratch, execute a full rebrand under a new company name, and drive pipeline toward a hard July 1 self-service launch — all while learning enough of the technical domain to make the copy credible to the people reading it. The throughline across everything: diagnose root causes, fix the underlying system, then build on solid ground.",
    scope: [
      "Rebrand & brand systems",
      "CRO, demand gen & content",
      "Event strategy (25+ annual)",
      "Marketing tech stack & team",
    ],
    tools: ["PostHog", "Attio", "Clay", "FullEnrich", "Notion"],
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
    metric: "",
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
    date: "Q3 & Q4 2020",
    title: "Customer Engagement",
    client: "dscout",
    tags: ["GTM", "B2B", "Campaign"],
    description:
      "dscout's product was powerful — but customers weren't activating. In 2020, I stepped into the gap between 'signed' and 'using it' to build an onboarding experience from scratch that actually stuck.",
    metric: "Doubled activation rates after one quarter",
    keyOutcomes: [
      "Doubled activation rates after one quarter — proof that the right onboarding experience changes behavior, not just awareness.",
      "The pain points surfaced through the program were significant enough that leadership staffed an entirely new team to own them long-term.",
      "For the first time, product designers and managers were looped into sales and success feedback — closing a loop that had been open for years.",
      "Built a full webinar practice from the ground up: pre-, during-, and post-event strategy, guest sourcing, design collaboration, and a handoff flow that made sure no lead fell through the cracks.",
    ],
    challenge:
      "It was mid-2020, and two of dscout's largest accounts weren't getting what they needed out of the platform. The product team was shipping, sales was closing — but nobody owned what happened after the contract was signed. Activation rates were suffering, and the silence between teams was getting louder. The opportunity was to step into that gap: design an onboarding experience that felt human, build a repeatable playbook, and get marketing, product, and sales aligned around the same customer for the first time.",
    scope: [
      "Customer onboarding",
      "Webinar strategy & execution",
      "Cross-functional coordination",
      "Post-webinar flow & sales handoff",
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
