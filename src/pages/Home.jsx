import { AboutCompact } from "../components/About";
import Contact from "../components/Contact";
import CvWorkflow from "../components/CvWorkflow";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import ImpactStrip from "../components/ImpactStrip";
import Projects from "../components/Projects";
import Research from "../components/Research";
import useSeo from "../components/Seo";
import Skills from "../components/Skills";

export default function Home() {
  useSeo({
    title: "",
    description:
      "AI/ML Engineer specializing in computer vision, OCR, face recognition, Edge AI, AI automation / VLM, data analytics, and web scraping, with peer-reviewed work in healthcare IoT and phishing detection.",
    path: "/",
  });

  return (
    <main id="main-content" className="home-page" tabIndex={-1}>
      <Hero />
      <ImpactStrip />
      <CvWorkflow />
      <Highlights />
      <AboutCompact />
      <Experience compact />
      <Skills compact />
      <Projects featuredOnly />
      <Projects personalOnly />
      <Research />
      <Contact />
    </main>
  );
}
