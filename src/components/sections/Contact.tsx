import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/content';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

interface ContactResponse {
  success?: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  confirmationSent?: boolean;
}

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.75l.41-3.2H13.5V8.76c0-.93.26-1.56 1.59-1.56H16.8V4.34c-.3-.04-1.31-.13-2.5-.13-2.47 0-4.16 1.51-4.16 4.28v2.31H7.35V14h2.79v8h3.36Z" />
    </svg>
  );
}

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `contact-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const submissionIdRef = useRef('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitStatus === 'sending') return;

    const form = event.currentTarget;

    // Run native browser validation before sending anything to the backend.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const fullName = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const inquiryType = String(formData.get('projectType') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const website = String(formData.get('website') || '').trim();

    if (!fullName || !email || !inquiryType || !message) {
      setSubmitStatus('error');
      setStatusMessage('Please complete all required fields.');
      return;
    }

    if (message.length < 10) {
      setSubmitStatus('error');
      setStatusMessage('Please enter a message with at least 10 characters.');
      return;
    }

    // Keep one client ID for this submission attempt. This supports backend
    // duplicate protection if the same request is retried unexpectedly.
    if (!submissionIdRef.current) {
      submissionIdRef.current = createSubmissionId();
    }

    const payload = {
      fullName,
      email,
      company,
      inquiryType,
      message,
      website, // Honeypot: real users leave this blank.
      clientSubmissionId: submissionIdRef.current,
    };

    setReferenceId('');
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
        throw new Error(result.message || result.error || 'Your message could not be sent. Please try again.');
      }

      const returnedReferenceId = String(result.referenceId || '').trim();

      form.reset();
      submissionIdRef.current = '';
      setReferenceId(returnedReferenceId);
      setSubmitStatus('success');
      setStatusMessage(
        result.message || 'Thank you! Your message has been received successfully.',
      );
    } catch (error) {
      // Keep the same submission ID on failure so a safe retry can be recognized
      // by the backend if the first request was actually recorded before the
      // network response was interrupted.
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
                  <div className="depth-chip w-12 h-12 bg-brand-card rounded-xl flex items-center justify-center border border-white/5 group-hover:border-brand-pink-primary/30 group-hover:bg-brand-pink-primary/10 transition-colors">
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
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Briefcase, link: contactInfo.socials.linkedin, label: 'LinkedIn' },
                  { icon: FacebookIcon, link: contactInfo.socials.facebook, label: 'Facebook' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label === 'Facebook' ? 'Mae Ann Bodiongan on Facebook' : social.label}
                    title={social.label}
                    className="depth-button w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center border border-white/5 hover:bg-brand-pink-primary/15 hover:border-brand-pink-primary hover:text-brand-pink-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-secondary text-brand-text-secondary transition-all"
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
            className="depth-panel bg-brand-card p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden"
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
                  <input required minLength={2} maxLength={150} autoComplete="name" type="text" id="name" name="name" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-brand-text-secondary">Email Address</label>
                  <input required maxLength={254} autoComplete="email" type="email" id="email" name="email" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary focus:ring-1 focus:ring-brand-pink-primary transition-colors" placeholder="you@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-text-secondary">Company or Organization</label>
                  <input maxLength={200} autoComplete="organization" type="text" id="company" name="company" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary transition-colors" placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium text-brand-text-secondary">Inquiry Type</label>
                  <select required id="projectType" name="projectType" className="w-full bg-brand-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-pink-primary appearance-none transition-colors">
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
                Your inquiry will be recorded securely and delivered to {contactInfo.email}. You will also receive an email confirmation when delivery succeeds.
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
                  <span>
                    {statusMessage}
                    {submitStatus === 'success' && referenceId && (
                      <span className="block mt-1 font-semibold text-white">Reference ID: {referenceId}</span>
                    )}
                  </span>
                </div>
              )}

              <Button type="submit" disabled={submitStatus === 'sending'} className="w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitStatus === 'sending' ? (
                  <>
                    Sending...
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
