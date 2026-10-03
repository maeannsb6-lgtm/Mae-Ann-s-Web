import { selectedAwards } from '../../data/content';

export function Achievements() {
  return (
    <section id="awards" className="pro-section pro-achievements">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Achievements</p><h2>Recognition that marks important moments.</h2></div>
          <p>Selected recognitions across feasibility, research, presentation, and innovation competitions.</p>
        </div>

        <div className="pro-achievement-grid">
          {selectedAwards.map((award, index) => (
            <article key={award.title} className={index === 0 || index === 2 || index === 5 ? 'is-featured' : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <time>{award.date}</time>
              <h3>{award.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
