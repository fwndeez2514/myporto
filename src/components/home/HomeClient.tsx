"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ProjectCard from "@/components/work/ProjectCard";
import Marquee from "@/components/ui/Marquee";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getFeaturedProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Section reveal component using GSAP ScrollTrigger
function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      }
    );
  }, []);
  return (
    <section ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </section>
  );
}

// Anime.js stagger reveal for heading + line pair
function RevealHeading({ label, heading }: { label: string; heading: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(".reveal-child");
    gsap.fromTo(
      children,
      { opacity: 0, y: 32, skewY: 2 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);
  return (
    <div ref={ref}>
      <p className="reveal-child section-number mb-3" style={{ opacity: 0 }}>{label}</p>
      <h2 className="reveal-child text-display-md font-light text-[var(--text-primary)] leading-tight" style={{ opacity: 0 }}>
        {heading}
      </h2>
    </div>
  );
}

export default function HomeClient() {
  const featured = getFeaturedProjects();

  // Animate the services grid items with anime.js-style stagger
  const servicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = servicesRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".service-card");
    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      }
    );
  }, []);

  // Animate stats with counter + reveal
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".stat-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <>
      {/* Skills marquee strip */}
      <Marquee />

      {/* Selected Work */}
      <ScrollRevealSection
        className="section-gap"
        aria-labelledby="selected-work-heading"
      >
        <div className="site-container">
          <div className="flex items-end justify-between mb-14 md:mb-18">
            <RevealHeading label="01 — Selected Work" heading="Recent projects" />
            <Link
              id="home-see-all"
              href="/work"
              className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 group"
            >
              View all
              <span className="inline-block w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {featured[0] && (
              <div className="md:col-span-7">
                <ProjectCard project={featured[0]} priority index={0} />
              </div>
            )}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
              {featured[1] && <ProjectCard project={featured[1]} index={1} />}
              {featured[2] && <ProjectCard project={featured[2]} index={2} />}
            </div>
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/work" className="text-sm text-[var(--accent)] flex items-center gap-2">
              All work →
            </Link>
          </div>
        </div>
      </ScrollRevealSection>

      {/* Big text marquee strip — reversed */}
      <div className="border-t border-b border-[var(--border-subtle)] py-5 overflow-hidden" aria-hidden>
        <div className="marquee-container">
          <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "45s" }}>
            {Array(16).fill("Creative Designer — Visual Storyteller — Motion Artist — ").map((t, i) => (
              <span
                key={i}
                className="text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-[-0.02em] uppercase whitespace-nowrap pr-14"
                style={{ color: "var(--border)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About strip */}
      <ScrollRevealSection className="section-gap" aria-labelledby="about-strip-heading">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <RevealHeading
                label="02 — About"
                heading={
                  <>
                    Creative at the intersection of{" "}
                    <span className="gradient-text">design</span> and{" "}
                    <span className="gradient-text">motion</span>
                  </>
                }
              />
              <Link
                id="home-about-link"
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent)] group w-fit"
              >
                More about me
                <span className="inline-block w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
              </Link>
            </div>

            <div className="md:col-span-4">
              <p className="text-body-md text-[var(--text-secondary)] leading-relaxed mb-5">
                I&apos;m Fandi — a visual storyteller based in Indonesia. I work across video editing,
                motion graphics, and graphic design to help brands and creators communicate with
                clarity and impact.
              </p>
              <p className="text-body-md text-[var(--text-secondary)] leading-relaxed">
                Started with AMV editing, evolved into motion design and brand identity — every
                project gets the same attention to detail.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="md:col-span-4">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "3+", label: "Years of experience" },
                  { num: "50+", label: "Projects completed" },
                  { num: "3", label: "Core disciplines" },
                  { num: "∞", label: "Passion for craft" },
                ].map((stat) => (
                  <div key={stat.label} className="stat-item border-t border-[var(--border-subtle)] pt-4" style={{ opacity: 0 }}>
                    <p className="text-display-lg font-light text-[var(--accent)] leading-none mb-1 counter-number">
                      {stat.num}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* Services */}
      <section className="section-gap border-t border-[var(--border-subtle)]" aria-labelledby="services-heading">
        <div className="site-container">
          <ScrollReveal direction="up" delay={0}>
            <RevealHeading label="03 — Services" heading="What I do" />
          </ScrollReveal>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-subtle)] mt-12">
            {[
              {
                num: "01",
                title: "Video Editing",
                desc: "Cinematic cuts, color grading, and storytelling through pacing and rhythm. AMV/PMV edits that hit different.",
                tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
              },
              {
                num: "02",
                title: "Motion Graphic",
                desc: "Logo animations, kinetic typography, brand motion packages. Movement with purpose, not just decoration.",
                tools: ["After Effects", "Motion", "Lottie"],
              },
              {
                num: "03",
                title: "Graphic Design",
                desc: "Poster design, social media systems, visual identity. Strong hierarchy, clear communication, memorable visuals.",
                tools: ["Illustrator", "Photoshop", "Figma"],
              },
            ].map((service) => (
              <div
                key={service.num}
                className="service-card bg-[var(--bg)] p-6 md:p-8 group hover:bg-[var(--bg-surface)] transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <p className="font-mono text-xs text-[var(--accent)] mb-6 opacity-60">{service.num}</p>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <span key={tool} className="font-mono text-[0.65rem] text-[var(--text-secondary)] border border-[var(--border-subtle)] px-2 py-0.5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ScrollRevealSection
        className="section-gap border-t border-[var(--border-subtle)] relative overflow-hidden"
        aria-label="Contact CTA"
      >
        {/* Ghost text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="text-[clamp(5rem,16vw,14rem)] font-black uppercase leading-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,77,0,0.05)" }}
          >
            HIRE ME
          </span>
        </div>

        <div className="site-container relative z-10">
          <RevealHeading label="04 — Let's Work" heading={<>Have a project in mind?</>} />
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-10">
            <p className="text-body-md text-[var(--text-secondary)] max-w-sm">
              Let&apos;s build something that makes your audience stop scrolling.
            </p>
            <Link
              id="home-contact-cta"
              href="/contact"
              className="group relative overflow-hidden border border-[var(--accent)] px-8 py-4 text-sm text-[var(--accent)] hover:text-[#080808] transition-colors duration-400 flex items-center gap-3 shrink-0"
            >
              <span className="relative z-10">Start a conversation</span>
              <span
                className="absolute inset-0 bg-[var(--accent)] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"
                aria-hidden
              />
              <svg className="relative z-10" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </ScrollRevealSection>
    </>
  );
}
