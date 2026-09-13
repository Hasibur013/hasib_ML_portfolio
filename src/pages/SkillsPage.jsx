import useSeo from "../components/Seo";
import Skills from "../components/Skills";

export default function SkillsPage() {
  useSeo({
    title: "Skills",
    description: "Computer vision, OCR, PyTorch, FastAPI, annotation, and applied ML stack.",
    path: "/skills",
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <Skills asPage />
    </main>
  );
}
