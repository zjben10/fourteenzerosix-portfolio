import Link from "next/link";
import { aiProjects, type AiProject } from "@/lib/aiProjects";

const statusColor: Record<AiProject["status"], string> = {
  Live: "var(--brand-sage)",
  "In progress": "#C9A25E",
  Prototype: "#C9A25E",
  Archived: "rgba(242,238,230,0.4)",
};

function GitHubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.478 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.216.694.825.576C20.565 22.297 24 17.797 24 12.5 24 5.87 18.627.5 12 .5z" />
    </svg>
  );
}

function VercelMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 22 20H2L12 2z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      className="lab-arrow"
      width="13"
      height="13"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14L14 4M14 4H6M14 4V12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: AiProject }) {
  return (
    <article className="lab-card rounded-xl p-6 md:p-8 flex flex-col h-full">
      {/* Index · status */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <span className="lab-index text-4xl md:text-5xl font-semibold leading-none tracking-tight">
          {String(project.id).padStart(2, "0")}
        </span>
        <span
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase pt-1"
          style={{ color: statusColor[project.status] }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusColor[project.status] }}
          />
          {project.status}
        </span>
      </div>

      {/* Title · tagline */}
      <h3
        className="text-xl md:text-2xl font-semibold leading-snug mb-2"
        style={{ color: "rgba(242,238,230,0.98)" }}
      >
        {project.title}
      </h3>
      <p
        className="text-sm font-medium mb-4"
        style={{ color: "var(--brand-sage)" }}
      >
        {project.tagline}
      </p>

      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "rgba(242,238,230,0.92)" }}
      >
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 mb-7">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] tracking-[0.06em] px-2.5 py-1 rounded-md border"
            style={{
              borderColor: "rgba(242,238,230,0.3)",
              color: "rgba(242,238,230,0.92)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Dual destinations — pinned to the bottom for a consistent baseline */}
      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-btn lab-btn-live inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
            aria-label={`Open the live ${project.title} site`}
          >
            <VercelMark />
            Live
            <ArrowUpRight />
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-btn lab-btn-code inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
            aria-label={`View the ${project.title} source on GitHub`}
          >
            <GitHubMark />
            Code
            <ArrowUpRight />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Lab() {
  return (
    <div className="lab-ink min-h-screen flex flex-col">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(14,13,12,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(242,238,230,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-sage)" }}
          >
            Zoei Benzon
          </Link>
          <Link
            href="/#work"
            className="hover-sage inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium"
            style={{ color: "rgba(242,238,230,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Header ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-14 md:pb-20">
          <p
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--brand-sage)" }}
          >
            <span aria-hidden="true">🔧</span> AI Marketing Engineering
          </p>
          <h1
            className="font-bold leading-[0.98] tracking-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "rgba(242,238,230,0.98)",
            }}
          >
            The Lab
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(242,238,230,0.92)" }}
          >
            Where the marketing meets the machine. Small, shipped tools I&apos;ve
            built with Claude and code to make go-to-market work faster — each one
            deployed and open. Click through to the live app or read the source.
          </p>
        </section>

        {/* ── Projects grid ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-10 px-6 md:px-12"
        style={{ borderTop: "1px solid rgba(242,238,230,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(242,238,230,0.3)" }}>
            © {new Date().getFullYear()} Zoei Benzon
          </p>
          <a
            href="https://github.com/zjben10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-sage inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(242,238,230,0.4)" }}
          >
            <GitHubMark />
            More on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
