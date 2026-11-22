import { impactMetrics } from "../data/site";

export default function ImpactStrip() {
  return (
    <section className="section impact-strip-section" aria-label="Team deployment impact">
      <div className="container">
        <div className="section-header impact-strip-header">
          <span className="section-label">Impact at scale</span>
          <h2 className="section-title">Team programs I ship into</h2>
          <p className="section-subtitle">
            Scale from Bondstein computer-vision deployments I contribute to — live cameras, multi-site
            rollouts, and production use cases.
          </p>
        </div>

        <div className="impact-strip" role="list">
          {impactMetrics.map((item) => (
            <article className="impact-strip-item" role="listitem" key={item.label}>
              <p className="impact-strip-value">{item.value}</p>
              <p className="impact-strip-description">{item.description}</p>
              <p className="impact-strip-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
