import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'depth-button inline-flex items-center justify-center rounded-lg font-semibold transition-[transform,box-shadow,border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-primary disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-brand-accent text-brand-bg-primary border border-brand-accent shadow-[0_10px_24px_rgba(45,212,191,0.14)] hover:bg-brand-accent-bright hover:border-brand-accent-bright',
      secondary: 'bg-brand-card text-brand-text-white border border-white/10 hover:border-brand-accent/45 hover:bg-brand-card-hover',
      outline: 'border border-brand-accent/70 text-brand-accent-bright bg-brand-bg-primary/45 hover:bg-brand-accent/10 hover:border-brand-accent',
      ghost: 'hover:bg-brand-card hover:text-brand-text-white text-brand-text-secondary border border-transparent hover:border-white/10',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

type MotionButtonProps = HTMLMotionProps<'button'> & Omit<ButtonProps, 'ref'>;

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (props, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98, y: 0 }}
        transition={{ duration: 0.18 }}
        className="inline-block"
      >
        <Button ref={ref} {...props} />
      </motion.div>
    );
  }
);
MotionButton.displayName = 'MotionButton';
