import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

function RowContent({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2rem] gap-x-6 md:gap-x-10 py-8 md:py-10 items-start">
      <div>
        <h3
          className="text-xl md:text-2xl font-semibold leading-snug mb-1 transition-opacity group-hover:opacity-70"
          style={{ color: "rgba(242,238,230,0.95)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm mb-3" style={{ color: "rgba(242,238,230,0.4)" }}>
          {project.client}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full border"
              style={{ borderColor: "rgba(242,238,230,0.2)", color: "rgba(242,238,230,0.5)" }}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        {/* Description visible on mobile only — desktop uses its own grid column */}
        {project.description && (
          <p className="mt-3 text-sm leading-relaxed md:hidden" style={{ color: "rgba(242,238,230,0.8)" }}>
            {project.description}
          </p>
        )}
      </div>

      <div className="hidden md:block">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(242,238,230,0.8)" }}>
          {project.description}
        </p>
      </div>

      <div className="hidden md:flex items-start justify-end pt-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="project-arrow transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
  );
}

const rowStyle = { borderTop: "1px solid rgba(242,238,230,0.1)" };
const rowClass = "block group";

export default function Work() {
  return (
    <section
      id="work"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2
            className="text-3xl md:text-5xl font-semibold leading-tight"
            style={{ color: "rgba(242,238,230,0.95)" }}
          >
            Featured projects
          </h2>
        </div>

        <LabEntry />

        <div>
          {projects.filter((project) => !project.hidden).map((project) =>
            project.externalUrl ? (
              <a
                key={project.id}
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
                style={rowStyle}
              >
                <RowContent project={project} />
              </a>
            ) : (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={rowClass}
                style={rowStyle}
              >
                <RowContent project={project} />
              </Link>
            )
          )}
          <div style={rowStyle} />
        </div>
      </div>
    </section>
  );
}

function LabEntry() {
  return (
        <Link
          href="/lab"
          className="lab-entry group block mb-12 md:mb-16 rounded-2xl border p-8 md:p-10"
          style={{ borderColor: "rgba(242,238,230,0.15)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--brand-sage)" }}
              >
                <span aria-hidden="true">🔧</span> AI Marketing Engineering
              </p>
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{ color: "rgba(242,238,230,0.75)" }}
              >
                Small, shipped tools I&apos;ve built with Claude and code to make
                go-to-market work faster — each one deployed and open.
              </p>
            </div>
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
              style={{ color: "var(--brand-sage)" }}
            >
              Enter the Lab
              <svg
                className="lab-entry-arrow"
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 15L15 3M15 3H6M15 3V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </Link>
  );
}
