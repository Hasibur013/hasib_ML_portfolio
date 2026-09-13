import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { isListedProject, projectCategories, projects } from "../data/projects";
import Icon from "./Icon";

function isWideLogo(project) {
  return (
    project.companyLogoStyle === "wide" ||
    /brac-bank|kdsll|bondstein|runner-motorcycles|bat_bangladesh/i.test(project.companyLogo || "")
  );
}

function isUltraWide(project) {
  return /brac-bank-plc/i.test(project.companyLogo || "");
}

function ProjectCard({ project }) {
  const wide = isWideLogo(project);
  const ultra = isUltraWide(project);
  const badges = (project.stack || []).slice(0, 4);
  const extra = (project.stack || []).length - badges.length;

  return (
    <article className="project-summary-card" id={`project-${project.id}`}>
      <Link to={`/projects/${project.id}`} className="project-workflow-preview">
        <img
          className="project-workflow-image"
          src={project.workflowImage}
          alt={`${project.title} workflow diagram`}
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="project-summary-body">
        <div className="project-summary-topline">
          {project.company && <span className="project-summary-company">{project.company}</span>}
          {project.inDevelopment && <span className="project-dev-badge">In development</span>}
        </div>
        <h3 className="project-summary-heading">
          {project.companyLogo && (
            <span className={`project-summary-logo-wrap${wide ? " is-wide" : ""}${ultra ? " is-ultrawide" : ""}`}>
              <img
                src={project.companyLogo}
                alt=""
                className="project-summary-logo"
                width={ultra ? 160 : wide ? 96 : 40}
                height={ultra ? 18 : wide ? 32 : 40}
              />
            </span>
          )}
          <span className="project-summary-title">{project.title}</span>
        </h3>
        <p className="project-summary-text">{project.summary}</p>
        <div className="project-tech-badges">
          {badges.map((item) => (
            <span className="tech-badge" key={item}>
              {item}
            </span>
          ))}
          {extra > 0 && <span className="tech-badge tech-badge-more">+{extra} more</span>}
        </div>
        <Link to={`/projects/${project.id}`} className="project-summary-link">
          View project <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}

export default function Projects({
  defaultFilter = "All",
  asPage = false,
  featuredOnly = false,
  personalOnly = false,
}) {
  const [filter, setFilter] = useState(defaultFilter);

  const visible = useMemo(() => {
    let list = projects.filter(isListedProject);
    if (featuredOnly) list = list.filter((p) => p.featured);
    if (personalOnly) list = list.filter((p) => p.category === "Personal");
    if (!featuredOnly && !personalOnly && filter !== "All") {
      list = list.filter((p) => p.category === filter);
    }
    return list;
  }, [filter, featuredOnly, personalOnly]);

  return (
    <section className="section projects-section" id={personalOnly ? "personal-projects" : "projects"}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Icon name="repo" />{" "}
            {featuredOnly ? "Featured industry projects" : personalOnly ? "Personal projects" : "All projects"}
          </span>
          <h2 className="section-title">
            {featuredOnly ? "Featured industry projects" : personalOnly ? "Selected personal projects" : "All projects"}
          </h2>
          <p className="section-subtitle">
            {personalOnly
              ? "Independent ML, healthcare, and analytics work alongside the team case studies"
              : "Production systems across surveillance, logistics, manufacturing, and smart systems"}
          </p>
        </div>

        {asPage && (
          <div className="projects-filters" role="group" aria-label="Filter projects by category">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn${filter === cat ? " active" : ""}`}
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
            <p className="results-count">Showing {visible.length}</p>
          </div>
        )}

        <div className="projects-list projects-card-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {!asPage && !personalOnly && (
          <div className="section-cta">
            <Link to="/projects" className="btn btn-primary">
              See all projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
