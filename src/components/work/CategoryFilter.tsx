"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type ProjectCategory } from "@/types/project";

interface CategoryFilterProps {
  active: ProjectCategory | "all";
  onChange: (cat: ProjectCategory | "all") => void;
}

const filters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "video-editing", label: CATEGORY_LABELS["video-editing"] },
  { key: "motion-graphic", label: CATEGORY_LABELS["motion-graphic"] },
  { key: "graphic-design", label: CATEGORY_LABELS["graphic-design"] },
];

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <nav
      aria-label="Filter by category"
      className="flex items-center gap-6 border-b border-[var(--border-subtle)]"
    >
      {filters.map((f) => (
        <button
          key={f.key}
          id={`filter-${f.key}`}
          onClick={() => onChange(f.key)}
          className={cn(
            "pb-3 text-sm transition-colors duration-200 relative whitespace-nowrap",
            active === f.key
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
          aria-current={active === f.key ? "true" : undefined}
        >
          {f.label}
          {active === f.key && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]" />
          )}
        </button>
      ))}
    </nav>
  );
}
