import { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SceneRevealProps extends PropsWithChildren {
  className?: string;
}

export function SceneReveal({ children, className }: SceneRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('scene-reveal', className)}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 54,
              scale: 0.968,
              rotateX: 1.4,
              z: -92,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        z: 0,
      }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0.18 : 0.62,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={
        shouldReduceMotion
          ? undefined
          : {
              transformPerspective: 1500,
              transformStyle: 'preserve-3d',
            }
      }
    >
      {children}
    </motion.div>
  );
}
