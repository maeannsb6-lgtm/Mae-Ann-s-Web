import { useState } from "react";
import {
  capabilityGroups,
  currentlyExploring,
  demonstratedIntegrationSkills,
  industrialEngineeringCapabilities,
  technologyTools,
} from "../../data/content";

const groups = [
  ["Industrial Engineering", industrialEngineeringCapabilities],
  ["Technology & Tools", technologyTools],
  ["Integration Skills", demonstratedIntegrationSkills],
  ["Currently Exploring", currentlyExploring],
] as const;

export function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="capabilities" className="pro-section pro-skills">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div>
            <p className="pro-kicker">Skills</p>
            <h2>A connected set of capabilities.</h2>
          </div>
          <p>
            Process and operations experience, supported by practical automation
            and digital development tools.
          </p>
        </div>

        <div className="pro-skill-map">
          {capabilityGroups.map((group, index) => (
            <article key={group.title}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>

        <div className="pro-skill-browser">
          <div
            className="pro-skill-tabs"
            role="tablist"
            aria-label="Skill categories"
          >
            {groups.map(([label], index) => (
              <button
                key={label}
                id={`skill-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls="skill-panel"
                tabIndex={active === index ? 0 : -1}
                type="button"
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (index + 1) % groups.length
                      : event.key === "ArrowLeft"
                        ? (index + groups.length - 1) % groups.length
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? groups.length - 1
                            : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`skill-tab-${next}`)?.focus();
                }}
                className={active === index ? "is-active" : ""}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="pro-skill-detail"
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            tabIndex={0}
          >
            {groups[active][1].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
