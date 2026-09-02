import { useRef, useState } from 'react';
import type { ComponentType, FormEvent, ReactNode } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Send, XCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { contactInfo } from '../../data/content';
import { GithubMark, LinkedinMark } from '../ui/BrandIcons';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
interface ContactResponse { success?: boolean; referenceId?: string; message?: string; error?: string; }

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `contact-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const submissionId = useRef('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      company: String(data.get('company') || '').trim(),
      inquiryType: String(data.get('inquiryType') || '').trim(),
      message: String(data.get('message') || '').trim(),
      website: String(data.get('website') || '').trim(),
      clientSubmissionId: submissionId.current || createSubmissionId(),
    };
    submissionId.current = payload.clientSubmissionId;
    setStatus('sending'); setMessage('Sending your inquiry securely…'); setReferenceId('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({})) as ContactResponse;
      if (!response.ok || !result.success) throw new Error(result.message || result.error || 'Something went wrong. Please try again.');
      form.reset(); submissionId.current = ''; setStatus('success'); setReferenceId(result.referenceId || ''); setMessage(result.message || 'Message sent successfully.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : `Something went wrong. Please email ${contactInfo.email}.`);
    }
  };

  return (
    <section id="contact" className="section-shell bg-brand-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:px-8">
        <div>
          <SectionHeading label="Contact" title="Have a process that feels too manual?" description="Let’s find a smarter way to run it." align="left" className="mb-8" />
          <p className="leading-7 text-brand-text-muted">For remote roles, project collaboration, process improvement, and selected automation work.</p>
          <div className="mt-8 space-y-4">
            <ContactLink href={`mailto:${contactInfo.email}`} icon={Mail} label="Email" value={contactInfo.email} />
            <ContactLink href={contactInfo.socials.linkedin} icon={LinkedinMark} label="LinkedIn" value="Connect professionally" external />
            <ContactLink href={contactInfo.socials.github} icon={GithubMark} label="GitHub" value="View public repositories" external />
            <div className="flex items-center gap-4 rounded-xl border border-white/[0.08] p-4"><MapPin className="h-5 w-5 text-brand-accent" /><div><p className="text-xs text-brand-text-muted">Location</p><p className="text-sm font-medium text-white">{contactInfo.location}</p></div></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.09] bg-brand-card p-6 sm:p-8" noValidate={false}>
          <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name"><input className="form-control" required minLength={2} maxLength={150} autoComplete="name" id="name" name="name" placeholder="Your name" /></Field>
            <Field label="Email" htmlFor="email"><input className="form-control" required maxLength={254} autoComplete="email" type="email" id="email" name="email" placeholder="you@example.com" /></Field>
            <Field label="Company" htmlFor="company"><input className="form-control" maxLength={200} autoComplete="organization" id="company" name="company" placeholder="Company or organization" /></Field>
            <Field label="What do you need help with?" htmlFor="inquiryType"><select className="form-control" required id="inquiryType" name="inquiryType" defaultValue=""><option value="" disabled>Select an inquiry type</option><option>Process Improvement</option><option>Automation</option><option>Client Workflow</option><option>AI Integration</option><option>Website/System</option><option>Other</option></select></Field>
          </div>
          <div className="mt-5"><Field label="Message" htmlFor="message"><textarea className="form-control min-h-36 resize-y" required minLength={10} maxLength={5000} id="message" name="message" placeholder="Describe the process, role, or project you would like to discuss." /></Field></div>
          <p className="mt-4 text-xs leading-5 text-brand-text-muted">Your details are used only to respond to this inquiry. Please do not include sensitive personal or company information.</p>
          {status !== 'idle' && <div role="status" aria-live="polite" className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${status === 'success' ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100' : status === 'error' ? 'border-red-400/25 bg-red-400/10 text-red-100' : 'border-brand-accent/25 bg-brand-accent/10 text-brand-accent-bright'}`}>{status === 'sending' && <Loader2 className="h-5 w-5 shrink-0 animate-spin" />}{status === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0" />}{status === 'error' && <XCircle className="h-5 w-5 shrink-0" />}<span>{message}{status === 'success' && referenceId && <span className="mt-1 block font-semibold text-white">Reference: {referenceId}</span>}</span></div>}
          <Button type="submit" disabled={status === 'sending'} data-track="contact-submit" className="mt-6 w-full gap-2">{status === 'sending' ? 'Sending…' : 'Send Inquiry'}{status !== 'sending' && <Send className="h-4 w-4" />}</Button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-brand-text-secondary">{label}<span className="mt-2 block">{children}</span></label>;
}

function ContactLink({ href, icon: Icon, label, value, external = false }: { href: string; icon: ComponentType<{ className?: string }>; label: string; value: string; external?: boolean }) {
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 rounded-xl border border-white/[0.08] p-4 transition hover:border-brand-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"><Icon className="h-5 w-5 text-brand-accent" /><div><p className="text-xs text-brand-text-muted">{label}</p><p className="text-sm font-medium text-white">{value}</p></div></a>;
}
