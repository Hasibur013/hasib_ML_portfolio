import Research from "../components/Research";
import useSeo from "../components/Seo";

export default function ResearchPage() {
  useSeo({
    title: "Research",
    description:
      "Peer-reviewed research in healthcare IoT task offloading and ensemble phishing-website detection.",
    path: "/research",
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <Research asPage />
    </main>
  );
}
