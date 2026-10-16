import { lazy, Suspense } from 'react';
import { ArrowRight, Database, Layers, Network, Quote, Sparkles } from 'lucide-react';

const WorkflowScene = lazy(() => import('../three/WorkflowScene'));

const capabilities = [
  { title: 'Process Improvement', text: 'Identify bottlenecks and design clearer, more effective workflows.', icon: Network, href: '#approach' },
  { title: 'AI & Automation', text: 'Use AI and automation where it creates value and saves time.', icon: Sparkles, href: '#intelligence' },
  { title: 'Business Systems', text: 'Build and connect digital systems that support your operations.', icon: Database, href: '#projects' },
  { title: 'Workflow Design', text: 'Design end-to-end workflows for smoother, more scalable operations.', icon: Layers, href: '#services' },
];

export function About() {
  return (
    <section id="about" className="about-process" data-story-stage="1">
      <div className="about-process-shell">
        <div className="about-process-grid">
          <div className="about-process-copy">
            <p className="about-process-kicker">02 / Process</p>
            <h2>
              Process thinking first.
              <br />
              <span>Technology</span> where it helps.
            </h2>
            <p className="about-process-lead">
              I design and improve business processes using automation, digital systems, and AI—turning complex work
              into clearer, more efficient workflows.
            </p>
            <blockquote>
              <Quote aria-hidden="true" />
              <p>From inquiry to operations, I build automated workflows that save time and create real value.</p>
            </blockquote>
          </div>
          <div className="about-process-visual">
            <Suspense fallback={<div className="scene-fallback"><span /><span /><span /></div>}>
              <WorkflowScene />
            </Suspense>
          </div>
        </div>

        <div className="about-capabilities">
          <div className="about-capabilities-head">
            <p>Core capabilities</p>
            <span aria-hidden="true" />
            <p>Streamlined processes. Stronger outcomes.</p>
          </div>
          <ul>
            {capabilities.map(({ title, text, icon: Icon, href }) => (
              <li key={title}>
                <span className="about-capability-icon"><Icon size={20} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <a href={href} aria-label={`More about ${title}`}><ArrowRight size={15} /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
