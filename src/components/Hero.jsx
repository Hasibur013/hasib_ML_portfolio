import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cvs, heroStats, profile, profileSocials, socials } from "../data/site";
import Icon from "./Icon";
import StackTabs from "./StackTabs";

const heroSocials = [
  ...profileSocials,
  socials.find((item) => item.icon === "mail"),
].filter(Boolean);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [cvOpen, setCvOpen] = useState(false);

  const rotations = profile.heroRotations;
  const activeFocus = rotations[roleIndex] || rotations[0];

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % rotations.length);
    }, 5500);
    return () => clearInterval(id);
  }, [rotations.length]);

  return (
    <section className="hero">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
      </div>

      <div className="container hero-shell">
        <div className="hero-content">
          <span className="hero-badge">{profile.badge}</span>
          <p className="hero-kicker">Hello, I’m</p>
          <h1 className="hero-title">{profile.name}</h1>
          <div className="hero-focus" aria-live="polite">
            <p className="hero-role">{activeFocus.title}</p>
            <p className="hero-subtitle">{activeFocus.description}</p>
          </div>

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
            <a href={profile.linkedin} className="btn btn-ghost" target="_blank" rel="noreferrer">
              <Icon name="linkedin" size={18} />
              LinkedIn
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

        <aside className="hero-portrait" aria-label="Profile photo">
          <div className="hero-portrait-frame">
            <img src={profile.photo} alt={profile.name} width="480" height="600" />
            <span className="hero-portrait-accent" aria-hidden="true" />
          </div>
          <div className="hero-portrait-meta">
            <p className="hero-portrait-role">{profile.cardRole}</p>
            <p className="hero-portrait-detail">
              <span>{profile.specialty}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.cardLocation}</span>
            </p>
            <div className="hero-portrait-socials" aria-label="Social profiles">
              {heroSocials.map((item) => (
                <a
                  key={item.label}
                  className="hero-portrait-social"
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon name={item.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <StackTabs />
    </section>
  );
}
