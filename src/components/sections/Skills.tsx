import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { BadgeCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { skills } from '../../data/content';

type SkillCategory = (typeof skills)[number];

function SkillCategoryCard({
  category,
  categoryIndex,
}: {
  category: SkillCategory;
  categoryIndex: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateXValue = ((y / bounds.height) - 0.5) * -8;
    const rotateYValue = ((x / bounds.width) - 0.5) * 8;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: categoryIndex * 0.12 }}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-brand-card/95 p-6 shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow] duration-300 hover:border-brand-pink-primary/45 hover:shadow-[0_32px_90px_rgba(236,72,153,0.18)] sm:p-7"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-brand-pink-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink-soft/80 to-transparent" />
        <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] border border-white/[0.035]" />

        <div className="relative mb-7 flex items-start justify-between gap-4 [transform:translateZ(34px)]">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-pink-primary/20 bg-brand-pink-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-pink-soft">
              <Sparkles className="h-3 w-3" />
              Verified capability
            </span>
            <h3 className="text-xl font-bold text-white">{category.category}</h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-brand-bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
            <BadgeCheck className="h-5 w-5 text-brand-pink-primary" />
          </div>
        </div>

        <div className="relative space-y-3 [transform:translateZ(22px)]">
          {category.items.map((skill, skillIndex) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: categoryIndex * 0.08 + skillIndex * 0.055,
                }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="group/skill relative overflow-hidden rounded-2xl border border-white/[0.06] bg-brand-bg-primary/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-colors duration-300 hover:border-brand-pink-primary/30 hover:bg-brand-card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-brand-card transition-all duration-300 group-hover/skill:border-brand-pink-primary/30 group-hover/skill:bg-brand-pink-primary/10 group-hover/skill:shadow-[0_0_20px_rgba(236,72,153,0.14)]">
                    <Icon className="h-4 w-4 text-brand-text-secondary transition-colors duration-300 group-hover/skill:text-brand-pink-bright" />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-white">
                    {skill.name}
                  </span>
                  <span className="hidden shrink-0 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-300 sm:inline-flex">
                    CV verified
                  </span>
                </div>

                {/* Animated verification indicator. This is intentionally not a proficiency meter. */}
                <div
                  className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.045]"
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-pink-bright to-transparent shadow-[0_0_10px_rgba(255,79,163,0.65)]"
                    animate={{ x: ['-120%', '360%'] }}
                    transition={{
                      duration: 2.6 + skillIndex * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: skillIndex * 0.16,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-pink-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-brand-bg-primary py-24">
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-pink-primary/[0.07] blur-[110px]" />
      <div className="pointer-events-none absolute -left-28 bottom-0 h-64 w-64 rounded-full bg-brand-pink-dark/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="MY SKILLS"
          title="Industrial Engineering and Digital Capabilities"
          description="Verified skills and tools documented in my current CV. The animated glow lines are visual indicators only—not proficiency percentages."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl border border-white/[0.06] bg-brand-card/60 px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
        >
          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink-primary" />
          <p className="text-xs leading-relaxed text-brand-text-muted">
            Skills are presented without numerical ratings because no formally measured proficiency scores are included in the source CV.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
