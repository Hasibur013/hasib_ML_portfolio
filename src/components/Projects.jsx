import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  isListedProject,
  projectCategories,
  projectDomains,
  projectRoles,
  projects,
} from "../data/projects";
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

function FilterRow({ label, options, value, onChange }) {
  return (
    <div className="projects-filter-row" role="group" aria-label={label}>
      <span className="projects-filter-label">{label}</span>
      <div className="projects-filter-pills">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`filter-btn${value === option ? " active" : ""}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function subtitleFor({ personalOnly, featuredOnly, category, domain, role }) {
  if (personalOnly) {
    return "Independent ML, healthcare, and analytics work alongside the team case studies";
  }
  if (featuredOnly) {
    return "Selected production systems across surveillance, logistics, and manufacturing";
  }

  const bits = [];
  if (role !== "All") bits.push(`${role} focus`);
  if (domain !== "All") bits.push(domain.toLowerCase());
  if (category !== "All") bits.push(`${category.toLowerCase()} work`);

  if (!bits.length) {
    return "Production systems across surveillance, logistics, manufacturing, and smart systems";
  }

  return `Showing ${bits.join(" · ")} — switch filters to tailor this page for different roles.`;
}

export default function Projects({
  defaultFilter = "All",
  asPage = false,
  featuredOnly = false,
  personalOnly = false,
}) {
  const [category, setCategory] = useState(defaultFilter);
  const [domain, setDomain] = useState("All");
  const [role, setRole] = useState("All");

  const visible = useMemo(() => {
    let list = projects.filter(isListedProject);
    if (featuredOnly) list = list.filter((p) => p.featured);
    if (personalOnly) list = list.filter((p) => p.category === "Personal");

    if (!featuredOnly && !personalOnly) {
      if (category !== "All") list = list.filter((p) => p.category === category);
      if (domain !== "All") list = list.filter((p) => (p.domains || []).includes(domain));
      if (role !== "All") list = list.filter((p) => (p.roles || []).includes(role));
    }

    return list;
  }, [category, domain, role, featuredOnly, personalOnly]);

  return (
    <section
      className={`section projects-section${asPage ? " is-page" : ""}`}
      id={personalOnly ? "personal-projects" : "projects"}
    >
      <div className="container">
        <div className="section-header projects-page-header">
          <div className="projects-page-heading">
            <span className="section-label">
              <Icon name="repo" />{" "}
              {featuredOnly ? "Featured industry projects" : personalOnly ? "Personal projects" : "All projects"}
            </span>
            <h2 className="section-title">
              {featuredOnly
                ? "Featured industry projects"
                : personalOnly
                  ? "Selected personal projects"
                  : "All projects"}
            </h2>
            <p className="section-subtitle">
              {subtitleFor({ personalOnly, featuredOnly, category, domain, role })}
            </p>
          </div>
          {asPage && (
            <p className="results-count projects-results-count" aria-live="polite">
              Showing <strong>{visible.length}</strong>
            </p>
          )}
        </div>

        {asPage && (
          <div className="projects-filters">
            <FilterRow label="Type" options={projectCategories} value={category} onChange={setCategory} />
            <FilterRow label="Domain" options={projectDomains} value={domain} onChange={setDomain} />
            <FilterRow label="Role" options={projectRoles} value={role} onChange={setRole} />
          </div>
        )}

        <div className="projects-list projects-card-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {asPage && visible.length === 0 && (
          <p className="projects-empty">No projects match these filters. Try another domain or role.</p>
        )}

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
