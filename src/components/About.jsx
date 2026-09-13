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
            <h2 className="section-title">Building computer vision and applied AI that ships</h2>
            <p>
              I’m a Junior Machine Learning Engineer at Bondstein Technologies. I work on computer vision, OCR,
              annotation, and model development for industrial systems—from Roboflow datasets and PaddleOCR
              fine-tuning through detection, segmentation, and image/video pipelines.
            </p>
            <p>
              I also publish applied research in healthcare IoT task offloading and phishing detection, and I
              keep a set of personal ML, healthcare, and analytics projects alongside the team case studies.
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
              Dedicated ML engineer focused on computer vision, data annotation, and model optimization—building
              impactful, scalable AI systems.
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
            <h2 className="section-title">Junior Machine Learning Engineer working on computer vision, OCR, and applied AI.</h2>
            <p>
              At Bondstein I contribute to production vision systems for safety, security, logistics, retail,
              and manufacturing. My path there ran intern → annotator → junior engineer: Roboflow labeling,
              PaddleOCR research and Bangla fine-tuning, then detection, segmentation, and image/video work on
              the industrial stack.
            </p>
            <p>
              Before and alongside that, I built FastAPI and LLM-agent services at ROHUM, taught structured
              programming as a TA, and completed a BSc in CSE at Green University of Bangladesh with a 3.95
              CGPA. My research covers healthcare IoT offloading and ensemble phishing detection.
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
            <h3>How I build</h3>
            <p>Reliable delivery, end to end</p>
            <ul className="about-build-list">
              <li>Collect, label, audit, and version representative datasets.</li>
              <li>Train, validate, and analyze failure modes against strong baselines.</li>
              <li>Connect inference to tracking, decision logic, APIs, and evidence.</li>
              <li>Ship models and services with FastAPI, monitoring, and cloud or edge targets.</li>
            </ul>
          </article>
          <article className="about-method-card">
            <h3>Research foundation</h3>
            <p>Evaluation grounded in evidence</p>
            <p>
              My published work includes PRALEIT, a priority-aware task-offloading framework for healthcare IoT
              (IEEE SMC 2025), and PhishGuard, a multi-layered ensemble for phishing-website detection (STI 2024).
              That research discipline shapes how I evaluate models and communicate results.
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

        <div className="about-block" aria-labelledby="awards-title">
          <div className="about-block-heading">
            <h3 id="awards-title">Awards</h3>
            <p>Academic distinction</p>
          </div>
          <div className="about-achievement-grid">
            {awards.map((item) => (
              <article className="about-achievement" key={item.title}>
                <Icon name="sparkle" className="about-achievement-icon" />
                <h3>{item.title}</h3>
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
            <div>
              <h4>Training & certifications</h4>
              <ul className="about-simple-list">
                {certifications.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>
                      {item.org} · {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Community & leadership</h4>
              <ul className="about-simple-list">
                {community.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>
                      {item.org}
                      {item.date ? ` · ${item.date}` : ""}
                    </span>
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
