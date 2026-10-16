import type { CSSProperties } from 'react';
import { recruiterSummary } from '../../data/content';

export function Highlights() {
  return (
    <section className="rd-glance" aria-labelledby="quick-summary-title">
      <div className="rd-shell rd-glance-shell">
        <div className="rd-glance-head" data-reveal>
          <p className="rd-kicker">At a glance</p>
          <h2 id="quick-summary-title">What I bring to the table.</h2>
        </div>
        <div className="rd-glance-strip">
          {recruiterSummary.map(({ label, value, icon: Icon }, index) => (
            <article key={label} data-reveal style={{ '--d': `${index * 80}ms` } as CSSProperties}>
              <span className="rd-glance-num">0{index + 1}</span>
              <Icon className="rd-glance-icon" aria-hidden="true" />
              <h3>{label}</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
