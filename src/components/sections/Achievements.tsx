import { SectionHeading } from '../ui/SectionHeading';
import { selectedAwards } from '../../data/content';

export function Achievements() {
  const primary = selectedAwards.slice(0, 4);
  const additional = selectedAwards.slice(4);
  return (
    <section id="awards" className="section-shell bg-brand-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Recognition" title="Selected Awards & Professional Engagements" description="A concise selection of Industrial Engineering, feasibility, research, and presentation recognitions." className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2">
          {primary.map((award) => <AwardCard key={award.title} {...award} />)}
        </div>
        {additional.length > 0 && <details className="group mt-5 rounded-2xl border border-white/[0.08] bg-brand-card p-6"><summary className="cursor-pointer list-none font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">View more recognitions <span className="ml-2 text-brand-accent group-open:hidden">+</span><span className="ml-2 hidden text-brand-accent group-open:inline">−</span></summary><div className="mt-5 grid gap-4 md:grid-cols-2">{additional.map((award) => <AwardCard key={award.title} {...award} />)}</div></details>}
      </div>
    </section>
  );
}

function AwardCard({ title, date, icon: Icon }: (typeof selectedAwards)[number]) {
  return <article className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-brand-card p-6"><div className="rounded-xl border border-brand-accent/20 bg-brand-accent/10 p-3"><Icon className="h-5 w-5 text-brand-accent" /></div><div><h3 className="font-semibold leading-6 text-white">{title}</h3><p className="mt-2 text-sm text-brand-text-muted">{date}</p></div></article>;
}
