import { useState, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface UseTextScrambleOptions {
  duration?: number;
  scrambleDuration?: number;
}

export function useTextScramble(
  target: string,
  active: boolean,
  { duration = 800, scrambleDuration = 40 }: UseTextScrambleOptions = {}
) {
  const [output, setOutput] = useState(target);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = Math.floor(duration / scrambleDuration);

    const interval = setInterval(() => {
      setOutput(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setOutput(target);
      }

      iteration += target.length / totalFrames;
    }, scrambleDuration);

    return () => clearInterval(interval);
  }, [target, duration, scrambleDuration]);

  useEffect(() => {
    if (active) {
      const cleanup = scramble();
      return cleanup;
    }
  }, [active, target, scramble]);

  return output;
}
