import Research from "../components/Research";
import useSeo from "../components/Seo";

export default function ResearchPage() {
  useSeo({
    title: "Research",
    description:
      "Peer-reviewed papers and a journal-bound preprint on healthcare IoT, phishing detection, and leakage-aware dementia ML evaluation.",
    path: "/research",
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <Research asPage />
    </main>
  );
}
