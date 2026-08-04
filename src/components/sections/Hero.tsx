import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { MotionButton } from '../ui/Button';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-pink-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center mx-auto lg:mx-0">
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-brand-pink-bright bg-brand-pink-primary/10 rounded-full border border-brand-pink-primary/20">
                AI AUTOMATION & WEB DEVELOPER
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1]">
              Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">Mae</span>.<br />
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">intelligent digital solutions.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-brand-text-muted text-lg max-w-2xl mx-auto lg:mx-0">
              I create modern web applications, AI-powered automations, organized digital workspaces, and smarter workflows that help teams simplify processes, improve productivity, and manage projects more efficiently.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
              <a href="#works" className="w-full sm:w-auto">
                <MotionButton className="w-full sm:w-auto flex items-center gap-2">
                  View My Work <ArrowUpRight className="w-4 h-4" />
                </MotionButton>
              </a>
              <a href="#about" className="w-full sm:w-auto">
                <MotionButton variant="secondary" className="w-full sm:w-auto flex items-center gap-2">
                  Download CV <Download className="w-4 h-4" />
                </MotionButton>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 lg:mt-16">
              <p className="text-xs text-brand-text-secondary uppercase tracking-widest font-semibold mb-4">Technologies I work with</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['React', 'TypeScript', 'Tailwind', 'Supabase', 'Vercel', 'n8n', 'Notion', 'Google AI'].map(tech => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-medium text-brand-text-secondary bg-brand-card border border-white/5 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Portrait Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto"
          >
            {/* Glowing circle background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink-primary/30 to-brand-pink-dark/30 rounded-full blur-[80px]" />
            
            {/* Portrait Container */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full bg-brand-card rounded-[2rem] sm:rounded-full border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
               <img 
                 src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg" 
                 alt="Professional Portrait" 
                 className="w-full h-full object-cover object-top opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Code Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 sm:-right-10 bg-brand-card/90 backdrop-blur-md border border-brand-pink-primary/30 p-4 rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.15)] z-20 hidden sm:block"
            >
              <pre className="text-xs font-mono text-brand-text-secondary">
                <span className="text-brand-pink-soft">const</span> professional = {"{"}
                <br/>
                &nbsp;&nbsp;name: <span className="text-brand-pink-primary">"Mae"</span>,
                <br/>
                &nbsp;&nbsp;expertise: [
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-pink-primary">"Web Dev"</span>,
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-pink-primary">"AI Automation"</span>
                <br/>
                &nbsp;&nbsp;],
                <br/>
                &nbsp;&nbsp;passion: <span className="text-brand-pink-primary">"Building smart workflows"</span>
                <br/>
                {"};"}
              </pre>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
