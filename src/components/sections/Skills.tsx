import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { skills } from '../../data/content';

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="MY SKILLS" 
          title="Technologies and Tools I Use" 
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
              
              <div className="space-y-6">
                {category.items.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-pink-bright transition-colors" />
                          <span className="text-white text-sm font-medium">{skill.name}</span>
                        </div>
                        <span className="text-brand-text-muted text-xs font-mono">{skill.percentage}%</span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="h-1.5 w-full bg-brand-bg-secondary rounded-full overflow-hidden">
                        {/* Animated Progress */}
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-brand-pink-dark to-brand-pink-bright rounded-full relative"
                        >
                          {/* Glow effect on the bar */}
                          <div className="absolute inset-0 bg-brand-pink-primary blur-[2px] opacity-50 rounded-full" />
                        </motion.div>
                      </div>
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
