import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { skills } from '../../data/content';

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="MY SKILLS" 
          title="Industrial Engineering and Digital Capabilities" 
          description="Skills and tools documented in my current CV. Proficiency percentages are not shown because they have not been formally measured."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((category, catIndex) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
            >
              <h3 className="text-sm font-semibold text-brand-pink-soft tracking-wider uppercase mb-8 pb-4 border-b border-white/10">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="group flex items-center gap-3 rounded-xl border border-white/5 bg-brand-card p-4 hover:border-brand-pink-primary/30 transition-colors">
                      <div className="p-2 bg-brand-pink-primary/10 rounded-lg">
                        <Icon className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-pink-bright transition-colors" />
                      </div>
                      <span className="text-white text-sm font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
