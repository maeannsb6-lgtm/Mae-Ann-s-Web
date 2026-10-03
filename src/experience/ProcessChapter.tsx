import { approachSteps } from '../data/content';
import { useStory } from './StoryController';

const fragments = ['inputs', 'handoffs', 'exceptions', 'decisions', 'delays', 'outputs', 'owners'];

export function ProcessChapter() {
  const { activeIndex, progress, reducedMotion } = useStory();
  const local = activeIndex === 3 ? progress : activeIndex > 3 ? 1 : 0;
  const activeStep = Math.min(approachSteps.length - 1, Math.floor(local * approachSteps.length));

  return (
    <section id="approach" className="process-chapter story-section" aria-labelledby="process-title">
      <header className="story-heading process-heading">
        <p><span>03</span> From chaos to structure</p>
        <h2 id="process-title">Automation begins after the process is understood.</h2>
      </header>

      <div className="process-stage">
        <div className="process-chaos" aria-hidden="true">
          {fragments.map((fragment, index) => {
            const chaosX = [4, 76, 15, 67, 31, 84, 48][index];
            const chaosY = [11, 23, 69, 82, 38, 61, 18][index];
            const orderedX = 10 + index * 12.7;
            const orderedY = 50;
            const p = reducedMotion ? 1 : local;
            const x = chaosX + (orderedX - chaosX) * p;
            const y = chaosY + (orderedY - chaosY) * p;
            return <span key={fragment} style={{ left: x + '%', top: y + '%' }}>{fragment}</span>;
          })}
        </div>

        <div className="process-current" aria-live="polite">
          <p>{approachSteps[activeStep].number}</p>
          <h3>{approachSteps[activeStep].title}</h3>
          <span>{approachSteps[activeStep].description}</span>
        </div>
      </div>

      <ol className="process-sequence">
        {approachSteps.map((step, index) => (
          <li key={step.number} className={index <= activeStep ? 'is-reached' : ''}>
            <span>{step.number}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
