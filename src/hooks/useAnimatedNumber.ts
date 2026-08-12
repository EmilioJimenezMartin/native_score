"use client";

import { useEffect, useRef, useState } from "react";

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Tweens the displayed value from its previous value to `value` whenever it
 * changes, decelerating into the target (ease-out) instead of snapping —
 * a classic odometer-style counter transition.
 */
export function useAnimatedNumber(value: number, duration = 650) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutQuint(progress);
      setDisplay(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    let frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}
