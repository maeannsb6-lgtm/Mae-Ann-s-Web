import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Calendar, Code2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { MotionButton } from '../ui/Button';

export function About() {
  const infoItems = [
    { icon: User, label: 'Name', value: 'Mae' },
    { icon: Briefcase, label: 'Role', value: 'Web Developer & AI Automation Specialist' },
    { icon: MapPin, label: 'Location', value: 'Philippines' },
    { icon: Code2, label: 'Specialization', value: 'Web Apps, AI Automation, Notion' },
    { icon: Calendar, label: 'Availability', value: 'Open to Opportunities' },
  ];

  return (
    <section id="about" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <div>
            <SectionHeading 
              label="ABOUT ME" 
              title="I turn complex processes into simple digital solutions." 
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-brand-text-muted text-base leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                I combine web development, AI automation, project coordination, and workspace design to create systems that are practical, organized, and easy to use. My work focuses on helping teams streamline workflows, manage information, improve collaboration, and reduce repetitive tasks through modern technology.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                I have experience supporting solar and diesel power plant projects, coordinating documentation, working with different departments, and building digital solutions using tools such as React, Google AI Studio, n8n, Notion, Supabase, and Vercel.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10"
            >
              <a href="#experience">
                <MotionButton variant="outline">Learn More About Me</MotionButton>
              </a>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-card border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-pink-primary/20 blur-[80px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink-primary" />
              Professional Profile
            </h3>
            
            <ul className="space-y-6 relative z-10">
              {infoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-brand-pink-primary/10 rounded-lg shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-pink-bright" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-text-secondary font-medium">{item.label}</p>
                      <p className="text-white mt-1">{item.value}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
