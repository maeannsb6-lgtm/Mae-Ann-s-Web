import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { hireMeFor, opportunityGroups } from '../../data/content';

export function Opportunities() {
  const [active, setActive] = useState(0);
  const group = opportunityGroups[active];

  return (
    <section id="opportunities" className="rd-opps">
      <div className="rd-shell">
        <header className="rd-opps-head" data-reveal>
          <p className="rd-kicker">08 / Opportunities</p>
          <h2>Where my background fits next.</h2>
          <p>Open to roles and selected projects that connect operational problem-solving with automation and business systems.</p>
        </header>

        <div className="rd-opps-layout" data-reveal>
          <div className="rd-opps-picker">
            <div className="rd-opps-tabs" role="tablist" aria-label="Opportunity areas">
              {opportunityGroups.map((g, index) => (
                <button
                  key={g.title}
                  type="button"
                  role="tab"
                  id={`opp-tab-${index}`}
                  aria-selected={index === active}
                  aria-controls="opp-panel"
                  onClick={() => setActive(index)}
                >
                  <span>0{index + 1}</span>
                  {g.title}
                </button>
              ))}
            </div>
            <ul className="rd-opps-roles" id="opp-panel" role="tabpanel" aria-labelledby={`opp-tab-${active}`} key={group.title}>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <aside className="rd-hire">
            <p className="rd-label">Hire me for</p>
            <ol>
              {hireMeFor.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
            <a href="#contact" className="rd-btn rd-btn--amber">
              Discuss a role or process <ArrowRight className="h-4 w-4" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
