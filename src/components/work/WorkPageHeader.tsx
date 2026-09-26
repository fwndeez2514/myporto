"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WorkPageHeader() {
  return (
    <ScrollReveal direction="clip-up" duration={1} className="mb-12 md:mb-16 overflow-hidden">
      <p className="label text-[var(--text-secondary)] mb-4">Portfolio</p>
      <h1 className="text-display-xl font-light text-[var(--text-primary)] leading-none">
        Work
      </h1>
    </ScrollReveal>
  );
}
