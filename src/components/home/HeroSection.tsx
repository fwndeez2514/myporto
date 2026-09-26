"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTextScramble } from "@/hooks/useTextScramble";
import MagneticButton from "@/components/ui/MagneticButton";
import SpinningBadge from "@/components/ui/SpinningBadge";
import GradualBlur from "@/components/ui/GradualBlur";

const Threads = dynamic(() => import("@/components/three/Threads"), { ssr: false });

const roles = [
  "Video Editor",
  "Motion Graphic Artist",
  "Graphic Designer",
  "AMV / PMV Creator",
];

function ScrambleRole() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const displayed = useTextScramble(roles[index], trigger, { duration: 900, scrambleDuration: 28 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setTrigger(true);
      }, 120);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[var(--accent)] text-sm tracking-wider tabular-nums" aria-live="polite">
      {displayed}
    </span>
  );
}

function RevealHeadline({ line1, line2 }: { line1: string; line2: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const renderWords = (text: string, startDelay: number, muted = false) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
        <span
          className="inline-block"
          style={
            ready
              ? {
                  transform: "translateY(0)",
                  opacity: 1,
                  color: muted ? "var(--text-secondary)" : "var(--text-primary)",
                  transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${startDelay + i * 110}ms, opacity 0.7s ease ${startDelay + i * 110}ms`,
                }
              : { transform: "translateY(110%)", opacity: 0 }
          }
        >
          {word}
        </span>
      </span>
    ));

  return (
    <h1 className="text-display-2xl font-light leading-none tracking-[-0.035em] mb-7 md:mb-9" aria-label={`${line1} ${line2}`}>
      <div>{renderWords(line1, 300)}</div>
      <div>{renderWords(line2, 520, true)}</div>
    </h1>
  );
}

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const t = setTimeout(() => {
      line.style.transition = "width 1.4s cubic-bezier(0.16,1,0.3,1) 1.2s";
      line.style.width = "100%";
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingBottom: "clamp(5rem, 8vw, 7rem)" }}
      aria-label="Hero"
    >
      {/* Threads WebGL background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Threads color={[1, 0.29, 0]} amplitude={1.2} distance={0.3} enableMouseInteraction className="opacity-30" />
      </div>

      {/* GradualBlur bottom fade */}
      <GradualBlur position="bottom" height="16rem" strength={3} divCount={8} curve="bezier" exponential zIndex={2} />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="text-[clamp(8rem,28vw,26rem)] font-black uppercase leading-none"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,77,0,0.045)", letterSpacing: "-0.05em" }}
        >
          CREATIVE
        </span>
      </div>

      {/* Dot grid */}
      <div className="absolute top-24 right-6 md:right-14 hidden lg:grid grid-cols-4 gap-2 opacity-15 z-[3]" aria-hidden>
        {Array(12).fill(null).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-[var(--accent)]" />)}
      </div>

      {/* Spinning badge — top right, clear of nav */}
      <div
        className="absolute hidden md:flex z-[3]"
        style={{ top: "calc(var(--nav-height) + 1.5rem)", right: "clamp(1.5rem, 3vw, 3.5rem)" }}
        aria-label="Available for work"
      >
        <SpinningBadge size={120} />
      </div>

      {/* ─── Main hero content ─── */}
      <div className="site-container relative z-[3]">
        <div className="max-w-5xl">
          {/* Role scramble */}
          <div className="mb-6 flex items-center gap-3" style={{ opacity: 0, animation: "fadeSlideUp 0.7s 0.1s ease forwards" }}>
            <div className="w-4 h-px bg-[var(--accent)]" aria-hidden />
            <ScrambleRole />
          </div>

          {/* Headline */}
          <RevealHeadline line1="Fandi Putra" line2="Atmadatam" />

          {/* Draw-in divider */}
          <div className="mb-8 overflow-hidden h-px">
            <div ref={lineRef} className="h-full bg-[var(--border-subtle)]" style={{ width: 0 }} aria-hidden />
          </div>

          {/* Bio */}
          <p
            className="text-body-md text-[var(--text-secondary)] max-w-[38ch] mb-10 md:mb-14 leading-relaxed"
            style={{ opacity: 0, animation: "fadeSlideUp 0.8s 0.85s ease forwards" }}
          >
            Crafting visual stories through motion, design &amp; editing.
            Based in <span className="text-[var(--text-primary)]">Indonesia</span> — working worldwide.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6 md:gap-10" style={{ opacity: 0, animation: "fadeSlideUp 0.8s 1s ease forwards" }}>
            <MagneticButton
              as="a" href="/work" id="hero-cta-work"
              className="group relative overflow-hidden bg-[var(--accent)] text-[#080808] px-8 py-4 text-sm font-semibold tracking-widest uppercase"
            >
              <span className="relative z-10">View Work</span>
              <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-400" aria-hidden />
            </MagneticButton>

            <MagneticButton
              as="a" href="/contact" id="hero-cta-contact"
              className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Let&apos;s talk
              <span className="inline-block w-5 h-px bg-current group-hover:w-10 transition-all duration-400 ease-out" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ─── Scroll indicator — absolute to section, NOT container ─── */}
      <div
        className="absolute bottom-8 right-[clamp(1.5rem,3vw,3.5rem)] hidden lg:flex flex-col items-center gap-3 z-[3]"
        aria-hidden
        style={{ opacity: 0, animation: "fadeSlideUp 0.8s 1.4s ease forwards" }}
      >
        <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-[var(--text-secondary)] [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-14 bg-[var(--border-subtle)] relative overflow-hidden">
          <div className="absolute top-0 w-full bg-[var(--accent)]" style={{ height: "40%", animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>

      {/* ─── Project count — absolute to section, NOT container ─── */}
      <div
        className="absolute bottom-8 left-[clamp(1.5rem,3vw,3.5rem)] hidden lg:flex items-center gap-2 z-[3]"
        aria-hidden
        style={{ opacity: 0, animation: "fadeSlideUp 0.8s 1.5s ease forwards" }}
      >
        <span className="font-mono text-[0.5rem] text-[var(--text-secondary)] tracking-widest uppercase">Selected Work</span>
        <span className="font-mono text-[0.5rem] text-[var(--accent)]">— 06</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border-subtle)] z-[3]" aria-hidden />

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
