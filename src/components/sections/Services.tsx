import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { whatIDo } from '../../data/content';

export function Services() {
  const [active, setActive] = useState(0);
  const selected = whatIDo[active];

  return (
    <section id="services" className="pro-section pro-services">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Services</p><h2>Clear capability. Practical application.</h2></div>
          <p>What I can support across process improvement, automation, business systems, and client workflows.</p>
        </div>

        <div className="pro-services-layout">
          <div className="pro-service-list" role="tablist" aria-label="Service areas">
            {whatIDo.map((item, index) => (
              <button key={item.title} type="button" onClick={() => setActive(index)} aria-selected={active === index} role="tab" className={active === index ? 'is-active' : ''}>
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ))}
          </div>

          <article className="pro-service-preview" aria-live="polite">
            <p className="pro-small-label">Selected capability</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <ul>{selected.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
