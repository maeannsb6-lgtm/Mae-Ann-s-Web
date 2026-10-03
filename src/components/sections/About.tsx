import { CheckCircle2 } from 'lucide-react';
import { contactInfo } from '../../data/content';

const collaboration = ['Asynchronous communication', 'Clear technical documentation', 'GitHub collaboration', 'Cross-functional coordination'];

export function About() {
  return (
    <section id="about" className="pro-section pro-about">
      <div className="pro-section-shell pro-about-grid">
        <div className="pro-about-title">
          <p className="pro-kicker">About</p>
          <h2>Process thinking first. Technology where it helps.</h2>
        </div>

        <div className="pro-about-copy">
          <p>I understand processes as an Industrial Engineer, identify inefficiencies, redesign workflows, and use AI, automation, databases, and digital systems where appropriate.</p>
          <p>My experience spans energy project coordination, technical compliance, process analysis, feasibility studies, operations research, SOP development, n8n automation, Google Workspace workflows, and database-backed web applications.</p>
          <blockquote>I’m particularly interested in designing automated client journeys—from inquiry and onboarding to proposal generation, follow-up, and operational tracking.</blockquote>

          <div className="pro-about-collab">
            <p className="pro-small-label">Remote collaboration</p>
            <ul>
              {collaboration.map((item) => <li key={item}><CheckCircle2 className="h-4 w-4" />{item}</li>)}
            </ul>
          </div>
          <p className="pro-accent-note">{contactInfo.availability}</p>
        </div>
      </div>
    </section>
  );
}
