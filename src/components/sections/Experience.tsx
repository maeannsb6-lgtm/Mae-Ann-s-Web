import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { experience } from '../../data/content';

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-brand-bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="EXPERIENCE" 
          title="My Professional Experience" 
          className="mb-16"
        />

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-8 top-4 bottom-4 w-px bg-white/10" />
          
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-[28px] top-1.5 w-2 h-2 rounded-full bg-brand-pink-primary shadow-[0_0_10px_rgba(236,72,153,0.8)] ring-4 ring-brand-bg-primary" />
                
                <div className="bg-brand-card p-6 md:p-8 rounded-3xl border border-white/5 hover:border-brand-pink-primary/30 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-pink-soft transition-colors">{exp.title}</h3>
                      <p className="text-brand-pink-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-brand-text-secondary border border-white/5 mb-1">
                        {exp.period}
                      </span>
                      <p className="text-xs text-brand-text-muted">{exp.location}</p>
                    </div>
                  </div>

                  <p className="text-brand-text-muted text-sm mb-6">
                    {exp.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm text-brand-text-secondary flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-primary/50 mt-1.5 shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="text-sm text-brand-text-secondary flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-bright mt-1.5 shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-3">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map(tool => (
                        <span key={tool} className="px-2.5 py-1 text-xs font-medium text-brand-text-secondary bg-brand-bg-primary rounded border border-white/5">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
