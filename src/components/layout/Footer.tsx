import { contactInfo, navLinks, services } from '../../data/content';

export function Footer() {
  return (
    <footer className="relative z-10 bg-brand-bg-primary/95 border-t border-white/[0.08] pt-16 pb-8 shadow-[0_-18px_50px_rgba(0,0,0,0.22)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="depth-chip flex items-center justify-center w-9 h-9 bg-brand-pink-primary/10 rounded-lg border border-brand-pink-primary/20">
                <span className="font-bold text-xl text-brand-pink-bright leading-none -mt-1">m.</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Mae<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-primary to-brand-pink-rose">.dev</span>
              </span>
            </a>
            <p className="text-brand-text-muted text-sm leading-relaxed mb-6">
              Designed and developed with purpose, creativity, and technology. Turning complex processes into simple digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.slice(0, 5).map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-brand-text-muted hover:text-brand-pink-bright text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="flex flex-col gap-2">
              {services.slice(0, 4).map(service => (
                <li key={service.id}>
                  <a href="#services" className="text-brand-text-muted hover:text-brand-pink-bright text-sm transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="flex flex-col gap-2 mb-6">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="text-brand-text-muted hover:text-brand-pink-bright text-sm transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone}`} className="text-brand-text-muted hover:text-brand-pink-bright text-sm transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
            <a href="#home" className="text-sm text-brand-pink-primary hover:text-white transition-colors flex items-center gap-2">
              ↑ Back to top
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-muted text-sm text-center md:text-left">
            © {new Date().getFullYear()} Mae. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted hover:text-brand-pink-soft transition-colors text-sm">LinkedIn</a>
            <a href={contactInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted hover:text-brand-pink-soft transition-colors text-sm">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
