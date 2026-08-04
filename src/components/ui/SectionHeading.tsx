import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ label, title, description, className, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left', className)}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-brand-pink-primary/10 text-brand-pink-bright rounded-full border border-brand-pink-primary/20"
      >
        {label}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brand-text-muted mt-2 max-w-2xl text-sm md:text-base"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
