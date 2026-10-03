import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { contactInfo } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

const primaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brand-accent bg-brand-accent px-6 text-sm font-semibold text-brand-bg-primary transition hover:border-brand-accent-bright hover:bg-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';
const secondaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-brand-accent/50 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';

export function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section id="home" className="hero-scene relative min-h-[92vh] overflow-hidden pt-32 pb-20 lg:flex lg:items-center">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-ambient hero-ambient--one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient--two" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={reveal} transition={{ duration: .65 }}>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">Industrial Engineering × Automation</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">
            Mae Ann S. Bodiongan
          </h1>
          <p className="mt-6 text-xl font-medium text-brand-text-secondary sm:text-2xl">Industrial Engineer | AI &amp; Process Automation</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-text-muted sm:text-lg">
            I combine Industrial Engineering methodologies with AI, workflow automation, and digital systems to improve operations, streamline processes, and create better client experiences.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className={primaryLink}>View My Work <ArrowDownRight className="h-4 w-4" /></a>
            <a href="#contact" className={secondaryLink}>Work With Me</a>
            <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink} data-track="resume-download">
              Download Resume <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2" aria-label="Professional links">
            {[
              { href: contactInfo.socials.linkedin, label: 'LinkedIn', icon: LinkedinMark },
              { href: contactInfo.socials.github, label: 'GitHub', icon: GithubMark },
              { href: `mailto:${contactInfo.email}`, label: 'Email', icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label} title={label} data-track={`${label.toLowerCase()}-click`} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-brand-text-secondary transition hover:border-brand-accent/50 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7, delay: reduceMotion ? 0 : .1 }}
          className="relative mx-auto w-full max-w-xl"
          aria-label="Interactive 3D portfolio portrait"
        >
          <div
            className="hero-3d-viewport"
            onPointerMove={reduceMotion ? undefined : (event) => {
              const target = event.currentTarget;
              const rect = target.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              target.style.setProperty('--hero-ry', `${x * 12}deg`);
              target.style.setProperty('--hero-rx', `${y * -10}deg`);
            }}
            onPointerLeave={reduceMotion ? undefined : (event) => {
              event.currentTarget.style.setProperty('--hero-ry', '0deg');
              event.currentTarget.style.setProperty('--hero-rx', '0deg');
            }}
          >
            <div className="hero-3d-stage">
              <div className="hero-orbit hero-orbit--outer" aria-hidden="true" />
              <div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
              <div className="hero-3d-chip hero-3d-chip--top" aria-hidden="true">
                <span>AI</span>
                <strong>Automation</strong>
              </div>
              <div className="hero-3d-chip hero-3d-chip--side" aria-hidden="true">
                <span>IE</span>
                <strong>Systems</strong>
              </div>

              <div className="hero-profile-card depth-panel">
                <div className="hero-profile-frame">
                  <img
                    src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg"
                    alt="Mae Ann S. Bodiongan, Industrial Engineer focused on process improvement and automation"
                    width="720"
                    height="900"
                    fetchPriority="high"
                    className="hero-profile-image"
                  />
                  <div className="hero-profile-scan" aria-hidden="true" />
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {['Analyze process', 'Redesign flow', 'Automate wisely'].map((item, index) => (
                    <div key={item} className="hero-process-step"><span>0{index + 1}</span>{item}</div>
                  ))}
                </div>
              </div>

              <div className="hero-depth-slab hero-depth-slab--one" aria-hidden="true" />
              <div className="hero-depth-slab hero-depth-slab--two" aria-hidden="true" />
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
