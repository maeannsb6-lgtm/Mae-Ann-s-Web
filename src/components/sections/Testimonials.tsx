import { Award, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { trainings } from '../../data/content';

export function EducationTraining() {
  return (
    <section id="certifications" className="section-shell bg-brand-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Professional Credibility" title="Education, certifications, and focused training." className="mb-12" />
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <article className="rounded-2xl border border-brand-accent/20 bg-brand-accent/[0.045] p-7"><GraduationCap className="h-7 w-7 text-brand-accent" /><p className="mt-7 text-sm font-semibold text-brand-accent">2021–2025</p><h3 className="mt-2 text-2xl font-semibold text-white">BS Industrial Engineering</h3><p className="mt-3 leading-7 text-brand-text-muted">Technological Institute of the Philippines — Quezon City</p></article>
          <div className="grid gap-4 sm:grid-cols-2">
            {trainings.map((training) => <article key={training.id} className="rounded-2xl border border-white/[0.08] bg-brand-card p-6"><Award className="h-5 w-5 text-brand-accent" /><h3 className="mt-5 font-semibold leading-6 text-white">{training.title}</h3><p className="mt-3 text-sm leading-6 text-brand-text-muted">{training.provider}</p><p className="mt-3 text-xs font-medium text-brand-text-secondary">{training.date}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
