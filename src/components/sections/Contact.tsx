import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Loader2, Mail, MapPin, Phone, Send, Terminal, XCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/content';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

interface ContactResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitStatus === 'sending') return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      projectType: String(formData.get('projectType') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(), // Honeypot: must remain blank.
    };

    setSubmitStatus('sending');
    setStatusMessage('Sending your message securely...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as ContactResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Your message could not be sent. Please try again.');
      }

      form.reset();
      setSubmitStatus('success');
      setStatusMessage(
        result.message || `Message sent successfully. A confirmation was sent from ${contactInfo.email}.`,
      );
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : `Your message could not be sent. You may email ${contactInfo.email} directly.`,
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-bg-secondary relative">
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-brand-pink-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading
              label="LET'S CONNECT"
              title="Project, process, or professional collaboration in mind?"
              align="left"
              className="mb-8"
            />

            <p className="text-brand-text-muted text-base leading-relaxed mb-12">
              I’m open to industrial engineering, project coordination, process-improvement, technical documentation, web application, and automation opportunities.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: Mail, label: 'Email', value: contactInfo.email, link: `mailto:${contactInfo.email}` },
                { icon: Phone, label: 'Phone', value: contactInfo.phone, link: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
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
                      <a href={item.link} className="text-white hover:text-brand-pink-soft transition-colors font-medium">{item.value}</a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-4">Professional Links</p>
              <div className="flex gap-4">
                {[
                  { icon: Terminal, link: contactInfo.socials.github, label: 'GitHub' },
                  { icon: Briefcase, link: contactInfo.socials.linkedin, label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center border border-white/5 hover:bg-brand-pink-primary hover:border-brand-pink-primary hover:text-white text-brand-text-secondary transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-card p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Hidden anti-spam field. Real users should never fill this in. */}
              <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-brand-text-secondary">Full Name</label>
                  <input required minLength={2} maxLength={100} autoComplete="name" type="text" id="name" name="name" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-brand-text-secondary">Email Address</label>
                  <input required maxLength={254} autoComplete="email" type="email" id="email" name="email" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="you@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-text-secondary">Company or Organization</label>
                  <input maxLength={150} autoComplete="organization" type="text" id="company" name="company" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary transition-colors" placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium text-brand-text-secondary">Inquiry Type</label>
                  <select id="projectType" name="projectType" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary appearance-none transition-colors">
                    <option>Project Coordination</option>
                    <option>Process Analysis</option>
                    <option>Web Application</option>
                    <option>Google & AI-Assisted Automation</option>
                    <option>Technical Documentation</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-brand-text-secondary">Message</label>
                <textarea required minLength={10} maxLength={5000} id="message" name="message" rows={5} className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary transition-colors resize-none" placeholder="Tell me about your inquiry..."></textarea>
              </div>

              <p className="text-xs text-brand-text-muted leading-relaxed">
                Your message will be delivered securely to {contactInfo.email}. You will also receive an email confirmation from Mae Ann.
              </p>

              {submitStatus !== 'idle' && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                    submitStatus === 'success'
                      ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
                      : submitStatus === 'error'
                        ? 'border-red-400/25 bg-red-400/10 text-red-200'
                        : 'border-brand-pink-primary/20 bg-brand-pink-primary/10 text-brand-pink-soft'
                  }`}
                >
                  {submitStatus === 'sending' && <Loader2 className="w-5 h-5 shrink-0 animate-spin" />}
                  {submitStatus === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  {submitStatus === 'error' && <XCircle className="w-5 h-5 shrink-0" />}
                  <span>{statusMessage}</span>
                </div>
              )}

              <Button type="submit" disabled={submitStatus === 'sending'} className="w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitStatus === 'sending' ? (
                  <>
                    Sending Message
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    Message Sent
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
