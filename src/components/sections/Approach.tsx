import { approachSteps } from '../../data/content';

export function Approach() {
  return (
    <section id="approach" className="pro-section pro-approach" data-story-stage="2">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">03 / Optimization</p><h2>Understand first. Automate second.</h2></div>
          <p>A practical sequence for turning unclear work into an improved, documented system.</p>
        </div>

        <ol className="pro-process-line">
          {approachSteps.map((step, index) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < approachSteps.length - 1 && <i aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
