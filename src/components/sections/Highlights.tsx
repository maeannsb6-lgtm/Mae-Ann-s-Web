import { motion, useReducedMotion } from 'framer-motion';
import { LineChart, FileCheck2, Workflow, Briefcase } from 'lucide-react';

const highlights = [
  {
    title: 'Industrial Engineering',
    description: 'Process analysis, time and motion study, feasibility study, and operations research.',
    icon: LineChart,
  },
  {
    title: 'Technical Compliance',
    description: 'Structured documentation and compliance support for energy projects.',
    icon: FileCheck2,
  },
  {
    title: 'Digital Workflows',
    description: 'Web applications, Google automation, and AI-assisted operational workflows.',
    icon: Workflow,
  },
  {
    title: 'Project Coordination',
    description: 'Coordination across engineering, finance, management, and operations teams.',
    icon: Briefcase,
  },
];

export function Highlights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97, z: -34 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, z: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.48,
                  delay: shouldReduceMotion ? 0 : index * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6, z: 14, rotateX: 0.65, rotateY: -0.65, scale: 1.012 }
                }
                style={shouldReduceMotion ? undefined : { transformPerspective: 1100, transformStyle: 'preserve-3d' }}
                className="depth-card group rounded-2xl border border-white/[0.07] bg-brand-card p-6 transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand-pink-primary/30 hover:bg-brand-card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-pink-primary/10 bg-brand-pink-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors group-hover:bg-brand-pink-primary/20">
                  <Icon className="h-6 w-6 text-brand-pink-bright" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-text-muted">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
