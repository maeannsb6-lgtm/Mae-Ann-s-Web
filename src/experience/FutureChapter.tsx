import { ArrowDownRight } from 'lucide-react';
import { hireMeFor, opportunityGroups } from '../data/content';

export function FutureChapter() {
  return (
    <section id="opportunities" className="future-chapter story-section" aria-labelledby="future-title">
      <header className="story-heading future-heading">
        <p><span>07</span> Future</p>
        <h2 id="future-title">The system opens outward.</h2>
        <p className="story-heading-lead">I’m interested in work where operational thinking and technology reinforce each other.</p>
      </header>

      <div className="future-space">
        <div className="future-directions">
          {opportunityGroups.map((group, index) => (
            <article key={group.title}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.items.join(' · ')}</p>
            </article>
          ))}
        </div>

        <div className="future-problems">
          <p className="small-label">Problems I can help with</p>
          <ol>{hireMeFor.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
          <a href="#contact">Start a conversation <ArrowDownRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
