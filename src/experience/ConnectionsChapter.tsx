import { useState } from 'react';
import {
  capabilityGroups,
  currentlyExploring,
  demonstratedIntegrationSkills,
  industrialEngineeringCapabilities,
  technologyTools,
  whatIDo,
} from '../data/content';
import { serviceEvidence } from '../data/story';

export function ConnectionsChapter() {
  const [active, setActive] = useState(0);
  const selected = whatIDo[active];
  const evidence = serviceEvidence[active];

  return (
    <section id="capabilities" className="connections-chapter story-section" aria-labelledby="connections-title">
      <header className="story-heading connections-heading">
        <p><span>02</span> Connections</p>
        <h2 id="connections-title">Capabilities work together.</h2>
        <p className="story-heading-lead">Industrial Engineering is the foundation. Technology extends the system only where it adds value.</p>
      </header>

      <div className="capability-system">
        <div className="capability-map" aria-label="Connected capability areas">
          <svg viewBox="0 0 700 520" className="capability-lines" aria-hidden="true">
            <path d="M350 260 L145 120 M350 260 L555 130 M350 260 L150 400 M350 260 L555 390" />
            <path d="M145 120 C270 120 260 210 350 260 M555 130 C440 150 450 220 350 260" />
          </svg>
          <div className="capability-core">
            <span>foundation</span>
            <strong>Industrial<br />Engineering</strong>
          </div>
          {whatIDo.map((item, index) => {
            const classes = ['northwest', 'northeast', 'southwest', 'southeast'];
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={'capability-node capability-node--' + classes[index] + (active === index ? ' is-active' : '')}
              >
                <span>0{index + 1}</span>
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="capability-detail" aria-live="polite">
          <p className="small-label">{evidence.act}</p>
          <h3>{selected.title}</h3>
          <p className="capability-description">{selected.description}</p>
          <ol className="capability-items">
            {selected.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
          </ol>
          <p className="capability-evidence"><span>Evidence</span>{evidence.evidence}</p>
        </div>
      </div>

      <div className="capability-index">
        {capabilityGroups.map((group) => (
          <div key={group.title}>
            <p>{group.title}</p>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>

      <div className="capability-ledger">
        <details open>
          <summary>Process & operations toolkit <span>{industrialEngineeringCapabilities.length}</span></summary>
          <div className="ledger-columns">{industrialEngineeringCapabilities.map((item) => <p key={item}>{item}</p>)}</div>
        </details>
        <details>
          <summary>Technology & tools <span>{technologyTools.length}</span></summary>
          <div className="ledger-columns">{technologyTools.map((item) => <p key={item}>{item}</p>)}</div>
        </details>
        <details>
          <summary>Demonstrated integration skills <span>{demonstratedIntegrationSkills.length}</span></summary>
          <div className="ledger-columns">{demonstratedIntegrationSkills.map((item) => <p key={item}>{item}</p>)}</div>
        </details>
        <details>
          <summary>Currently exploring <span>{currentlyExploring.length}</span></summary>
          <div className="ledger-columns">{currentlyExploring.map((item) => <p key={item}>{item}</p>)}</div>
        </details>
      </div>
    </section>
  );
}
