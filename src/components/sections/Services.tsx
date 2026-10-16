import { useState } from 'react';
import { Plus } from 'lucide-react';
import { whatIDo } from '../../data/content';

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="rd-services">
      <div className="rd-shell">
        <header className="rd-services-head" data-reveal>
          <p className="rd-kicker">07 / Services</p>
          <h2>
            Clear capability.
            <br />
            <span>Practical application.</span>
          </h2>
          <p>What I can support across process improvement, automation, business systems, and client workflows.</p>
        </header>

        <ul className="rd-acc">
          {whatIDo.map((service, index) => {
            const isOpen = open === index;
            return (
              <li key={service.title} className={isOpen ? 'is-open' : ''} data-reveal>
                <h3>
                  <button
                    type="button"
                    id={`service-tab-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="rd-acc-num">0{index + 1}</span>
                    <span className="rd-acc-title">{service.title}</span>
                    <span className="rd-acc-toggle" aria-hidden="true"><Plus size={20} /></span>
                  </button>
                </h3>
                <div className="rd-acc-panel" id={`service-panel-${index}`} role="region" aria-labelledby={`service-tab-${index}`}>
                  <div className="rd-acc-inner">
                    <div className="rd-acc-copy">
                      <p>{service.description}</p>
                      <ul>
                        {service.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <ServiceArt index={index} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** One original illustration per service: process map, automation, interface, client journey. */
function ServiceArt({ index }: { index: number }) {
  return (
    <svg className="rd-acc-art" viewBox="0 0 320 200" aria-hidden="true">
      {index === 0 && (
        <g>
          {[40, 120, 200].map((x, i) => <rect key={x} x={x} y="80" width="56" height="40" rx="8" className={i === 1 ? 'a-amber' : 'a-ink'} />)}
          <path d="M96 100h24M176 100h24" className="a-line" />
          <path d="M256 100h20v-50h-236v30" className="a-dash" />
          <rect x="268" y="80" width="40" height="40" rx="8" transform="rotate(45 288 100)" className="a-paper" />
          <text x="148" y="150" textAnchor="middle" className="a-text">MAP · MEASURE · IMPROVE</text>
        </g>
      )}
      {index === 1 && (
        <g>
          <circle cx="160" cy="100" r="30" className="a-amber" />
          <path d="M150 88l16 0-10 14h12l-20 22 6-18h-10z" className="a-ink-fill" />
          {[[50, 40], [270, 40], [50, 160], [270, 160]].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <path d={`M160 100L${x} ${y}`} className="a-line" />
              <rect x={x - 22} y={y - 16} width="44" height="32" rx="8" className="a-ink" />
            </g>
          ))}
        </g>
      )}
      {index === 2 && (
        <g>
          <rect x="30" y="24" width="260" height="152" rx="12" className="a-paper" />
          <rect x="30" y="24" width="260" height="24" rx="12" className="a-ink" />
          <rect x="46" y="64" width="70" height="96" rx="6" className="a-soft" />
          {[64, 92, 120].map((y, i) => <rect key={y} x="130" y={y} width={i === 1 ? 100 : 144} height="16" rx="4" className="a-soft" />)}
          <rect x="130" y="146" width="60" height="18" rx="9" className="a-amber" />
          {[0, 1, 2].map((i) => <rect key={i} x={56 + i * 20} y={140 - i * 22} width="12" height={12 + i * 22} rx="2" className="a-amber" />)}
        </g>
      )}
      {index === 3 && (
        <g>
          <path d="M30 140 C 90 40, 150 160, 200 80 S 280 60, 300 60" className="a-dash" />
          {[['Inquiry', 30, 140], ['Onboard', 120, 108], ['Proposal', 200, 80], ['Track', 290, 60]].map(([label, x, y], i) => (
            <g key={label as string}>
              <circle cx={x as number} cy={y as number} r="13" className={i === 2 ? 'a-amber' : 'a-ink'} />
              <text x={x as number} y={(y as number) + 32} textAnchor="middle" className="a-text">{label}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
