import { useEffect, useRef, useState } from "react";

/** Measure a full-width container; debounced to avoid resize feedback loops. */
export function useContainerWidth(fallback = 320) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = Math.floor(el.getBoundingClientRect().width);
        if (next <= 0) return;
        setWidth((prev) => (Math.abs(prev - next) >= 2 ? next : prev));
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, width };
}
