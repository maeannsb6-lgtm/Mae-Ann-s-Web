import type { MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { capabilityGroups, currentlyExploring, demonstratedIntegrationSkills, industrialEngineeringCapabilities, technologyTools } from '../../data/content';

function TagList({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className={`rounded-full border px-3 py-1.5 text-sm ${muted ? 'border-white/8 text-brand-text-muted' : 'border-brand-accent/20 bg-brand-accent/[0.06] text-brand-text-secondary'}`}>{item}</span>)}</div>;
}

function CapabilityCard({ title, items, Icon, index }: { title: string; items: string[]; Icon: typeof Compass; index: number }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    rotateX.set(((y / bounds.height) - 0.5) * -8);
    rotateY.set(((x / bounds.width) - 0.5) * 8);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="h-full [perspective:1200px]">
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.09] bg-brand-card/95 p-6 shadow-[0_26px_70px_rgba(0,0,0,.32)] transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/35 hover:shadow-[0_32px_90px_rgba(45,212,191,.14)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-brand-accent/10 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] border border-white/[0.035]" aria-hidden="true" />

        <div className="relative mb-6 flex items-start justify-between gap-4 [transform:translateZ(34px)]">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent-bright">
              <Sparkles className="h-3 w-3" />
              Core capability
            </span>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-brand-bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_12px_30px_rgba(0,0,0,.28)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
            <Icon className="h-5 w-5 text-brand-accent" />
          </div>
        </div>

        <ul className="relative space-y-3 [transform:translateZ(22px)]">
          {items.map((item, itemIndex) => (
            <motion.li
              key={item}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .35, delay: index * .07 + itemIndex * .045 }}
              whileHover={reduceMotion ? undefined : { x: 4, scale: 1.01 }}
              className="group/item relative overflow-hidden rounded-2xl border border-white/[0.06] bg-brand-bg-primary/65 p-4 text-sm text-brand-text-secondary transition-colors duration-300 hover:border-brand-accent/25 hover:bg-brand-card-hover"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span>{item}</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.04]" aria-hidden="true">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-accent-bright to-transparent shadow-[0_0_10px_rgba(94,234,212,.55)]"
                  animate={reduceMotion ? undefined : { x: ['-120%', '360%'] }}
                  transition={reduceMotion ? undefined : { duration: 2.6 + itemIndex * .12, repeat: Infinity, ease: 'easeInOut', delay: itemIndex * .12 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export function Skills() {
  return (
    <section id="capabilities" className="section-shell relative overflow-hidden bg-brand-bg-primary">
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-accent/[0.055] blur-[110px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Capabilities" title="Industrial Engineering is the foundation. Automation extends it." description="Capabilities describe the problems I can work on; tools are listed separately to keep the profile clear and credible." className="mb-12" />

        <div className="grid gap-7 lg:grid-cols-3">
          {capabilityGroups.map(({ title, items, icon: Icon }, index) => (
            <CapabilityCard key={title} title={title} items={items} Icon={Icon} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <motion.article whileHover={{ y: -3 }} className="depth-card rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <p className="eyebrow">Industrial Engineering capabilities</p><h3 className="mb-6 text-2xl font-semibold text-white">Process and operations toolkit</h3><TagList items={industrialEngineeringCapabilities} />
          </motion.article>
          <motion.article whileHover={{ y: -3 }} className="depth-card rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <p className="eyebrow">Technology &amp; tools</p><h3 className="mb-6 text-2xl font-semibold text-white">Project toolkit</h3><TagList items={technologyTools} />
          </motion.article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.article whileHover={{ y: -3 }} className="depth-card rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8"><p className="eyebrow">Demonstrated in projects</p><h3 className="mb-5 text-xl font-semibold text-white">API &amp; integration concepts</h3><TagList items={demonstratedIntegrationSkills} /></motion.article>
          <motion.article whileHover={{ y: -3 }} className="rounded-2xl border border-dashed border-white/12 bg-transparent p-6 sm:p-8"><p className="eyebrow"><Compass className="mr-2 inline h-4 w-4" />Currently exploring</p><h3 className="mb-5 text-xl font-semibold text-white">Next capability layer</h3><TagList items={currentlyExploring} muted /></motion.article>
        </div>
      </div>
    </section>
  );
}
