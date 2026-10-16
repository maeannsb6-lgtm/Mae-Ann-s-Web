import type { CSSProperties } from 'react';
import { selectedAwards } from '../../data/content';

/** Split "Competition — Placement" into its parts, keeping the original wording. */
const split = (title: string) => {
  const [event, result] = title.split(' — ');
  return { event, result: result ?? '' };
};
// The three competition placements lead the exhibition; recognitions follow.
const FEATURED = [0, 5, 2];

export function Achievements() {
  const rest = selectedAwards.map((a, i) => ({ ...a, i })).filter((a) => !FEATURED.includes(a.i));

  return (
    <section id="awards" className="rd-awards">
      <div className="rd-shell">
        <header className="rd-awards-head" data-reveal>
          <p className="rd-kicker">Achievements</p>
          <h2>Recognition that marks important moments.</h2>
          <p>Selected recognitions across feasibility, research, presentation, and innovation competitions.</p>
        </header>

        <div className="rd-awards-hall">
          {FEATURED.map((index, order) => {
            const award = selectedAwards[index];
            const { event, result } = split(award.title);
            const Icon = award.icon;
            return (
              <article key={award.title} className={`rd-award-feature${order === 0 ? ' is-lead' : ''}`} data-reveal
                style={{ '--d': `${order * 110}ms` } as CSSProperties}>
                <span className="rd-award-num">{String(index + 1).padStart(2, '0')}</span>
                <Icon className="rd-award-icon" aria-hidden="true" />
                <p className="rd-award-result">{result}</p>
                <h3>{event}</h3>
                <time>{award.date}</time>
              </article>
            );
          })}
        </div>

        <ul className="rd-awards-wall">
          {rest.map((award, order) => {
            const { event, result } = split(award.title);
            return (
              <li key={award.title} data-reveal style={{ '--d': `${order * 80}ms` } as CSSProperties}>
                <span>{String(award.i + 1).padStart(2, '0')}</span>
                <time>{award.date}</time>
                <h3>{event}</h3>
                <p>{result}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
