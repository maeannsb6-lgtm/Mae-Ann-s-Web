import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-primary disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-transparent",
      secondary: "bg-brand-card text-brand-text-white border border-white/10 hover:border-brand-pink-primary/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
      outline: "border border-brand-pink-primary text-brand-pink-primary hover:bg-brand-pink-primary/10",
      ghost: "hover:bg-brand-card hover:text-brand-text-white text-brand-text-secondary",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
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
Button.displayName = "Button";

export { Button };

type MotionButtonProps = HTMLMotionProps<"button"> & Omit<ButtonProps, "ref">;

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (props, ref) => {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
         <Button ref={ref} {...props} />
      </motion.div>
    );
  }
);
MotionButton.displayName = "MotionButton";
