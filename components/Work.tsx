const projects = [
  {
    id: 1,
    year: "2025",
    title: "Brand Campaign",
    client: "Project Client · Brand strategy, identity, launch",
    tags: ["BRAND", "WEB", "STRATEGY"],
    description:
      "Placeholder description for this brand campaign project. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
  {
    id: 2,
    year: "2025",
    title: "Seasonal Campaign",
    client: "Project Client · Creative direction, copy, paid social",
    tags: ["CAMPAIGN", "COPY", "PAID"],
    description:
      "Placeholder description for this seasonal campaign. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
  {
    id: 3,
    year: "2024",
    title: "Launch Playbook",
    client: "Project Client · Go-to-market, sales collateral",
    tags: ["GTM", "B2B"],
    description:
      "Placeholder description for this launch playbook project. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
  {
    id: 4,
    year: "2024",
    title: "Growth Campaign",
    client: "Project Client · Digital marketing, lifecycle",
    tags: ["DIGITAL", "EMAIL", "PAID"],
    description:
      "Placeholder description for this growth campaign. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
  {
    id: 5,
    year: "2024",
    title: "Brand Identity",
    client: "Project Client · Brand strategy, visual identity",
    tags: ["BRAND", "STRATEGY"],
    description:
      "Placeholder description for this brand identity project. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
  {
    id: 6,
    year: "2024",
    title: "Content System",
    client: "Project Client · Content strategy, editorial",
    tags: ["CONTENT", "EDITORIAL"],
    description:
      "Placeholder description for this content system project. Replace with your real project story and outcomes.",
    metric: "PLACEHOLDER METRIC",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "var(--brand-terracotta)" }}
            >
              Selected Work
            </p>
            <h2
              className="text-3xl md:text-5xl font-semibold leading-tight"
              style={{ color: "rgba(242,238,230,0.95)" }}
            >
              Projects I&apos;ve built &amp;{" "}
              <em
                className="not-italic"
                style={{
                  fontStyle: "italic",
                  color: "var(--brand-terracotta)",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 400,
                }}
              >
                launched.
              </em>
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(242,238,230,0.4)" }}
          >
            Six placeholder engagements — swap in your real brand work,
            campaigns, and results.
          </p>
        </div>

        {/* Row list */}
        <div>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: (typeof projects)[0] }) {
  return (
    <article
      className="group relative cursor-pointer"
      style={{ borderTop: "1px solid rgba(242,238,230,0.1)" }}
    >
      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1fr_2rem] gap-x-6 md:gap-x-10 py-8 md:py-10 items-start">
        {/* Year */}
        <span
          className="text-xs pt-1 tabular-nums"
          style={{ color: "rgba(242,238,230,0.35)" }}
        >
          {project.year}
        </span>

        {/* Title + client + tags */}
        <div>
          <h3
            className="text-xl md:text-2xl font-semibold leading-snug mb-1 group-hover:opacity-80 transition-opacity"
            style={{ color: "rgba(242,238,230,0.95)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm mb-3"
            style={{ color: "rgba(242,238,230,0.4)" }}
          >
            {project.client}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: "rgba(242,238,230,0.2)",
                  color: "rgba(242,238,230,0.5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description + metric — hidden on mobile */}
        <div className="hidden md:block">
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "rgba(242,238,230,0.5)" }}
          >
            {project.description}
          </p>
          <span
            className="text-[11px] tracking-[0.15em] font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            {project.metric}
          </span>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-start justify-end pt-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "rgba(242,238,230,0.9)" }}
          >
            <path
              d="M3 15L15 3M15 3H6M15 3V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
