import { useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, FileText } from 'lucide-react';
import { processImpact, projectLinks } from '../../data/content';
import { secondaryProjects, solarCaseStudy } from '../../data/story';
import { websites } from '../../data/websites';
import type { WebsiteProject } from '../../data/websites';
import { GithubMark } from '../ui/BrandIcons';
import { BrowserFrame, LivePreviewButton, OpenSiteLink, PhoneFrame } from '../projects/WebsitePreview';

const live = websites.filter((site) => site.url);
const solar = live.find((site) => site.id === 'solar-solutions')!;
const stec = live.find((site) => site.id === 'stec-portal');
const portfolio = live.find((site) => site.id === 'portfolio');
const wedding = live.find((site) => site.id === 'wedding');

const CASE_TABS = ['Problem', 'My role', 'Solution', 'Workflow', 'Architecture', 'Results'] as const;

export function FeaturedWorks() {
  return (
    <section id="projects" className="rd-work">
      <div className="rd-shell">
        <header className="rd-work-head" data-reveal>
          <p className="rd-kicker">05 / Execution — Selected work</p>
          <h2>
            From process.
            <br />
            To <span>practical systems.</span>
          </h2>
          <p>Engineering analysis, connected workflows, and AI-assisted tools. Each starts with a real operational problem.</p>
        </header>

        <SolarFeature />
        {wedding && <WeddingFeature site={wedding} />}
        {stec && <StecFeature site={stec} />}
        {portfolio && <PortfolioRow site={portfolio} />}

        <OperationsWork />
      </div>
    </section>
  );
}

