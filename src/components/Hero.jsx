import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cvs, heroStats, profile, techStack } from "../data/site";
import Icon from "./Icon";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.heroRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="neural-bg" aria-hidden="true" />
      <div className="container hero-shell">
        <div className="hero-content">
          <span className="hero-badge">{profile.badge}</span>
          <p className="hero-kicker">Hello, I’m</p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-role" aria-live="polite">
            {profile.heroRoles[roleIndex]}
          </p>
          <p className="hero-subtitle">{profile.subtitle}</p>

          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">
              View Project Works
            </Link>
            {cvs.length === 1 ? (
              <a className="btn btn-secondary" href={cvs[0].href} download>
                <Icon name="download" size={18} />
                {cvs[0].label}
              </a>
            ) : (
              <div className={`cv-dropdown${cvOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-haspopup="true"
                  aria-expanded={cvOpen}
                  onClick={() => setCvOpen((v) => !v)}
                >
                  <Icon name="download" size={18} />
                  Download CV
                  <Icon name="chevronDown" size={16} />
                </button>
                {cvOpen && (
                  <div className="cv-dropdown-menu">
                    {cvs.map((cv) => (
                      <a key={cv.href} className="cv-dropdown-item" href={cv.href} download>
                        <Icon name={cv.icon} size={16} />
                        {cv.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            <a href={profile.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="identity-wrap" aria-label="Professional profile card">
          <div className="identity-lanyard" />
          <article className="identity-card">
            <div className="identity-card-top">
              <img src={profile.photo} alt={profile.name} width="160" height="160" />
              <span className="identity-online" aria-label="Available" />
            </div>
            <div className="identity-card-body">
              <p className="identity-eyebrow">Verified professional profile</p>
              <h2>{profile.name}</h2>
              <p className="identity-role">{profile.cardRole}</p>
              <dl className="identity-grid">
                <div>
                  <dt>Specialty</dt>
                  <dd>{profile.specialty}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{profile.cardLocation}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Production systems</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className="is-available">Available</dd>
                </div>
              </dl>
              <p className="identity-id">{profile.identityId}</p>
            </div>
          </article>
        </aside>
      </div>

      <div className="tech-marquee" aria-label="Core technology stack">
        <div className="tech-marquee-track">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
