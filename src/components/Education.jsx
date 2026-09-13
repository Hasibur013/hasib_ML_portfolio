import { Link } from "react-router-dom";
import { education } from "../data/site";
import Icon from "./Icon";

export default function Education({ compact = false }) {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="cap" /> Education
          </span>
          <h2 className="section-title">Academic background</h2>
          <p className="section-subtitle">BSc in CSE from Green University of Bangladesh, with focused ML and CV training</p>
        </div>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.degree}>
              <div className="education-header">
                <div className="education-icon">
                  <Icon name="cap" size={32} />
                </div>
                <div className="education-info">
                  <h3 className="education-degree">{item.degree}</h3>
                  <p className="education-institution">{item.institution}</p>
                  <div className="education-meta">
                    <span className="education-cgpa">CGPA: {item.cgpa}</span>
                    <span className="education-period">{item.period}</span>
                    <span className="education-status">{item.status}</span>
                  </div>
                </div>
              </div>
              <div className="education-body">
                {!compact && (
                  <div className="education-section">
                    <h4>Key training:</h4>
                    <ul className="education-courses">
                      {item.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.thesis && (
                  <div className="education-section">
                    <h4>Thesis:</h4>
                    <p className="education-thesis">{item.thesis}</p>
                    {item.thesisNote && <p className="education-thesis education-thesis-note">{item.thesisNote}</p>}
                    {item.supervisor && <p className="education-supervisor">Supervisor: {item.supervisor}</p>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        {compact && (
          <div className="section-cta">
            <Link to="/about" state={{ scrollTo: "education" }}>
              View more details
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
