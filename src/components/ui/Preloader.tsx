"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Fake loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Trigger exit animation
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsComplete(true);
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
              // Custom event so other components know initial load is done
              window.dispatchEvent(new Event("preloader-complete"));
            }
          });

          if (textRef.current) {
            tl.to(textRef.current, {
              y: -50,
              opacity: 0,
              duration: 0.5,
              ease: "power3.in"
            });
          }

          if (loaderRef.current) {
            tl.to(loaderRef.current, {
              yPercent: -100,
              duration: 1,
              ease: "power4.inOut"
            }, "-=0.2");
          }
        }, 400);
      }
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center pointer-events-auto"
      aria-hidden="true"
    >
      {/* Removed missing noise.png overlay, relying on dark background */}
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-6">
          <span className="block font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--accent)] text-center">
            Fandi Putra Atmadatam
          </span>
        </div>
        
        <div className="overflow-hidden">
          <p className="text-display-xl font-light text-white tabular-nums tracking-tighter flex items-end leading-none">
            {progress}
            <span className="text-2xl ml-2 mb-2 text-[var(--text-secondary)] font-mono">%</span>
          </p>
        </div>
        
        {/* Progress bar line */}
        <div className="w-48 h-px bg-[var(--border-subtle)] mt-8 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[var(--accent)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
