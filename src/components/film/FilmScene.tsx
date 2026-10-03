import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface FilmSceneProps extends PropsWithChildren {
  index: number;
  label: string;
  className?: string;
}

export function FilmScene({ index, label, className = '', children }: FilmSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 10%'],
  });

  const y = useTransform(scrollYProgress, [0, .17, .83, 1], reducedMotion ? [0,0,0,0] : [44,0,0,-28]);
  const scale = useTransform(scrollYProgress, [0, .16, .84, 1], reducedMotion ? [1,1,1,1] : [.982,1,1,.992]);
  const opacity = useTransform(scrollYProgress, [0, .08, .92, 1], [0.6,1,1,.72]);

  return (
    <motion.div
      ref={ref}
      data-film-scene
      data-film-index={index}
      data-film-label={label}
      className={`film-scene film-scene--${index} ${className}`}
      style={{ y, scale, opacity, transformPerspective: 1800 }}
    >
      {children}
    </motion.div>
  );
}
