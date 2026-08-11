import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/content';
import { Button, MotionButton } from '../ui/Button';
import { cn } from '../../lib/utils';

const navigationLinks = [
  ...navLinks.filter(link => link.href !== '#contact'),
  { name: 'Research', href: '#research' },
  ...navLinks.filter(link => link.href === '#contact'),
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = navigationLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-300 border-b",
        isScrolled 
          ? "bg-brand-bg-primary/80 backdrop-blur-xl border-white/[0.08] py-3 shadow-[0_12px_34px_rgba(0,0,0,0.24)]" 
          : "bg-brand-bg-primary/10 backdrop-blur-[2px] border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2 [perspective:800px]">
            <div className="depth-chip flex items-center justify-center w-9 h-9 bg-brand-pink-primary/10 rounded-lg group-hover:bg-brand-pink-primary/20 transition-colors border border-brand-pink-primary/20">
              <span className="font-bold text-xl text-brand-pink-bright leading-none -mt-1">m.</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Mae<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">.dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navigationLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative hover:text-white",
                  activeSection === link.href.substring(1) ? "text-white" : "text-brand-text-secondary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-pink-primary shadow-[0_4px_12px_rgba(236,72,153,0.25)]"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Hire Me Button */}
          <div className="hidden lg:block">
            <a href="#contact">
              <MotionButton size="sm">Hire Me</MotionButton>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="depth-button lg:hidden p-2 rounded-lg border border-transparent text-brand-text-secondary hover:text-white hover:border-white/10 hover:bg-brand-card"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="depth-panel lg:hidden bg-brand-card/95 backdrop-blur-xl border-b border-white/10 overflow-hidden shadow-[0_22px_45px_rgba(0,0,0,0.32)]"
          >
            <div className="flex max-h-[calc(100vh-5rem)] flex-col gap-4 overflow-y-auto px-4 py-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium p-2 rounded-lg",
                    activeSection === link.href.substring(1) 
                      ? "text-brand-pink-bright bg-brand-pink-primary/10" 
                      : "text-brand-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Hire Me</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
