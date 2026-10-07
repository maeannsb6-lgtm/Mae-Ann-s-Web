import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { contactInfo } from "../../data/content";
export function Hero() {
  return (
    <section id="home" className="pro-hero" data-story-stage="0">
      <p className="pro-kicker">Mae Ann S. Bodiongan / Portfolio</p>
      <h1>
        Industrial
        <br />
        Engineer<span className="hero-period">.</span>
      </h1>
      <p className="hero-secondary">
        Building smarter systems
        <br />
        through automation &amp; AI.
      </p>
      <p className="pro-hero-value">
        Engineering is my foundation. I bring process thinking, practical
        automation, and digital tools together to make work clearer, more
        connected, and easier to manage.
      </p>
      <div className="pro-hero-actions">
        <a href="#projects" className="pro-btn pro-btn--primary">
          Explore my work <ArrowDownRight size={17} />
        </a>
        <a
          href={contactInfo.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pro-resume-link"
          data-track="resume-download"
        >
          View résumé <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="hero-availability">
        <span className="availability-dot" /> Open to remote roles &amp;
        selected projects
      </div>
      <a href="#about" className="hero-scroll">
        SCROLL TO EXPLORE <span>↓</span>
      </a>
    </section>
  );
}
