import useSeo from "../components/Seo";
import Skills from "../components/Skills";

export default function SkillsPage() {
  useSeo({
    title: "Skills",
    description:
      "AI/ML, computer vision, OCR, face recognition, automation, VLM, analytics, and scraping tools organized by stack.",
    path: "/skills",
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <Skills asPage />
    </main>
  );
}
