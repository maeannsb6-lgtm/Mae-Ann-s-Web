import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { contactInfo } from '../../data/content';

const collaboration = ['Asynchronous communication', 'Clear technical documentation', 'GitHub collaboration', 'Cross-functional coordination'];

export function About() {
  return (
    <section id="about" className="section-shell bg-brand-bg-primary">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <SectionHeading label="About" title="Process thinking first. Technology where it helps." align="left" />
        <div className="space-y-7 text-base leading-8 text-brand-text-muted">
          <p>I understand processes as an Industrial Engineer, identify inefficiencies, redesign workflows, and use AI, automation, databases, and digital systems where appropriate.</p>
          <p>My experience spans energy project coordination, technical compliance, process analysis, feasibility studies, operations research, SOP development, n8n automation, Google Workspace workflows, and database-backed web applications.</p>
          <div className="rounded-2xl border-l-2 border-brand-accent bg-brand-card px-6 py-5 text-white">
            I’m particularly interested in designing automated client journeys—from inquiry and onboarding to proposal generation, follow-up, and operational tracking.
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.16em] text-brand-text-secondary">Remote collaboration</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {collaboration.map((item) => <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" />{item}</li>)}
            </ul>
          </div>
          <p className="text-sm text-brand-accent">{contactInfo.availability}</p>
        </div>
      </div>
    </section>
  );
}
