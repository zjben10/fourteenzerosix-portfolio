import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import PasswordGate from "@/components/PasswordGate";

export async function generateStaticParams() {
  return projects
    .filter((p) => !p.externalUrl && !p.hidden)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Zoei Benzon`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.externalUrl || project.hidden) notFound();

  const projectContent = (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* ── Tag · Date ── */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 py-1 rounded-full border"
            style={{
              borderColor: "var(--brand-terracotta)",
              color: "var(--brand-terracotta)",
            }}
          >
            {project.tags[0]}
          </span>
          <span
            className="text-xs"
            style={{ color: "rgba(26,23,20,0.4)" }}
          >
            {project.date}
          </span>
        </div>

        {/* ── Title ── */}
        <h1
          className="font-bold leading-tight mb-12 md:mb-16"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
            color: "var(--brand-dark)",
            fontFamily: "var(--font-space-grotesk), sans-serif",
          }}
        >
          {project.title}
        </h1>

        {/* ── Hero image / placeholder ── */}
        {project.heroImage ? (
          <div className="w-full mb-16 md:mb-20 overflow-hidden rounded-sm">
            <img
              src={project.heroImage}
              alt={`${project.title} hero`}
              className="w-full object-cover"
              style={{ maxHeight: "600px" }}
            />
          </div>
        ) : (
          <div
            className="w-full mb-16 md:mb-20 flex items-center justify-center"
            style={{
              aspectRatio: "16/9",
              backgroundColor: "rgba(26,23,20,0.06)",
              border: "1px dashed rgba(26,23,20,0.2)",
            }}
          >
            <div className="text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="mx-auto mb-3 opacity-25"
              >
                <rect x="4" y="8" width="32" height="24" rx="2" stroke="#1A1714" strokeWidth="1.5" />
                <circle cx="14" cy="17" r="3" stroke="#1A1714" strokeWidth="1.5" />
                <path d="M4 28l8-6 6 5 6-8 12 9" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: "rgba(26,23,20,0.3)" }}
              >
                Project image
              </p>
            </div>
          </div>
        )}

        {/* ── Content grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-7 flex flex-col gap-14">
            <section>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
                style={{ color: "var(--brand-sage)" }}
              >
                Key Outcomes
              </p>
              <ul className="flex flex-col gap-4">
                {project.keyOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--brand-sage)" }}
                    />
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(26,23,20,0.75)" }}
                    >
                      {outcome}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
                style={{ color: "var(--brand-terracotta)" }}
              >
                Challenge
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(26,23,20,0.7)" }}
              >
                {project.challenge}
              </p>
            </section>

            {project.videos && project.videos.length > 0 && (
              <section>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
                  style={{ color: "var(--brand-sage)" }}
                >
                  Videos
                </p>
                <ul className="flex flex-col gap-3">
                  {project.videos.map((v) => (
                    <li key={v.label} className="flex items-center gap-3">
                      <span
                        className="mt-0 flex-shrink-0 w-1 h-1 rounded-full"
                        style={{ backgroundColor: "var(--brand-sage)" }}
                      />
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline underline-offset-2 transition-opacity hover:opacity-60"
                        style={{ color: "rgba(26,23,20,0.75)" }}
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="md:col-span-5 flex flex-col gap-12">
            {project.metric && (
              <section>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
                  style={{ color: "var(--brand-sage)" }}
                >
                  Key Result
                </p>
                <p
                  className="text-lg font-semibold leading-snug"
                  style={{ color: "var(--brand-dark)" }}
                >
                  {project.metric}
                </p>
              </section>
            )}

            <section>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
                style={{ color: "var(--brand-terracotta)" }}
              >
                Scope
              </p>
              <ul className="flex flex-col gap-0">
                {project.scope.map((item) => (
                  <li
                    key={item}
                    className="text-sm py-2.5"
                    style={{
                      borderBottom: "1px solid rgba(26,23,20,0.1)",
                      color: "rgba(26,23,20,0.7)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-5"
                style={{ color: "var(--brand-terracotta)" }}
              >
                Tools Used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(26,23,20,0.07)",
                      color: "rgba(26,23,20,0.65)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer
        className="py-12 px-6 md:px-12"
        style={{ borderTop: "1px solid rgba(26,23,20,0.1)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            fourteenzerosix studios
          </span>
          <Link
            href="/#work"
            className="hover-sage inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium"
            style={{ color: "rgba(26,23,20,0.4)" }}
          >
            View all work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </footer>
    </>
  );

  return (
    <div style={{ backgroundColor: "var(--brand-cream)", minHeight: "100vh" }}>
      {/* Nav bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(242,238,230,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(26,23,20,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--brand-terracotta)" }}
          >
            fourteenzerosix
          </Link>
          {/* Green hover: sage = navigate / proceed */}
          <Link
            href="/#work"
            className="hover-sage inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium"
            style={{ color: "rgba(26,23,20,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to work
          </Link>
        </div>
      </header>

      {project.password ? (
        <PasswordGate password={project.password}>{projectContent}</PasswordGate>
      ) : (
        projectContent
      )}
    </div>
  );
}
