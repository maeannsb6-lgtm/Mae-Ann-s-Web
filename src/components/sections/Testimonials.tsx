import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { trainings } from '../../data/content';

/** Grouping of the real certifications by subject, for the gallery filter. */
const topicOf = (title: string) => (/AI|Prompting|Alibaba/i.test(title) ? 'AI' : 'Lean & continuous improvement');
const FILTERS = ['All', 'Lean & continuous improvement', 'AI'] as const;

export function EducationTraining() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const shown = trainings.filter((t) => filter === 'All' || topicOf(t.title) === filter);

  return (
    <section id="certifications" className="rd-cred">
      <div className="rd-shell">
        <header className="rd-cred-head" data-reveal>
          <p className="rd-kicker">Education &amp; Training</p>
          <h2>Foundation, then focused capability-building.</h2>
          <p>Formal Industrial Engineering education supported by focused certifications and technology training.</p>
        </header>

        <div className="rd-cred-layout">
          <article className="rd-degree" data-reveal>
            <GraduationCap className="rd-degree-icon" aria-hidden="true" />
            <span className="rd-degree-years">2021–2025</span>
            <h3>
              BS Industrial
              <br />
              Engineering
            </h3>
            <p>Technological Institute of the Philippines — Quezon City</p>
          </article>

          <div className="rd-certs">
            <div className="rd-certs-filter" role="group" aria-label="Filter certifications">
              {FILTERS.map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f}
                  <span>{f === 'All' ? trainings.length : trainings.filter((t) => topicOf(t.title) === f).length}</span>
                </button>
              ))}
            </div>
            <ul className="rd-certs-grid">
              {shown.map((training, index) => (
                <li key={training.id} className="rd-cert" style={{ '--d': `${index * 60}ms` } as CSSProperties}>
                  <Award className="rd-cert-seal" aria-hidden="true" />
                  <p className="rd-cert-topic">{topicOf(training.title)}</p>
                  <h3>{training.title}</h3>
                  <p className="rd-cert-provider">{training.provider}</p>
                  <time>{training.date}</time>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
