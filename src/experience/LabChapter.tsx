import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { labArchitecture } from '../data/story';

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

export function LabChapter() {
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
    if (inquiry.trim().length < 8) return;
    setCategory(classify(inquiry));
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
    <section id="automation-lab" className="lab-chapter story-section" aria-labelledby="lab-title">
      <header className="story-heading lab-heading">
        <p><span>06</span> Automation lab</p>
        <h2 id="lab-title">A system should behave, not just look technical.</h2>
        <p className="story-heading-lead">This demo processes sample text locally in your browser. It is intentionally rule-based and does not claim commercial client work.</p>
      </header>

      <div className="lab-machine">
        <form onSubmit={submit} className="lab-input">
          <label htmlFor="demo-inquiry">Input</label>
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
          <p>No information leaves this page.</p>
        </form>

        <div className="lab-routing" aria-live="polite">
          <div className="lab-signal" data-active={processed ? 'true' : 'false'} />
          <dl>
            <div><dt>Classification</dt><dd>{processed ? category : 'Awaiting input'}</dd></div>
            <div><dt>Stage</dt><dd>{processed ? stage : '—'}</dd></div>
            <div><dt>Next step</dt><dd>{nextStep}</dd></div>
          </dl>
          {processed && (
            <div className="lab-stages">
              {stages.map((item) => <button key={item} type="button" onClick={() => setStage(item)} className={stage === item ? 'is-active' : ''}>{item}</button>)}
            </div>
          )}
        </div>
      </div>

      <div className="lab-architecture" aria-label="Production architecture">
        {labArchitecture.map((item, index) => (
          <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < labArchitecture.length - 1 && <i aria-hidden="true" />}</div>
        ))}
      </div>
      <p className="lab-note">The live contact endpoint supports secure environment-based Supabase storage and an optional n8n webhook. It continues to support the existing Google Apps Script email workflow.</p>
    </section>
  );
}
