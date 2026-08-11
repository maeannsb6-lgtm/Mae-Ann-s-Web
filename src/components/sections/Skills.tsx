import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { skills } from '../../data/content';

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-brand-bg-primary py-24">
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-pink-primary/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-pink-dark/[0.07] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="MY SKILLS"
          title="Technical Expertise & Professional Capabilities"
          description="A focused combination of industrial engineering methods, digital tools, and professional capabilities applied to project, process, documentation, and web-based work."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((category, categoryIndex) => (
            <motion.article
              key={category.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.12 }}
              whileHover={{ y: -5, rotateX: 0.7, rotateY: -0.7, scale: 1.01 }}
              className="depth-card group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-brand-card/90 p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand-pink-primary/35 sm:p-7"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink-primary/80 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-brand-pink-primary/[0.08] blur-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

              <header className="relative mb-7 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-pink-soft">
                    Core Area {String(categoryIndex + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl font-bold leading-tight text-white">
                    {category.category}
                  </h3>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-brand-bg-primary text-xs font-semibold text-brand-pink-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </header>

              <div className="relative space-y-4">
                {category.items.map((skill, skillIndex) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: categoryIndex * 0.08 + skillIndex * 0.05,
                      }}
                      className="group/skill"
                    >
                      <div className="depth-chip flex items-center gap-3 rounded-2xl border border-white/[0.055] bg-brand-bg-primary/65 px-4 py-3.5 transition-all duration-300 hover:border-brand-pink-primary/25 hover:bg-brand-card-hover">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-brand-card transition-all duration-300 group-hover/skill:border-brand-pink-primary/25 group-hover/skill:bg-brand-pink-primary/10">
                          <Icon className="h-4 w-4 text-brand-text-secondary transition-colors duration-300 group-hover/skill:text-brand-pink-bright" />
                        </div>

                        <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-white">
                          {skill.name}
                        </span>

                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink-dark transition-all duration-300 group-hover/skill:bg-brand-pink-bright group-hover/skill:shadow-[0_0_10px_rgba(255,79,163,0.75)]" />
                      </div>

                      <div className="mx-4 mt-2 h-px overflow-hidden bg-white/[0.045]">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.75,
                            delay: 0.12 + categoryIndex * 0.08 + skillIndex * 0.045,
                            ease: 'easeOut',
                          }}
                          className="h-full origin-left bg-gradient-to-r from-brand-pink-dark via-brand-pink-primary/75 to-transparent"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
