import { IMG } from "@/data/images";
import PageHero from "../components/PageHero";
import { Gallery, Ratings, Quote } from "../components/Sections";

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" subtitle="04 — The view, always" image={IMG.boatsSunset} />
      <Gallery />
      <Ratings />
      <Quote />
    </>
  );
}
