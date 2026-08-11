import { motion } from 'framer-motion';
import { Award, Calendar, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { education, trainings } from '../../data/content';

export function EducationTraining() {
  return (
    <section className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="QUALIFICATIONS"
          title="Education, Training, and Certifications"
          description="Education, training, and certifications presented with their documented institutions, providers, and dates."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-brand-pink-primary/10 border border-brand-pink-primary/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-brand-pink-bright" />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4, rotateX: 0.5, rotateY: -0.5, scale: 1.005 }}
                  className="depth-card bg-brand-card p-6 rounded-2xl border border-white/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h4 className="text-white font-semibold">{item.level}</h4>
                    <span className="text-xs font-mono text-brand-pink-soft bg-brand-pink-primary/10 border border-brand-pink-primary/20 rounded-full px-3 py-1 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-brand-text-secondary text-sm">{item.institution}</p>
                  {item.location && <p className="text-brand-text-muted text-xs mt-1">{item.location}</p>}
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-brand-pink-primary/10 border border-brand-pink-primary/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-pink-bright" />
              </div>
              <h3 className="text-xl font-bold text-white">Training & Certifications</h3>
            </div>

            <div className="space-y-4">
              {trainings.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4, rotateX: 0.5, rotateY: -0.5, scale: 1.005 }}
                  className="depth-card bg-brand-card p-6 rounded-2xl border border-white/5 hover:border-brand-pink-primary/30 transition-colors"
                >
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-brand-text-secondary text-sm">{item.provider}</p>
                  <p className="text-brand-text-muted text-xs mt-3 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-pink-primary" />
                    {item.date}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
