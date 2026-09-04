import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { contactInfo } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

const primaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brand-accent bg-brand-accent px-6 text-sm font-semibold text-brand-bg-primary transition hover:border-brand-accent-bright hover:bg-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';
const secondaryLink = 'depth-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-brand-accent/50 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary';

const processSteps = [
  { number: '01', label: 'Analyze process', detail: 'Map the current workflow' },
  { number: '02', label: 'Redesign flow', detail: 'Remove friction and waste' },
  { number: '03', label: 'Automate wisely', detail: 'Apply AI where it adds value' },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section id="home" className="hero-scene relative min-h-[92vh] overflow-hidden pt-32 pb-20 lg:flex lg:items-center">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-10rem] top-24 h-80 w-80 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
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
        >
          <div className="relative min-h-[520px] sm:min-h-[590px]" style={{ perspective: '1400px' }}>
            <motion.div
              animate={reduceMotion ? undefined : { rotateY: [-5, 4, -5], rotateX: [2, -2, 2], y: [0, -8, 0] }}
              transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-8 top-8 sm:inset-x-12"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-5 rounded-[2.2rem] border border-brand-accent/15 bg-brand-accent/[0.025]" style={{ transform: 'translateZ(-55px) rotateZ(-2deg)' }} aria-hidden="true" />
              <div className="absolute -inset-2 rounded-[2rem] border border-white/8 bg-white/[0.02]" style={{ transform: 'translateZ(-28px) rotateZ(1.5deg)' }} aria-hidden="true" />

              <div className="depth-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-card/95 p-3 shadow-2xl" style={{ transform: 'translateZ(40px)' }}>
                <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-brand-bg-primary/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-accent backdrop-blur">
                  Process → System
                </div>
                <img
                  src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg"
                  alt="Mae Ann S. Bodiongan, Industrial Engineer focused on process improvement and automation"
                  width="720"
                  height="900"
                  fetchPriority="high"
                  className="aspect-[4/4.55] w-full rounded-[1.45rem] object-cover object-top grayscale-[16%]"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-b-[1.45rem] bg-gradient-to-t from-brand-bg-primary via-brand-bg-primary/82 to-transparent px-5 pb-5 pt-16">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">Industrial Engineering × AI</p>
                  <p className="mb-0 text-lg font-semibold text-white">Turning manual workflows into clearer, smarter systems.</p>
                </div>
              </div>
            </motion.div>

            {processSteps.map((step, index) => {
              const positions = [
                'left-0 top-[34%] sm:-left-3',
                'right-0 top-[16%] sm:-right-3',
                'right-2 bottom-[4%] sm:-right-2',
              ];
              const depths = ['translateZ(115px) rotateY(7deg)', 'translateZ(135px) rotateY(-7deg)', 'translateZ(95px) rotateY(-5deg)'];

              return (
                <motion.div
                  key={step.number}
                  animate={reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                  transition={reduceMotion ? undefined : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * .35 }}
                  className={`absolute z-20 w-[180px] rounded-2xl border border-white/10 bg-brand-bg-primary/90 p-4 shadow-2xl backdrop-blur ${positions[index]}`}
                  style={{ transform: depths[index] }}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold tracking-[0.14em] text-brand-accent">{step.number}</span>
                    <span className="h-px flex-1 bg-brand-accent/25" aria-hidden="true" />
                  </div>
                  <p className="mb-1 text-sm font-semibold text-white">{step.label}</p>
                  <p className="mb-0 text-xs leading-5 text-brand-text-muted">{step.detail}</p>
                </motion.div>
              );
            })}

            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-accent/15"
              aria-hidden="true"
            />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
