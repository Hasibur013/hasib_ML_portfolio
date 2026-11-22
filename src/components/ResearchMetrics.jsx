import { useEffect, useState } from "react";
import {
  fetchLiveResearchMetrics,
  publications,
  researchMetricsFallback,
  researchProfiles,
} from "../data/research";
import Icon from "./Icon";

export default function ResearchMetrics() {
  const [metrics, setMetrics] = useState(researchMetricsFallback);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const live = await fetchLiveResearchMetrics(publications);
        if (cancelled || !live) {
          if (!cancelled) setStatus("fallback");
          return;
        }
        setMetrics((prev) => ({
          ...prev,
          ...live,
          researchGateReads: prev.researchGateReads,
        }));
        setStatus("live");
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = [
    {
      value: metrics.citations,
      label: "Citations",
      detail: "Crossref · mirrors Scholar trend",
      href: researchProfiles.scholar.href,
      icon: "scholar",
    },
    {
      value: metrics.hIndex,
      label: "h-index",
      detail: "From listed papers",
      href: researchProfiles.scholar.href,
      icon: "trend",
    },
    {
      value: metrics.i10Index,
      label: "i10-index",
      detail: "Papers with ≥10 cites",
      href: researchProfiles.scholar.href,
      icon: "sparkle",
    },
    {
      value: metrics.publications,
      label: "Publications",
      detail: "On this portfolio",
      href: "#research-list",
      icon: "book",
      external: false,
    },
    {
      value: metrics.researchGateReads ?? "RG",
      label: "ResearchGate",
      detail: metrics.researchGateReads != null ? "Profile reads" : "Open profile",
      href: researchProfiles.researchGate.href,
      icon: "researchgate",
    },
  ];

  return (
    <div className="research-metrics" aria-label="Research metrics">
      <div className="research-metrics-head">
        <div>
          <p className="research-metrics-kicker">Scholar &amp; ResearchGate</p>
          <p className="research-metrics-note">
            {status === "live"
              ? `Live citation refresh · ${metrics.updated}`
              : status === "loading"
                ? "Refreshing citation counts…"
                : `Cached baseline · ${metrics.updated}`}
          </p>
        </div>
        <div className="research-metrics-links">
          <a href={researchProfiles.scholar.href} target="_blank" rel="noreferrer">
            <Icon name="scholar" size={16} /> Google Scholar
          </a>
          <a href={researchProfiles.researchGate.href} target="_blank" rel="noreferrer">
            <Icon name="researchgate" size={16} /> ResearchGate
          </a>
        </div>
      </div>

      <div className="research-metrics-grid" role="list">
        {tiles.map((tile) => {
          const Tag = tile.href ? "a" : "div";
          const linkProps = tile.href
            ? tile.external === false
              ? { href: tile.href }
              : { href: tile.href, target: "_blank", rel: "noreferrer" }
            : {};

          return (
            <Tag className="research-metrics-tile" role="listitem" key={tile.label} {...linkProps}>
              <span className="research-metrics-icon" aria-hidden="true">
                <Icon name={tile.icon} size={16} />
              </span>
              <p className="research-metrics-value">{tile.value}</p>
              <p className="research-metrics-label">{tile.label}</p>
              <p className="research-metrics-detail">{tile.detail}</p>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
