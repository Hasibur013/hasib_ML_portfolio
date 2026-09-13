import { useState } from "react";
import { Link } from "react-router-dom";
import { publications } from "../data/research";
import Icon from "./Icon";

export default function Research({ asPage = false }) {
  const [openId, setOpenId] = useState(null);
  const [copied, setCopied] = useState("");
  const items = asPage ? publications : publications.slice(0, 2);

  const copyBib = async (pub) => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(pub.id);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  };

  return (
    <section className="section publications" id="research">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="book" /> Publications
          </span>
          <h2 className="section-title">Research papers</h2>
          <p className="section-subtitle">Peer-reviewed research and preprints in machine learning and AI</p>
        </div>
        <div className="publications-list">
          {items.map((pub) => (
            <article className="publication-card" key={pub.id}>
              <p className="publication-venue">{pub.venue}</p>
              <h3 className="publication-title">{pub.title}</h3>
              <p className="publication-authors">{pub.authors}</p>
              <p className="publication-abstract">{pub.abstract}</p>
              <div className="publication-actions">
                <a className="publication-btn" href={pub.url} target="_blank" rel="noreferrer">
                  View paper <Icon name="externalLink" size={14} />
                </a>
                <button
                  type="button"
                  className="publication-btn"
                  onClick={() => setOpenId((id) => (id === pub.id ? null : pub.id))}
                >
                  {openId === pub.id ? "Hide BibTeX" : "BibTeX"}
                </button>
              </div>
              {openId === pub.id && (
                <div className="bibtex-block">
                  <pre>{pub.bibtex}</pre>
                  <button type="button" className="bibtex-copy" onClick={() => copyBib(pub)}>
                    {copied === pub.id ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
        {!asPage && publications.length > items.length && (
          <div className="section-cta">
            <Link to="/research" className="btn btn-ghost">
              View all publications
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
