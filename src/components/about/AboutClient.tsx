"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal, useCounter } from "@/hooks/useReveal";

const Lanyard = dynamic(() => import("@/components/three/Lanyard"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { area: "Video Editing", items: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "AMV / PMV"] },
  { area: "Motion Graphic", items: ["After Effects", "Motion Typography", "Logo Animation", "UI Animation"] },
  { area: "Graphic Design", items: ["Photoshop", "Illustrator", "Poster Design", "Social Media"] },
];

const experience = [
  { year: "2024", title: "Motion Design Era", description: "Expanded into motion graphic work, delivering brand animation packages and kinetic typography for creative clients." },
  { year: "2023", title: "Freelance Launch", description: "Started freelancing in video editing and graphic design — built a client base across Indonesia." },
  { year: "2022", title: "AMV / PMV Roots", description: "Began creating AMV and PMV edits, developing strong editing rhythm, timing, and emotional storytelling." },
];

function StatCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const { ref, isVisible } = useReveal();
  const count = useCounter(target, isVisible);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="border-t border-[var(--border-subtle)] pt-5">
      <p className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[var(--accent)] leading-none counter-number mb-2">
        {count}{suffix}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}

export default function AboutClient() {
  const headRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  // Hero heading reveal
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".reveal-el");
    gsap.fromTo(
      children,
      { opacity: 0, y: 40, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.2 }
    );
  }, []);

  // Skills grid stagger
  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".skill-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  // Timeline items stagger
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const items = el.querySelectorAll("li");
    gsap.fromTo(
      items,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  // Bio paragraphs
  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    const paras = el.querySelectorAll("p");
    gsap.fromTo(
      paras,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
  }, []);

  return (
    <div className="pt-[var(--nav-height)]">
      <div className="site-container section-gap">

        {/* Header */}
        <div ref={headRef} className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-6">
            <p className="reveal-el section-number mb-5" style={{ opacity: 0 }}>About</p>
            <h1
              className="reveal-el text-display-xl font-light text-[var(--text-primary)] leading-none mb-8"
              style={{ opacity: 0 }}
            >
              The craft
              <br />
              <span className="gradient-text">behind the work</span>
            </h1>

            <div className="reveal-el flex items-center gap-2 mb-10" style={{ opacity: 0 }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm text-[var(--text-secondary)]">Available for freelance work</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <StatCounter target={3} suffix="+" label="Years of experience" />
              <StatCounter target={50} suffix="+" label="Projects completed" />
              <StatCounter target={3} label="Creative disciplines" />
              <StatCounter target={100} suffix="%" label="Passion in every project" />
            </div>
          </div>

          {/* Portrait / Lanyard Interactive 3D */}
          <div className="md:col-span-6">
            <div
              className="relative w-full aspect-[3/4] bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden"
              aria-label="Profile photo or Interactive Badge"
            >
              <Lanyard />
              
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[var(--accent)] opacity-40 pointer-events-none" aria-hidden />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[var(--accent)] opacity-40 pointer-events-none" aria-hidden />
              
              <div className="absolute bottom-4 right-4 pointer-events-none">
                 <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[var(--text-secondary)] opacity-50 uppercase">
                    Drag badge to interact
                 </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider mb-20" />

        {/* Bio */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20">
          <div className="md:col-span-3">
            <p className="label text-[var(--accent)]">Bio</p>
          </div>
          <div ref={bioRef} className="md:col-span-8">
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed mb-5" style={{ opacity: 0 }}>
              I&apos;m <span className="text-[var(--text-primary)] font-medium">Fandi Putra Atmadatam</span> — a creative designer
              and editor based in Indonesia. My work sits at the intersection of video storytelling, motion design, and visual communication.
            </p>
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed mb-5" style={{ opacity: 0 }}>
              I started with AMV editing, where I developed a strong sense of pacing, rhythm, and emotion. That foundation carried into
              motion graphics and graphic design — where I now help brands and creators build visual identities that feel cohesive and intentional.
            </p>
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed" style={{ opacity: 0 }}>
              I care deeply about craft. Every project gets the same attention to detail — whether it&apos;s a 10-second social clip
              or a full brand identity system.
            </p>
          </div>
        </div>

        <div className="divider mb-20" />

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20">
          <div className="md:col-span-3">
            <p className="label text-[var(--accent)]">Skills</p>
          </div>
          <div ref={skillsRef} className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border-subtle)]">
              {skills.map((skill) => (
                <div
                  key={skill.area}
                  className="skill-card bg-[var(--bg)] p-6 group hover:bg-[var(--bg-surface)] transition-colors duration-300"
                  style={{ opacity: 0 }}
                >
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-5 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {skill.area}
                  </p>
                  <ul className="flex flex-col gap-3" role="list">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="w-1 h-1 bg-[var(--accent)] shrink-0 opacity-60" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider mb-20" />

        {/* Experience Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20">
          <div className="md:col-span-3">
            <p className="label text-[var(--accent)]">Journey</p>
          </div>
          <div className="md:col-span-8">
            <ol ref={timelineRef} className="flex flex-col" role="list">
              {experience.map((exp, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[5rem_1fr] gap-6 pb-10 border-b border-[var(--border-subtle)] mb-10 last:border-0 last:mb-0 last:pb-0"
                  style={{ opacity: 0 }}
                >
                  <span className="font-mono text-xs text-[var(--accent)]">{exp.year}</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{exp.title}</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{exp.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="divider mb-12" />

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <h2 className="text-display-md font-light text-[var(--text-primary)]">
            Let&apos;s work together.
          </h2>
          <Link
            id="about-contact-link"
            href="/contact"
            className="group relative overflow-hidden border border-[var(--accent)] px-8 py-4 text-sm text-[var(--accent)] hover:text-[#080808] transition-colors duration-400 flex items-center gap-3"
          >
            <span className="relative z-10">Get in touch</span>
            <span className="absolute inset-0 bg-[var(--accent)] -translate-x-full group-hover:translate-x-0 transition-transform duration-400" aria-hidden />
            <svg className="relative z-10" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
