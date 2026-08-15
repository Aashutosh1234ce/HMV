import { IMG } from "@/data/images";

export default function PageHero({ title, subtitle, image = IMG.aerialPhewa }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <div className="pointer-events-none absolute inset-3 border border-paper/15 sm:inset-5" />
      <div className="relative z-10 w-full px-6 pb-12 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-paper/45">
          <span className="h-px w-8" style={{ background: "#a8843f" }} />
          <span>{subtitle}</span>
        </div>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-paper">
          {title}
        </h1>
      </div>
    </section>
  );
}
