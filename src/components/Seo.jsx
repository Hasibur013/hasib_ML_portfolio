import { useEffect } from "react";
import { profile } from "../data/site";

export default function useSeo({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${profile.name}`
      : `${profile.name} | AI/ML Engineer`;
    document.title = fullTitle;

    const desc = description || profile.seoDescription;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    const canonicalHref = path;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);
  }, [title, description, path]);
}
