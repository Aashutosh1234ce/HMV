import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { IMG } from "@/data/images";
import { Reveal, RevealImg, Head } from "./ui";
import { Magnetic, Tilt, Counter } from "./fx";
import FlowingMenu from "./reactbits/FlowingMenu.jsx";
import Masonry from "./reactbits/Masonry.jsx";

/* ---------------- Welcome ---------------- */
export function Welcome() {
  return (
    <section className="px-6 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <Head n="01" label="Welcome" title={<>A house on <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>Fewa Lake</span></>} />
          <p className="dropcap mt-9 max-w-md text-[16px] leading-[1.95] text-ash">
            Family-run and quietly set just off Lakeside&apos;s main street, we keep things simple —
            clean, spacious rooms, a warm welcome, and Fewa Lake a short walk away, with the Annapurna
            rising beyond the water.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-ash">
            <span><span style={{ color: "#a8843f" }}>2★</span> Family-run</span>
            <span className="h-px w-6 bg-ink/20" />
            <span><span style={{ color: "#a8843f" }}>4</span> Room types</span>
            <span className="h-px w-6 bg-ink/20" />
            <span><span style={{ color: "#a8843f" }}>On</span> Fewa Lake</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <RevealImg src={IMG.machapuchare} alt="Machhapuchhre at first light." className="aspect-[4/5] w-full shadow-soft" imgClassName="transition-transform duration-[2000ms] ease-out hover:scale-105" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Rooms ---------------- */
export function Rooms({ roomsData = [] }) {
  const groupedRooms = roomsData.reduce((acc, room) => {
    const type = room.room_number.split(" Room")[0]; 
    if (!acc[type]) {
      acc[type] = { type, price: room.price, total: 0, available: 0, img: IMG.room2 };
    }
    acc[type].total += 1;
    if (!room.is_booked) acc[type].available += 1;
    return acc;
  }, {});

  const roomTypes = Object.values(groupedRooms);

  return (
    <section id="rooms" className="scroll-mt-24 bg-stone px-6 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Head n="02" label="Rooms & Suites" title="Our Rooms" />
          <p className="max-w-xs text-[14px] leading-relaxed text-ash">Browse our live room availability. Each with free Wi-Fi, a kettle, a private bathroom, A/C and a desk.</p>
        </div>
        
        {roomTypes.length === 0 ? (
          <p className="mt-16 text-center text-[14px] text-ash">Loading rooms from server...</p>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {roomTypes.map((r, i) => (
              <Reveal key={r.type} delay={(i % 4) * 100}>
                <Tilt className="h-full">
                  <article className="group h-full bg-paper shadow-soft">
                    <RevealImg 
                      src={[IMG.room1, IMG.room2, IMG.room3][i % 3]} 
                      alt={`${r.type} Room`} 
                      className="aspect-[4/5]" 
                      imgClassName="transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
                    />
                    <div className="border-t border-ink/10 p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl text-ink">{r.type} Room</h3>
                        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.16em]" style={{ color: "#a8843f" }}>
                          NPR {r.price}
                        </span>
                      </div>
                      
                      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-ash">
                        Status:{" "}
                        {r.available > 0 ? (
                          <span style={{ color: "#28a745" }}>{r.available} Available</span>
                        ) : (
                          <span style={{ color: "#cc0000" }}>Fully Booked</span>
                        )}
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-[12px] text-ash">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: "#a8843f" }}>⌂</span> 
                          {r.total} Total Rooms
                        </span>
                      </div>
                      
                      <p className="mt-3 text-[13px] leading-[1.7] text-ash">
                        A calm, simple room with everything you need — clean linens, reliable hot water, and a quiet night's sleep.
                      </p>

                      <a 
                        href={r.available > 0 ? "#/reserve" : "#/rooms"} 
                        className={`link-underline mt-6 inline-block text-[11px] uppercase tracking-[0.2em] transition-colors ${r.available > 0 ? "text-ink hover:text-gold" : "text-ash/40 pointer-events-none"}`}
                      >
                        {r.available > 0 ? "Reserve →" : "Sold Out"}
                      </a>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        )}
        
        <p className="mt-14 text-center text-[11px] uppercase tracking-[0.16em] text-ash">Rates vary by season · breakfast depends on plan · extra bed NPR 1,000–1,800</p>
      </div>
    </section>
  );
}

/* ---------------- Experiences ---------------- */
const exp = [
  { tag: "Dining", title: "Two kitchens, one terrace", desc: "Nepalese and Indian cooking across two on-site restaurants, plus a bar and lounge with a sunny terrace.", img: IMG.foodThali },
  { tag: "The Lake", title: "A few steps to Fewa", desc: "Fewa Lake is a short walk away — boats, sunsets, and water like glass as the light goes.", img: IMG.womanRowing },
  { tag: "Trek & Paraglide", title: "We book the adventures", desc: "Trekking, paragliding, bike rental and tours — all arranged at reception, with English-speaking help.", img: IMG.annapurnaDawn },
];

export function Experiences() {
  return (
    <section id="experiences" className="scroll-mt-24 px-6 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <Head center n="03" label="Experiences" title={<>Days by the <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>water</span></>} />
        <div className="mt-20 divide-y divide-ink/10">
          {exp.map((e, i) => (
            <Reveal key={e.tag}>
              <div className={cn("grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-20", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
                <RevealImg src={e.img} alt={e.title} className="aspect-[5/4] shadow-soft" imgClassName="transition-transform duration-[2000ms] ease-out hover:scale-105" />
                <div className={cn(i % 2 === 1 ? "lg:pr-6" : "lg:pl-6")}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-4xl" style={{ color: "#a8843f" }}>0{i + 1}</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-ash">{e.tag}</span>
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-tight text-ink">{e.title}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.9] text-ash">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Flowing showcase (FlowingMenu) ---------------- */
const flowItems = [
  { link: "#/experiences", text: "Fewa Lake", image: IMG.boatsSunset },
  { link: "#/experiences", text: "Annapurna", image: IMG.annapurnaDawn },
  { link: "#/location", text: "Pokhara", image: IMG.pokharaStreet },
  { link: "#/experiences", text: "Sarangkot", image: IMG.pokharaParaglide },
  { link: "#/location", text: "Peace Pagoda", image: IMG.pokharaPagoda },
];

export function Flowing() {
  return (
    <section className="relative h-[88vh] min-h-[520px] w-full overflow-hidden border-y border-ink/10 bg-ink">
      <FlowingMenu
        items={flowItems}
        speed={20}
        textColor="#f4f1ec"
        bgColor="#0a0a0a"
        marqueeBgColor="#f4f1ec"
        marqueeTextColor="#0a0a0a"
        borderColor="rgba(244,241,236,0.12)"
      />
    </section>
  );
}

/* ---------------- Gallery (Masonry) ---------------- */
export function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://hotel-backend.onrender.com/gallery")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.map((img) => ({ id: img.id, img: img.url, height: img.height })));
      })
      .catch((err) => console.error("Failed to fetch gallery:", err));
  }, []);

  return (
    <section id="gallery" className="scroll-mt-24 bg-ink px-6 py-28 text-paper sm:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Head center light n="04" label="Gallery" title={<>The view, <span className="font-accent italic font-normal" style={{ color: "#c9a24a" }}>always</span></>} />
        <p className="mx-auto mt-6 max-w-md text-center text-[14px] leading-[1.8] text-paper/55">
          The lake, the rooms, the table and the hills around Pokhara — a wall of still frames.
        </p>
      </div>

      <div className="mx-auto mt-14 h-[1500px] w-full max-w-[1400px]">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.04}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.96}
          blurToFocus
          colorShiftOnHover
        />
      </div>
    </section>
  );
}

/* ---------------- Quote (cycling) ---------------- */
const testimonials = [
  { q: "Family-run and genuinely quiet, even on Lakeside's main street. The rooms are spacious and clean.", a: "A guest", o: "Tripadvisor" },
  { q: "Hot water always worked, the Wi-Fi was decent, and they arranged our trek and paragliding without fuss.", a: "A guest", o: "Booking.com" },
  { q: "A great base for couples, friends and families. The terrace and the little garden won us over.", a: "A guest", o: "Google" },
];

export function Quote() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  const go = (d) => setIdx((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <section className="bg-stone px-6 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="block font-display text-7xl leading-none" style={{ color: "#a8843f" }}>&ldquo;</span>
          <div className="relative mt-1 min-h-[9rem] sm:min-h-[7rem]">
            <blockquote key={idx} className="animate-fade-in font-accent text-[clamp(1.5rem,3.4vw,2.5rem)] italic font-light leading-[1.35] text-ink">
              {testimonials[idx].q}
            </blockquote>
          </div>
          <div className="mt-9 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ink/25" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-ash">{testimonials[idx].a} — <span style={{ color: "#a8843f" }}>{testimonials[idx].o}</span></span>
            <span className="h-px w-8 bg-ink/25" />
          </div>
          <div className="mt-9 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous" className="grid h-9 w-9 place-items-center border border-ink/20 text-ash transition-colors hover:border-ink hover:text-ink">←</button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Quote ${i + 1}`} className={cn("h-2 w-2 rounded-full border transition-all", i === idx ? "bg-ink" : "border-ink/30 bg-transparent")} style={{ borderColor: i === idx ? "#0a0a0a" : undefined }} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next" className="grid h-9 w-9 place-items-center border border-ink/20 text-ash transition-colors hover:border-ink hover:text-ink">→</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Numbers (count-up) ---------------- */
export function Numbers() {
  const stats = [
    { v: 8, d: 0, l: "Booking score" },
    { v: 4, d: 0, l: "Room types" },
    { v: 2, d: 0, l: "Restaurants" },
    { v: 24, d: 0, s: "/7", l: "Reception" },
  ];
  return (
    <section className="border-y border-ink/12 px-6 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={(i % 4) * 80} className="text-center">
              <Counter value={s.v} decimals={s.d} suffix={s.s} className="block font-display text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ash">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Location ---------------- */
export function Location() {
  const rows = [
    ["Fewa Lake", "at the door"],
    ["Hallan Chowk", "5 min walk"],
    ["Barahi Temple", "0.6 mi"],
    ["Davis Falls", "2.6 km"],
    ["Peace Stupa", "2 km"],
    ["Pokhara Airport", "5 km · NPR 400–800"],
  ];
  return (
    <section id="location" className="scroll-mt-24 px-6 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <Head n="05" label="Location" title={<>Lakeside, <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>Pokhara</span></>} />
          <p className="mt-8 max-w-md text-[15px] leading-[1.95] text-ash">Pokhara Street No. 19, Lakeside — close to the lake path and the main street, yet quiet enough to sleep.</p>
          <p className="mt-7 text-[13px] tracking-[0.1em] text-ink"><span style={{ color: "#a8843f" }}>28°12′53.7″N</span> / <span style={{ color: "#a8843f" }}>83°57′38.3″E</span></p>
          <dl className="mt-8 max-w-md border-y border-ink/12">
            {rows.map(([place, dist]) => (
              <div key={place} className="flex items-center justify-between gap-4 border-b border-ink/10 py-4 last:border-0">
                <dt className="text-[14px] text-ink/80">{place}</dt>
                <dd className="text-[11px] uppercase tracking-[0.14em] text-ash">{dist}</dd>
              </div>
            ))}
          </dl>
          <a href="https://www.google.com/maps?q=28.2149,83.9606" target="_blank" rel="noreferrer" className="link-underline mt-9 inline-block text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold">View on map →</a>
        </Reveal>
        <Reveal delay={150}>
          <div className="overflow-hidden border border-ink/10 shadow-soft">
            <iframe title="Map of Hotel Mountain Villa, Lakeside, Pokhara" src="https://www.google.com/maps?q=28.2149,83.9606&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[400px] w-full grayscale-[0.15] lg:h-[520px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Good to know ---------------- */
const facts = [
  { t: "Check-in / out", d: "Check-in 12:00–23:00 · Check-out 06:00–12:00." },
  { t: "Payment", d: "Visa & Mastercard and NPR cash; some INR at wholesale." },
  { t: "Included", d: "Free Wi-Fi & parking, 24-hr reception, two restaurants, bar, garden & BBQ." },
  { t: "Good to know", d: "No lift, pool, pets or smoking. Extra bed NPR 1,000–1,800." },
];

export function GoodToKnow() {
  return (
    <section className="bg-stone px-6 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Head center n="06" label="Good to know" title={<>Before you <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>arrive</span></>} />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.t} delay={(i % 4) * 80}>
              <div className="border-t border-ink pt-5">
                <span className="font-display text-3xl" style={{ color: "#a8843f" }}>0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{f.t}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-ash">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reservation ---------------- */
const inputCls = "w-full border border-paper/20 bg-paper/5 px-4 py-3 font-sans text-[15px] text-paper placeholder:text-paper/30 outline-none focus:border-[#c9a24a] transition-colors";

export function Reservation() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    check_in: "",
    check_out: "",
    guest_name: "",
    guest_phone: "",
    room_type: "Dormitory"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`https://hotel-backend.onrender.com/rooms/book/${form.room_type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: form.guest_name,
          guest_email: "N/A", // Not collected on form anymore
          guest_phone: form.guest_phone, 
          check_in: form.check_in,
          check_out: form.check_out
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to book room");
      }
      
      setSent(true); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="relative scroll-mt-24 overflow-hidden">
      <img src={IMG.annapurnaDawn} alt="Annapurna peaks glowing at dawn." loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 sm:px-8 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-paper/55">
              <span className="h-px w-8 bg-paper/30" />
              <span>Reservations</span>
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] text-paper">Reserve your <span className="font-accent italic font-normal" style={{ color: "#c9a24a" }}>stay</span></h2>
            <p className="mt-6 max-w-md font-accent text-[clamp(1rem,1.8vw,1.2rem)] italic leading-relaxed text-paper/80">Tell us your dates. We&apos;ll keep a room with a view — and help arrange the airport pick-up, the treks and the paragliding.</p>
            <div className="mt-10 space-y-3 text-[14px] text-paper/70">
              <a href="tel:+97761460000" className="block w-fit link-underline hover:text-paper">+977 61 4 60000</a>
              <a href="mailto:stay@mountainvilla.np" className="block w-fit link-underline hover:text-paper">stay@mountainvilla.np</a>
              <p className="text-[12px] uppercase tracking-[0.16em] text-paper/40">Pokhara Street No. 19, Lakeside, Pokhara</p>
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-paper/35">Visa / Mastercard &amp; NPR · Extra bed NPR 1,000–1,800 · Paid airport shuttle · Check-in 12:00–23:00</p>
          </div>
          <div>
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center border border-paper/15 bg-paper/5 p-10 text-center">
                <p className="font-display text-3xl" style={{ color: "#c9a24a" }}>Inquiry sent.</p>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-paper/70">We&apos;ll write back within 24 hours to confirm your dates and arrange the rest. Namaste.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-[11px] uppercase tracking-[0.2em] text-paper/60 underline-offset-4 transition-colors hover:text-paper hover:underline">Send another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="border border-red-400 bg-red-400/10 p-3 text-[13px] text-red-300">{error}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Arrival</span><input required type="date" name="check_in" value={form.check_in} onChange={handleChange} className={inputCls} /></label>
                  <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Departure</span><input required type="date" name="check_out" value={form.check_out} onChange={handleChange} className={inputCls} /></label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Guests</span><select name="guests" className={inputCls}><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></label>
                  <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Room Type</span>
                    <select name="room_type" value={form.room_type} onChange={handleChange} className={inputCls}>
                      <option value="Dormitory">Dormitory Room</option>
                      <option value="Twin Bed">Twin Bed Room</option>
                      <option value="Couple Bed">Couple Bed Room</option>
                      <option value="King Bed">King Bed Room</option>
                    </select>
                  </label>
                </div>
                <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Full name</span><input required type="text" name="guest_name" value={form.guest_name} onChange={handleChange} placeholder="Your name" className={inputCls} /></label>
                
                {/* compulsory phone number field */}
                <label>
                  <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Phone Number</span>
                  <input 
                    required 
                    type="tel" 
                    name="guest_phone" 
                    value={form.guest_phone} 
                    onChange={handleChange} 
                    placeholder="+977 98XXXXXXXX" 
                    className={inputCls} 
                  />
                </label>
                
                <label><span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-paper/50">Notes (treks, paragliding, airport pick-up)</span><textarea rows={3} placeholder="Anything we should know?" className={inputCls} /></label>
                <button type="submit" disabled={loading} className="w-full bg-paper px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-paper disabled:opacity-50">
                  {loading ? "Sending..." : "Send inquiry →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[0.98]">
              Hotel
              <br />
              <span className="font-accent italic font-normal" style={{ color: "#c9a24a" }}>Mountain Villa</span>
            </p>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.85] text-paper/55">A family-run guesthouse on Fewa Lake, Lakeside, Pokhara.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#c9a24a" }}>Explore</h3>
              <ul className="mt-5 space-y-2 text-[14px] text-paper/70">
                {[["Rooms", "#/rooms"], ["Experiences", "#/experiences"], ["Gallery", "#/gallery"], ["Cheese Shop", "#/cheese-shop"], ["Aozora", "#/aozora"], ["Location", "#/location"], ["Reserve", "#/reserve"]].map(([t, h]) => (
                  <li key={h}><a href={h} className="link-underline transition-colors hover:text-paper">{t}</a></li>
                ))}
                {/* Hidden Admin Link */}
                <li><a href="#/admin" className="link-underline transition-colors hover:text-paper opacity-20 hover:opacity-100">.</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#c9a24a" }}>Visit</h3>
              <address className="mt-5 not-italic text-[14px] leading-[1.9] text-paper/70">Pokhara Street No. 19<br />Lakeside, Pokhara<br />Nepal</address>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#c9a24a" }}>Contact</h3>
              <ul className="mt-5 space-y-2 text-[14px] text-paper/70">
                <li><a href="tel:+97761460000" className="link-underline transition-colors hover:text-paper">+977 61 4 60000</a></li>
                <li><a href="mailto:stay@mountainvilla.np" className="link-underline transition-colors hover:text-paper">stay@mountainvilla.np</a></li>
                <li><a href="#" className="link-underline transition-colors hover:text-paper">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-paper/12 pt-7 text-[11px] uppercase tracking-[0.16em] text-paper/35 sm:flex-row">
          <span>© {new Date().getFullYear()} Hotel Mountain Villa · All rights reserved</span>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="transition-colors hover:text-paper/70">Privacy</a>
            <a href="#" className="transition-colors hover:text-paper/70">Terms</a>
            <a href="#" className="transition-colors hover:text-paper/70">Cancellation</a>
            <span>28°12′53.7″N · 83°57′38.3″E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Marquee ---------------- */
export function Marquee() {
  const words = ["POKHARA", "FEWA LAKE", "ANNAPURNA", "MACHHAPUCHHRE", "LAKESIDE", "NAMASTE"];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-5">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {words.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="px-7 font-display text-[clamp(1.4rem,4vw,3rem)] font-light text-paper/80">{w}</span>
                <span style={{ color: "#a8843f" }}>✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Cinematic break ---------------- */
export function Cinematic() {
  return (
    <section className="relative flex h-[62vh] items-center justify-center overflow-hidden">
      <img src={IMG.pokharaSunset} alt="The sky on fire over Fewa Lake, Pokhara." loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/50" />
      <p className="relative px-6 text-center font-accent text-[clamp(1.5rem,4vw,2.8rem)] italic leading-[1.25] text-paper [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
        The lake keeps still.<br />The mountain keeps its pace.<br />We keep a room with a view.
      </p>
    </section>
  );
}

/* ---------------- Ratings ---------------- */
export function Ratings() {
  const scores = [
    { p: "Booking.com", v: "8.0", n: "7,471 ratings" },
    { p: "ZenHotels", v: "8.0", n: "aggregator score" },
    { p: "Tripadvisor", v: "3.0", n: "12 reviews" },
  ];
  return (
    <section className="bg-stone px-6 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Head center n="05" label="Guest words" title={<>Rated by <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>guests</span></>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {scores.map((s, i) => (
            <Reveal key={s.p} delay={(i % 3) * 80}>
              <div className="border border-ink/10 bg-paper p-8 text-center shadow-soft">
                <span className="block font-display text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none" style={{ color: "#a8843f" }}>{s.v}</span>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ash">{s.p}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ash/50">{s.n}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center font-accent text-lg italic text-ash">Guests praise the cleanliness, the dining, and the rooms.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Seasons ---------------- */
const seasons = [
  { s: "Spring", m: "Mar — May", n: "Rhododendrons in bloom; clear, warm mornings.", img: IMG.pokharaRoad },
  { s: "Monsoon", m: "Jun — Aug", n: "Green and hushed; the lake turns to glass at dusk.", img: IMG.boatsForest },
  { s: "Autumn", m: "Sep — Nov", n: "The clearest skies; trekking at its finest.", img: IMG.annapurnaDawn },
  { s: "Winter", m: "Dec — Feb", n: "Crisp, bright days; the peaks at their sharpest.", img: IMG.boatsSunset },
];

export function Seasons() {
  return (
    <section className="px-6 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Head center n="07" label="When to come" title={<>The seasons of <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>Pokhara</span></>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {seasons.map((s, i) => (
            <Reveal key={s.s} delay={(i % 4) * 80}>
              <div className="group">
                <div className="overflow-hidden shadow-soft">
                  <img src={s.img} alt={s.s} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">{s.s}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em]" style={{ color: "#a8843f" }}>{s.m}</p>
                <p className="mt-3 text-[14px] leading-[1.7] text-ash">{s.n}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
     </section>
  );
}

/* ---------------- Admin Panel ---------------- */
export function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [rooms, setRooms] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  const [newImgUrl, setNewImgUrl] = useState("");
  const [updatePriceType, setUpdatePriceType] = useState("Dormitory");
  const [newPrice, setNewPrice] = useState("");

  const adminHeaders = { "Content-Type": "application/json", "X-Admin-Password": password };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://hotel-backend.onrender.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        fetchData();
      } else {
        setLoginError("Invalid password");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  const fetchData = async () => {
    const roomsRes = await fetch("https://hotel-backend.onrender.com/rooms").then((r) => r.json());
    setRooms(roomsRes);
    
    const galleryRes = await fetch("https://hotel-backend.onrender.com/gallery").then((r) => r.json());
    setGallery(galleryRes);
  };

  const addImage = async (e) => {
    e.preventDefault();
    if (!newImgUrl) return;
    const res = await fetch("https://hotel-backend.onrender.com/gallery/add", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({ url: newImgUrl, height: 600 })
    });
    if (res.ok) {
      const newImg = await res.json();
      setGallery([...gallery, newImg]);
      setNewImgUrl("");
    } else {
      alert("Failed to add image. Are you logged in?");
    }
  };

  const deleteImage = async (id) => {
    const res = await fetch(`https://hotel-backend.onrender.com/gallery/delete/${id}`, { 
      method: "POST", 
      headers: adminHeaders 
    });
    if (res.ok) {
      setGallery(gallery.filter((img) => img.id !== id));
    }
  };

  const cancelBooking = async (room_number) => {
    const res = await fetch(`https://hotel-backend.onrender.com/rooms/cancel/${encodeURIComponent(room_number)}`, {
      method: "POST",
      headers: adminHeaders
    });
    if (res.ok) {
      setRooms(rooms.map((r) => r.room_number === room_number ? { ...r, is_booked: 0, guest_name: null, check_in: null, check_out: null } : r));
    }
  };

  const updatePrice = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://hotel-backend.onrender.com/rooms/update-price/${updatePriceType}`, {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({ price: parseFloat(newPrice) })
    });
    if (res.ok) {
      alert(`Price updated for ${updatePriceType} rooms!`);
      setNewPrice("");
      fetchData(); // Refresh rooms to show new price
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-ink px-6 py-20 text-paper">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 border border-paper/15 bg-paper/5 p-10">
          <h2 className="font-display text-3xl" style={{ color: "#c9a24a" }}>Admin Login</h2>
          <p className="text-[13px] text-paper/60">Enter your password to manage the hotel.</p>
          {loginError && <p className="text-sm text-red-400">{loginError}</p>}
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full border border-paper/20 bg-paper/5 px-4 py-3 text-paper outline-none focus:border-[#c9a24a]" 
            required
          />
          <button type="submit" className="w-full bg-paper px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-ink hover:bg-transparent hover:text-paper transition-colors">
            Login →
          </button>
          <a href="#/" className="block text-center text-[11px] uppercase tracking-[0.2em] text-paper/40 hover:text-paper">Back to site</a>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-stone px-6 py-20 text-ink sm:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl">Admin Dashboard</h2>
          <button onClick={() => setIsLoggedIn(false)} className="text-[11px] uppercase tracking-[0.2em] text-ash hover:text-ink">Logout</button>
        </div>

        {/* Bookings Management */}
        <div>
          <h3 className="mb-4 text-xl font-medium">Active Bookings</h3>
          <div className="overflow-hidden border border-ink/10 bg-paper shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/5 text-[11px] uppercase tracking-wider text-ash">
                <tr>
                  <th className="p-4">Room</th>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Check-in</th>
                  <th className="p-4">Check-out</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.filter((r) => r.is_booked).map((room) => (
                  <tr key={room.id} className="border-t border-ink/10">
                    <td className="p-4 font-medium">{room.room_number}</td>
                    <td className="p-4">{room.guest_name}<br/><span className="text-ash/60">{room.guest_phone}</span></td>
                    <td className="p-4">{room.check_in}</td>
                    <td className="p-4">{room.check_out}</td>
                    <td className="p-4">
                      <button onClick={() => cancelBooking(room.room_number)} className="bg-red-500 px-3 py-1 text-[10px] uppercase tracking-wider text-white hover:bg-red-600">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
                {rooms.filter((r) => r.is_booked).length === 0 && (
                  <tr><td colSpan="5" className="p-8 text-center text-ash">No active bookings.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Management */}
        <div>
          <h3 className="mb-4 text-xl font-medium">Update Prices</h3>
          <form onSubmit={updatePrice} className="flex flex-col gap-4 sm:flex-row">
            <select 
              value={updatePriceType} 
              onChange={(e) => setUpdatePriceType(e.target.value)} 
              className="border border-ink/15 bg-paper px-4 py-3 outline-none"
            >
              <option value="Dormitory">Dormitory Room</option>
              <option value="Twin Bed">Twin Bed Room</option>
              <option value="Couple Bed">Couple Bed Room</option>
              <option value="King Bed">King Bed Room</option>
            </select>
            <input 
              type="number" 
              value={newPrice} 
              onChange={(e) => setNewPrice(e.target.value)} 
              placeholder="New Price (e.g., 2500)" 
              className="border border-ink/15 bg-paper px-4 py-3 outline-none sm:w-64" 
              required
            />
            <button type="submit" className="bg-ink px-6 py-3 text-[11px] uppercase tracking-wider text-paper hover:bg-ink/80">
              Update Price
            </button>
          </form>
        </div>

        {/* Gallery Management */}
        <div>
          <h3 className="mb-4 text-xl font-medium">Manage Gallery</h3>
          <form onSubmit={addImage} className="mb-6 flex flex-col gap-4 sm:flex-row">
            <input 
              type="text" 
              value={newImgUrl} 
              onChange={(e) => setNewImgUrl(e.target.value)} 
              placeholder="Paste new image URL..." 
              className="border border-ink/15 bg-paper px-4 py-3 outline-none sm:flex-1" 
              required
            />
            <button type="submit" className="bg-ink px-6 py-3 text-[11px] uppercase tracking-wider text-paper hover:bg-ink/80">
              Add Image
            </button>
          </form>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
            {gallery.map((img) => (
              <div key={img.id} className="group relative">
                <img src={img.url} alt="Gallery thumbnail" className="h-28 w-full object-cover shadow-sm" />
                <button 
                  onClick={() => deleteImage(img.id)} 
                  className="absolute inset-0 flex items-center justify-center bg-red-900/80 text-xs uppercase text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}