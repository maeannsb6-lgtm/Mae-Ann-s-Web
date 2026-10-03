import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react';
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
    setStatus('sending');
    setMessage('Sending your inquiry securely…');
    setReferenceId('');

    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({})) as ContactResponse;
      if (!response.ok || !result.success) throw new Error(result.message || result.error || 'Something went wrong. Please try again.');
      form.reset();
      submissionId.current = '';
      setStatus('success');
      setReferenceId(result.referenceId || '');
      setMessage(result.message || 'Message sent successfully.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : `Something went wrong. Please email ${contactInfo.email}.`);
    }
  };

  return (
    <section id="contact" className="pro-section pro-contact">
      <div className="pro-section-shell pro-contact-layout">
        <div className="pro-contact-copy">
          <p className="pro-kicker">Contact</p>
          <h2>Let’s talk about the role, process, or system.</h2>
          <p>For remote opportunities, project collaboration, process improvement, and selected automation work.</p>

          <div className="pro-contact-links">
            <a href={`mailto:${contactInfo.email}`}><Mail className="h-4 w-4" />{contactInfo.email}</a>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}><Phone className="h-4 w-4" />{contactInfo.phone}</a>
            <a href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinMark className="h-4 w-4" />LinkedIn</a>
            <a href={contactInfo.socials.github} target="_blank" rel="noopener noreferrer"><GithubMark className="h-4 w-4" />GitHub</a>
            <span><MapPin className="h-4 w-4" />{contactInfo.location}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pro-contact-form">
          <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <div className="pro-contact-grid">
            <Field label="Name" htmlFor="name"><input required minLength={2} maxLength={150} autoComplete="name" id="name" name="name" placeholder="Your name" /></Field>
            <Field label="Email" htmlFor="email"><input required maxLength={254} autoComplete="email" type="email" id="email" name="email" placeholder="you@example.com" /></Field>
            <Field label="Company" htmlFor="company"><input maxLength={200} autoComplete="organization" id="company" name="company" placeholder="Company or organization" /></Field>
            <Field label="What do you need help with?" htmlFor="inquiryType">
              <select required id="inquiryType" name="inquiryType" defaultValue="">
                <option value="" disabled>Select an inquiry type</option>
                <option>Process Improvement</option><option>Automation</option><option>Client Workflow</option><option>AI Integration</option><option>Website/System</option><option>Other</option>
              </select>
            </Field>
          </div>

          <Field label="Message" htmlFor="message"><textarea required minLength={10} maxLength={5000} id="message" name="message" placeholder="Describe the role, process, or project you would like to discuss." /></Field>
          <p className="pro-contact-privacy">Your details are used only to respond to this inquiry. Please do not include sensitive personal or company information.</p>

          {status !== 'idle' && (
            <div role="status" aria-live="polite" className={'pro-contact-status pro-contact-status--' + status}>
              {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === 'success' && <CheckCircle2 className="h-4 w-4" />}
              {status === 'error' && <XCircle className="h-4 w-4" />}
              <span>{message}{status === 'success' && referenceId && <strong>Reference: {referenceId}</strong>}</span>
            </div>
          )}

          <button type="submit" disabled={status === 'sending'} data-track="contact-submit" className="pro-contact-submit">
            {status === 'sending' ? 'Sending…' : 'Send inquiry'}{status !== 'sending' && <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return <label htmlFor={htmlFor} className="pro-field"><span>{label}</span>{children}</label>;
}
