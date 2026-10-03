import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

const categories = ['Consultation', 'Quotation', 'Support', 'Project Inquiry', 'Other'] as const;
const stages = ['New', 'Qualified', 'Contacted', 'Proposal', 'Won', 'Lost'] as const;
const architecture = ['Website Inquiry', 'Supabase', 'n8n', 'Acknowledgement Email', 'Owner Notification', 'Follow-up Workflow'];

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

  const nextStep = useMemo(() => {
    if (!processed) return 'Enter an inquiry to begin.';
    if (category === 'Quotation') return 'Collect scope and budget details, then prepare a proposal.';
    if (category === 'Support') return 'Confirm urgency, affected system, and preferred contact channel.';
    if (category === 'Project Inquiry') return 'Schedule discovery and map the current workflow.';
    if (category === 'Consultation') return 'Clarify the process objective and arrange an initial discussion.';
    return 'Review manually and route to the appropriate workflow.';
  }, [category, processed]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inquiry.trim();
    if (value.length < 8) return;
    setCategory(classify(value));
    setStage('New');
    setProcessed(true);
  };

  const reset = () => {
    setInquiry('');
    setCategory('');
    setStage('New');
    setProcessed(false);
  };

  return (
    <section id="automation-lab" className="pro-section pro-lab">
      <div className="pro-section-shell">
        <div className="pro-section-intro">
          <div><p className="pro-kicker">Automation Lab</p><h2>What I build and explore.</h2></div>
          <p>A working, rule-based inquiry-routing demo. Sample text stays in your browser and is not saved.</p>
        </div>

        <div className="pro-lab-layout">
          <form onSubmit={submit} className="pro-lab-input">
            <label htmlFor="demo-inquiry">Sample inquiry</label>
            <textarea
              id="demo-inquiry"
              value={inquiry}
              onChange={(event) => setInquiry(event.target.value)}
              minLength={8}
              maxLength={500}
              required
              rows={6}
              placeholder="Example: We need help automating our quotation follow-up process."
            />
            <div>
              <button type="submit">Run workflow <ArrowRight className="h-4 w-4" /></button>
              <button type="button" onClick={reset}>Reset <RotateCcw className="h-4 w-4" /></button>
            </div>
          </form>

          <div className="pro-lab-state" aria-live="polite">
            <div className="pro-lab-signal" data-active={processed ? 'true' : 'false'} />
            <dl>
              <div><dt>Classification</dt><dd>{processed ? category : 'Not processed'}</dd></div>
              <div><dt>Current stage</dt><dd>{processed ? stage : '—'}</dd></div>
              <div><dt>Suggested next step</dt><dd>{nextStep}</dd></div>
            </dl>
            {processed && (
              <div className="pro-lab-stages">
                {stages.map((item) => <button key={item} type="button" onClick={() => setStage(item)} className={stage === item ? 'is-active' : ''}>{item}</button>)}
              </div>
            )}
          </div>
        </div>

        <div className="pro-lab-architecture" aria-label="Production architecture prepared">
          {architecture.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              {index < architecture.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>
        <p className="pro-lab-note">The live contact endpoint supports secure environment-based Supabase storage and an optional n8n webhook. It continues to support the existing Google Apps Script email workflow.</p>
      </div>
    </section>
  );
}
