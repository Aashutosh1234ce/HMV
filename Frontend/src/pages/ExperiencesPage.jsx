import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Experiences, Flowing, Seasons, Numbers } from "../components/Sections";

export default function ExperiencesPage() {
  return (
    <>
      <PageHero title="Experiences" subtitle="03 — Days by the water" image={IMG.pokharaParaglide} />
      <Experiences />
      <Flowing />
      <Seasons />
      <Numbers />
    </>
  );
}
