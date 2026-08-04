import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Calendar, Code2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { MotionButton } from '../ui/Button';

export function About() {
  const infoItems = [
    { icon: User, label: 'Name', value: 'Mae Ann S. Bodiongan' },
    { icon: Briefcase, label: 'Role', value: 'Industrial Engineer | Project Coordinator – Technical Compliance' },
    { icon: MapPin, label: 'Location', value: 'Philippines' },
    { icon: Code2, label: 'Focus', value: 'Project Coordination, Process Improvement, Digital Workflows' },
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
              title="Industrial engineering applied to real project and process needs." 
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-brand-text-muted text-base leading-relaxed">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                I am an Industrial Engineering graduate of the Technological Institute of the Philippines. My background includes project coordination, technical compliance, process analysis, feasibility studies, operations research, and technical documentation.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                In my current role at SUWECO Tablas Energy Corp., I support solar and diesel power plant projects, coordinate documentation and compliance requirements, collaborate with engineering, finance, and management teams, and develop AI-assisted web and Google Workspace automations using the tools listed in my CV.
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
