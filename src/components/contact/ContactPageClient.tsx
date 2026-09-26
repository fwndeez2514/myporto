"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPageClient() {
  return (
    <ScrollReveal direction="clip-up" duration={1} className="mb-12 md:mb-16 overflow-hidden">
      <p className="label text-[var(--text-secondary)] mb-4">Contact</p>
      <h1 className="text-display-xl font-light text-[var(--text-primary)] leading-none">
        Get in touch
      </h1>
    </ScrollReveal>
  );
}
