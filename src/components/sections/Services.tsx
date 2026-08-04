import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/content';

export function Services() {
  return (
    <section id="services" className="py-24 bg-brand-bg-secondary relative">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-pink-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          label="WHAT I DO" 
          title="Solutions I Can Build" 
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-brand-card p-8 rounded-3xl border border-white/5 hover:border-brand-pink-primary/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-brand-bg-primary rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-brand-pink-primary/10 group-hover:border-brand-pink-primary/30 transition-colors">
                  <Icon className="w-7 h-7 text-brand-pink-primary group-hover:text-brand-pink-bright transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-brand-text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="mb-8">
                  <ul className="space-y-2">
                    {service.features.map(feature => (
                      <li key={feature} className="text-sm text-brand-text-secondary flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-dark" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-pink-primary hover:text-brand-pink-bright mt-auto transition-colors group/link">
                  Learn More 
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
