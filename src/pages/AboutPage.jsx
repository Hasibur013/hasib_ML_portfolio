import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";
import Education from "../components/Education";
import Experience from "../components/Experience";
import useSeo from "../components/Seo";

export default function AboutPage() {
  const { state } = useLocation();
  useSeo({
    title: "About",
    description:
      "AI/ML Engineer at Bondstein specializing in computer vision, OCR, face recognition, Edge AI, and AI automation / VLM systems, with research in healthcare IoT and phishing detection.",
    path: "/about",
  });

  useEffect(() => {
    if (!state?.scrollTo) return;
    const el = document.getElementById(state.scrollTo);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [state]);

  return (
    <main id="main-content" className="about-page" tabIndex={-1}>
      <About />
      <Experience />
      <Education />
    </main>
  );
}
