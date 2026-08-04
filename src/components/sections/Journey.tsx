import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { journey } from '../../data/content';

export function Journey() {
  return (
    <section className="py-24 bg-brand-bg-secondary relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-pink-primary/10 -translate-y-1/2 -translate-x-1/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          label="MY JOURNEY" 
          title="How My Skills Have Evolved" 
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {journey.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-card p-6 rounded-3xl border border-white/5 relative group flex flex-col h-full"
              >
                {/* Connecting Line (Desktop only) */}
                {index < journey.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-[-24px] w-12 h-px bg-white/10 z-0" />
                )}
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-12 h-12 bg-brand-bg-primary rounded-xl flex items-center justify-center border border-white/5 group-hover:border-brand-pink-primary/50 group-hover:bg-brand-pink-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-brand-pink-primary group-hover:text-brand-pink-bright transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-brand-text-muted bg-white/5 px-2 py-1 rounded">
                    {stage.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-pink-soft transition-colors leading-tight">
                  {stage.title}
                </h3>
                
                <p className="text-brand-text-muted text-sm mb-4 flex-grow">
                  {stage.description}
                </p>

                <div className="space-y-4 mt-auto">
                  <div>
                    <h4 className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider mb-1">Learned</h4>
                    <p className="text-xs text-brand-text-secondary">{stage.learned}</p>
                  </div>
                  <div className="p-3 bg-brand-pink-primary/5 rounded-lg border border-brand-pink-primary/10">
                    <h4 className="text-[10px] font-semibold text-brand-pink-primary uppercase tracking-wider mb-1">Key Achievement</h4>
                    <p className="text-xs text-brand-pink-soft/90 leading-relaxed">{stage.achievement}</p>
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
