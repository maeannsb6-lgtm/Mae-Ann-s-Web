import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { whatIDo } from "../../data/content";

export function Services() {
  const [active, setActive] = useState(0);
  const selected = whatIDo[active];

  return (
    <section id="services" className="pro-section pro-services">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div>
            <p className="pro-kicker">Services</p>
            <h2>Clear capability. Practical application.</h2>
          </div>
          <p>
            What I can support across process improvement, automation, business
            systems, and client workflows.
          </p>
        </div>

        <div className="pro-services-layout">
          <div
            className="pro-service-list"
            role="tablist"
            aria-label="Service areas"
          >
            {whatIDo.map((item, index) => (
              <button
                key={item.title}
                id={`service-tab-${index}`}
                aria-controls="service-panel"
                tabIndex={active === index ? 0 : -1}
                type="button"
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  const next = ["ArrowRight", "ArrowDown"].includes(event.key)
                    ? (index + 1) % whatIDo.length
                    : ["ArrowLeft", "ArrowUp"].includes(event.key)
                      ? (index + whatIDo.length - 1) % whatIDo.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? whatIDo.length - 1
                          : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`service-tab-${next}`)?.focus();
                }}
                aria-selected={active === index}
                role="tab"
                className={active === index ? "is-active" : ""}
              >
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ))}
          </div>

          <article
            className="pro-service-preview"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            tabIndex={0}
          >
            <p className="pro-small-label">Selected capability</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <ul>
              {selected.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
