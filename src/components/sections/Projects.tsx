import type { CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, PlayCircle } from "lucide-react";
import { processImpact, projectLinks } from "../../data/content";
import { secondaryProjects, solarCaseStudy } from "../../data/story";
import { GithubMark } from "../ui/BrandIcons";

export function FeaturedWorks() {
  return (
    <section id="projects" className="pro-section pro-projects">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div>
            <p className="pro-kicker">05 / Execution — Selected work</p>
            <h2>
              From process.
              <br />
              To practical systems.
            </h2>
          </div>
          <p>
            Engineering analysis, connected workflows, and AI-assisted tools.
            Each starts with a real operational problem.
          </p>
        </div>

        <article className="pro-featured-project">
          <div className="pro-project-visual">
            <div className="pro-project-screen">
              <div className="pro-project-screen-top">
                <span />
                <span />
                <span />
              </div>
              <div className="pro-project-wireframe">
                {solarCaseStudy.flow.map((step, index) => (
                  <div key={step} style={{ "--i": index } as CSSProperties}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <p>AI-enabled solar proposal &amp; client workflow system</p>
          </div>

          <div className="pro-project-copy">
            <p className="pro-small-label">Professional project</p>
            <h3>{solarCaseStudy.title}</h3>
            <p>{solarCaseStudy.subtitle}</p>
            <p>
              <strong>Tools:</strong> React · Gemini / Google AI Studio ·
              Supabase · Vercel
            </p>
            <div className="pro-project-actions">
              <a
                href={projectLinks.solarLive}
                target="_blank"
                rel="noopener noreferrer"
                data-track="solar-live-demo"
              >
                Live demo <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={projectLinks.solarGithub}
                target="_blank"
                rel="noopener noreferrer"
                data-track="solar-github"
              >
                GitHub <GithubMark className="h-4 w-4" />
              </a>
            </div>

            <div className="pro-project-columns">
              <ProjectList title="Problem" items={solarCaseStudy.problem} />
              <ProjectList title="My role" items={solarCaseStudy.role} />
              <ProjectList title="Solution" items={solarCaseStudy.solution} />
            </div>

            <details className="pro-project-details">
              <summary>
                View architecture &amp; workflow{" "}
                <ChevronDown className="h-4 w-4" />
              </summary>
              <p>{solarCaseStudy.architecture.join(" → ")}</p>
              <p>{solarCaseStudy.architectureNote}</p>
            </details>
          </div>
        </article>

        <div className="pro-project-impact">
          {processImpact.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="pro-before-after">
          <article>
            <p className="pro-small-label">Before automation</p>
            <ul>
              {solarCaseStudy.before.observations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{solarCaseStudy.before.flow.join(" → ")}</p>
          </article>
          <article>
            <p className="pro-small-label">After automation</p>
            <ul>
              {solarCaseStudy.after.observations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{solarCaseStudy.after.flow.join(" → ")}</p>
          </article>
        </div>

        <div className="pro-project-list">
          {secondaryProjects.map((project) => (
            <article key={project.number}>
              <div>
                <span>{project.number}</span>
                <p>{project.label}</p>
              </div>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.role}</small>
              </div>
              <div className="pro-project-flow">{project.flow.join(" → ")}</div>
              {project.number === "03" && (
                <a href="#automation-lab">
                  Try demo <PlayCircle className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>

        <details className="pro-sop">
          <summary>
            Client Inquiry Automation SOP <ChevronDown className="h-4 w-4" />
          </summary>
          <div>
            {solarCaseStudy.sop.map(([title, text]) => (
              <article key={title}>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </details>

        <div className="engineering-evidence">
          <p className="pro-kicker">Industrial Engineering / Applied work</p>
          <h3>Improvement begins on the operations floor.</h3>
          <div className="evidence-grid">
            <article>
              <h3>Workflow &amp; productivity analysis</h3>
              <p className="pro-small-label">
                JCV Enterprises · Field analysis · 2023–2024
              </p>
              <dl>
                <dt>Problem</dt>
                <dd>
                  Operational bottlenecks, scheduling, and workload
                  distribution.
                </dd>
                <dt>Process &amp; my role</dt>
                <dd>
                  Conducted time and motion studies, mapped workflows, and
                  analyzed operational data as an Industrial Engineering intern.
                </dd>
                <dt>Methods &amp; work produced</dt>
                <dd>
                  Work measurement, operations research, workload balancing,
                  scheduling recommendations, dashboards, and ISO-aligned
                  documentation.
                </dd>
                <dt>Learning</dt>
                <dd>
                  Connected measured work and resource constraints to structured
                  improvement recommendations.
                </dd>
              </dl>
            </article>
            <article>
              <h3>Lean analysis &amp; process documentation</h3>
              <p className="pro-small-label">
                ELPS Industries · Field analysis · 2024–2025
              </p>
              <dl>
                <dt>Problem</dt>
                <dd>
                  Workflow inefficiencies and the need for clear productivity
                  information.
                </dd>
                <dt>Process &amp; my role</dt>
                <dd>
                  Analyzed workflows, monitored KPIs, and supported continuous
                  improvement as an Industrial Engineering intern.
                </dd>
                <dt>Methods &amp; work produced</dt>
                <dd>
                  Lean principles, root cause analysis, process maps, SOP
                  documentation, and stakeholder recommendations.
                </dd>
                <dt>Learning</dt>
                <dd>
                  Combined operational evidence and documented processes to
                  identify improvement opportunities.
                </dd>
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AllProjects() {
  return null;
}

function ProjectList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="pro-small-label">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
