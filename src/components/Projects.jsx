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

const TYPE_ICONS = {
  All: "repo",
  Industry: "briefcase",
  Personal: "user",
};

const ROLE_ICONS = {
  All: "users",
  "ML Engineer": "cpu",
  "AI Engineer": "brain",
  "Data / Business Analyst": "trend",
};

const DOMAIN_ICONS = {
  All: "stack",
  "Computer Vision": "eye",
  "AI Automation": "architecture",
  "Data Analytics": "trend",
};

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

function IconFilterBar({ label, options, value, onChange, icons, labelMap }) {
  return (
    <div className="projects-icon-filters" role="group" aria-label={label}>
      <p className="projects-icon-filters-label">{label}</p>
      <div className="projects-icon-filters-row">
        {options.map((option) => {
          const display =
            labelMap?.[option] ||
            (option === "All" && label === "Type"
              ? "All projects"
              : option === "All" && label === "Role"
                ? "All roles"
                : option === "All" && label === "Domain"
                  ? "All domains"
                  : option);

          return (
            <button
              key={option}
              type="button"
              className={`projects-icon-filter${value === option ? " is-active" : ""}`}
              aria-pressed={value === option}
              onClick={() => onChange(option)}
            >
              <Icon name={icons[option] || "dot"} size={16} />
              <span>{display}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function subtitleFor({ personalOnly, featuredOnly, category, domain, role, count }) {
  if (personalOnly) {
    return "Independent ML, healthcare, and analytics work alongside the team case studies";
  }
  if (featuredOnly) {
    return "Selected production systems across surveillance, logistics, and manufacturing";
  }

  const bits = [];
  if (role !== "All") bits.push(role);
  if (domain !== "All") bits.push(domain);
  if (category !== "All") bits.push(category);

  if (!bits.length) {
    return `Showing ${count} projects. Related system modules are listed separately.`;
  }

  return `Showing ${count} projects · ${bits.join(" · ")}`;
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
            {!asPage && (
              <p className="section-subtitle">
                {subtitleFor({
                  personalOnly,
                  featuredOnly,
                  category,
                  domain,
                  role,
                  count: visible.length,
                })}
              </p>
            )}
          </div>
        </div>

        {asPage && (
          <div className="projects-filters projects-filters-iconed">
            <IconFilterBar
              label="Type"
              options={projectCategories}
              value={category}
              onChange={setCategory}
              icons={TYPE_ICONS}
            />
            <IconFilterBar
              label="Role"
              options={projectRoles}
              value={role}
              onChange={setRole}
              icons={ROLE_ICONS}
            />
            <IconFilterBar
              label="Domain"
              options={projectDomains}
              value={domain}
              onChange={setDomain}
              icons={DOMAIN_ICONS}
            />
          </div>
        )}

        {asPage && (
          <p className="projects-filter-summary" aria-live="polite">
            {subtitleFor({
              personalOnly,
              featuredOnly,
              category,
              domain,
              role,
              count: visible.length,
            })}
          </p>
        )}

        <div className="projects-list projects-card-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {asPage && visible.length === 0 && (
          <p className="projects-empty">No projects match these filters. Try another role or domain.</p>
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
