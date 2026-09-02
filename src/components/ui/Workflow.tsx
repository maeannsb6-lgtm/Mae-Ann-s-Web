import { ArrowDown, ArrowRight } from 'lucide-react';

interface WorkflowProps {
  steps: string[];
  ariaLabel: string;
  compact?: boolean;
}

export function Workflow({ steps, ariaLabel, compact = false }: WorkflowProps) {
  return (
    <ol aria-label={ariaLabel} className={`workflow-list ${compact ? 'workflow-list--compact' : ''}`}>
      {steps.map((step, index) => (
        <li key={`${step}-${index}`} className="contents">
          <div className="workflow-node"><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>
          {index < steps.length - 1 && <div className="workflow-arrow" aria-hidden="true"><ArrowRight className="hidden h-4 w-4 md:block" /><ArrowDown className="h-4 w-4 md:hidden" /></div>}
        </li>
      ))}
    </ol>
  );
}

export function ProcessImpact({ items }: { items: string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="rounded-xl border border-white/[0.08] bg-brand-bg-primary/55 px-4 py-3 text-sm text-brand-text-secondary"><span className="mr-2 text-brand-accent">✓</span>{item}</li>)}</ul>;
}

export function ProcessMetrics({ metrics }: { metrics?: Array<{ label: string; value: string }> }) {
  if (!metrics?.length) return null;
  return <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map((metric) => <div key={metric.label} className="rounded-xl border border-white/10 p-4"><dt className="text-sm text-brand-text-muted">{metric.label}</dt><dd className="mt-2 text-2xl font-semibold text-white">{metric.value}</dd></div>)}</dl>;
}
