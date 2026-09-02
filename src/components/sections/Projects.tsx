import { ArrowUpRight, ChevronDown, PlayCircle, Workflow as WorkflowIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProcessImpact, ProcessMetrics, Workflow } from '../ui/Workflow';
import { processImpact, projectLinks } from '../../data/content';
import { GithubMark } from '../ui/BrandIcons';

const solarFlow = ['Client Intake', 'Data Validation', 'Engineering Analysis', 'System Configuration', 'AI-Assisted Recommendation', 'Proposal Generation', 'Database Storage', 'Client Communication'];
const beforeFlow = ['Client Inquiry', 'Manual Information Collection', 'Excel', 'Manual Engineering Check', 'Manual Recommendation', 'Manual Proposal', 'Manual Email'];
const afterFlow = ['Client Inquiry', 'Structured Intake', 'Validation', 'Central Database', 'Engineering Logic', 'AI Assistance', 'Proposal Generation', 'Client Workflow'];

const linkClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/12 px-4 text-sm font-semibold text-white transition hover:border-brand-accent/50 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent';

export function FeaturedWorks() {
  return (
    <section id="projects" className="section-shell bg-brand-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Featured Case Study" title="AI-Enabled Solar Proposal & Client Workflow System" description="Industrial Engineering × AI Automation × Client Workflow Design" className="mb-12" />

        <article id="solar-case-study" className="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-brand-card">
          <div className="grid gap-px bg-white/[0.07] lg:grid-cols-3">
            <CaseColumn number="01" title="Problem" items={['Manual and repeated client information gathering', 'Separate engineering calculation and recommendation steps', 'Time-consuming proposal preparation', 'Fragmented project and client information']} />
            <CaseColumn number="02" title="My Role" items={['Industrial Engineering', 'Process design', 'Project coordination', 'Automation and AI integration', 'System development']} />
            <CaseColumn number="03" title="Solution" items={['Structured client intake', 'Validated engineering workflow', 'AI-assisted guidance', 'Automated proposal process', 'Centralized project data']} />
          </div>

          <div className="border-t border-white/[0.08] p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Solution workflow</p>
            <Workflow steps={solarFlow} ariaLabel="Solar proposal system workflow" />
          </div>

          <div className="grid border-t border-white/[0.08] lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10"><p className="eyebrow">Process impact</p><h3 className="mb-6 text-2xl font-semibold text-white">What changed in the workflow</h3><ProcessImpact items={processImpact} /></div>
            <div className="border-t border-white/[0.08] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <p className="eyebrow">System architecture</p>
              <details className="group rounded-xl border border-white/[0.09] bg-brand-bg-primary/60 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">Expand architecture <ChevronDown className="h-5 w-5 transition group-open:rotate-180" /></summary>
                <div className="mt-5"><Workflow compact steps={['Web App', 'Business Logic / Automation', 'Gemini', 'Supabase', 'Email / Workspace']} ariaLabel="Solar system architecture" /><p className="mt-4 text-sm leading-6 text-brand-text-muted">The public project demonstrates a React web application, engineering and pricing logic, AI assistance through Gemini, Supabase-backed data workflows, and proposal/email support.</p></div>
              </details>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={projectLinks.solarLive} target="_blank" rel="noopener noreferrer" className={linkClass} data-track="solar-live-demo">Live Demo <ArrowUpRight className="h-4 w-4" /></a>
                <a href={projectLinks.solarGithub} target="_blank" rel="noopener noreferrer" className={linkClass} data-track="solar-github">GitHub <GithubMark className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
          <ProcessMetrics />
        </article>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FlowComparison title="Before automation" items={['Repetitive manual entry', 'Fragmented records', 'Manual calculation workflow', 'Repeated communication', 'Separate systems', 'Difficult tracking']} steps={beforeFlow} />
          <FlowComparison title="After automation" items={['Structured client intake', 'Centralized data', 'Standardized calculations', 'Automated workflow', 'AI assistance', 'Easier project tracking']} steps={afterFlow} accent />
        </div>

        <details className="group mt-6 rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">Portfolio sample: Client Inquiry Automation SOP <ChevronDown className="h-5 w-5 transition group-open:rotate-180" /></summary>
          <div className="mt-6 grid gap-5 text-sm leading-6 text-brand-text-muted sm:grid-cols-2 lg:grid-cols-4">
            <SopItem title="Purpose" text="Standardize how website inquiries are captured, acknowledged, routed, and tracked." />
            <SopItem title="Scope & trigger" text="Starts when a visitor submits a validated portfolio inquiry form." />
            <SopItem title="Process & outputs" text="Validate, store, notify, acknowledge, schedule follow-up, and maintain status." />
            <SopItem title="Exceptions & escalation" text="Reject spam or invalid data; log backend failures and provide a direct-email fallback." />
          </div>
        </details>
      </div>
    </section>
  );
}

