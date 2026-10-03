import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react';
import { contactInfo } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

const primaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-accent bg-brand-accent px-6 text-sm font-semibold text-brand-bg-primary transition hover:border-brand-accent-bright hover:bg-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';
const secondaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.025] px-6 text-sm font-semibold text-white transition hover:border-brand-accent/45 hover:bg-brand-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero-scene relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
      data-story-chapter="01"
      data-story-title="Introduction"
    >
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : .72, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-9 flex items-center gap-4">
            <span className="chapter-pill">Chapter 01</span>
            <span className="h-px w-14 bg-brand-accent/45" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[.18em] text-brand-text-muted">Introduction</span>
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">Industrial Engineering × Automation</p>
          <h1 className="hero-title text-white">Mae Ann<br className="hidden sm:block" /> S. Bodiongan</h1>
          <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-brand-text-secondary sm:text-2xl">
            Industrial Engineer building better processes, connected workflows, and AI-enabled systems.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-text-muted sm:text-lg">
            I combine Industrial Engineering methodologies with automation and digital systems to improve operations, reduce repetitive work, and create clearer client and team workflows.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className={primaryLink}>Explore my work <ArrowUpRight className="h-4 w-4" /></a>
            <a href="#contact" className={secondaryLink}>Work with me</a>
            <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink} data-track="resume-download">
              Resume <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-label="Professional links">
            {[
              { href: contactInfo.socials.linkedin, label: 'LinkedIn', icon: LinkedinMark },
              { href: contactInfo.socials.github, label: 'GitHub', icon: GithubMark },
              { href: `mailto:${contactInfo.email}`, label: 'Email', icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                title={label}
                data-track={`${label.toLowerCase()}-click`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-brand-text-secondary transition hover:border-brand-accent/50 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : .82, delay: reduceMotion ? 0 : .08, ease: [0.16, 1, 0.3, 1] }}
          className="hero-portrait-shell"
        >
          <div className="hero-portrait-index" aria-hidden="true">01</div>
          <div className="hero-portrait-frame">
            <img
              src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg"
              alt="Mae Ann S. Bodiongan, Industrial Engineer focused on process improvement and automation"
              width="720"
              height="900"
              fetchPriority="high"
              className="hero-portrait-image"
            />
          </div>
          <div className="hero-portrait-caption">
            <span>Analyze</span><span>Redesign</span><span>Automate wisely</span>
          </div>
          <div className="hero-portrait-axis" aria-hidden="true"><span>systems</span><span>people</span><span>flow</span></div>
        </motion.aside>
      </div>

      <a href="#about" className="hero-scroll-cue" aria-label="Continue to the next chapter">
        <span>Explore the journey</span><ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
