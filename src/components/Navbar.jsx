import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, profile } from "../data/site";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="navbar-mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="navbar-brand-copy">
            <span className="navbar-name">{profile.shortName}</span>
            <span className="navbar-tagline">{profile.tagline}</span>
          </span>
        </NavLink>

        <nav className={`navbar-links${open ? " open is-open" : ""}`} id="site-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <ThemeToggle />
          <a className="navbar-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" size={20} />
          </a>
          <a className="navbar-icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" size={20} />
          </a>
          <button
            type="button"
            className="navbar-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "list"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
