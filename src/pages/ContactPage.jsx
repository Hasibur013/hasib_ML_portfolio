import Contact from "../components/Contact";
import useSeo from "../components/Seo";

export default function ContactPage() {
  useSeo({
    title: "Contact",
    description: "Get in touch about roles, collaborations, or research enquiries.",
    path: "/contact",
  });

  return (
    <main id="main-content" tabIndex={-1}>
      <Contact />
    </main>
  );
}
