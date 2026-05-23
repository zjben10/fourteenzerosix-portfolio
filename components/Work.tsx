const projects = [
  {
    id: 1,
    title: "Brand Campaign",
    category: "Brand Strategy",
    year: "2025",
    accent: "var(--brand-terracotta)",
  },
  {
    id: 2,
    title: "Social Series",
    category: "Content Marketing",
    year: "2025",
    accent: "var(--brand-sage)",
  },
  {
    id: 3,
    title: "Launch Playbook",
    category: "Go-to-Market",
    year: "2024",
    accent: "var(--brand-earth)",
  },
  {
    id: 4,
    title: "Growth Campaign",
    category: "Digital Marketing",
    year: "2024",
    accent: "var(--brand-terracotta)",
  },
  {
    id: 5,
    title: "Brand Identity",
    category: "Brand Strategy",
    year: "2024",
    accent: "var(--brand-sage)",
  },
  {
    id: 6,
    title: "Content System",
    category: "Content Marketing",
    year: "2024",
    accent: "var(--brand-earth)",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <h2
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            Selected Work
          </h2>
          <span
            className="text-xs"
            style={{ color: "rgba(26,23,20,0.35)" }}
          >
            {projects.length} Projects
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const tall = index === 0 || index === 4;

  return (
    <article
      className={`group relative overflow-hidden cursor-pointer ${tall ? "md:row-span-1" : ""}`}
      style={{
        backgroundColor: project.accent,
        aspectRatio: tall ? "4/5" : "4/3",
      }}
    >
      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(242,238,230,0.25)", color: "#F2EEE6" }}
          >
            {project.category}
          </span>
          <span
            className="text-[10px] tracking-wider"
            style={{ color: "rgba(242,238,230,0.6)" }}
          >
            {project.year}
          </span>
        </div>

        <div>
          <div
            className="w-6 h-px mb-3 group-hover:w-10 transition-all duration-300"
            style={{ backgroundColor: "rgba(242,238,230,0.5)" }}
          />
          <h3
            className="text-xl md:text-2xl font-semibold leading-tight"
            style={{ color: "#F2EEE6", fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: "rgba(242,238,230,0.7)" }}
          >
            Coming soon
          </p>
        </div>
      </div>
    </article>
  );
}
