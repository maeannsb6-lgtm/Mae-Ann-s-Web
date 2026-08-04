import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { achievementsStats, detailedAchievements } from '../../data/content';
import { useState, useEffect } from 'react';

// Counter component for the numbers
function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(parseInt(value));
  const numericValue = isNumber ? parseInt(value) : 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isNumber) return;
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [numericValue, isNumber]);

  if (!isNumber) return <span>{value}</span>;
  return <span>{count}{suffix}</span>;
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-brand-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          label="VERIFIED ACHIEVEMENTS" 
          title="Competition, Research, and Training Highlights" 
          description="Every item below is based on the dates and recognitions listed in my current CV."
          className="mb-16"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {achievementsStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-card p-6 rounded-2xl border-t-2 border-transparent hover:border-brand-pink-primary transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-4xl font-bold text-white group-hover:text-brand-pink-soft transition-colors">
                    <AnimatedCounter value={stat.value} />
                  </h4>
                  <div className="p-2 bg-brand-bg-secondary rounded-lg">
                    <Icon className="w-5 h-5 text-brand-pink-primary" />
                  </div>
                </div>
                <h5 className="text-lg font-medium text-white mb-2">{stat.label}</h5>
                <p className="text-sm text-brand-text-muted">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Achievements */}
        <div className="text-center mb-12">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-brand-pink-bright uppercase bg-brand-pink-primary/10 rounded-full border border-brand-pink-primary/20">
            CV-LISTED RECOGNITIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailedAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-brand-card p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
              >
                {/* Hover line indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-pink-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-brand-bg-primary border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-brand-pink-primary/50 group-hover:bg-brand-pink-primary/10 transition-colors">
                      <Icon className="w-6 h-6 text-brand-text-secondary group-hover:text-brand-pink-bright transition-colors" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-brand-pink-soft">{String(achievement.id).padStart(2, '0')}</span>
                      <h4 className="text-xl font-bold text-white">{achievement.title}</h4>
                    </div>
                    <p className="text-brand-text-muted text-sm leading-relaxed mb-4">
                      {achievement.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.badges.map(badge => (
                        <span key={badge} className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-brand-text-secondary bg-white/5 rounded-md border border-white/5">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
