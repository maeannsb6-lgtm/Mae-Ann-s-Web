import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Mail } from 'lucide-react';
import { contactInfo } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="pro-hero">
      <div className="pro-hero-shell">
        <motion.div
          className="pro-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="pro-kicker">Industrial Engineering · Process Automation · Business Systems</p>
          <h1>Mae Ann<br />S. Bodiongan</h1>
          <p className="pro-hero-role">Industrial Engineer | AI &amp; Process Automation</p>
          <p className="pro-hero-value">
            I improve how work moves—combining Industrial Engineering, automation, and practical digital systems to make operations clearer, faster, and easier to manage.
          </p>

          <div className="pro-hero-actions">
            <a href="#projects" className="pro-btn pro-btn--primary">View selected work <ArrowDownRight className="h-4 w-4" /></a>
            <a href="#contact" className="pro-btn">Contact me</a>
            <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" className="pro-text-link" data-track="resume-download">
              Resume <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="pro-hero-meta">
            <span>{contactInfo.location}</span>
            <span>{contactInfo.availability}</span>
          </div>

          <div className="pro-socials" aria-label="Professional links">
            <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinMark className="h-4 w-4" /> LinkedIn</a>
            <a href={contactInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubMark className="h-4 w-4" /> GitHub</a>
            <a href={`mailto:${contactInfo.email}`} aria-label="Email"><Mail className="h-4 w-4" /> Email</a>
          </div>
        </motion.div>

        <motion.div
          className="pro-portrait-wrap"
          initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(8% 0 12% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
          transition={{ duration: .9, delay: reduceMotion ? 0 : .12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pro-portrait-frame">
            <img
              src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg"
              alt="Mae Ann S. Bodiongan, Industrial Engineer focused on process improvement and automation"
              width="720"
              height="900"
              fetchPriority="high"
              className="pro-portrait"
            />
            <div className="pro-portrait-caption">
              <span>Process thinking</span>
              <span>Automation</span>
              <span>Systems</span>
            </div>
          </div>
          <div className="pro-portrait-depth" aria-hidden="true" />
          <a href="#about" className="pro-scroll-cue">Explore <ArrowUpRight className="h-4 w-4" /></a>
        </motion.div>
      </div>
    </section>
  );
}
