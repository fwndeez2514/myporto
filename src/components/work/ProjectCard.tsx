"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type Project } from "@/types/project";
import { getYear } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  priority?: boolean;
  index?: number;
}

export default function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      id={`project-${project.slug}`}
      className={cn("group block tilt-card", className)}
      data-cursor="project"
      data-cursor-label="View →"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.15s ease-out",
        opacity: 0,
        animation: `fadeSlideUp 0.7s ${0.1 + index * 0.12}s cubic-bezier(0.16,1,0.3,1) forwards`,
      }}
      aria-label={`View project: ${project.title}`}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-[var(--bg-surface)] aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Grain texture overlay on image */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px",
          }}
          aria-hidden
        />

        {/* Number indicator */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[0.6rem] text-[var(--text-primary)]/50 bg-[var(--bg)]/60 px-2 py-0.5 backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Category tag — appears on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="label bg-[var(--accent)] text-[#080808] px-2 py-1">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>

        {/* Bottom gradient + excerpt */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
          <p className="text-sm text-[var(--text-primary)] leading-relaxed line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {project.excerpt}
          </p>
        </div>
      </div>

      {/* Info row */}
      <div className="pt-4 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 truncate">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            {CATEGORY_LABELS[project.category]}
          </p>
        </div>
        <span className="font-mono text-xs text-[var(--text-secondary)] pt-0.5">
          {getYear(project.date)}
        </span>
      </div>

      {/* Animated underline on hover */}
      <div className="mt-3 h-px w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500 ease-out" aria-hidden />

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Link>
  );
}
