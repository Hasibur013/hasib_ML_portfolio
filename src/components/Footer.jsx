import { Link } from "react-router-dom";
import { navLinks, profile, profileSocials, socials } from "../data/site";
import Icon from "./Icon";

const footerSocials = [
  ...profileSocials,
  socials.find((item) => item.icon === "mail"),
].filter(Boolean);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span>{profile.shortName}</span>
          </div>
          <p className="footer-description">{profile.footerBlurb}</p>
          <div className="footer-social" aria-label="Social profiles">
            {footerSocials.map((item) => (
              <a
                key={item.label}
                className="social-link"
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={item.label}
                title={item.label}
              >
                <Icon name={item.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link className="footer-link" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links">
            <li>
              <a className="footer-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a className="footer-link" href={profile.phoneHref}>
                {profile.phone}
              </a>
            </li>
            <li>
              <span className="footer-link is-static">{profile.location}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
