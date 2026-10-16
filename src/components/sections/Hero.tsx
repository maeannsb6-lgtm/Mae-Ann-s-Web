import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubMark, LinkedinMark } from "../ui/BrandIcons";
import { contactInfo } from "../../data/content";

const specialties = ["Process Improvement", "AI & Automation", "Business Systems", "Workflow Design"];

export function Hero() {
  return (
    <section id="home" className="portrait-hero" data-story-stage="0" aria-labelledby="hero-title">
      <div className="portrait-hero-heading">
        <p className="portrait-eyebrow"><Sparkles size={15} /> Industrial Engineer · Philippines</p>
        <h1 id="hero-title">I’m <span>Mae Ann Bodiongan<span className="portrait-name-star" aria-hidden="true">✳</span></span></h1>
        <p className="portrait-subtitle">Building smarter systems through automation &amp; AI.</p>
      </div>
      <div className="portrait-stage">
        <div className="portrait-watermark" aria-hidden="true">MAE</div>
        <img className="hero-portrait" src="/mae-ann-portrait-original.jpg" width={2112} height={3047} alt="Mae Ann S. Bodiongan" fetchPriority="high" />
        <aside className="portrait-left">
          <div className="portrait-socials">
            <p>Follow me on</p>
            <div>
              <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Mae Ann on LinkedIn"><LinkedinMark width={17} height={17} /></a>
              <a href={contactInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="Mae Ann on GitHub"><GithubMark width={18} height={18} /></a>
            </div>
          </div>
          <div className="portrait-foundation">
            <span className="portrait-mini-label">MY FOUNDATION</span>
            <h2>Industrial<br /><span>Engineering.</span></h2>
            <p>Process thinking. Practical automation. Connected systems.</p>
            <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" data-track="resume-download">View résumé <ArrowUpRight size={15} /></a>
          </div>
        </aside>
        <aside className="portrait-right">
          <div className="portrait-statement">
            <span aria-hidden="true">“</span>
            <p>Engineering is my foundation. I bring process thinking, practical automation, and digital tools together to make work clearer, more connected, and easier to manage.</p>
          </div>
          <div className="portrait-tags" aria-label="Areas of focus">
            {specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
          </div>
        </aside>
        <a href="#contact" className="portrait-hire-seal" aria-label="Let’s work together — contact Mae Ann"><span>LET’S WORK</span><ArrowUpRight size={25} /><span>TOGETHER</span></a>
        <div className="portrait-actions">
          <a href="#projects">Portfolio <ArrowUpRight size={20} /></a>
          <a href="#contact">Let’s talk</a>
        </div>
      </div>
      <div className="portrait-availability"><span className="availability-dot" /> Open to remote roles &amp; selected projects <a href="#about" aria-label="Explore more about Mae Ann"><ArrowDown size={16} /></a></div>
      <div className="portrait-skills-strip" aria-label="Core capabilities">
        {["Industrial Engineering", "Process Improvement", "AI & Automation", "Business Systems"].map((skill) => <span key={skill}>{skill}<Sparkles size={20} aria-hidden="true" /></span>)}
      </div>
    </section>
  );
}
