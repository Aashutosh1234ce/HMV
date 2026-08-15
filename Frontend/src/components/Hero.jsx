import { useEffect, useRef } from "react";
import { IMG } from "@/data/images";

export default function Hero() {
  const imgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (imgRef.current && y < window.innerHeight) {
          imgRef.current.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0) scale(1.15)`;
        }
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); };
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* full-bleed image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img src={IMG.aerialPhewa} alt="Aerial view of Phewa Lake and the Annapurna range, Pokhara, Nepal." fetchPriority="high" className="h-full w-full object-cover" />
      </div>

      {/* heavy bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/15 to-ink" />

      {/* inset gold frame */}
      <div className="pointer-events-none absolute inset-3 z-20 border border-paper/15 sm:inset-5" />



      {/* bottom-anchored poster content */}
      <div className="relative z-30 flex min-h-[100svh] flex-col justify-end px-6 pb-24 sm:px-10 lg:px-16">
        <div className="fade-up flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/55" style={{ animationDelay: "0.1s" }}>
          <span className="h-px w-8" style={{ background: "#a8843f" }} />
          <span>Lakeside · Pokhara · Nepal</span>
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,11vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.015em] text-paper">
          <span className="fade-up block" style={{ animationDelay: "0.2s" }}>Hotel</span>
          <span className="fade-up block" style={{ animationDelay: "0.32s" }}>Mountain</span>
          <span className="fade-up block font-accent italic font-normal" style={{ animationDelay: "0.44s", color: "#f0b856" }}>Villa</span>
        </h1>

        <div className="fade-up mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" style={{ animationDelay: "0.6s" }}>
          <div>
            <p className="max-w-md font-accent text-[clamp(1.05rem,2vw,1.45rem)] italic leading-snug text-paper/80">
              A family-run retreat on the still water of Fewa Lake, beneath the Annapurna.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#/reserve" className="bg-paper px-9 py-3.5 text-[11px] uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-paper">Reserve a room</a>
              <a href="#/gallery" className="link-underline text-[11px] uppercase tracking-[0.24em] text-paper/70 transition-colors hover:text-paper">Explore Pokhara</a>
            </div>
          </div>
          <div className="hidden text-right lg:block">
            <p className="text-[11px] leading-[1.9] uppercase tracking-[0.18em] text-paper/30">
              <span style={{ color: "#e2a036" }}>2★</span> Family-run<br />
              <span style={{ color: "#e2a036" }}>3</span> Room types<br />
              <span style={{ color: "#e2a036" }}>2</span> Restaurants
            </p>
          </div>
        </div>
      </div>

      {/* bottom marquee strip */}
      <div className="absolute inset-x-0 bottom-0 z-40 overflow-hidden border-t border-paper/10 bg-ink/65 py-2.5 backdrop-blur-sm">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {["POKHARA", "FEWA LAKE", "ANNAPURNA", "MACHHAPUCHHRE", "LAKESIDE", "NAMASTE"].map((w, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-5 font-display text-[clamp(0.85rem,1.8vw,1.4rem)] font-light text-paper/55">{w}</span>
                  <span style={{ color: "#a8843f" }}>✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
