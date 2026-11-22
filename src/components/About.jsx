import { Link } from "react-router-dom";
import {
  aboutAchievements,
  aboutCapabilities,
  awards,
  certifications,
  community,
  profile,
} from "../data/site";
import Icon from "./Icon";

export function AboutCompact() {
  return (
    <section className="section about-section-compact" id="about">
      <div className="container">
        <article className="about-compact">
          <div className="about-compact-profile">
            <img className="about-compact-avatar" src={profile.photo} alt={profile.name} />
          </div>
          <div className="about-compact-copy">
            <span className="section-label">
              <Icon name="user" /> About
            </span>
            <h2 className="section-title">AI/ML engineer building vision, OCR, and automation that holds up in production</h2>
            <p>
              I am Md. Hasibur Rahman, an AI/ML Engineer at Bondstein Technologies. I care about the full path
              of a system: clean data, a model that generalizes, and a service operators can trust.
            </p>
            <p>
              My focus is computer vision, OCR, face recognition, and Edge AI—with growing work in AI
              automation, agents, and VLM-assisted verification across industrial and security deployments.
            </p>
            <div className="about-compact-actions">
              <Link to="/about" className="btn btn-primary">
                Know More <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="section about about-section" id="about">
      <div className="container">
        <div className="about-intro-grid">
          <aside className="about-identity">
            <p className="section-label">Profile summary</p>
            <img className="about-avatar" src={profile.photo} alt={profile.name} />
            <h2 className="about-name">{profile.name}</h2>
            <p className="about-role">{profile.cardRole}</p>
            <p className="about-specialty">{profile.specialty}</p>
            <p className="about-identity-summary">
              AI/ML engineer focused on CV, OCR, FRS, and Edge AI—plus automation and VLM workflows that scale
              beyond a notebook.
            </p>
            <ul className="about-identity-facts">
              <li>
                <Icon name="location" size={16} /> {profile.location}
              </li>
              <li>
                <Icon name="briefcase" size={16} /> {profile.cardRole}
              </li>
            </ul>
          </aside>

          <div className="about-story">
            <span className="section-label">
              <Icon name="user" /> About me
            </span>
            <h2 className="section-title">I turn messy visual data into models and services people can use.</h2>
            <p>
              I work as an AI/ML Engineer in Bondstein’s R&D team in Tejgaon. I joined as an ML intern, moved
              into data annotation, and now ship computer vision systems: object detection, segmentation, OCR,
              face recognition, and image/video pipelines. A large part of that path was Roboflow labeling and
              PaddleOCR research, including Bangla fine-tuning that feeds ANPR and industrial OCR.
            </p>
            <p>
              In parallel I interned remotely as an AI engineer at ROHUM (Turkey), building FastAPI services,
              LLM agents, and Azure deployments—experience that carries into AI automation and VLM-assisted
              workflows. I completed a BSc in CSE at Green University of Bangladesh (CGPA 3.95/4.00), taught C
              as a teaching assistant, and still keep personal projects in classification, healthcare apps, and
              analytics.
            </p>
            <p>
              I publish when the work is solid enough to defend. PRALEIT (IEEE SMC 2025, Vienna) studies
              priority-aware task offloading for healthcare IoT. PhishGuard (STI 2024) is a multi-layered
              ensemble for phishing-website detection. That habit—measure, compare, write it down—is how I
              treat production models too.
            </p>
          </div>
        </div>

        <div className="about-block" aria-labelledby="capabilities-title">
          <div className="about-block-heading">
            <h3 id="capabilities-title">Core capabilities</h3>
            <p>From annotation to APIs</p>
          </div>
          <ul className="about-capability-list">
            {aboutCapabilities.map((item) => (
              <li className="about-capability-row" key={item}>
                <Icon name="checkCircle" className="about-row-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-block" aria-labelledby="achievements-title">
          <div className="about-block-heading">
            <h3 id="achievements-title">Selected achievements</h3>
            <p>Evidence from production, research, and academics</p>
          </div>
          <div className="about-achievement-grid">
            {aboutAchievements.map((item) => (
              <article className="about-achievement" key={item.title}>
                <Icon name="trend" className="about-achievement-icon" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-method-grid">
          <article className="about-method-card">
            <h3>How I work</h3>
            <p>From dataset to a service someone can run</p>
            <ol className="about-build-list">
              {[
                "Collect, annotate, and version data that actually matches the site.",
                "Train and compare models, then inspect the cases that fail.",
                "Connect inference to APIs, rules, and the rest of the product.",
                "Deploy with FastAPI, cloud VMs, or the team’s edge stack when needed.",
              ].map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="about-method-card">
            <h3>Research</h3>
            <p>Write it so another engineer can reproduce the claim</p>
            <p>
              PRALEIT is a priority-aware offloading framework for healthcare IoT, presented at IEEE SMC 2025
              in Vienna. PhishGuard is a stacked ensemble for phishing-website detection, presented at STI 2024
              in Dhaka. I use the same standard on industry work: a number without a setup is not a result.
            </p>
            <div className="about-research-links">
              <a href="https://doi.org/10.1109/SMC58881.2025.11343197" target="_blank" rel="noreferrer">
                IEEE SMC 2025 paper
              </a>
              <a href="https://arxiv.org/abs/2409.19825" target="_blank" rel="noreferrer">
                PhishGuard preprint
              </a>
            </div>
          </article>
        </div>

        <div className="about-awards" aria-labelledby="awards-title">
          <div className="about-block-heading">
            <h3 id="awards-title">Awards</h3>
            <p>Academic distinction</p>
          </div>
          <div className="about-awards-grid">
            {awards.map((item) => (
              <article className="about-award-card" key={item.title}>
                <span className="about-award-icon" aria-hidden="true">
                  <Icon name="sparkle" size={18} />
                </span>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-support" aria-labelledby="support-title">
          <div className="about-block-heading">
            <h3 id="support-title">Selected training & community</h3>
            <p>Continuous learning and service</p>
          </div>
          <div className="about-support-grid">
            <div className="about-support-column">
              <h4 className="about-support-heading">
                <Icon name="cap" size={18} />
                Training & certifications
              </h4>
              <ul className="about-support-list">
                {certifications.map((item) => (
                  <li className="about-support-item" key={item.title}>
                    <p className="about-support-title">{item.title}</p>
                    <p className="about-support-meta">
                      {item.org} · {item.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-support-column">
              <h4 className="about-support-heading">
                <Icon name="users" size={18} />
                Community & leadership
              </h4>
              <ul className="about-support-list">
                {community.map((item) => (
                  <li className="about-support-item" key={item.title}>
                    <p className="about-support-title">{item.title}</p>
                    <p className="about-support-meta">
                      {item.org}
                      {item.date ? ` · ${item.date}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
