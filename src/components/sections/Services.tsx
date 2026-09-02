import { Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { whatIDo } from '../../data/content';

export function Services() {
  return (
    <section className="section-shell bg-brand-bg-secondary" aria-labelledby="what-i-do-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="what-i-do-title" label="What I Do" title="Improve the process. Then build the right system." description="Four connected capability areas, grounded in Industrial Engineering and demonstrated through professional or project work." className="mb-12" />
        <div className="grid gap-5 md:grid-cols-2">
          {whatIDo.map(({ title, description, items, icon: Icon }, index) => (
            <article key={title} className="depth-card rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div><p className="mb-3 text-sm font-semibold text-brand-accent">0{index + 1}</p><h3 className="text-xl font-semibold text-white">{title}</h3></div>
                <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/10 p-3"><Icon className="h-6 w-6 text-brand-accent" /></div>
              </div>
              <p className="mb-6 leading-7 text-brand-text-muted">{description}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-brand-text-secondary"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
