"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ProjectCard from "@/components/work/ProjectCard";
import CategoryFilter from "@/components/work/CategoryFilter";
import { projects } from "@/data/projects";
import { type ProjectCategory } from "@/types/project";

export default function WorkClient() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Anime.js stagger on filter change
  useEffect(() => {
    const runStagger = async () => {
      const grid = gridRef.current;
      if (!grid) return;
      const items = Array.from(grid.querySelectorAll<HTMLElement>("[id^='project-']"));
      if (!items.length) return;

      try {
        const anime = (await import("animejs/lib/anime.es.js")).default;
        // Reset first
        anime.set(items, { opacity: 0, translateY: 20 });
        anime({
          targets: items,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: anime.stagger(80, { start: 50 }),
          easing: "cubicBezier(0.16, 1, 0.3, 1)",
        });
      } catch {
        // Fallback: CSS animation already on cards
        items.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      }
    };

    const timeout = setTimeout(runStagger, 50);
    return () => clearTimeout(timeout);
  }, [filtered]);

  const handleCategoryChange = (cat: ProjectCategory | "all") => {
    // Fade out before change
    const grid = gridRef.current;
    if (grid) {
      const items = Array.from(grid.querySelectorAll<HTMLElement>("[id^='project-']"));
      items.forEach((el) => {
        el.style.transition = "opacity 0.2s ease, transform 0.2s ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(-8px)";
      });
    }
    setTimeout(() => setActiveCategory(cat), 200);
  };

  return (
    <>
      {/* Filter */}
      <div className="mb-12 md:mb-16 overflow-x-auto">
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
      </div>

      {/* Count */}
      <p className="label text-[var(--text-secondary)] mb-8">
        <span className="text-[var(--accent)]">{filtered.length}</span> project{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && ` in ${activeCategory.replace("-", " ")}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-body-md text-[var(--text-secondary)]">
            No projects in this category yet.
          </p>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i < 3}
              index={i}
            />
          ))}
        </div>
      )}
    </>
  );
}
