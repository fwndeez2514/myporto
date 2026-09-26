"use client";

// ReactBits-style ScrollReveal component
// Reveals content with clip-path + translateY + opacity as it enters viewport
// Much more impactful than simple fade: the content "emerges" from behind an invisible wall

import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "clip-up" | "clip-left";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  stagger?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 40,
  once = true,
  threshold = 0.15,
  className = "",
  style,
  stagger = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) as HTMLElement[] : [el];

    // Build "from" state based on direction
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      delay,
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        fromVars.skewY = 1.5;
        break;
      case "down":
        fromVars.y = -distance;
        break;
      case "left":
        fromVars.x = -distance;
        break;
      case "right":
        fromVars.x = distance;
        break;
      case "scale":
        fromVars.scale = 0.88;
        fromVars.y = distance * 0.5;
        break;
      case "clip-up":
        // Clip-path reveal: content slides up from behind invisible mask
        fromVars.clipPath = "inset(100% 0% 0% 0%)";
        fromVars.opacity = 1; // clip handles visibility
        fromVars.y = distance * 0.4;
        break;
      case "clip-left":
        fromVars.clipPath = "inset(0% 100% 0% 0%)";
        fromVars.opacity = 1;
        break;
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      skewY: 0,
      scale: 1,
      clipPath: direction.startsWith("clip") ? "inset(0% 0% 0% 0%)" : undefined,
      duration,
      ease: direction.startsWith("clip") ? "power3.inOut" : "power3.out",
    };

    // Remove undefined
    Object.keys(toVars).forEach((k) => {
      if (toVars[k as keyof typeof toVars] === undefined) delete toVars[k as keyof typeof toVars];
    });

    if (stagger && targets.length > 1) {
      // Set all children to from state
      gsap.set(targets, fromVars);
      gsap.to(targets, {
        ...toVars,
        stagger: { each: 0.12, from: "start" },
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.round((1 - threshold) * 100)}%`,
          once,
        },
      });
    } else {
      gsap.set(el, fromVars);
      gsap.to(el, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.round((1 - threshold) * 100)}%`,
          once,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [direction, delay, duration, distance, once, threshold, stagger]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;
  return (
    <AnyTag ref={ref} className={className} style={style}>
      {children}
    </AnyTag>
  );
}
