import { recruiterSummary, contactInfo } from '../data/content';
import { aboutStory } from '../data/story';
import { useStory } from './StoryController';

export function CuriosityChapter() {
  const { activeIndex, progress, reducedMotion } = useStory();
  const local = activeIndex === 1 ? progress : activeIndex > 1 ? 1 : 0;

  return (
    <section id="about" className="curiosity-chapter story-section" aria-labelledby="curiosity-title">
      <header className="story-heading curiosity-heading">
        <p><span>01</span> Curiosity</p>
        <h2 id="curiosity-title">I investigate before I act.</h2>
      </header>

      <div className="curiosity-field" aria-label="How Mae Ann thinks">
        <div className="curiosity-question" style={{ transform: reducedMotion ? undefined : `translate3d(0,${(1-local)*36}px,0)` }}>
          <span>observe</span>
          <strong>How does the work actually move?</strong>
        </div>

        <div className="curiosity-statement curiosity-statement--a">
          <span>process</span>
          <p>{aboutStory.statements[0]}</p>
        </div>

        <div className="curiosity-statement curiosity-statement--b">
          <span>range</span>
          <p>{aboutStory.statements[1]}</p>
        </div>

        <blockquote className="curiosity-focus">
          {aboutStory.statements[2]}
        </blockquote>

        <div className="curiosity-summary" aria-label="Professional focus">
          {recruiterSummary.map(({ label, value }, index) => (
            <div key={label} style={{ opacity: reducedMotion ? 1 : Math.min(1, Math.max(.22, local * 1.45 - index * .12)) }}>
              <span>0{index + 1}</span>
              <h3>{label}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="curiosity-collaboration">
          <p className="small-label">How I collaborate</p>
          <ul>
            {aboutStory.collaboration.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="curiosity-availability">{contactInfo.availability}</p>
        </div>
      </div>
    </section>
  );
}
