import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, GitBranch, ExternalLink, X } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { projects } from '../../data/content';
import { useState } from 'react';
import { Button, MotionButton } from '../ui/Button';

interface ProjectType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  achievement: string;
  year: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export function FeaturedWorks() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section id="works" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="FEATURED WORKS" 
          title="Selected Projects and Digital Solutions" 
          description="A collection of web applications, automation systems, Notion workspaces, dashboards, and digital solutions I have designed and developed."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotateX: 0.7, rotateY: -0.7, scale: 1.01 }}
              className="depth-card bg-brand-card rounded-3xl border border-white/5 overflow-hidden group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-brand-pink-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wider text-brand-pink-bright bg-brand-bg-primary/80 backdrop-blur-md rounded-full border border-brand-pink-primary/30">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-white/60 font-mono text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-pink-soft transition-colors">{project.title}</h3>
                <p className="text-brand-text-muted text-sm mb-6 flex-grow">{project.description}</p>
                
                {/* Achievement Highlight */}
                <div className="bg-brand-bg-primary/50 p-4 rounded-xl border border-white/5 mb-6">
                  <p className="text-sm text-brand-text-secondary"><strong className="text-white">Result:</strong> {project.achievement}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-medium text-brand-text-secondary bg-white/5 rounded border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-brand-text-secondary bg-white/5 rounded border border-white/5">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  {project.liveUrl !== '#' ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2 group/btn">
                        Live Demo <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </a>
                  ) : (
                    <a href="#contact" className="flex-1">
                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2 group/btn">
                        Ask About This Work <ArrowUpRight className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </a>
                  )}
                  {project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" title="View Source">
                      <Button variant="ghost" size="icon" className="border border-white/10 hover:border-brand-pink-primary/50">
                        <GitBranch className="w-5 h-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AllProjects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Stop body scroll when modal is open
  if (typeof document !== 'undefined') {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }

  return (
    <section className="py-24 bg-brand-bg-secondary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading 
            label="MY WORK" 
            title="More Projects I’ve Built" 
            align="left"
            className="mb-0"
          />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-brand-pink-primary text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                    : 'bg-brand-card text-brand-text-secondary hover:text-white border border-white/5 hover:border-brand-pink-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, rotateX: 0.6, rotateY: -0.6, scale: 1.01 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="depth-card bg-brand-card rounded-2xl border border-white/5 overflow-hidden cursor-pointer group hover:border-brand-pink-primary/40 transition-colors"
              >
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 right-2 z-20">
                     <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-bg-primary bg-white rounded">
                      {project.year}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col h-[calc(100%-10rem)]">
                  <span className="text-[10px] font-semibold text-brand-pink-bright uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-pink-soft transition-colors line-clamp-2">{project.title}</h4>
                  <p className="text-brand-text-muted text-xs line-clamp-3 mb-4">{project.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-brand-text-secondary bg-white/5 px-2 py-1 rounded border border-white/5">
                      {project.status}
                    </span>
                    <span className="text-brand-pink-primary text-xs font-medium group-hover:underline flex items-center gap-1">
                      Details <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-bg-primary/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="depth-panel relative w-full max-w-4xl bg-brand-card border border-brand-pink-primary/30 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-brand-bg-primary/80 hover:bg-brand-pink-primary text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="h-64 sm:h-80 w-full relative">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
                </div>
                
                <div className="p-6 sm:p-10 -mt-20 relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider text-brand-pink-bright bg-brand-pink-primary/10 rounded-full border border-brand-pink-primary/20">
                      {selectedProject.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-brand-text-secondary bg-white/5 rounded-full border border-white/5">
                      {selectedProject.year} • {selectedProject.status}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{selectedProject.title}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Overview</h4>
                        <p className="text-brand-text-muted leading-relaxed">{selectedProject.description}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Key Result</h4>
                        <div className="p-4 bg-brand-pink-primary/5 border border-brand-pink-primary/20 rounded-xl">
                          <p className="text-brand-pink-soft">{selectedProject.achievement}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map(tech => (
                            <span key={tech} className="px-2.5 py-1 text-xs font-medium text-brand-text-secondary bg-brand-bg-primary rounded border border-white/5">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {selectedProject.liveUrl !== '#' ? (
                          <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                            <Button className="w-full flex justify-center gap-2">Live Demo <ExternalLink className="w-4 h-4" /></Button>
                          </a>
                        ) : (
                          <a href="#contact" onClick={() => setSelectedProject(null)}>
                            <Button className="w-full flex justify-center gap-2">Ask About This Work <ArrowUpRight className="w-4 h-4" /></Button>
                          </a>
                        )}
                        {selectedProject.githubUrl !== '#' && (
                          <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                            <Button variant="secondary" className="w-full flex justify-center gap-2">View Source <GitBranch className="w-4 h-4" /></Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
