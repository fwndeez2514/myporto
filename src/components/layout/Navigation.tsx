"use client";

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Work", ariaLabel: "View my work", link: "/work" },
  { label: "About", ariaLabel: "Learn about me", link: "/about" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com/yourhandle" },
  { label: "YouTube", link: "https://youtube.com/@yourhandle" },
  { label: "TikTok", link: "https://tiktok.com/@yourhandle" },
];

// Pre-layer colors: dark slabs that wipe in before the panel
const COLORS = ["#1A1A1A", "#141414"];
const ACCENT = "#FF4D00";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  // Scroll detection for logo visibility
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (openRef.current) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"))
        : [];
      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], { xPercent: 100 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-list .sm-panel-item"));
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>(".sm-socials-link"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 } as gsap.TweenVars);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((ls, i) => {
      tl.fromTo(ls, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: "power4.out" }, i * 0.06);
    });

    const panelStart = (layers.length - 1) * 0.06 + (layers.length ? 0.07 : 0);
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "power4.out" }, panelStart);

    if (itemEls.length) {
      const itemsStart = panelStart + 0.1;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 0.9, ease: "power4.out", stagger: { each: 0.1 } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08 } } as gsap.TweenVars, itemsStart + 0.1);
      }
    }

    const socialsStart = panelStart + 0.35;
    if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
    if (socialLinks.length) {
      tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: { each: 0.08 } }, socialsStart + 0.05);
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100, duration: 0.3, ease: "power3.in", overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>(".sm-socials-link"));
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        busyRef.current = false;
      },
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const h = plusHRef.current, v = plusVRef.current;
    if (!h || !v) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleRef.current?.kill();
    const from = opening ? "Menu" : "Close";
    const to = opening ? "Close" : "Menu";
    const seq = [from, to === "Menu" ? "Close" : "Menu", to === "Menu" ? "Close" : "Menu", to, to];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + seq.length * 0.06,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    document.body.style.overflow = target ? "hidden" : "";
    if (target) { playOpen(); } else { playClose(); }
    animateIcon(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateText]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    document.body.style.overflow = "";
    playClose();
    animateIcon(false);
    animateText(false);
  }, [playClose, animateIcon, animateText]);

  // Click away to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      if (toggleBtnRef.current?.contains(e.target as Node)) return;
      closeMenu();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closeMenu]);

  return (
    <>
      {/* Fixed header bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-[var(--border-subtle)] bg-[var(--bg)]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 z-[60]" aria-label="Fandi Putra — Home">
          <span className="w-5 h-5 border border-[var(--accent)] flex items-center justify-center" aria-hidden>
            <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
            FPA
          </span>
        </Link>

        {/* Right side: ThemeToggle + Menu button */}
        <div className="flex items-center gap-5 z-[60]">
          <ThemeToggle />

          <button
            ref={toggleBtnRef}
            id="menu-toggle"
            onClick={toggleMenu}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            className="flex items-center gap-2 text-[var(--text-primary)] font-medium text-sm leading-none bg-transparent border-0 outline-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            {/* Cycling text */}
            <span className="relative inline-block h-[1em] overflow-hidden min-w-[3rem]" aria-hidden>
              <span ref={textInnerRef} className="flex flex-col leading-none">
                {textLines.map((l, i) => (
                  <span key={i} className="block h-[1em] leading-none font-mono text-[0.7rem] tracking-[0.15em] uppercase">
                    {l}
                  </span>
                ))}
              </span>
            </span>
            {/* +/× icon */}
            <span ref={iconRef} className="relative w-[14px] h-[14px] flex items-center justify-center" aria-hidden>
              <span ref={plusHRef} className="absolute w-full h-[1.5px] bg-current rounded-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <span ref={plusVRef} className="absolute w-full h-[1.5px] bg-current rounded-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop blur overlay — covers page behind the panel */}
      <div
        className="fixed inset-0 z-30 transition-all duration-500"
        style={{
          backdropFilter: open ? "blur(10px) brightness(0.4)" : "blur(0px) brightness(1)",
          WebkitBackdropFilter: open ? "blur(10px) brightness(0.4)" : "blur(0px) brightness(1)",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
        }}
        onClick={closeMenu}
        aria-hidden
      />

      {/* Pre-layer slabs + Panel — fixed overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden={!open}>
        {/* Pre-layers */}
        <div ref={preLayersRef} className="absolute top-0 right-0 bottom-0 w-full md:w-[480px]">
          {COLORS.map((c, i) => (
            <div key={i} className="sm-prelayer absolute inset-0" style={{ background: c }} />
          ))}
        </div>

        {/* Main panel */}
        <div
          ref={panelRef}
          id="staggered-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="absolute top-0 right-0 bottom-0 w-full md:w-[480px] flex flex-col pointer-events-auto overflow-y-auto"
          style={{ background: "#0F0F0F", paddingTop: "calc(var(--nav-height) + 3rem)", paddingLeft: "2.5rem", paddingRight: "2.5rem", paddingBottom: "2.5rem" }}
        >
          {/* Nav items */}
          <ul className="sm-panel-list flex flex-col gap-1 mb-auto" role="list">
            {menuItems.map((item, idx) => (
              <li key={item.label} className="sm-panel-itemWrap overflow-hidden leading-none py-1">
                <Link
                  href={item.link}
                  aria-label={item.ariaLabel}
                  className={`sm-panel-item inline-block no-underline pr-[1.4em] transition-colors duration-200 cursor-pointer ${
                    pathname === item.link ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                  }`}
                  data-index={idx + 1}
                >
                  <span className="sm-panel-itemLabel inline-block" style={{ transformOrigin: "50% 100%", willChange: "transform" }}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--border-subtle)] my-8" />

          {/* Socials */}
          <div className="sm-socials" aria-label="Social links">
            <p className="sm-socials-title font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: ACCENT }}>
              Socials
            </p>
            <ul className="sm-socials-list flex flex-row gap-6 flex-wrap" role="list">
              {socialItems.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 no-underline cursor-pointer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom availability tag */}
          <div className="mt-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
              Available for work
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .sm-panel-item {
          font-weight: 700;
          font-size: clamp(2.8rem, 7vw, 4.5rem);
          letter-spacing: -0.04em;
          line-height: 1;
          text-transform: uppercase;
        }
        .sm-panel-item:hover { color: ${ACCENT}; }
        .sm-panel-list { counter-reset: smItem; }
        .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.15em;
          right: 0.4em;
          font-size: 0.9rem;
          font-weight: 400;
          font-family: var(--font-jetbrains);
          color: ${ACCENT};
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sm-panel-item:hover::after { opacity: 1; }
        .sm-socials-list .sm-socials-link { opacity: 1; }
        .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
      `}</style>
    </>
  );
}
