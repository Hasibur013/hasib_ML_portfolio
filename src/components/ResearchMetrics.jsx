import { useEffect, useState } from "react";
import {
  fetchScholarMetricsLive,
  researchMetrics as cachedMetrics,
  researchProfiles,
} from "../data/research";
import Icon from "./Icon";

/** Compact Google Scholar stats for the Research page intro. */
export default function ResearchMetrics() {
  const [metrics, setMetrics] = useState(cachedMetrics);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const live = await fetchScholarMetricsLive();
      if (cancelled) return;
      if (live) {
        setMetrics(live);
        setStatus("live");
      } else {
        setStatus("cached");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    {
      label: "Citations",
      all: metrics.citations,
      recent: metrics.citationsSince2021,
    },
    {
      label: "h-index",
      all: metrics.hIndex,
      recent: metrics.hIndexSince2021,
    },
    {
      label: "i10-index",
      all: metrics.i10Index,
      recent: metrics.i10IndexSince2021,
    },
  ];

  const footnote =
    status === "live"
      ? `From Scholar stats · ${metrics.updated}`
      : status === "loading"
        ? "Loading Scholar stats…"
        : `Fallback stats · ${metrics.updated}`;

  return (
    <aside className="research-scholar" aria-label="Google Scholar metrics">
      <div className="research-scholar-top">
        <span className="research-scholar-brand">
          <Icon name="scholar" size={16} />
          Google Scholar
        </span>
        <a
          className="research-scholar-link"
          href={researchProfiles.scholar.href}
          target="_blank"
          rel="noreferrer"
        >
          Profile <Icon name="externalLink" size={13} />
        </a>
      </div>

      <div className="research-scholar-stats" role="list">
        {stats.map((stat) => (
          <div className="research-scholar-stat" role="listitem" key={stat.label}>
            <p className="research-scholar-value">{stat.all}</p>
            <p className="research-scholar-label">{stat.label}</p>
            <p className="research-scholar-since">Since 2021 · {stat.recent}</p>
          </div>
        ))}
      </div>

      <p className="research-scholar-footnote">{footnote}</p>
    </aside>
  );
}
