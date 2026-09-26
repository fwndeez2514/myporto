"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "project" | "link";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;
    let isVisible = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      if (labelRef.current) {
        labelRef.current.style.left = `${ringX}px`;
        labelRef.current.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // State handlers for different element types
    const handleProjectEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const label = el.getAttribute("data-cursor-label") || "View →";
      if (labelRef.current) {
        labelRef.current.textContent = label;
      }
      setCursorState("project");
    };

    const handleProjectLeave = () => setCursorState("default");
    const handleLinkEnter = () => setCursorState("hover");
    const handleLinkLeave = () => setCursorState("default");
    const onDown = () => dot.classList.add("is-clicking");
    const onUp = () => dot.classList.remove("is-clicking");

    // Project cards — large ring with label
    document.querySelectorAll("[data-cursor='project']").forEach((el) => {
      el.addEventListener("mouseenter", handleProjectEnter);
      el.addEventListener("mouseleave", handleProjectLeave);
    });

    // Regular interactables — ring expands slightly
    document.querySelectorAll("a:not([data-cursor='project']), button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{ opacity: 0 }}
        data-state={cursorState}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          borderRadius: "50%",
          border: cursorState === "project"
            ? "1px solid transparent"
            : `1px solid rgba(255, 77, 0, ${cursorState === "hover" ? 0.9 : 0.4})`,
          width: cursorState === "project" ? "90px" : cursorState === "hover" ? "48px" : "36px",
          height: cursorState === "project" ? "90px" : cursorState === "hover" ? "48px" : "36px",
          background: cursorState === "project" ? "var(--accent)" : "transparent",
          transition: "width 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1), border 0.3s ease, background 0.3s ease",
        }}
      />

      {/* View label — appears on project hover */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 10001,
          transform: "translate(-50%, -50%)",
          color: "#080808",
          fontSize: "0.65rem",
          fontFamily: "var(--font-jetbrains)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: cursorState === "project" ? 1 : 0,
          transition: "opacity 0.3s ease",
          whiteSpace: "nowrap",
        }}
      >
        View →
      </div>
    </>
  );
}
