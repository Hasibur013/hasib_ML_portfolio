import { Link } from "react-router-dom";
import { experience } from "../data/site";
import Icon from "./Icon";

export default function Experience({ compact = false }) {
  const items = compact ? experience.slice(0, 2) : experience;

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="briefcase" /> Experience
          </span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Bondstein Technologies, ROHUM, and teaching at Green University of Bangladesh
          </p>
        </div>
        <div className="experience-timeline">
          {items.map((job) => (
            <article className="experience-item" key={`${job.role}-${job.company}`}>
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{job.role}</h3>
                  <p className="experience-company">{job.company}</p>
                </div>
                <span className="experience-date">{job.date}</span>
              </div>
              <p className="experience-description">{job.description}</p>
              <ul className="experience-tech">
                {job.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {compact && (
          <div className="section-cta">
            <Link to="/about" className="btn btn-ghost">
              View full experience
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
