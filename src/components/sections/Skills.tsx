import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  capabilityGroups,
  currentlyExploring,
  demonstratedIntegrationSkills,
  industrialEngineeringCapabilities,
  technologyTools,
} from '../../data/content';

const groups = [
  ['Industrial Engineering', industrialEngineeringCapabilities],
  ['Technology & Tools', technologyTools],
  ['Integration Skills', demonstratedIntegrationSkills],
  ['Currently Exploring', currentlyExploring],
] as const;

export function Skills() {
  const [active, setActive] = useState(0);
  const [label, items] = groups[active];

  return (
    <section id="capabilities" className="rd-skills">
      <div className="rd-shell">
        <div className="rd-skills-top">
          <header className="rd-skills-head" data-reveal>
            <p className="rd-kicker">Skills</p>
            <h2>A connected set of capabilities.</h2>
            <p>Process and operations experience, supported by practical automation and digital development tools.</p>
          </header>
          <ol className="rd-skills-groups" data-reveal aria-label="Capability groups">
            {capabilityGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <li key={group.title}>
                  <span className="rd-skills-gnum">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <h3>{group.title}</h3>
                  <p>{group.items.join(' · ')}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rd-library" data-reveal>
          <div className="rd-library-tabs" role="tablist" aria-label="Skill categories">
            {groups.map(([name, list], index) => (
              <button
                key={name}
                id={`skill-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={active === index}
                aria-controls="skill-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === 'ArrowRight' || event.key === 'ArrowDown'
                      ? (index + 1) % groups.length
                      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                        ? (index + groups.length - 1) % groups.length
                        : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`skill-tab-${next}`)?.focus();
                }}
              >
                <span>{name}</span>
                <em>{list.length}</em>
              </button>
            ))}
          </div>
          <div className="rd-library-panel" id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} tabIndex={0}>
            <p className="rd-library-title">
              {label} <span>{items.length} entries</span>
            </p>
            <ul key={label}>
              {items.map((item, index) => (
                <li key={item} style={{ '--d': `${index * 25}ms` } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
