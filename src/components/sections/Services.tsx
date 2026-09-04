import type { MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Check, Move3D } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { whatIDo } from '../../data/content';

type Offering = (typeof whatIDo)[number];

function ProcessEngine3D() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[2rem] border border-brand-accent/20 bg-brand-bg-primary/70 p-4 shadow-[0_30px_90px_rgba(0,0,0,.42)] sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-accent">
          <Move3D className="h-4 w-4" />
          Live 3D process engine
        </div>
        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-brand-text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent shadow-[0_0_10px_rgba(45,212,191,.9)]" />
          Auto rotating
        </span>
      </div>

      <div
        className="relative mx-auto h-[19rem] w-full max-w-[21rem] [perspective:900px]"
        role="img"
        aria-label="A rotating three-dimensional walkthrough of four connected capabilities: process improvement, AI and workflow automation, business systems, and client workflow automation."
      >
        <div className="pointer-events-none absolute inset-x-7 top-1/2 h-32 -translate-y-1/2 rounded-[50%] border border-brand-accent/20 [transform:rotateX(72deg)] shadow-[0_0_45px_rgba(45,212,191,.12)]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-2xl" aria-hidden="true" />

        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={reduceMotion ? { rotateX: -5, rotateY: -18 } : { rotateX: [-6, 3, -6], rotateY: [-18, 342] }}
          transition={reduceMotion ? undefined : { rotateX: { duration: 12, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 24, repeat: Infinity, ease: 'linear' } }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {whatIDo.map(({ title, icon: Icon }, index) => (
            <div
              key={title}
              className="absolute left-1/2 top-1/2 flex h-28 w-[13.5rem] flex-col justify-between rounded-2xl border border-brand-accent/30 bg-[#0d2234]/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_20px_50px_rgba(0,0,0,.55),0_0_28px_rgba(45,212,191,.08)]"
              style={{
                backfaceVisibility: 'hidden',
                transform: `translate(-50%, -50%) rotateY(${index * 90}deg) translateZ(126px)`,
              }}
              aria-hidden="true"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-accent">0{index + 1}</span>
                <span className="rounded-xl border border-brand-accent/20 bg-brand-accent/10 p-2">
                  <Icon className="h-4 w-4 text-brand-accent" />
                </span>
              </div>
              <p className="max-w-[10rem] text-sm font-semibold leading-5 text-white">{title}</p>
            </div>
          ))}

          <div
            className="absolute left-1/2 top-1/2 flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-brand-accent/40 bg-brand-accent/15 text-center text-[9px] font-bold uppercase tracking-[0.15em] text-brand-accent shadow-[inset_0_0_25px_rgba(45,212,191,.14),0_0_35px_rgba(45,212,191,.22)]"
            style={{ transform: 'translate(-50%, -50%) translateZ(0)', backfaceVisibility: 'hidden' }}
            aria-hidden="true"
          >
            Process<br />Core
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 h-5 w-48 -translate-x-1/2 rounded-[50%] bg-black/50 blur-md" aria-hidden="true" />
      </div>

      <ol className="grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
        {whatIDo.map(({ title }, index) => (
          <li key={title} className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[10px] leading-4 text-brand-text-muted">
            <span className="font-bold text-brand-accent">0{index + 1}</span>
            {title}
          </li>
        ))}
      </ol>
    </div>
  );
}

function WalkthroughCard({ offering, index }: { offering: Offering; index: number }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 170, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 170, damping: 22 });
  const { title, description, items, icon: Icon } = offering;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    rotateX.set(((y / bounds.height) - 0.5) * -7);
    rotateY.set(((x / bounds.width) - 0.5) * 9);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative min-h-[26rem] [perspective:1400px] sm:min-h-[28rem]">
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 60, rotateX: 7, scale: .96 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: .28 }}
        transition={{ duration: .7, delay: index * .08, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.1] bg-brand-card/95 p-6 shadow-[0_35px_90px_rgba(0,0,0,.34)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-4 rounded-[1.55rem] border border-white/[0.035]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-brand-accent/[0.10] blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
        <div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/80 to-transparent" aria-hidden="true" />

        <div className="relative flex h-full flex-col [transform:translateZ(34px)]">
          <div className="mb-8 flex items-start justify-between gap-5">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.2em] text-brand-accent">0{index + 1}</span>
                <span className="h-px w-10 bg-brand-accent/35" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-text-muted">Walkthrough</span>
              </div>
              <h3 className="max-w-md text-2xl font-semibold leading-tight text-white sm:text-3xl">{title}</h3>
            </div>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4, rotate: 5 }}
              className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-4 shadow-[0_14px_35px_rgba(45,212,191,.10)]"
            >
              <Icon className="h-7 w-7 text-brand-accent" />
            </motion.div>
          </div>

          <p className="mb-7 max-w-2xl text-base leading-8 text-brand-text-muted">{description}</p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item, itemIndex) => (
              <motion.li
                key={item}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .35, delay: index * .07 + itemIndex * .045 }}
                className="rounded-xl border border-white/[0.06] bg-brand-bg-primary/55 px-4 py-3 text-sm text-brand-text-secondary"
                style={{ transform: `translateZ(${18 + (itemIndex % 2) * 6}px)` }}
              >
                <span className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <div className="h-px w-full bg-gradient-to-r from-brand-accent/40 via-white/[0.06] to-transparent" aria-hidden="true" />
            <div className="mt-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.13em] text-brand-text-muted">
              <span>{index === 0 ? 'Start with the process' : index === 3 ? 'End with the client journey' : 'Build the next layer'}</span>
              <span className="text-brand-accent">{index + 1} / {whatIDo.length}</span>
            </div>
          </div>
        </div>
      </motion.article>

      <div className="pointer-events-none absolute inset-x-7 -bottom-3 h-16 rounded-[2rem] border border-brand-accent/[0.08] bg-brand-accent/[0.025] blur-[.2px] [transform:translateZ(-45px)_rotateX(70deg)]" aria-hidden="true" />
    </div>
  );
}

export function Services() {
  return (
    <section className="section-shell relative overflow-hidden bg-brand-bg-secondary" aria-labelledby="what-i-do-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(45,212,191,.06),transparent_35rem)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="what-i-do-title" label="What I Do" title="Walk through how I improve and automate work." description="Four connected capability areas, grounded in Industrial Engineering and demonstrated through professional or project work." className="mb-8" />

            <ProcessEngine3D />
          </div>

          <div className="space-y-10 lg:space-y-16">
            {whatIDo.map((offering, index) => (
              <WalkthroughCard key={offering.title} offering={offering} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
