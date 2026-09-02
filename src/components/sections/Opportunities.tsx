import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { hireMeFor, opportunityGroups } from '../../data/content';

export function Opportunities() {
  return (
    <section className="section-shell bg-brand-bg-primary" aria-labelledby="opportunities-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="opportunities-title" label="Opportunities" title="Two audiences. One process-focused profile." description="Relevant to recruiters seeking operational problem-solving and clients seeking practical workflow improvement." className="mb-12" />
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <p className="eyebrow">Open to opportunities</p><h3 className="mb-7 text-2xl font-semibold text-white">Industrial Engineering, automation, and hybrid roles</h3>
            <div className="space-y-7">{opportunityGroups.map((group) => <div key={group.title}><h4 className="mb-3 text-sm font-semibold text-brand-accent">{group.title}</h4><div className="flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-brand-text-secondary">{item}</span>)}</div></div>)}</div>
          </article>
          <article className="rounded-2xl border border-brand-accent/20 bg-brand-accent/[0.045] p-6 sm:p-8">
            <p className="eyebrow">Hire me for</p><h3 className="mb-7 text-2xl font-semibold text-white">Practical support for manual or disconnected workflows</h3>
            <ul className="space-y-4">{hireMeFor.map((item) => <li key={item} className="flex gap-3 text-brand-text-secondary"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-accent" />{item}</li>)}</ul>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-accent hover:text-brand-accent-bright">Discuss a process <ArrowRight className="h-4 w-4" /></a>
          </article>
        </div>
      </div>
    </section>
  );
}
