import { ArrowRight } from 'lucide-react';
import { hireMeFor, opportunityGroups } from '../../data/content';

export function Opportunities() {
  return (
    <section id="opportunities" className="pro-section pro-opportunities">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Opportunities</p><h2>Where my background fits next.</h2></div>
          <p>Open to roles and selected projects that connect operational problem-solving with automation and business systems.</p>
        </div>

        <div className="pro-opportunity-layout">
          <div className="pro-opportunity-groups">
            {opportunityGroups.map((group, index) => (
              <article key={group.title}>
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(' · ')}</p>
              </article>
            ))}
          </div>

          <div className="pro-hire-list">
            <p className="pro-small-label">Hire me for</p>
            <ul>{hireMeFor.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
            <a href="#contact">Discuss a role or process <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
