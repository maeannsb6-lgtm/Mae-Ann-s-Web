import { technologyTools, projectLinks } from "../../data/content";
import { ArrowUpRight } from "lucide-react";
export function Intelligence() {
  return (
    <section
      id="intelligence"
      className="pro-section opening-chapter"
      data-story-stage="3"
    >
      <p className="pro-kicker">04 / Intelligence</p>
      <h2>
        Engineering first.
        <br />
        Enhanced by AI.
      </h2>
      <p>
        My work at SUWECO extends process design into AI-assisted proposals, n8n
        workflows, and database-backed applications. The objective stays the
        same: a useful, reliable system.
      </p>
      <div className="intelligence-lines">
        <div>
          <span>Workflow analysis</span>
          <span>n8n automation ↗</span>
        </div>
        <div>
          <span>Engineering logic</span>
          <span>AI-assisted proposals ↗</span>
        </div>
        <div>
          <span>Project coordination</span>
          <span>Connected reporting ↗</span>
        </div>
      </div>
      <p className="pro-small-label">Tools used in my work</p>
      <p className="intelligence-tools">{technologyTools.join(" / ")}</p>
      <a
        href={projectLinks.solarLive}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        See the solar proposal system <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
