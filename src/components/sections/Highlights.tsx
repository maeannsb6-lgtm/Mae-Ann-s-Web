import { recruiterSummary } from '../../data/content';

export function Highlights() {
  return (
    <section className="pro-highlights" aria-labelledby="quick-summary-title">
      <div className="pro-highlights-shell">
        <div className="pro-highlights-heading">
          <p className="pro-kicker">At a glance</p>
          <h2 id="quick-summary-title">What I bring to the table.</h2>
        </div>
        <div className="pro-highlights-strip">
          {recruiterSummary.map(({ label, value }, index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <h3>{label}</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
