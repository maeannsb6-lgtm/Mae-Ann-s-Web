import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { experience, trainings, selectedAwards } from '../data/content';

type Focus = 'experience' | 'education' | 'training' | 'recognition';

export function GrowthChapter() {
  const [focus, setFocus] = useState<Focus>('experience');

  return (
    <section id="journey" className="growth-chapter story-section" aria-labelledby="growth-title">
      <header className="story-heading growth-heading">
        <p><span>05</span> Growth</p>
        <h2 id="growth-title">One experience created the foundation for the next.</h2>
      </header>

      <div className="growth-route" aria-label="Professional growth path">
        {experience.slice().reverse().map((item, index) => (
          <button key={item.id} type="button" onClick={() => setFocus('experience')} className="growth-stop">
            <span className="growth-stop-year">{item.period}</span>
            <strong>{item.company}</strong>
            <span>{item.title}</span>
            {index < experience.length - 1 && <i aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="growth-focus-tabs" role="tablist" aria-label="Journey evidence">
        {[
          ['experience', 'Experience'],
          ['education', 'Education'],
          ['training', 'Training'],
          ['recognition', 'Recognition'],
        ].map(([id, label]) => (
          <button key={id} type="button" onClick={() => setFocus(id as Focus)} className={focus === id ? 'is-active' : ''}>{label}</button>
        ))}
      </div>

      <div className="growth-evidence">
        {focus === 'experience' && <ExperienceEvidence />}
        {focus === 'education' && (
          <article className="growth-education">
            <p className="small-label">2021–2025</p>
            <h3>BS Industrial Engineering</h3>
            <p>Technological Institute of the Philippines — Quezon City</p>
            <span>The academic foundation behind the process, systems, and operations work shown throughout this portfolio.</span>
          </article>
        )}
        {focus === 'training' && (
          <div className="growth-trainings">
            {trainings.map((training, index) => (
              <article key={training.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{training.title}</h3><p>{training.provider}</p><time>{training.date}</time></div>
              </article>
            ))}
          </div>
        )}
        {focus === 'recognition' && (
          <div className="growth-recognition">
            {selectedAwards.map((award, index) => (
              <article key={award.title} className={index === 0 || index === 2 || index === 5 ? 'is-major' : ''}>
                <span>{award.date}</span>
                <h3>{award.title}</h3>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceEvidence() {
  const [active, setActive] = useState(0);
  const current = experience[active];

  return (
    <div className="experience-stage">
      <div className="experience-selector">
        {experience.map((item, index) => (
          <button key={item.id} type="button" onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}>
            <span>{item.period}</span>{item.company}
          </button>
        ))}
      </div>
      <article className="experience-detail" aria-live="polite">
        <p className="small-label">{current.company}</p>
        <h3>{current.title}</h3>
        <p className="experience-location"><MapPin className="h-4 w-4" />{current.location}</p>
        <p>{current.summary}</p>
        <ul>{current.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
    </div>
  );
}
