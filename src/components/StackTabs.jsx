import { useState } from "react";
import { stackTabs } from "../data/site";

export default function StackTabs() {
  const [activeId, setActiveId] = useState(stackTabs[0]?.id);
  const active = stackTabs.find((tab) => tab.id === activeId) || stackTabs[0];

  return (
    <div className="stack-tabs" aria-label="Tools and technologies by focus">
      <div className="stack-tablist" role="tablist" aria-label="Stack categories">
        {stackTabs.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`stack-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`stack-panel-${tab.id}`}
              className={`stack-tab${selected ? " is-active" : ""}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div
        className="stack-panel"
        role="tabpanel"
        id={`stack-panel-${active.id}`}
        aria-labelledby={`stack-tab-${active.id}`}
      >
        <div className="stack-panel-head">
          <h3>{active.title}</h3>
          <p>{active.blurb}</p>
        </div>

        <div className="stack-subgrid">
          {active.groups.map((group) => (
            <article className="stack-subcard" key={`${active.id}-${group.label}`}>
              <h4>{group.label}</h4>
              <div className="stack-group-tools">
                {group.items.map((item) => (
                  <span className="tech-stack-chip" key={`${active.id}-${group.label}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
