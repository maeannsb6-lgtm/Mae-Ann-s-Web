import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'depth-button inline-flex items-center justify-center rounded-lg font-medium transition-[transform,box-shadow,border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-primary disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose text-white border border-white/10 shadow-[0_10px_24px_rgba(157,23,77,0.24)] hover:shadow-[0_14px_30px_rgba(236,72,153,0.24)]',
      secondary: 'bg-brand-card text-brand-text-white border border-white/10 hover:border-brand-pink-primary/45 hover:bg-brand-card-hover',
      outline: 'border border-brand-pink-primary/70 text-brand-pink-soft bg-brand-bg-primary/45 hover:bg-brand-pink-primary/10 hover:border-brand-pink-primary',
      ghost: 'hover:bg-brand-card hover:text-brand-text-white text-brand-text-secondary border border-transparent hover:border-white/10',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs',
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
