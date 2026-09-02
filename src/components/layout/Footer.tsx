import { Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { contactInfo, navLinks } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-brand-bg-primary py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div><p className="text-lg font-semibold text-white">Mae Ann S. Bodiongan</p><p className="mt-2 text-sm text-brand-text-muted">Industrial Engineer | AI &amp; Process Automation</p></div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">{navLinks.map((link) => <a key={link.href} href={link.href} className="text-sm text-brand-text-muted transition hover:text-brand-accent">{link.name}</a>)}</nav>
          <div className="flex gap-2">
            <FooterLink href={contactInfo.socials.linkedin} label="LinkedIn"><LinkedinMark className="h-4 w-4" /></FooterLink>
            <FooterLink href={contactInfo.socials.github} label="GitHub"><GithubMark className="h-4 w-4" /></FooterLink>
            <FooterLink href={`mailto:${contactInfo.email}`} label="Email"><Mail className="h-4 w-4" /></FooterLink>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-xs text-brand-text-muted sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Mae Ann S. Bodiongan.</p><p>Process improvement • Workflow design • Business systems</p></div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={label} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-brand-text-muted transition hover:border-brand-accent/40 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">{children}</a>;
}
