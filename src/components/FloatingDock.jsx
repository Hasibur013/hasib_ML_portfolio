import { NavLink } from "react-router-dom";
import { navLinks } from "../data/site";
import Icon from "./Icon";

export default function FloatingDock({ visible }) {
  return (
    <nav className={`floating-dock${visible ? " is-visible" : ""}`} aria-label="Quick section navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) => (isActive ? "is-active" : undefined)}
        >
          <Icon name={link.icon} size={22} />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