/** Featured case study: the real Solar Solutions PH site on a large stage. */
function SolarFeature() {
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState<(typeof CASE_TABS)[number]>('Problem');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const r = event.currentTarget.getBoundingClientRect();
    setTilt({ x: (event.clientX - r.left) / r.width - 0.5, y: (event.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <article className="rd-solar" aria-labelledby="solar-title">
      <div className="rd-solar-stage" data-reveal onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ '--tx': tilt.x, '--ty': tilt.y } as CSSProperties}>
        <span className="rd-solar-badge">Featured website · {solar.status}</span>
        <BrowserFrame url={solar.url!} shot={solar.desktop[shot]} className="rd-solar-browser" />
        {solar.mobile && <PhoneFrame shot={solar.mobile} className="rd-solar-phone" />}
        <div className="rd-solar-thumbs" role="group" aria-label="Screens from the live site">
          {solar.desktop.map((s, i) => (
            <button key={s.src} type="button" aria-pressed={i === shot} onClick={() => setShot(i)}>
              <img src={s.src} alt="" loading="lazy" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rd-solar-info" data-reveal>
        <p className="rd-label">Professional project · {solar.category}</p>
        <h3 id="solar-title">{solarCaseStudy.title}</h3>
        <p className="rd-solar-sub">{solarCaseStudy.subtitle}</p>
        <p className="rd-solar-live">
          Live as <strong>{solar.name}</strong>. {solar.summary}
        </p>
        <ul className="rd-solar-features">
          {solar.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <p className="rd-solar-tools">
          <strong>Tools:</strong> {solar.tech.join(' · ')}
        </p>
        <div className="rd-actions">
          <LivePreviewButton project={solar} label="Explore website" />
          <OpenSiteLink url={solar.url!} />
          <a href={projectLinks.solarAssessment} target="_blank" rel="noopener noreferrer" className="rd-btn rd-btn--text">
            Start the assessment app <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="rd-case" data-reveal>
        <div className="rd-case-tabs" role="tablist" aria-label="Solar case study">
          {CASE_TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} aria-controls="solar-case-panel" onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="rd-case-panel" id="solar-case-panel" role="tabpanel" aria-label={tab}>
          {tab === 'Problem' && <NumberedList items={solarCaseStudy.problem} />}
          {tab === 'My role' && <NumberedList items={solarCaseStudy.role} />}
          {tab === 'Solution' && <NumberedList items={solarCaseStudy.solution} />}
          {tab === 'Workflow' && (
            <div>
              <p className="rd-case-caption">AI-enabled solar proposal &amp; client workflow system</p>
              <ol className="rd-case-flow">
                {solarCaseStudy.flow.map((step, i) => (
                  <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {tab === 'Architecture' && (
            <div className="rd-case-arch">
              <ol>
                {solarCaseStudy.architecture.map((layer) => <li key={layer}><span>{layer}</span></li>)}
              </ol>
              <p>{solarCaseStudy.architectureNote}</p>
            </div>
          )}
          {tab === 'Results' && <NumberedList items={processImpact} />}
        </div>
      </div>

      <BeforeAfter />
    </article>
  );
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="rd-case-list">
      {items.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}
    </ol>
  );
}

/** Interactive comparison of the manual and the automated workflow (qualitative, as documented). */
function BeforeAfter() {
  const [view, setView] = useState<'before' | 'after'>('after');
  const data = solarCaseStudy[view];
  return (
    <div className={`rd-compare rd-compare--${view}`} data-reveal>
      <div className="rd-compare-head">
        <p className="rd-label">Workflow comparison</p>
        <div className="rd-compare-switch" role="group" aria-label="Choose workflow">
          <button type="button" aria-pressed={view === 'before'} onClick={() => setView('before')}>Before automation</button>
          <button type="button" aria-pressed={view === 'after'} onClick={() => setView('after')}>After automation</button>
        </div>
      </div>
      <ol className="rd-compare-flow" aria-label={`${view === 'before' ? 'Before' : 'After'} automation workflow`}>
        {data.flow.map((step, i) => (
          <li key={step} style={{ '--d': `${i * 50}ms` } as CSSProperties}><span>{step}</span></li>
        ))}
      </ol>
      <ul className="rd-compare-notes">
        {data.observations.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

/** A different kind of site: a magazine-style spread in the wedding website's own sage and gold. */
function WeddingFeature({ site }: { site: WebsiteProject }) {
  const [shot, setShot] = useState(0);
  return (
    <article className="rd-wed" aria-labelledby="wed-title" data-reveal>
      <div className="rd-wed-visual">
        <BrowserFrame url={site.url!} shot={site.desktop[shot]} className="rd-wed-browser" />
        {site.mobile && <PhoneFrame shot={site.mobile} className="rd-wed-phone" />}
        <div className="rd-wed-thumbs" role="group" aria-label="Screens from the live site">
          {site.desktop.map((s, i) => (
            <button key={s.src} type="button" aria-pressed={i === shot} onClick={() => setShot(i)}>
              <img src={s.src} alt="" loading="lazy" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="rd-wed-copy">
        <p className="rd-wed-label">{site.category}</p>
        <h3 id="wed-title">{site.name}</h3>
        <p className="rd-wed-status">{site.status}</p>
        <p>{site.summary}</p>
        <ol>
          {site.features.map((f, i) => (
            <li key={f}><span>{String(i + 1).padStart(2, '0')}</span>{f}</li>
          ))}
        </ol>
        <p className="rd-wed-tech">{site.tech.join(' · ')}</p>
        <div className="rd-actions">
          <LivePreviewButton project={site} label="Live preview" />
          <OpenSiteLink url={site.url!} />
        </div>
      </div>
    </article>
  );
}

/** A second real website: overlapping desktop and phone previews in its own navy branding. */
function StecFeature({ site }: { site: WebsiteProject }) {
  const [shot, setShot] = useState(0);
  return (
    <article className="rd-stec" aria-labelledby="stec-title">
      <div className="rd-stec-copy" data-reveal>
        <p className="rd-label">{site.category} · {site.status}</p>
        <h3 id="stec-title">{site.name}</h3>
        <p>{site.summary}</p>
        <ul>
          {site.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <p className="rd-stec-tech">{site.tech.join(' · ')}</p>
        <div className="rd-actions">
          <LivePreviewButton project={site} label="Live preview" />
          <OpenSiteLink url={site.url!} />
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="rd-btn rd-btn--text">
              GitHub <GithubMark className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="rd-stec-visual" data-reveal>
        <BrowserFrame url={site.url!} shot={site.desktop[shot]} />
        {site.mobile && <PhoneFrame shot={site.mobile} className="rd-stec-phone" />}
        {site.desktop.length > 1 && (
          <div className="rd-stec-switch" role="group" aria-label="Screens from the live site">
            {site.desktop.map((s, i) => (
              <button key={s.src} type="button" aria-pressed={i === shot} onClick={() => setShot(i)}>{s.label}</button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** The portfolio itself, as a compact editorial entry. */
function PortfolioRow({ site }: { site: WebsiteProject }) {
  return (
    <article className="rd-folio" data-reveal aria-labelledby="folio-title">
      <BrowserFrame url={site.url!} shot={site.desktop[0]} className="rd-folio-browser" />
      <div>
        <p className="rd-label">{site.category} · {site.status}</p>
        <h3 id="folio-title">{site.name}</h3>
        <p>{site.summary}</p>
        <p className="rd-folio-tech">{site.tech.join(' · ')}</p>
        {site.github && (
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="rd-btn rd-btn--text">
            View the code on GitHub <GithubMark className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}

/** Non-website work: automation demos, the SOP and Industrial Engineering field analysis. */
function OperationsWork() {
  return (
    <div className="rd-ops">
      <div className="rd-ops-head" data-reveal>
        <p className="rd-label">Automation &amp; engineering work</p>
        <h3>Systems behind the screens.</h3>
      </div>

      <div className="rd-ops-flows">
        {secondaryProjects.map((project) => (
          <article key={project.number} className="rd-ops-flow" data-reveal>
            <div className="rd-ops-flow-top">
              <span>{project.number}</span>
              <p>{project.label}</p>
            </div>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <ol className="rd-ops-pipeline" aria-label={`${project.title} workflow`}>
              {project.flow.map((step) => <li key={step}><span>{step}</span></li>)}
            </ol>
            <small>{project.role}</small>
          </article>
        ))}
      </div>

      <details className="rd-sop" data-reveal>
        <summary>
          <FileText size={18} /> Client Inquiry Automation SOP <ChevronDown size={16} className="rd-sop-chev" />
        </summary>
        <div className="rd-sop-doc">
          {solarCaseStudy.sop.map(([title, text], i) => (
            <article key={title}>
              <span>{i + 1}.</span>
              <div>
                <h5>{title}</h5>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </details>

      <div className="rd-field" data-reveal>
        <div className="rd-field-head">
          <p className="rd-label">Industrial Engineering / Applied work</p>
          <h3>Improvement begins on the operations floor.</h3>
        </div>
        <div className="rd-field-grid">
          <FieldCase
            title="Workflow & productivity analysis"
            meta="JCV Enterprises · Field analysis · 2023–2024"
            problem="Operational bottlenecks, scheduling, and workload distribution."
            role="Conducted time and motion studies, mapped workflows, and analyzed operational data as an Industrial Engineering intern."
            methods="Work measurement, operations research, workload balancing, scheduling recommendations, dashboards, and ISO-aligned documentation."
            learning="Connected measured work and resource constraints to structured improvement recommendations."
          />
          <FieldCase
            title="Lean analysis & process documentation"
            meta="ELPS Industries · Field analysis · 2024–2025"
            problem="Workflow inefficiencies and the need for clear productivity information."
            role="Analyzed workflows, monitored KPIs, and supported continuous improvement as an Industrial Engineering intern."
            methods="Lean principles, root cause analysis, process maps, SOP documentation, and stakeholder recommendations."
            learning="Combined operational evidence and documented processes to identify improvement opportunities."
          />
        </div>
      </div>
    </div>
  );
}

function FieldCase(props: { title: string; meta: string; problem: string; role: string; methods: string; learning: string }) {
  return (
    <article className="rd-field-case">
      <p className="rd-field-meta">{props.meta}</p>
      <h4>{props.title}</h4>
      <dl>
        <dt>Problem</dt>
        <dd>{props.problem}</dd>
        <dt>Process &amp; my role</dt>
        <dd>{props.role}</dd>
      </dl>
      <details>
        <summary>
          Methods, output &amp; learning <ArrowRight size={14} />
        </summary>
        <dl>
          <dt>Methods &amp; work produced</dt>
          <dd>{props.methods}</dd>
          <dt>Learning</dt>
          <dd>{props.learning}</dd>
        </dl>
      </details>
    </article>
  );
}
