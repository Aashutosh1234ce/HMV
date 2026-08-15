import { IMG } from "@/data/images";
import Hero from "../components/Hero";
import { Welcome, Cinematic, Flowing, Quote } from "../components/Sections";
import { Reveal } from "../components/ui";

const teasers = [
  { to: "#/rooms", title: "Rooms", copy: "Three quiet rooms on the lakeshore.", img: IMG.room1 },
  { to: "#/experiences", title: "Experiences", copy: "Boats, treks, tea, and paragliding.", img: IMG.pokharaParaglide },
  { to: "#/gallery", title: "Gallery", copy: "The Pokhara wall — a masonry of frames.", img: IMG.boatsSunset },
  { to: "#/location", title: "Location", copy: "Lakeside-6, a few steps from Fewa.", img: IMG.pokharaStreet },
];

const diningTeasers = [
  { to: "#/cheese-shop", title: "The Cheese Shop", copy: "Yak, cow, goat, and aged — plus wine and bread. Right on the property.", img: IMG.cheesePlatter },
  { to: "#/aozora", title: "Aozora", copy: "Our in-house Japanese restaurant. Sushi, ramen, and donburi in a bamboo garden.", img: IMG.ramenSushi2 },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />

      {/* Teaser cards */}
      <section className="bg-stone px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-8" style={{ background: "var(--color-forest)" }} />
            <span className="eyebrow">Explore the house</span>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teasers.map((t, i) => (
              <Reveal key={t.title} delay={(i % 4) * 80}>
                <a href={t.to} className="group block">
                  <div className="overflow-hidden border border-ink/10 shadow-soft">
                    <img src={t.img} alt={t.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium">{t.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ash">{t.copy}</p>
                  <span className="mt-2 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-forest">Enter →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dining & Shop teaser */}
      <section className="px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-8" style={{ background: "var(--color-forest)" }} />
            <span className="eyebrow">Dining &amp; Shop</span>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
            {diningTeasers.map((t, i) => (
              <Reveal key={t.title} delay={i * 100} className={i === 1 ? "lg:translate-y-12" : ""}>
                <a href={t.to} className="group block">
                  <div className="overflow-hidden border border-ink/10 shadow-soft">
                    <img src={t.img} alt={t.title} loading="lazy" className="aspect-[5/3] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium">{t.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-ash">{t.copy}</p>
                  <span className="mt-3 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-forest">Discover →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cinematic />
      <Flowing />
      <Quote />

      {/* CTA band → Reserve page */}
      <section className="relative flex min-h-[44vh] items-center justify-center overflow-hidden">
        <img src={IMG.annapurnaDawn} alt="Annapurna peaks at dawn." loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-paper">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,4vw,2.8rem)] italic leading-tight">
              Stay a while.
            </p>
            <a href="#/reserve" className="mt-8 inline-block border-2 border-paper px-9 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink">
              Reserve a room
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
