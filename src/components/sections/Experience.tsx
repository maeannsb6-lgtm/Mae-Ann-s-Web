import { MapPin } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { experience } from '../../data/content';

export function Experience() {
  return (
    <section id="experience" className="section-shell bg-brand-bg-primary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Experience" title="Industrial Engineering across projects, operations, and improvement work." className="mb-12" />
        <div className="relative space-y-5 before:absolute before:bottom-0 before:left-[1.05rem] before:top-0 before:w-px before:bg-white/10 sm:before:left-[8.5rem]">
          {experience.map((item) => (
            <article key={item.id} className="relative grid gap-4 pl-12 sm:grid-cols-[7rem_1fr] sm:pl-0">
              <time className="pt-1 text-sm font-semibold text-brand-accent">{item.period}</time>
              <span className="absolute left-[.78rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-brand-bg-primary bg-brand-accent sm:left-[8.22rem]" aria-hidden="true" />
              <div className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
                <p className="text-sm font-semibold text-brand-accent">{item.company}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-brand-text-muted"><MapPin className="h-4 w-4" />{item.location}</p>
                <p className="mt-5 leading-7 text-brand-text-secondary">{item.summary}</p>
                <ul className="mt-5 space-y-3">{item.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-6 text-brand-text-muted"><span className="text-brand-accent">—</span>{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
