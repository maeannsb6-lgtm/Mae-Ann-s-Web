import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { MotionButton } from '../ui/Button';
import { contactInfo } from '../../data/content';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.7 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-0.85, 0.85]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [0.85, -0.85]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 } },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, z: -28 },
    visible: { opacity: 1, y: 0, z: 0 },
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="hero-scene relative min-h-screen flex items-center pt-24 pb-24 lg:pb-28 overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.025),transparent_34%)] pointer-events-none" aria-hidden="true" />

      <motion.div
        style={shouldReduceMotion ? undefined : { x: glowX, y: glowY }}
        className="absolute top-[15%] -left-24 h-[28rem] w-[28rem] rounded-full bg-brand-pink-primary/[0.09] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center [perspective:1600px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 text-center lg:text-left [transform-style:preserve-3d]"
          >
            <motion.div variants={itemVariants} transition={{ duration: 0.5 }} className="inline-flex items-center mx-auto lg:mx-0">
              <span className="depth-chip px-3 py-1 text-xs font-semibold tracking-wider text-brand-pink-bright bg-brand-pink-primary/10 rounded-full border border-brand-pink-primary/20">
                INDUSTRIAL ENGINEER • PROJECT MANAGEMENT • WEB DEVELOPMENT • RESEARCH
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              transition={{ duration: 0.62 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-[-0.025em]"
            >
              Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">Mae</span>.<br />
              I improve <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">projects, processes, and digital workflows.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.58 }}
              className="text-brand-text-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Bridging the gap between organizational needs and modern AI utilization by transforming complex processes into intelligent, data-driven solutions that improve productivity, decision-making, collaboration, and overall operational performance.
            </motion.p>

            <motion.div variants={itemVariants} transition={{ duration: 0.52 }} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-3">
              <a href="#works" className="w-full sm:w-auto">
                <MotionButton className="w-full sm:w-auto flex items-center gap-2">
                  View My Work <ArrowUpRight className="w-4 h-4" />
                </MotionButton>
              </a>
              <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <MotionButton variant="secondary" className="w-full sm:w-auto flex items-center gap-2">
                  View CV <Download className="w-4 h-4" />
                </MotionButton>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.52 }} className="mt-10 mb-4 lg:mt-12 lg:mb-6">
              <p className="text-xs text-brand-text-secondary uppercase tracking-[0.18em] font-semibold mb-4">Technologies I work with</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['Lean Six Sigma', 'Project Management', 'Google AI Studio', 'Google Antigravity', 'Notion', 'Firebase', 'Supabase', 'Vercel', 'GitHub', 'Google Automation', 'Web Development', 'Web Application'].map((tech) => (
                  <span key={tech} className="depth-chip px-3 py-1.5 text-xs font-medium text-brand-text-secondary bg-brand-card/80 border border-white/[0.07] rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.93, y: 24, z: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, z: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.85, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1500, transformStyle: 'preserve-3d' }}
            className="relative lg:ml-auto w-full max-w-md mx-auto hero-visual"
          >
            {/* Soft dimensional layers behind the portrait */}
            <div className="absolute -inset-7 rounded-[3rem] sm:rounded-full border border-white/[0.035] bg-white/[0.008] [transform:translateZ(-65px)]" aria-hidden="true" />
            <div className="absolute -inset-3 rounded-[2.4rem] sm:rounded-full border border-brand-pink-primary/[0.10] [transform:translate3d(-10px,9px,-34px)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink-primary/24 to-brand-pink-dark/18 rounded-[2rem] sm:rounded-full blur-[72px] [transform:translateZ(-48px)]" aria-hidden="true" />

            {/* Restored portrait layout: rounded rectangle on mobile, circular on larger screens */}
            <div className="depth-card hero-portrait relative aspect-[4/5] sm:aspect-square w-full bg-brand-card rounded-[2rem] sm:rounded-full border border-white/10 overflow-hidden flex items-center justify-center [transform:translateZ(20px)]">
              <img
                src="https://res.cloudinary.com/dape9qptt/image/upload/v1785206634/photo_2026-03-06_13-46-52_idmazn.jpg"
                alt="Professional portrait of Mae Ann Bodiongan"
                className="w-full h-full object-cover object-top opacity-85 mix-blend-luminosity hover:mix-blend-normal transition-[filter,mix-blend-mode,opacity,transform] duration-700 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-primary via-transparent to-transparent opacity-55" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Restored floating card beside the portrait, with gentle motion */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, z: 18 }}
              animate={shouldReduceMotion ? { opacity: 1, y: 0, z: 40 } : { opacity: 1, y: [0, -10, 0], z: 40 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.2 }
                  : {
                      opacity: { duration: 0.55, delay: 0.65 },
                      y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.65 },
                      z: { duration: 0.55, delay: 0.65 },
                    }
              }
              className="absolute -bottom-6 -right-3 sm:-right-10 z-20 hidden sm:block rounded-xl border border-brand-pink-primary/30 bg-brand-card/90 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.42),0_0_30px_rgba(236,72,153,0.12)] backdrop-blur-md"
            >
              <pre className="text-xs font-mono leading-relaxed text-brand-text-secondary">
                <span className="text-brand-pink-soft">const</span> impact = {'{'}
                <br />
                &nbsp;&nbsp;scope: <span className="text-brand-pink-primary">"Organization-wide"</span>,
                <br />
                &nbsp;&nbsp;focus: [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-pink-primary">"Operational Efficiency"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-pink-primary">"Project Coordination"</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-pink-primary">"Digital Workflows"</span>
                <br />
                &nbsp;&nbsp;],
                <br />
                &nbsp;&nbsp;approach: <span className="text-brand-pink-primary">"Industrial Engineering"</span>
                <br />
                {'};'}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-brand-text-muted"
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-pink-primary/50" />
        Scroll to explore
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-pink-primary/50" />
      </motion.div>
    </section>
  );
}
