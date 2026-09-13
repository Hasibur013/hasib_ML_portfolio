import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Projects from "../components/Projects";
import useSeo from "../components/Seo";

export default function ProjectsPage() {
  const { state } = useLocation();
  useSeo({
    title: "Projects",
    description:
      "Industry computer-vision systems and selected personal ML, healthcare, and analytics projects.",
    path: "/projects",
  });

  useEffect(() => {
    if (!state?.scrollToProject) return;
    const el = document.getElementById(`project-${state.scrollToProject}`);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    el.classList.add("is-highlighted");
    const timer = setTimeout(() => el.classList.remove("is-highlighted"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <main id="main-content" tabIndex={-1}>
      <Projects defaultFilter="All" asPage />
    </main>
  );
}
