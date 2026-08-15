import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";
import PageHero from "../components/PageHero";
import { Reveal } from "../components/ui";

const steps = [
  { n: "01", t: "Send your inquiry", d: "Fill the form or call us. Tell us your dates and the room you'd like." },
  { n: "02", t: "We confirm", d: "Within 24 hours, we write back to confirm availability and the room with a view." },
  { n: "03", t: "You arrive", d: "We meet you at the door, arrange the airport pick-up, and pour the first cup of tea." },
];

const policies = [
  { t: "Check-in / out", d: "Check-in 12:00–23:00 · Check-out 06:00–12:00." },
  { t: "Payment", d: "Visa & Mastercard and NPR cash; some INR at wholesale." },
  { t: "Children", d: "Welcome. Extra bed NPR 1,000–1,800 per night." },
  { t: "Cancellation", d: "Flexible up to 72 hours before arrival. We're easy about it." },
  { t: "Airport shuttle", d: "Paid pick-up from Pokhara Airport — NPR 400–800." },
  { t: "Note", d: "No lift, pool, pets or smoking on-site. We keep it simple." },
];

const inputCls = "w-full border border-ink/15 bg-stone px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-[#a8843f]";

export default function ReservePage() {
  const [sent, setSent] = useState(false);
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get("room") || "Dormitory Room";
  const [selectedRoom, setSelectedRoom] = useState(initialRoom);
  
  // NEW: Fetch live room data for prices
  const [roomsData, setRoomsData] = useState([]);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms", { cache: "no-store" })
      .then(res => res.json())
      .then(data => setRoomsData(data))
      .catch(err => console.error("Error fetching rooms:", err));
  }, []);

  // Helper to get price from database
  const getPrice = (type) => {
    const room = roomsData.find(r => r.room_number.includes(type));
    return room ? room.price : '...';
  };

  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    check_in: "",
    check_out: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/rooms/book/${encodeURIComponent(selectedRoom)}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSent(true);
      } else {
        const err = await response.json();
        alert(err.error || "Failed to book room.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    }
  };

  return (
    <>
      <PageHero title="Reserve" subtitle="06 — Plan your stay" image={IMG.annapurnaDawn} />

      <div className="bg-ink py-3.5 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#c9a24a" }}>
          ✳ Book direct &amp; save — best rate guaranteed · free breakfast · no booking fees
        </p>
      </div>

      <section className="px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-ink">
                Apply for a <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>room</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-[1.85] text-ash">
                Tell us your dates. We'll keep a room with a view — and a still morning waiting.
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-10">
              {sent ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center border border-ink/12 bg-stone p-10 text-center">
                  <span className="text-5xl" style={{ color: "#a8843f" }}>✳</span>
                  <p className="mt-5 font-display text-3xl" style={{ color: "#a8843f" }}>Reservation Confirmed.</p>
                  <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ash">We've successfully reserved the {selectedRoom} for you. We'll write back within 24 hours to arrange the rest. Namaste.</p>
                  <button onClick={() => setSent(false)} className="mt-6 border border-ink/25 px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper">Book another →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Arrival</span>
                      <input required type="date" name="check_in" value={formData.check_in} onChange={handleChange} className={inputCls} />
                    </label>
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Departure</span>
                      <input required type="date" name="check_out" value={formData.check_out} onChange={handleChange} className={inputCls} />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Guests</span>
                      <select className={inputCls}>
                        <option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option>
                      </select>
                    </label>
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Room type</span>
                      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className={inputCls}>
                        <option value="Dormitory Room">Dormitory Room — from NPR {getPrice("Dormitory")}</option>
                        <option value="Twin Bed Room">Twin Bed Room — from NPR {getPrice("Twin Bed")}</option>
                        <option value="Couple Bed Room">Couple Bed Room — from NPR {getPrice("Couple Bed")}</option>
                        <option value="King Bed Room">King Bed Room — from NPR {getPrice("King Bed")}</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Full name</span>
                      <input required type="text" name="guest_name" value={formData.guest_name} onChange={handleChange} placeholder="Your name" className={inputCls} />
                    </label>
                    <label>
                      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Email</span>
                      <input required type="email" name="guest_email" value={formData.guest_email} onChange={handleChange} placeholder="you@email.com" className={inputCls} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Phone (optional)</span>
                    <input type="tel" name="guest_phone" value={formData.guest_phone} onChange={handleChange} placeholder="+country number" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-ash">Notes — treks, paragliding, airport pick-up, dietary needs</span>
                    <textarea rows={3} placeholder="Anything we should know?" className={inputCls} />
                  </label>
                  <button type="submit" className="w-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-paper transition-colors duration-300 hover:bg-[#a8843f]">Reserve →</button>
                </form>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="border border-ink/12 bg-stone p-7">
                <h3 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#a8843f" }}>Room rates</h3>
                <div className="mt-5 space-y-4">
                  {/* UPDATED: Live prices from database */}
                  {[
                    { name: "Dormitory Room", img: IMG.room3, key: "Dormitory" },
                    { name: "Twin Bed Room", img: IMG.room2, key: "Twin Bed" },
                    { name: "Couple Bed Room", img: IMG.room1, key: "Couple Bed" },
                    { name: "King Bed Room", img: IMG.room1, key: "King Bed" }
                  ].map((r) => (
                    <div key={r.name} className="flex items-center gap-4 border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                      <img src={r.img} alt={r.name} loading="lazy" className="h-14 w-14 shrink-0 object-cover" />
                      <div className="flex-1">
                        <p className="font-display text-lg text-ink">{r.name}</p>
                        <p className="text-[11px] uppercase tracking-[0.1em] text-ash">from NPR {getPrice(r.key)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-ash/60">Rates vary by season · breakfast depends on plan</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 border border-ink/12 bg-stone p-7">
                <h3 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "#a8843f" }}>Prefer to talk?</h3>
                <div className="mt-5 space-y-3 text-[14px] text-ink/80">
                  <a href="tel:+97761460000" className="flex items-center gap-3 transition-colors hover:text-ink">
                    <span style={{ color: "#a8843f" }}>☎</span> +977 61 4 60000
                  </a>
                  <a href="mailto:stay@mountainvilla.np" className="flex items-center gap-3 transition-colors hover:text-ink">
                    <span style={{ color: "#a8843f" }}>✉</span> stay@mountainvilla.np
                  </a>
                  <a href="#" className="flex items-center gap-3 transition-colors hover:text-ink">
                    <span style={{ color: "#a8843f" }}>✳</span> WhatsApp us
                  </a>
                  <p className="flex items-start gap-3 text-ash">
                    <span style={{ color: "#a8843f" }}>⌖</span>
                    <span>Pokhara Street No. 19, Lakeside, Pokhara, Nepal</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-stone px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ink">How it <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>works</span></h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 90}>
                <div className="text-center">
                  <span className="font-display text-5xl font-medium" style={{ color: "#a8843f" }}>{s.n}</span>
                  <h3 className="mt-4 font-display text-xl text-ink">{s.t}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-ash">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ink">Before you <span className="font-accent italic font-normal" style={{ color: "#a8843f" }}>arrive</span></h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {policies.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 70}>
                <div className="border-t-2 border-ink/12 pt-4">
                  <h3 className="font-display text-lg text-ink">{p.t}</h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-ash">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}