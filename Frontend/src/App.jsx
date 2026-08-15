import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import WhatsApp from "./components/WhatsApp";
import { Footer } from "./components/Sections";
import Home from "./pages/Home";
import RoomsPage from "./pages/RoomsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import GalleryPage from "./pages/GalleryPage";
import LocationPage from "./pages/LocationPage";
import ReservePage from "./pages/ReservePage";
import CheeseShop from "./pages/CheeseShop";
import Aozora from "./pages/Aozora";
import { AdminPanel } from "./components/Sections";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
    <div className="relative min-h-screen bg-paper text-ink antialiased">
      <div className="grain-bg pointer-events-none fixed inset-0 z-[200] opacity-[0.04] mix-blend-multiply" aria-hidden="true" />
      <SiteNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/reserve" element={<ReservePage />} />
            <Route path="/cheese-shop" element={<CheeseShop />} />
            <Route path="/aozora" element={<Aozora />} />
            <Route path="*" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
