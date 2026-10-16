import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { experience } from '../../data/content';

/** Start year of a period like "Aug 2025 – Present". */
const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? '';

export function Experience() {
  const [active, setActive] = useState(0);
  const role = experience[active];

  return (
    <section id="experience" className="rd-career">
      <div className="rd-shell">
        <header className="rd-career-head" data-reveal>
          <p className="rd-kicker">06 / Impact — Experience</p>
          <h2>
            Engineering <span>in practice.</span>
          </h2>
          <p>Roles across project coordination, operations, business development, process improvement, and technical compliance.</p>
        </header>

        <div className="rd-career-archive" data-reveal>
          <ol className="rd-career-line" role="tablist" aria-label="Roles">
            {experience.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="tab"
                  id={`role-tab-${index}`}
                  aria-selected={index === active}
                  aria-controls="role-panel"
                  onClick={() => setActive(index)}
                  className={index === active ? 'is-active' : ''}
                >
                  <span className="rd-career-year">{startYear(item.period)}</span>
                  <span className="rd-career-company">{item.company}</span>
                  <span className="rd-career-period">{item.period}</span>
                </button>
              </li>
            ))}
          </ol>

          <article className="rd-career-panel" id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${active}`} key={role.id}>
            <p className="rd-career-index">0{active + 1} / 0{experience.length}</p>
            <h3>{role.title}</h3>
            <p className="rd-career-where">
              <strong>{role.company}</strong>
              <span><MapPin size={15} /> {role.location}</span>
              <time>{role.period}</time>
            </p>
            <p className="rd-career-summary">{role.summary}</p>
            <ul>
              {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </article>
        </div>

        {/* Phones: every role stays readable as a stacked timeline. */}
        <ol className="rd-career-stack">
          {experience.map((item) => (
            <li key={item.id}>
              <details open={item.id === experience[0].id}>
                <summary>
                  <span className="rd-career-year">{startYear(item.period)}</span>
                  <span>
                    <strong>{item.company}</strong>
                    <em>{item.title}</em>
                  </span>
                </summary>
                <p className="rd-career-where">
                  <span><MapPin size={14} /> {item.location}</span>
                  <time>{item.period}</time>
                </p>
                <p>{item.summary}</p>
                <ul>
                  {item.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
