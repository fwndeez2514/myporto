import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SocialEmbed from "@/components/work/SocialEmbed";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { CATEGORY_LABELS } from "@/types/project";
import { formatDate } from "@/lib/utils";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default function WorkDetailPage({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(params.slug);

  return (
    <div className="pt-[var(--nav-height)]">
      {/* Hero image — plain img for external URLs */}
      <div className="relative w-full overflow-hidden bg-[var(--bg-surface)]" style={{ aspectRatio: "21/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        <div className="absolute inset-0 bg-[var(--bg)]/30" aria-hidden="true" />
      </div>

      <div className="site-container section-gap-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Main content */}
          <article className="md:col-span-8">
            {/* Meta */}
            <div className="mb-8">
              <p className="label text-[var(--accent)] mb-3">
                {CATEGORY_LABELS[project.category]}
              </p>
              <h1 className="text-display-lg font-light text-[var(--text-primary)] mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
                {project.excerpt}
              </p>
            </div>

            <div className="divider mb-8" />

            {/* Description */}
            <div className="mb-10">
              {project.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-body-md text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Social embeds */}
            {project.socialLinks && project.socialLinks.length > 0 && (
              <div className="mt-10">
                <p className="label text-[var(--text-secondary)] mb-4">
                  View on social media
                </p>
                <div className="flex flex-col gap-4">
                  {project.socialLinks.map((link, i) => (
                    <SocialEmbed
                      key={i}
                      platform={link.platform}
                      url={link.url}
                      embedId={link.embedId}
                    />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Details */}
              <div className="border border-[var(--border-subtle)] p-5 flex flex-col gap-4">
                <div>
                  <p className="label text-[var(--text-secondary)] mb-1">Category</p>
                  <p className="text-sm text-[var(--text-primary)]">
                    {CATEGORY_LABELS[project.category]}
                  </p>
                </div>
                <div className="divider" />
                <div>
                  <p className="label text-[var(--text-secondary)] mb-1">Date</p>
                  <p className="text-sm text-[var(--text-primary)]">
                    {formatDate(project.date)}
                  </p>
                </div>
                <div className="divider" />
                <div>
                  <p className="label text-[var(--text-secondary)] mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/work"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 flex items-center gap-1"
              >
                ← All work
              </Link>
            </div>
          </aside>
        </div>

        {/* Prev/Next navigation */}
        {(prev || next) && (
          <>
            <div className="divider mt-16 mb-10" />
            <nav
              className="flex items-stretch justify-between gap-4"
              aria-label="Project navigation"
            >
              {prev ? (
                <Link
                  id="work-nav-prev"
                  href={`/work/${prev.slug}`}
                  className="group flex flex-col gap-1 max-w-xs"
                >
                  <span className="label text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    ← Previous
                  </span>
                  <span className="text-sm text-[var(--text-primary)]">{prev.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  id="work-nav-next"
                  href={`/work/${next.slug}`}
                  className="group flex flex-col gap-1 max-w-xs text-right"
                >
                  <span className="label text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    Next →
                  </span>
                  <span className="text-sm text-[var(--text-primary)]">{next.title}</span>
                </Link>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
