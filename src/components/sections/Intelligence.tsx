import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { experience, projectLinks, technologyTools } from '../../data/content';

/**
 * Each engineering foundation and the AI / automation application it extends.
 * The detail text is quoted from the SUWECO role in the experience data.
 */
const suweco = experience[0].highlights;
const LINKS = [
  { base: 'Workflow analysis', app: 'n8n automation', detail: suweco[2] },
  { base: 'Engineering logic', app: 'AI-assisted proposals', detail: suweco[1] },
  { base: 'Project coordination', app: 'Connected reporting', detail: suweco[0] },
];

export function Intelligence() {
  const [active, setActive] = useState(1);
  const selected = LINKS[active];

  return (
    <section id="intelligence" className="rd-intel" data-story-stage="3">
      <div className="rd-shell">
        <div className="rd-intel-head" data-reveal>
          <p className="rd-kicker rd-kicker--dark">04 / Intelligence</p>
          <h2>
            Engineering first.
            <br />
            <span>Enhanced by AI.</span>
          </h2>
          <p>
            My work at SUWECO extends process design into AI-assisted proposals, n8n workflows, and database-backed
            applications. The objective stays the same: a useful, reliable system.
          </p>
        </div>

        <div className="rd-intel-studio" data-reveal>
          <div className="rd-intel-map" role="tablist" aria-label="Engineering foundations and their AI applications">
            <p className="rd-intel-layer rd-intel-layer--top">AI &amp; automation layer</p>
            <svg className="rd-intel-wires" viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true">
              {LINKS.map((_, i) => {
                const x = 100 + i * 200;
                return (
                  <g key={i} className={i === active ? 'is-active' : ''}>
                    <path d={`M${x} 200 C ${x} 140, ${x} 80, ${x} 20`} />
                    <circle cx={x} cy="110" r="4" />
                  </g>
                );
              })}
            </svg>
            {LINKS.map((link, i) => (
              <button
                key={link.base}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="intel-detail"
                className={`rd-intel-pair${i === active ? ' is-active' : ''}`}
                style={{ gridColumn: i + 1 }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="rd-intel-node rd-intel-node--app">{link.app} ↗</span>
                <span className="rd-intel-node rd-intel-node--base">{link.base}</span>
              </button>
            ))}
            <p className="rd-intel-layer rd-intel-layer--bottom">Engineering foundation</p>
          </div>

          <aside className="rd-intel-detail" id="intel-detail" role="tabpanel" aria-live="polite">
            <p className="rd-intel-detail-label">Selected application</p>
            <h3>
              {selected.base} <span>→</span> {selected.app}
            </h3>
            <p>{selected.detail}</p>
            <p className="rd-intel-detail-source">From my role at {experience[0].company}</p>
          </aside>
        </div>

        <div className="rd-intel-foot" data-reveal>
          <div className="rd-intel-tools">
            <p>Tools used in my work</p>
            <ul>
              {technologyTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <a href={projectLinks.solarLive} target="_blank" rel="noopener noreferrer" className="rd-intel-cta">
            See the solar proposal system <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
