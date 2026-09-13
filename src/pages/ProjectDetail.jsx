import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import useSeo from "../components/Seo";
import { isListedProject, projects } from "../data/projects";

function metricIcon(label) {
  const key = label.toLowerCase();
  if (key.includes("camera") || key.includes("coverage")) return "image";
  if (key.includes("accuracy") || key.includes("auc") || key.includes("precision")) return "trend";
  if (key.includes("deploy") || key.includes("edge") || key.includes("jetson")) return "cpu";
  if (key.includes("validation") || key.includes("reliability")) return "shield";
  return "sparkle";
}

function keepMetric([key, value]) {
  const label = key.toLowerCase();
  const text = String(value).toLowerCase();
  if (
    label.includes("publication") ||
    label.includes("journal") ||
    label.includes("citation") ||
    label.includes("status") ||
    label.includes("potential") ||
    text.includes("arxiv") ||
    text.includes("journal") ||
    text.includes("under review") ||
    text.includes("preprint")
  ) {
    return false;
  }
  if (label.includes("dataset")) return /\d/.test(String(value));
  return true;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id && isListedProject(item));

  useSeo({
    title: project ? project.title : "Project not found",
    description: project ? project.summary.slice(0, 155) : "This project does not exist.",
    path: `/projects/${id}`,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  if (!project) {
    return (
      <main id="main-content" tabIndex={-1} className="container project-detail section">
        <h1 className="section-title">Project not found</h1>
        <p className="section-subtitle">This case study may have been renamed or removed.</p>
        <div className="section-cta">
          <Link to="/projects" className="btn btn-primary">
            Back to all projects
          </Link>
        </div>
      </main>
    );
  }

  const wide = project.companyLogoStyle === "wide" || /brac-bank|kdsll|bondstein|runner-motorcycles|bat_bangladesh/i.test(project.companyLogo || "");
  const ultra = /brac-bank-plc/i.test(project.companyLogo || "");
  const metrics = Object.fromEntries(Object.entries(project.metrics || {}).filter(keepMetric));
  const demo = project.demoLink || project.demo;

  return (
    <main id="main-content" tabIndex={-1} className="container project-detail-page">
      <div className="project-detail-toolbar">
        <Link to="/projects" state={{ scrollToProject: project.id }} className="back-link-detailed">
          <Icon name="arrowLeft" size={20} />
          Back to Projects
        </Link>
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="btn btn-primary project-demo-link">
            <Icon name="externalLink" size={18} />
            Live Demo
          </a>
        )}
      </div>

      <div className="project-detail-hero">
        {project.companyLogo && (
          <div className={`project-detail-logo-wrap${wide ? " is-wide" : ""}${ultra ? " is-ultrawide" : ""}`}>
            <img
              src={project.companyLogo}
              alt=""
              className={`project-detail-logo${wide ? " is-wide" : ""}${ultra ? " is-ultrawide" : ""}`}
              width={ultra ? 360 : wide ? 240 : 76}
              height={ultra ? 31 : wide ? 62 : 76}
            />
          </div>
        )}
        <div className="project-detail-badges">
          <span className={`project-category-badge ${project.category.toLowerCase()}`}>{project.category}</span>
          {project.inDevelopment && (
            <span className="project-dev-badge">
              <Icon name="clock" size={14} /> In development
            </span>
          )}
          {project.company && (
            <span className="project-meta-chip">
              <Icon name="briefcase" size={16} /> {project.company}
            </span>
          )}
          {project.timeline && (
            <span className="project-meta-chip">
              <Icon name="clock" size={16} /> {project.timeline}
            </span>
          )}
          {project.scale && (
            <span className="project-meta-chip scale">
              <Icon name="users" size={16} /> {project.scale}
            </span>
          )}
        </div>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-summary">{project.summary}</p>
      </div>

      {project.workflowImage && (
        <figure className="project-workflow-hero">
          <img src={project.workflowImage} alt={`${project.title} workflow diagram`} width="1280" height="720" />
          <figcaption>{project.category === "Personal" ? "Project overview" : "System workflow"}</figcaption>
        </figure>
      )}

      {Object.keys(metrics).length > 0 && (
        <div className="impact-metrics-highlight">
          <h2 className="section-heading">
            <Icon name="trend" size={24} /> Key Impact & Results
          </h2>
          <div className="metrics-highlight-grid">
            {Object.entries(metrics).map(([label, value]) => (
              <div className="metric-highlight-card" key={label}>
                <div className="metric-icon-wrapper">
                  <Icon name={metricIcon(label)} size={28} />
                </div>
                <div className="metric-highlight-value">{value}</div>
                <div className="metric-highlight-label">{label.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section overview-section">
        <h2 className="section-heading">
          <Icon name="checkCircle" size={24} /> Project Overview
        </h2>
        <div className="overview-grid">
          <div className="overview-card problem-card">
            <div className="overview-card-header">
              <Icon name="warning" size={28} />
              <h3>Problem Statement</h3>
            </div>
            <p>{project.problem}</p>
          </div>
          <div className="overview-card approach-card">
            <div className="overview-card-header">
              <Icon name="bulb" size={24} />
              <h3>Approach & Methodology</h3>
            </div>
            <p>{project.approach}</p>
          </div>
          <div className="overview-card impact-card">
            <div className="overview-card-header">
              <Icon name="trend" size={28} />
              <h3>Impact & Results</h3>
            </div>
            <p>{project.impact}</p>
          </div>
        </div>
      </div>

      {project.challenges?.length > 0 && (
        <div className="detail-section challenges-section">
          <h2 className="section-heading">
            <Icon name="warning" size={24} /> Technical Challenges & Solutions
          </h2>
          <div className="challenges-timeline">
            {project.challenges.map((item, index) => (
              <div className="challenge-item" key={item.challenge}>
                <div className="challenge-number">{index + 1}</div>
                <div className="challenge-content">
                  <h3 className="challenge-title">
                    <Icon name="shield" size={18} className="challenge-icon" />
                    {item.challenge}
                  </h3>
                  <p className="challenge-description">{item.description}</p>
                  <div className="solution-box">
                    <div className="solution-header">
                      <Icon name="checkCircle" size={24} />
                      <strong>Solution</strong>
                    </div>
                    <p>{item.solution}</p>
                    {item.technical_details && (
                      <div className="technical-details">
                        <code>{item.technical_details}</code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.architecture && (
        <div className="detail-section architecture-section">
          <h2 className="section-heading">
            <Icon name="architecture" size={24} /> System Architecture
          </h2>
          <div className="architecture-content">
            {project.architecture.description && <p className="architecture-desc">{project.architecture.description}</p>}
            {project.architecture.components && (
              <div className="architecture-components">
                <h3>Key Components:</h3>
                <div className="components-grid">
                  {project.architecture.components.map((item) => (
                    <div className="component-card" key={item.name}>
                      <Icon name="chevronRight" size={20} />
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {project.features?.length > 0 && (
        <div className="detail-section features-section">
          <h2 className="section-heading">
            <Icon name="sparkle" size={24} /> Key Features & Capabilities
          </h2>
          <div className="features-detailed-grid">
            {project.features.map((item) => (
              <div className="feature-detailed-card" key={item}>
                <div className="feature-icon-circle">
                  <Icon name="check" size={20} weight="bold" />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section tech-stack-section">
        <h2 className="section-heading">
          <Icon name="wrench" size={24} /> Technologies & Tools
        </h2>
        <div className="tech-stack-detailed">
          {project.stack.map((item) => (
            <div className="tech-pill-detailed" key={item}>
              <Icon name="dot" size={12} weight="fill" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="project-actions-footer">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-btn github-btn">
            <Icon name="github" size={20} /> View on GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="action-btn demo-btn">
            <Icon name="externalLink" size={20} /> Live Demo
          </a>
        )}
        {project.report && (
          <a href={project.report} target="_blank" rel="noopener noreferrer" className="action-btn secondary-btn">
            <Icon name="file" size={20} /> Report
          </a>
        )}
        {project.poster && (
          <a href={project.poster} target="_blank" rel="noopener noreferrer" className="action-btn secondary-btn">
            <Icon name="image" size={20} /> Poster
          </a>
        )}
        <Link to="/projects" className="action-btn secondary-btn">
          <Icon name="repo" size={20} /> All Projects
        </Link>
      </div>
    </main>
  );
}
