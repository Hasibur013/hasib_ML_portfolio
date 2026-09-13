import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FloatingDock from "./FloatingDock";
import Footer from "./Footer";
import Icon from "./Icon";
import Navbar from "./Navbar";

function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (hash || state?.scrollTo || state?.scrollToProject) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, state]);

  return null;
}

export default function Layout() {
  const [topVisible, setTopVisible] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setTopVisible(y > 400);
      setDockVisible(y > 160 || window.innerWidth <= 768);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingDock visible={dockVisible} />
      <button
        type="button"
        className={`back-to-top-btn${topVisible ? " is-visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="arrowUp" size={20} />
      </button>
    </>
  );
}
