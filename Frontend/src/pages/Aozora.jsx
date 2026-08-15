import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Reveal } from "../components/ui";

const menu = [
  { title: "Sushi & Sashimi", desc: "Fresh, hand-pressed nigiri and rolls, prepared to order.", img: IMG.sushiDonburi },
  { title: "Ramen", desc: "Rich tonkotsu and miso broth, slow-simmered daily.", img: IMG.ramenBowl },
  { title: "Donburi & Set Meals", desc: "Chicken teriyaki, gyudon, and seasonal rice bowls.", img: IMG.ramenSushi },
];

export default function Aozora() {
  return (
    <>
      <PageHero title="Aozora" subtitle="Japanese Restaurant · In-house" image={IMG.ramenSushi2} />

      {/* Intro */}
      <section className="px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">青空 — Blue Sky</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-tight">
              Hotel Mountain Villa's in-house Japanese restaurant
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7] text-ash">
              Set in a bamboo-lined garden with both indoor and outdoor seating, Aozora welcomes you
              with a cup of mugi — roasted barley tea — the moment you sit down. Sushi, ramen, donburi,
              and set meals, served with quiet precision.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Staggered menu highlights */}
      <section className="bg-stone px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">From the Kitchen</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium">Menu highlights</h2>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-x-16">
            {menu.map((m, i) => (
              <Reveal key={m.title} delay={i * 100} className={i % 2 === 1 ? "lg:translate-y-16" : ""}>
                <div className="overflow-hidden border border-ink/10 shadow-soft">
                  <img src={m.img} alt={m.title} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-105" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium">{m.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-ash">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bamboo garden + hours */}
      <section className="px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <Reveal delay={120} className="lg:order-last">
            <div className="overflow-hidden border border-ink/10 shadow-soft">
              <img src={IMG.bambooDining} alt="Bamboo-lined garden dining at Aozora." loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-105" />
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">Dine With Us</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium">Open to all hotel guests</h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-ash">Indoor and garden seating, surrounded by bamboo. Each guest is greeted with mugi tea on arrival.</p>
            <dl className="mt-8 space-y-3 text-[14px] text-ink/80">
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Lunch</dt><dd>12:00 — 14:30</dd></div>
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Dinner</dt><dd>18:00 — 22:00</dd></div>
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Reservations</dt><dd>Recommended for dinner</dd></div>
            </dl>
            <a href="#/reserve" className="mt-7 inline-flex items-center gap-2 border-b border-forest/30 pb-1 text-[12px] font-medium uppercase tracking-[0.14em] text-forest transition-colors hover:text-slate">
              Make a reservation →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
