import { recruiterSummary } from '../../data/content';

export function Highlights() {
  return (
    <section aria-labelledby="quick-summary-title" className="border-y border-white/[0.07] bg-brand-bg-secondary/70 py-8">
      <h2 id="quick-summary-title" className="sr-only">Recruiter quick summary</h2>
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
        {recruiterSummary.map(({ label, value, icon: Icon }) => (
          <article key={label} className="bg-brand-card px-5 py-6">
            <div className="mb-4 flex items-center gap-3 text-brand-accent"><Icon className="h-5 w-5" /><h3 className="text-sm font-semibold text-white">{label}</h3></div>
            <p className="text-sm leading-6 text-brand-text-muted">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
