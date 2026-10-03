import { Mail } from 'lucide-react';
import { contactInfo, navLinks } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

export function Footer() {
  return (
    <footer className="pro-footer">
      <div className="pro-footer-shell">
        <div>
          <strong>Mae Ann S. Bodiongan</strong>
          <p>Industrial Engineer | AI &amp; Process Automation</p>
        </div>
        <nav aria-label="Footer navigation">{navLinks.map((link) => <a key={link.href} href={link.href}>{link.name}</a>)}</nav>
        <div className="pro-footer-socials">
          <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinMark className="h-4 w-4" /></a>
          <a href={contactInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubMark className="h-4 w-4" /></a>
          <a href={`mailto:${contactInfo.email}`} aria-label="Email"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="pro-footer-bottom">
        <p>© {new Date().getFullYear()} Mae Ann S. Bodiongan.</p>
        <p>Process improvement · Workflow automation · Business systems</p>
      </div>
    </footer>
  );
}
