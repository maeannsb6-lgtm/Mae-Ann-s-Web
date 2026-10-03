import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface CinematicSceneProps extends PropsWithChildren {
  index: number;
  label: string;
  className?: string;
}

export function CinematicScene({ index, label, className = '', children }: CinematicSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 8%'],
  });

  const y = useTransform(scrollYProgress, [0, .18, .82, 1], reduceMotion ? [0,0,0,0] : [56, 0, 0, -34]);
  const scale = useTransform(scrollYProgress, [0, .16, .84, 1], reduceMotion ? [1,1,1,1] : [.975, 1, 1, .988]);
  const opacity = useTransform(scrollYProgress, [0, .1, .9, 1], [0.42, 1, 1, .66]);
  const rotateX = useTransform(scrollYProgress, [0, .2, .8, 1], reduceMotion ? [0,0,0,0] : [1.25, 0, 0, -.65]);

  return (
    <motion.div
      ref={ref}
      className={`cinematic-scene cinematic-scene--${index} ${className}`}
      data-cinematic-scene
      data-scene-index={index}
      data-scene-label={label}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        transformPerspective: 1700,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="cinematic-scene-marker" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <i />
        <em>{label}</em>
      </div>
      {children}
    </motion.div>
  );
}
