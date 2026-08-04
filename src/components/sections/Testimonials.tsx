import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/content';

export function Testimonials() {
  return (
    <section className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="TESTIMONIALS" 
          title="What People Say About My Work" 
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-card p-8 rounded-3xl border border-white/5 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-brand-pink-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-pink-primary text-brand-pink-primary" />
                ))}
              </div>

              <p className="text-brand-text-muted text-sm leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-brand-pink-primary/50 transition-colors"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-brand-text-secondary text-xs">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="absolute -bottom-3 right-8 px-3 py-1 bg-brand-bg-primary rounded-full border border-white/5 text-[10px] text-brand-pink-soft font-medium uppercase tracking-wider shadow-lg">
                {testimonial.projectType}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
