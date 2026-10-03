import { useState } from 'react';
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

  return (
    <section id="capabilities" className="pro-section pro-skills">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Skills</p><h2>Organized by how the work connects.</h2></div>
          <p>Capabilities are grouped by purpose rather than shown as percentages or endless badges.</p>
        </div>

        <div className="pro-skill-map">
          {capabilityGroups.map((group, index) => (
            <article key={group.title}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.items.join(' · ')}</p>
            </article>
          ))}
        </div>

        <div className="pro-skill-browser">
          <div className="pro-skill-tabs" role="tablist">
            {groups.map(([label], index) => <button key={label} type="button" onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}>{label}</button>)}
          </div>
          <div className="pro-skill-detail">
            {groups[active][1].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
