import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Terminal, Briefcase, Users, Image, Send } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/content';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset form after a few seconds
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-brand-bg-secondary relative">
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-brand-pink-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div>
            <SectionHeading 
              label="LET'S WORK TOGETHER" 
              title="Have a project, workflow, or digital system in mind?" 
              align="left"
              className="mb-8"
            />
            
            <p className="text-brand-text-muted text-base leading-relaxed mb-12">
              I’m open to web development projects, automation opportunities, Notion workspace development, digital transformation initiatives, and professional collaborations.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: Mail, label: 'Email', value: contactInfo.email, link: `mailto:${contactInfo.email}` },
                { icon: Phone, label: 'Phone', value: contactInfo.phone, link: `tel:${contactInfo.phone}` },
                { icon: MapPin, label: 'Location', value: contactInfo.location },
              ].map((item, index) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-brand-card rounded-xl flex items-center justify-center border border-white/5 group-hover:border-brand-pink-primary/30 group-hover:bg-brand-pink-primary/10 transition-colors">
                    <item.icon className="w-5 h-5 text-brand-pink-primary group-hover:text-brand-pink-bright" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-secondary">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="text-white hover:text-brand-pink-soft transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-4">Follow Me</p>
              <div className="flex gap-4">
                {[
                  { icon: Terminal, link: contactInfo.socials.github },
                  { icon: Briefcase, link: contactInfo.socials.linkedin },
                  { icon: Users, link: contactInfo.socials.facebook },
                  { icon: Image, link: contactInfo.socials.instagram },
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center border border-white/5 hover:bg-brand-pink-primary hover:border-brand-pink-primary hover:text-white text-brand-text-secondary transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-card p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink-primary/10 blur-[80px] rounded-full pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-brand-text-secondary">Full Name</label>
                  <input required type="text" id="name" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-brand-text-secondary">Email Address</label>
                  <input required type="email" id="email" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-text-secondary">Company or Organization</label>
                  <input type="text" id="company" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary transition-colors" placeholder="Tech Inc." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium text-brand-text-secondary">Project Type</label>
                  <select id="projectType" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary appearance-none transition-colors">
                    <option>Web Application</option>
                    <option>AI Automation</option>
                    <option>Notion Workspace</option>
                    <option>Google Workspace Automation</option>
                    <option>Project Tracking System</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-brand-text-secondary">Message</label>
                <textarea required id="message" rows={4} className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input required type="checkbox" id="consent" className="mt-1 bg-brand-bg-primary border-white/10 rounded text-brand-pink-primary focus:ring-brand-pink-primary" />
                <label htmlFor="consent" className="text-sm text-brand-text-muted">
                  I agree to be contacted regarding this inquiry.
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Sending...' : formState === 'success' ? 'Message Sent!' : 'Send Message'}
                {formState === 'idle' && <Send className="w-4 h-4" />}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
