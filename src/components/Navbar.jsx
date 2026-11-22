import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, profile, profileSocials } from "../data/site";
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
          {profileSocials.map((item) => (
            <a
              key={item.label}
              className="navbar-icon"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              title={item.label}
            >
              <Icon name={item.icon} size={20} />
            </a>
          ))}
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
