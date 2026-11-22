import { cvWorkflowSteps } from "../data/site";
import Icon from "./Icon";

export default function CvWorkflow() {
  return (
    <section className="section cv-workflow-section" aria-label="Computer vision delivery workflow">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How CV systems get shipped</span>
          <h2 className="section-title">From requirements to edge deployment</h2>
          <p className="section-subtitle">
            How I work on computer vision systems — camera reality first, live POC with the client, then
            on-prem or Edge AI production.
          </p>
        </div>

        <ol className="cv-workflow">
          {cvWorkflowSteps.map((step, index) => (
            <li className="cv-workflow-step" key={step.title}>
              <div className="cv-workflow-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="cv-workflow-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              {index < cvWorkflowSteps.length - 1 && (
                <span className="cv-workflow-arrow" aria-hidden="true">
                  <Icon name="arrowRight" size={18} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
