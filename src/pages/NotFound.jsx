import { Link } from "react-router-dom";
import useSeo from "../components/Seo";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "This page does not exist.",
    path: "/404",
  });

  return (
    <main id="main-content" className="container section" tabIndex={-1}>
      <h1 className="section-title">Page not found</h1>
      <p className="section-subtitle">This route may have been renamed or removed.</p>
      <div className="section-cta">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    </main>
  );
}
