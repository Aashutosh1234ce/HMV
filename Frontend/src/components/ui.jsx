import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setShown(true);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return setShown(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function RevealImg({ src, alt, className, imgClassName }) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <img src={src} alt={alt ?? ""} loading="lazy" className={cn("h-full w-full object-cover transition-transform duration-[1800ms] ease-out", imgClassName)} />
    </div>
  );
}

export function Index({ n, light = false, className }) {
  return (
    <span className={cn("eyebrow", light && "!text-paper/50", className)}>
      <span style={{ color: "var(--color-forest)" }}>{n}</span>
    </span>
  );
}

export function Head({ n, label, title, sub, center = false, light = false, className }) {
  return (
    <div className={cn(center && "flex flex-col items-center text-center", !center && "max-w-2xl", className)}>
      <div className={cn("flex items-center gap-4", center && "justify-center")}>
        <Index n={n} light={light} />
        <span className={cn("eyebrow", light && "!text-paper/50")}>{label}</span>
      </div>
      <h2 className={cn("mt-6 font-display text-[clamp(2rem,4.8vw,3.6rem)] font-medium leading-[1.12]", light ? "text-paper" : "text-ink")}>
        {title}
      </h2>
      {sub && <p className={cn("mt-5 max-w-xl text-[15px] leading-[1.7]", light ? "text-paper/65" : "text-ash", center && "mx-auto")}>{sub}</p>}
    </div>
  );
}

const links = [
  { label: "Rooms", href: "#/rooms" },
  { label: "Experiences", href: "#/experiences" },
  { label: "Gallery", href: "#/gallery" },
  { label: "Location", href: "#/location" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const light = !solid;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500", solid ? "border-b border-ink/10 bg-paper" : "border-b border-transparent bg-transparent")}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="#/" className={cn("font-display text-xl tracking-tight transition-colors duration-500 font-medium", light ? "text-paper" : "text-ink")}>
          Hotel Mountain Villa
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={cn("text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300", light ? "text-paper/75 hover:text-paper" : "text-ink/65 hover:text-forest")}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#/reserve" className={cn("border px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300", light ? "border-paper/40 text-paper hover:bg-paper/10" : "border-forest/30 text-forest hover:bg-forest hover:text-paper")}>
          Reserve
        </a>
      </nav>
    </header>
  );
}
