import { MapPin } from 'lucide-react';
import { experience } from '../../data/content';

export function Experience() {
  return (
    <section id="experience" className="pro-section pro-experience">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">06 / Impact — Experience</p><h2>Engineering in practice.</h2></div>
          <p>Roles across project coordination, operations, business development, process improvement, and technical compliance.</p>
        </div>

        <div className="pro-experience-list">
          {experience.map((item, index) => (
            <article key={item.id}>
              <div className="pro-exp-meta">
                <span>0{index + 1}</span>
                <time>{item.period}</time>
                <p>{item.company}</p>
              </div>
              <div className="pro-exp-main">
                <h3>{item.title}</h3>
                <p className="pro-exp-location"><MapPin className="h-4 w-4" />{item.location}</p>
                <p className="pro-exp-summary">{item.summary}</p>
                <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
