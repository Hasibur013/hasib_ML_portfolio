import { Link } from "react-router-dom";
import { skillGroups } from "../data/site";
import Icon from "./Icon";

export default function Skills({ compact = false, asPage = false }) {
  const groups = compact ? skillGroups.slice(0, 3) : skillGroups;

  return (
    <section className={`section${asPage ? "" : ""}`} id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="stack" /> Technical capabilities
          </span>
          <h2 className="section-title">Production-focused AI stack</h2>
          <p className="section-subtitle">
            Tools and methods demonstrated through deployed systems and research
          </p>
        </div>
        <div className={`skills-container${compact ? " is-compact" : ""}`}>
          {groups.map((group) => (
            <article className="skill-category" key={group.title}>
              <div className="skill-category-header">
                <Icon name={group.icon} className="skill-category-icon" size={22} />
                <h3 className="skill-category-title">{group.title}</h3>
              </div>
              <ul className="skill-items">
                {group.items.map((item) => (
                  <li className="skill-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {compact && (
          <div className="section-cta">
            <Link to="/skills" className="btn btn-ghost">
              View all capabilities
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
