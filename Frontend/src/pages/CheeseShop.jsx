import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Reveal } from "../components/ui";

const selection = [
  { title: "Yak Cheese", desc: "Rich, nutty, and distinctly Himalayan — made by hand in the high pastures.", img: IMG.cheeseArtisan },
  { title: "Aged & Smoked", desc: "Cow and goat varieties, aged in our cellar and smoked over local hardwood.", img: IMG.cheeseElegant },
  { title: "Gourmet Bread & Wine", desc: "Fresh-baked loaves and a curated list of reds and whites to pair.", img: IMG.cheeseBoard },
];

export default function CheeseShop() {
  return (
    <>
      <PageHero title="The Cheese Shop" subtitle="Hotel Mountain Villa · Phewa Marga" image={IMG.cheesePlatter} />

      {/* Intro */}
      <section className="px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">Our Own Shop</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-tight">
              An authorised cheese retailer, right on the property
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7] text-ash">
              Steps from the lake, along Phewa Marga, our cheese shop opens its doors to hotel guests
              and walk-ins alike. Pick up a wedge of yak, a smoked goat round, and a bottle of red —
              then head down to the water for a lakeside picnic, or settle in for the evening.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Staggered selection grid */}
      <section className="bg-stone px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">The Selection</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium">What we carry</h2>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-x-16">
            {selection.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className={i % 2 === 1 ? "lg:translate-y-16" : ""}>
                <div className="overflow-hidden border border-ink/10 shadow-soft">
                  <img src={s.img} alt={s.title} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-105" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-ash">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Visit Us</span>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-medium">Open daily on Phewa Marga</h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-ash">Right on the hotel property, next to the garden entrance. Hotel guests and walk-ins welcome.</p>
            <dl className="mt-8 space-y-3 text-[14px] text-ink/80">
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Hours</dt><dd>Daily · 09:00 — 20:00</dd></div>
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Location</dt><dd>Phewa Marga, Lakeside-6</dd></div>
              <div className="flex justify-between border-b border-ink/10 py-2"><dt className="font-medium">Payment</dt><dd>Cash & card accepted</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden border border-ink/10 shadow-soft">
              <img src={IMG.cheeseBoard} alt="A cheese board with wine and bread." loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-105" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
