import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  id?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ id, label, title, description, className, align = 'center' }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 14, z: -18 };
  const visible = { opacity: 1, y: 0, z: 0 };

  return (
    <div className={cn('section-heading flex flex-col gap-3', align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left', className)}>
      <motion.span
        initial={initial}
        whileInView={visible}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
        className="text-sm font-semibold tracking-[0.18em] uppercase text-brand-accent"
      >
        {label}
      </motion.span>
      <motion.h2
        id={id}
        initial={initial}
        whileInView={visible}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.06 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text-white leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.35 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1 }}
        className={cn('h-px w-16 origin-left bg-gradient-to-r from-brand-accent/90 to-transparent', align === 'center' && 'origin-center')}
        aria-hidden="true"
      />
      {description && (
        <motion.p
          initial={initial}
          whileInView={visible}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="text-brand-text-muted mt-1 max-w-2xl text-sm md:text-base leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
