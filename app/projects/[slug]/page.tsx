import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import { getProjectGallery } from "@/lib/projectGallery.server";
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

  const gallery = getProjectGallery(slug);

  const projectContent = (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* ── Tag · Date ── */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-medium px-2.5 py-1 rounded-md border"
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
                    className="text-xs px-3 py-1.5 rounded-md"
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

        {/* ── Events (Roebling GTM) ── */}
        {project.slug === "roebling-gtm" && (
          <section className="mt-16 md:mt-24">
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6"
              style={{ color: "var(--brand-sage)" }}
            >
              AI Skills
            </p>
            <Link
              href={`/projects/${project.slug}/events`}
              className="group block rounded-sm transition-colors"
              style={{
                border: "1px solid rgba(26,23,20,0.12)",
                backgroundColor: "rgba(26,23,20,0.02)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-8 md:p-10">
                <div className="flex-1">
                  <h3
                    className="font-bold leading-tight mb-3"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "var(--brand-dark)",
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Roebling Events Tracker
                  </h3>
                  <p
                    className="text-base leading-relaxed max-w-2xl"
                    style={{ color: "rgba(26,23,20,0.7)" }}
                  >
                    The internal tool I built as a prototype to run event strategy across 25+ annual
                    tradeshows and conferences. Every event the team has interest in for 2026 is
                    scored against a six-criteria Roebling rubric around strategic fit, ICP coverage,
                    pipeline potential, quality of interaction, and cost. The broader team can submit
                    a conference while the marketing team can score, review, and provide next steps
                    all in one place.
                  </p>
                  <div className="mt-6">
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2.5"
                      style={{ color: "rgba(26,23,20,0.4)" }}
                    >
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Claude Code", "Claude Design", "Next.js", "React", "TypeScript", "Vercel"].map(
                        (t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1.5 rounded-md"
                            style={{
                              backgroundColor: "rgba(26,23,20,0.07)",
                              color: "rgba(26,23,20,0.65)",
                            }}
                          >
                            {t}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium flex-shrink-0 transition-opacity group-hover:opacity-70"
                  style={{ color: "var(--brand-sage)" }}
                >
                  Open the tracker
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
            <a
              href="https://github.com/zjben10/marketing-portfolio-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-sm transition-colors mt-4"
              style={{
                border: "1px solid rgba(26,23,20,0.12)",
                backgroundColor: "rgba(26,23,20,0.02)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-8 md:p-10">
                <div className="flex-1">
                  <h3
                    className="font-bold leading-tight mb-3"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: "var(--brand-dark)",
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Marketing Ops Skills for Claude
                  </h3>
                  <p
                    className="text-base leading-relaxed max-w-2xl"
                    style={{ color: "rgba(26,23,20,0.7)" }}
                  >
                    A library of custom Claude skills I built to run outbound end-to-end — event
                    scoring and prioritization, target account selection, and automated post-event
                    follow-up — packaging the GTM, campaign planning, and content-pipeline workflows
                    from running B2B SaaS marketing solo into reusable agent skills.
                  </p>
                  <div className="mt-6">
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2.5"
                      style={{ color: "rgba(26,23,20,0.4)" }}
                    >
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Claude Code", "Claude Skills", "Firecrawl", "Clay", "n8n"].map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-md"
                          style={{
                            backgroundColor: "rgba(26,23,20,0.07)",
                            color: "rgba(26,23,20,0.65)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium flex-shrink-0 transition-opacity group-hover:opacity-70"
                  style={{ color: "var(--brand-sage)" }}
                >
                  View the repo
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </section>
        )}

        {/* ── Featured Project (Roebling GTM) ── */}
        {project.slug === "roebling-gtm" && (
          <section className="mt-16 md:mt-24">
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6"
              style={{ color: "var(--brand-sage)" }}
            >
              Other Roebling related projects
            </p>
            <div
              className="rounded-sm p-8 md:p-10"
              style={{
                border: "1px solid rgba(26,23,20,0.12)",
                backgroundColor: "rgba(26,23,20,0.02)",
              }}
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h3
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--brand-dark)",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Better with Bio · Brenntag
                </h3>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: "rgba(26,23,20,0.07)",
                    color: "rgba(26,23,20,0.55)",
                  }}
                >
                  Sunset in rebrand
                </span>
              </div>
              <p
                className="text-base leading-relaxed max-w-3xl"
                style={{ color: "rgba(26,23,20,0.7)" }}
              >
                {"Managed Synonym (now Roebling)'s largest co-marketing opportunity with the world's largest chemical distributor, Brenntag. I spent my first six months embedded with Brenntag's team, owning the positioning, messaging, and communications for the Better with Bio program end to end and building the program landing page alongside their global marketing team across Europe, North America, and APAC regions. The program was later sunset when the company repositioned and rebranded from Synonym to Roebling, moving away from the 'bio' framing."}
              </p>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-medium mt-8 mb-4"
                style={{ color: "var(--brand-terracotta)" }}
              >
                Key Results
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Owned co-branded positioning and messaging with the global marketing org of the category's largest distributor.",
                  "Shipped the program landing page and communications framework.",
                  "Program sunset in the company rebrand (Synonym → Roebling).",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span
                      className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--brand-sage)" }}
                    />
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(26,23,20,0.75)" }}
                    >
                      {r}
                    </p>
                  </li>
                ))}
              </ul>

              <figure className="mt-8 mb-0">
                <div
                  className="overflow-hidden rounded-sm"
                  style={{ border: "1px solid rgba(26,23,20,0.1)" }}
                >
                  <img
                    src="/images/roebling-bwb-landing.png"
                    alt="Better with Bio landing page, Brenntag and Synonym"
                    className="block w-full h-auto"
                  />
                </div>
                <figcaption
                  className="text-xs mt-3"
                  style={{ color: "rgba(26,23,20,0.45)" }}
                >
                  The Better with Bio program landing page, built with Brenntag.
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
          <section className="mt-16 md:mt-24">
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6"
              style={{ color: "var(--brand-sage)" }}
            >
              Gallery
            </p>
            <div className="columns-2 md:columns-3 gap-4 md:gap-6">
              {gallery.map((img) => (
                <div
                  key={img.src}
                  className="mb-4 md:mb-6 break-inside-avoid overflow-hidden rounded-sm"
                >
                  <Image
                    src={img.src}
                    alt=""
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="block w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer
        className="py-12 px-6 md:px-12"
        style={{ borderTop: "1px solid rgba(26,23,20,0.1)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="https://www.linkedin.com/in/zoeibenzon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover-sage inline-flex"
            style={{ color: "rgba(26,23,20,0.45)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
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
            Zoei Benzon
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
