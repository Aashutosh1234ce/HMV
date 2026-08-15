import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Location, GoodToKnow } from "../components/Sections";

export default function LocationPage() {
  return (
    <>
      <PageHero title="Location" subtitle="05 — Lakeside, Pokhara" image={IMG.pokharaStreet} />
      <Location />
      <GoodToKnow />
    </>
  );
}
