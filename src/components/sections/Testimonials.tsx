import { trainings } from '../../data/content';

export function EducationTraining() {
  return (
    <section id="certifications" className="pro-section pro-education">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Education & Training</p><h2>Foundation, then focused capability-building.</h2></div>
          <p>Formal Industrial Engineering education supported by focused certifications and technology training.</p>
        </div>

        <div className="pro-education-layout">
          <article className="pro-degree">
            <span>2021–2025</span>
            <h3>BS Industrial Engineering</h3>
            <p>Technological Institute of the Philippines — Quezon City</p>
          </article>

          <div className="pro-training-list">
            {trainings.map((training, index) => (
              <article key={training.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{training.title}</h3>
                  <p>{training.provider}</p>
                  <time>{training.date}</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