const selectedProjects = [
  {
    number: '01', title: 'AI-Enabled Solar Proposal & Client Workflow System', label: 'Professional project',
    description: 'A structured client-to-proposal workflow connecting intake, engineering logic, AI assistance, proposal generation, and project information.',
    role: 'Industrial Engineering • Process Design • Automation • Project Coordination',
    flow: ['Intake', 'Engineering Logic', 'AI Assistance', 'Proposal', 'Database'],
    liveUrl: projectLinks.solarLive, githubUrl: projectLinks.solarGithub,
  },
  {
    number: '02', title: 'Google Workspace Operations Automation', label: 'Professional / project experience',
    description: 'n8n and Google Workspace workflows designed to support project tracking, routine reporting, information processing, and notifications.',
    role: 'Workflow Mapping • n8n • Google Workspace • Operational Reporting',
    flow: ['Trigger', 'n8n', 'Data Processing', 'Google Workspace', 'Reporting', 'Notification'],
  },
  {
    number: '03', title: 'Client Relations Automation System', label: 'Portfolio demo',
    description: 'A transparent demo architecture for lead capture, inquiry classification, acknowledgement, follow-up, status tracking, and team visibility.',
    role: 'Portfolio concept • Local rule-based demo • No commercial-client claim',
    flow: ['Inquiry', 'Lead Capture', 'Classification', 'Response', 'Follow-up', 'Status'],
    demoAnchor: '#automation-lab',
  },
];

export function AllProjects() {
  return (
    <section className="section-shell bg-brand-bg-primary" aria-labelledby="selected-projects-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="selected-projects-title" label="Selected Projects" title="Proof through workflows, systems, and documentation." description="Projects distinguish professional experience, project experience, and portfolio demonstrations." className="mb-12" />
        <div className="grid gap-6 lg:grid-cols-3">
          {selectedProjects.map((project) => <ProjectCard key={project.number} {...project} />)}
        </div>
      </div>
    </section>
  );
}

function CaseColumn({ number, title, items }: { number: string; title: string; items: string[] }) {
  return <div className="bg-brand-card p-6 sm:p-8"><p className="mb-4 text-sm font-semibold text-brand-accent">{number}</p><h3 className="mb-5 text-xl font-semibold text-white">{title}</h3><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-brand-text-muted"><span className="text-brand-accent">—</span>{item}</li>)}</ul></div>;
}

function FlowComparison({ title, items, steps, accent = false }: { title: string; items: string[]; steps: string[]; accent?: boolean }) {
  return <article className={`rounded-2xl border p-6 sm:p-8 ${accent ? 'border-brand-accent/25 bg-brand-accent/[0.04]' : 'border-white/[0.08] bg-brand-card'}`}><p className="eyebrow">{title}</p><ul className="mb-6 grid gap-2 sm:grid-cols-2">{items.map((item) => <li key={item} className="text-sm text-brand-text-secondary"><span className="mr-2 text-brand-accent">{accent ? '✓' : '—'}</span>{item}</li>)}</ul><details className="group"><summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-white">View workflow <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><div className="mt-5"><Workflow compact steps={steps} ariaLabel={`${title} workflow`} /></div></details></article>;
}

function SopItem({ title, text }: { title: string; text: string }) {
  return <div><h4 className="mb-2 font-semibold text-white">{title}</h4><p>{text}</p></div>;
}

interface ProjectCardProps {
  number: string; title: string; label: string; description: string; role: string; flow: string[];
  liveUrl?: string; githubUrl?: string; demoAnchor?: string;
}

function ProjectCard({ number, title, label, description, role, flow, liveUrl, githubUrl, demoAnchor }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-brand-card p-6">
      <div className="mb-6 flex items-center justify-between"><span className="text-sm font-semibold text-brand-accent">{number}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-brand-text-muted">{label}</span></div>
      <h3 className="text-xl font-semibold leading-7 text-white">{title}</h3><p className="mt-4 text-sm leading-6 text-brand-text-muted">{description}</p><p className="mt-5 text-xs leading-5 text-brand-text-secondary">{role}</p>
      <div className="mt-6 rounded-xl border border-white/[0.07] bg-brand-bg-primary/60 p-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-brand-accent"><WorkflowIcon className="h-4 w-4" />Workflow</div><p className="mt-3 text-sm leading-6 text-brand-text-muted">{flow.join(' → ')}</p></div>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Live Demo <ArrowUpRight className="h-4 w-4" /></a>}
        {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub <GithubMark className="h-4 w-4" /></a>}
        {demoAnchor && <a href={demoAnchor} className={linkClass}>Try Demo <PlayCircle className="h-4 w-4" /></a>}
      </div>
    </article>
  );
}
