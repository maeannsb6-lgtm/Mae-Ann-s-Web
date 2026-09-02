import { CheckCircle2, Compass } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { capabilityGroups, currentlyExploring, demonstratedIntegrationSkills, industrialEngineeringCapabilities, technologyTools } from '../../data/content';

function TagList({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className={`rounded-full border px-3 py-1.5 text-sm ${muted ? 'border-white/8 text-brand-text-muted' : 'border-brand-accent/20 bg-brand-accent/[0.06] text-brand-text-secondary'}`}>{item}</span>)}</div>;
}

export function Skills() {
  return (
    <section id="capabilities" className="section-shell bg-brand-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Capabilities" title="Industrial Engineering is the foundation. Automation extends it." description="Capabilities describe the problems I can work on; tools are listed separately to keep the profile clear and credible." className="mb-12" />
        <div className="grid gap-5 lg:grid-cols-3">
          {capabilityGroups.map(({ title, items, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-white/[0.08] bg-brand-card p-6">
              <Icon className="mb-5 h-6 w-6 text-brand-accent" /><h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
              <ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm text-brand-text-secondary"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <article className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <p className="eyebrow">Industrial Engineering capabilities</p><h3 className="mb-6 text-2xl font-semibold text-white">Process and operations toolkit</h3><TagList items={industrialEngineeringCapabilities} />
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <p className="eyebrow">Technology &amp; tools</p><h3 className="mb-6 text-2xl font-semibold text-white">Project toolkit</h3><TagList items={technologyTools} />
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8"><p className="eyebrow">Demonstrated in projects</p><h3 className="mb-5 text-xl font-semibold text-white">API &amp; integration concepts</h3><TagList items={demonstratedIntegrationSkills} /></article>
          <article className="rounded-2xl border border-dashed border-white/12 bg-transparent p-6 sm:p-8"><p className="eyebrow"><Compass className="mr-2 inline h-4 w-4" />Currently exploring</p><h3 className="mb-5 text-xl font-semibold text-white">Next capability layer</h3><TagList items={currentlyExploring} muted /></article>
        </div>
      </div>
    </section>
  );
}
