import { SectionHeading } from '../ui/SectionHeading';
import { approachSteps } from '../../data/content';

export function Approach() {
  return (
    <section id="approach" className="section-shell bg-brand-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="My Approach" title="From operational problem to validated workflow." description="Automation begins after the process is understood—not before." className="mb-12" />
        <ol className="approach-grid">
          {approachSteps.map((step, index) => (
            <li key={step.number} className="approach-step">
              <div className="mb-5 flex items-center gap-3"><span className="text-sm font-semibold text-brand-accent">{step.number}</span>{index < approachSteps.length - 1 && <span className="h-px flex-1 bg-white/10" />}</div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-brand-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
