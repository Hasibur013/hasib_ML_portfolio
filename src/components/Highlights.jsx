import { heroFocus, heroProof, methodSteps } from "../data/site";

export default function Highlights() {
  return (
    <section className="section" aria-label="Core engineering focus">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How I work</span>
          <h2 className="section-title">Focus areas</h2>
          <p className="section-subtitle">Computer vision, OCR, FRS, Edge AI, and automation across industry and research</p>
        </div>

        <div className="skills-container">
          {heroFocus.map((item) => (
            <article className="skill-category" key={item.title}>
              <h3 className="skill-category-title">{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="section-header highlights-followup">
          <span className="section-label">Production and impact</span>
          <h2 className="section-title">Production and research</h2>
          <p className="section-subtitle">Industry delivery, OCR research, and peer-reviewed publications</p>
        </div>
        <div className="about-achievement-grid">
          {heroProof.map((item) => (
            <article className="about-achievement" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="about-proof">{item.meta}</p>
            </article>
          ))}
        </div>

        <div className="about-method-grid">
          {methodSteps.map((step) => (
            <article className="about-method-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
