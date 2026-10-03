import { useState } from 'react';
import { ArrowUpRight, ChevronDown, PlayCircle } from 'lucide-react';
import { processImpact, projectLinks } from '../data/content';
import { secondaryProjects, solarCaseStudy } from '../data/story';
import { GithubMark } from '../components/ui/BrandIcons';

const projectTabs = [
  { id: 'solar', label: 'Solar system' },
  { id: 'workspace', label: 'Workspace automation' },
  { id: 'client', label: 'Client relations' },
] as const;

export function ProofChapter() {
  const [active, setActive] = useState<(typeof projectTabs)[number]['id']>('solar');

  return (
    <section id="projects" className="proof-chapter story-section" aria-labelledby="proof-title">
      <header className="story-heading proof-heading">
        <p><span>04</span> Proof</p>
        <h2 id="proof-title">The work becomes evidence.</h2>
        <p className="story-heading-lead">Projects are treated as artifacts, not repeated cards. Each one exposes the logic that made it useful.</p>
      </header>

      <div className="artifact-switcher" role="tablist" aria-label="Project artifacts">
        {projectTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={active === tab.id ? 'is-active' : ''}
          >
            <span>{projectTabs.indexOf(tab) + 1}</span>{tab.label}
          </button>
        ))}
      </div>

      {active === 'solar' && <SolarArtifact />}
      {active === 'workspace' && <SecondaryArtifact project={secondaryProjects[0]} mode="flow" />}
      {active === 'client' && <SecondaryArtifact project={secondaryProjects[1]} mode="routing" />}
    </section>
  );
}

function SolarArtifact() {
  return (
    <article className="artifact artifact--solar" aria-labelledby="solar-artifact-title">
      <div className="artifact-index">01</div>
      <div className="artifact-intro">
        <p className="small-label">Professional project</p>
        <h3 id="solar-artifact-title">{solarCaseStudy.title}</h3>
        <p>{solarCaseStudy.subtitle}</p>
        <div className="artifact-actions">
          <a href={projectLinks.solarLive} target="_blank" rel="noopener noreferrer" data-track="solar-live-demo">Live demo <ArrowUpRight className="h-4 w-4" /></a>
          <a href={projectLinks.solarGithub} target="_blank" rel="noopener noreferrer" data-track="solar-github">GitHub <GithubMark className="h-4 w-4" /></a>
        </div>
      </div>

      <div className="solar-layers" aria-label="Project layers">
        <ArtifactLayer label="Context / problem" index="A" items={solarCaseStudy.problem} />
        <ArtifactLayer label="My role" index="B" items={solarCaseStudy.role} />
        <ArtifactLayer label="Solution" index="C" items={solarCaseStudy.solution} />
      </div>

      <div className="solar-flow" aria-label="Solution workflow">
        {solarCaseStudy.flow.map((step, index) => (
          <div key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="artifact-comparison">
        <div>
          <p className="small-label">Before</p>
          <ul>{solarCaseStudy.before.observations.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="artifact-flow-text">{solarCaseStudy.before.flow.join(' → ')}</p>
        </div>
        <div>
          <p className="small-label">After</p>
          <ul>{solarCaseStudy.after.observations.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="artifact-flow-text">{solarCaseStudy.after.flow.join(' → ')}</p>
        </div>
      </div>

      <div className="artifact-lower">
        <div className="artifact-impact">
          <p className="small-label">Process impact</p>
          <ol>{processImpact.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
        </div>
        <details className="artifact-architecture">
          <summary>System architecture <ChevronDown className="h-4 w-4" /></summary>
          <div className="architecture-path">
            {solarCaseStudy.architecture.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true" />}{item}</span>)}
          </div>
          <p>{solarCaseStudy.architectureNote}</p>
        </details>
      </div>

      <details className="artifact-sop">
        <summary>Client Inquiry Automation SOP <ChevronDown className="h-4 w-4" /></summary>
        <div>{solarCaseStudy.sop.map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div>
      </details>
    </article>
  );
}

function ArtifactLayer({ label, index, items }: { label: string; index: string; items: readonly string[] }) {
  return (
    <div className="artifact-layer">
      <span>{index}</span>
      <h4>{label}</h4>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function SecondaryArtifact({ project, mode }: { project: (typeof secondaryProjects)[number]; mode: 'flow' | 'routing' }) {
  return (
    <article className={'artifact artifact--secondary artifact--' + mode}>
      <div className="artifact-index">{project.number}</div>
      <div className="artifact-secondary-copy">
        <p className="small-label">{project.label}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="artifact-role">{project.role}</p>
        {mode === 'routing' && <a href="#automation-lab" className="artifact-demo-link">Try the working demo <PlayCircle className="h-4 w-4" /></a>}
      </div>
      <div className="artifact-machine" aria-label={project.title + ' workflow'}>
        {project.flow.map((step, index) => (
          <div key={step} className="machine-step">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            {index < project.flow.length - 1 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
    </article>
  );
}
