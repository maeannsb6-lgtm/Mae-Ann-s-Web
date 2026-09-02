import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Beaker, Database, RotateCcw, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Workflow } from '../ui/Workflow';

const categories = ['Consultation', 'Quotation', 'Support', 'Project Inquiry', 'Other'] as const;
const stages = ['New', 'Qualified', 'Contacted', 'Proposal', 'Won', 'Lost'] as const;

function classify(text: string): typeof categories[number] {
  const value = text.toLowerCase();
  if (/quote|quotation|price|cost|budget|proposal/.test(value)) return 'Quotation';
  if (/support|help|issue|problem|error|fix/.test(value)) return 'Support';
  if (/project|build|system|automation|workflow|website/.test(value)) return 'Project Inquiry';
  if (/consult|advice|review|assess|analy/.test(value)) return 'Consultation';
  return 'Other';
}

export function AutomationLab() {
  const [inquiry, setInquiry] = useState('');
  const [category, setCategory] = useState<typeof categories[number] | ''>('');
  const [stage, setStage] = useState<typeof stages[number]>('New');
  const [processed, setProcessed] = useState(false);
  const suggestedNextStep = useMemo(() => {
    if (!processed) return 'Enter an inquiry to begin.';
    if (category === 'Quotation') return 'Collect scope and budget details, then prepare a proposal.';
    if (category === 'Support') return 'Confirm urgency, affected system, and preferred contact channel.';
    if (category === 'Project Inquiry') return 'Schedule discovery and map the current workflow.';
    if (category === 'Consultation') return 'Clarify the process objective and arrange an initial discussion.';
    return 'Review manually and route to the appropriate workflow.';
  }, [category, processed]);

  const handleProcess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inquiry.trim();
    if (trimmed.length < 8) return;
    setCategory(classify(trimmed));
    setStage('New');
    setProcessed(true);
  };

  const reset = () => { setInquiry(''); setCategory(''); setStage('New'); setProcessed(false); };

  return (
    <section id="automation-lab" className="section-shell bg-brand-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Automation Lab" title="Client Relations Automation — portfolio demo" description="A working, rule-based demonstration of inquiry classification and status routing. Sample text is processed only in your browser and is not saved." className="mb-12" />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <form onSubmit={handleProcess} className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3"><Beaker className="h-5 w-5 text-brand-accent" /><h3 className="text-lg font-semibold text-white">Lead routing demo</h3></div>
            <label htmlFor="demo-inquiry" className="text-sm font-medium text-brand-text-secondary">Sample inquiry</label>
            <textarea id="demo-inquiry" value={inquiry} onChange={(event) => setInquiry(event.target.value)} minLength={8} maxLength={500} required rows={5} className="form-control mt-2" placeholder="Example: We need help automating our quotation follow-up process." />
            <p className="mt-2 text-xs text-brand-text-muted">Minimum 8 characters. No information leaves this page.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Button type="submit">Classify Inquiry <Sparkles className="ml-2 h-4 w-4" /></Button><Button type="button" variant="ghost" onClick={reset}>Reset <RotateCcw className="ml-2 h-4 w-4" /></Button></div>
          </form>

          <div className="rounded-2xl border border-white/[0.08] bg-brand-card p-6 sm:p-8" aria-live="polite">
            <div className="flex items-center gap-3"><Database className="h-5 w-5 text-brand-accent" /><h3 className="text-lg font-semibold text-white">Current workflow state</h3></div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="status-panel"><dt>Classification</dt><dd>{processed ? category : 'Not processed'}</dd></div>
              <div className="status-panel"><dt>Current stage</dt><dd>{processed ? stage : '—'}</dd></div>
              <div className="status-panel sm:col-span-2"><dt>Suggested next step</dt><dd>{suggestedNextStep}</dd></div>
            </dl>
            {processed && <div className="mt-6"><p className="mb-3 text-sm font-medium text-brand-text-secondary">Update demo status</p><div className="flex flex-wrap gap-2">{stages.map((item) => <button key={item} type="button" onClick={() => setStage(item)} className={`rounded-full border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${stage === item ? 'border-brand-accent bg-brand-accent text-brand-bg-primary' : 'border-white/10 text-brand-text-muted hover:border-brand-accent/40 hover:text-white'}`}>{item}</button>)}</div></div>}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-brand-accent/20 bg-brand-accent/[0.035] p-6 sm:p-8">
          <p className="eyebrow">Production architecture prepared</p>
          <Workflow steps={['Website Inquiry', 'Supabase', 'n8n', 'Acknowledgement Email', 'Owner Notification', 'Follow-up Workflow']} ariaLabel="Contact automation architecture" />
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-brand-text-muted"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-accent" />The live contact endpoint supports secure environment-based Supabase storage and an optional n8n webhook. It continues to support the existing Google Apps Script email workflow.</p>
        </div>
      </div>
    </section>
  );
}
