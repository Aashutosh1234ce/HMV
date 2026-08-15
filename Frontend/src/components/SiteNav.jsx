import { useEffect, useState } from "react";
import StaggeredMenu from "./reactbits/StaggeredMenu.jsx";

const items = [
  { label: "Home", link: "#/", ariaLabel: "Home page" },
  { label: "Rooms", link: "#/rooms", ariaLabel: "View rooms" },
  { label: "Experiences", link: "#/experiences", ariaLabel: "View experiences" },
  { label: "Gallery", link: "#/gallery", ariaLabel: "View gallery" },
  { label: "Cheese Shop", link: "#/cheese-shop", ariaLabel: "Visit the cheese shop" },
  { label: "Aozora", link: "#/aozora", ariaLabel: "Aozora Japanese Restaurant" },
  { label: "Location", link: "#/location", ariaLabel: "View location" },
  { label: "Reserve", link: "#/reserve", ariaLabel: "Make a reservation" },
];

const socialItems = [
  { label: "Instagram", link: "#" },
  { label: "Facebook", link: "#" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const INK = "#22252a";
  const PAPER = "#f6f1e5";

  return (
    <StaggeredMenu
      isFixed
      position="right"
      colors={["#0a0a0a", "#a8843f"]}
      items={items}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      scrolled={scrolled}
      menuButtonColor={scrolled || open ? INK : PAPER}
      openMenuButtonColor={INK}
      changeMenuColorOnOpen
      accentColor="#a8843f"
      closeOnClickAway
      onMenuOpen={() => setOpen(true)}
      onMenuClose={() => setOpen(false)}
      brand={
        <a href="#/">
          Hotel Mountain <em>Villa</em>
        </a>
      }
    />
  );
}
