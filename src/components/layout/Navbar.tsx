import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/content';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0.01, .25, .6] });

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all', scrolled || menuOpen ? 'border-b border-white/[0.07] bg-[#07111f]/88 py-3 backdrop-blur-xl' : 'border-b border-transparent bg-transparent py-5')}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" aria-label="Mae Ann Bodiongan — Home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-accent/35 bg-brand-accent/[0.07] text-xs font-bold tracking-[.08em] text-brand-accent">MB</span>
          <span className="hidden text-sm font-semibold text-white sm:block">Mae Ann Bodiongan</span>
        </a>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn('relative py-2 text-xs font-semibold uppercase tracking-[.08em] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent', isActive ? 'text-white' : 'text-brand-text-muted')}
              >
                {link.name}
                {isActive && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-brand-accent" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden min-h-10 items-center rounded-full border border-brand-accent/45 bg-brand-accent/[0.07] px-4 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent hover:text-brand-bg-primary lg:inline-flex">Let’s work together</a>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent xl:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#07111f]/96 xl:hidden"
          >
            <div className="mx-auto flex max-h-[calc(100vh-5rem)] max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={cn('rounded-xl px-3 py-3 text-base font-medium', active === link.href.slice(1) ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-text-secondary hover:bg-white/5 hover:text-white')}>{link.name}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-accent px-4 font-semibold text-brand-bg-primary">Let’s work together</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
