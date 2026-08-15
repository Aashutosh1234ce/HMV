import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * strength).toFixed(1)}px, ${((e.clientY - (r.top + r.height / 2)) * strength).toFixed(1)}px)`;
  };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={() => (ref.current.style.transform = "translate(0,0)")} className={cn("inline-block transition-transform duration-300 ease-out motion-reduce:transform-none", className)}>
      {children}
    </span>
  );
}

export function Tilt({ children, max = 6, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => (ref.current && (ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"))} className={cn("transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:transform-none", className)}>
      {children}
    </div>
  );
}

export function Counter({ value = 0, decimals = 0, duration = 1800, prefix = "", suffix = "", className }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return setVal(value);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const t0 = performance.now();
            const step = (now) => {
              const t = Math.min(1, (now - t0) / duration);
              setVal(value * (1 - Math.pow(1 - t, 3)));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
