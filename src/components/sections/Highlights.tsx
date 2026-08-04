import { motion } from 'framer-motion';
import { Globe, Bot, ClipboardList, Briefcase } from 'lucide-react';

const highlights = [
  {
    title: 'Web Applications',
    description: 'Responsive and modern applications designed for real business needs.',
    icon: Globe,
  },
  {
    title: 'AI Automations',
    description: 'Automated workflows that reduce repetitive work and improve productivity.',
    icon: Bot,
  },
  {
    title: 'Notion Workspaces',
    description: 'Organized systems for project tracking, documentation, and collaboration.',
    icon: ClipboardList,
  },
  {
    title: 'Project Coordination',
    description: 'Structured support for technical, operational, and compliance-related projects.',
    icon: Briefcase,
  }
];

export function Highlights() {
  return (
    <section className="relative z-20 -mt-10 lg:-mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-brand-card hover:bg-brand-card-hover border border-white/5 hover:border-brand-pink-primary/30 p-6 rounded-2xl transition-all duration-300 shadow-xl group"
            >
              <div className="w-12 h-12 bg-brand-pink-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-pink-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-brand-pink-bright" />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
