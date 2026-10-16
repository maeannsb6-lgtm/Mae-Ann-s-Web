import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const categories = [
  "Consultation",
  "Quotation",
  "Support",
  "Project Inquiry",
  "Other",
] as const;
const stages = [
  "New",
  "Qualified",
  "Contacted",
  "Proposal",
  "Won",
  "Lost",
] as const;
const architecture = [
  "Website Inquiry",
  "Supabase",
  "n8n",
  "Acknowledgement Email",
  "Owner Notification",
  "Follow-up Workflow",
];

function classify(text: string): (typeof categories)[number] {
  const value = text.toLowerCase();
  if (/quote|quotation|price|cost|budget|proposal/.test(value))
    return "Quotation";
  if (/support|help|issue|problem|error|fix/.test(value)) return "Support";
  if (/project|build|system|automation|workflow|website/.test(value))
    return "Project Inquiry";
  if (/consult|advice|review|assess|analy/.test(value)) return "Consultation";
  return "Other";
}

export function AutomationLab() {
  const [inquiry, setInquiry] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number] | "">(
    "",
  );
  const [stage, setStage] = useState<(typeof stages)[number]>("New");
  const [processed, setProcessed] = useState(false);

  const nextStep = useMemo(() => {
    if (!processed) return "Enter an inquiry to begin.";
    if (category === "Quotation")
      return "Collect scope and budget details, then prepare a proposal.";
    if (category === "Support")
      return "Confirm urgency, affected system, and preferred contact channel.";
    if (category === "Project Inquiry")
      return "Schedule discovery and map the current workflow.";
    if (category === "Consultation")
      return "Clarify the process objective and arrange an initial discussion.";
    return "Review manually and route to the appropriate workflow.";
  }, [category, processed]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inquiry.trim();
    if (value.length < 8) return;
    setCategory(classify(value));
    setStage("New");
    setProcessed(true);
  };

  const reset = () => {
    setInquiry("");
    setCategory("");
    setStage("New");
    setProcessed(false);
  };

  return (
    <section id="automation-lab" className="rd-lab">
      <div className="rd-shell">
        <header className="rd-lab-head" data-reveal>
          <p className="rd-kicker">08 / Automation Lab</p>
          <h2>
            What I build <span>and explore.</span>
          </h2>
          <p>
            A working, rule-based inquiry-routing demo. Sample text stays in
            your browser and is not saved.
          </p>
        </header>

        <div className="rd-app" data-reveal>
          <div className="rd-app-bar">
            <span className="rd-app-dots" aria-hidden="true"><i /><i /><i /></span>
            <strong>Inquiry Router</strong>
            <span className="rd-app-mode">Runs locally in your browser</span>
          </div>

          <div className="rd-app-body">
            <form onSubmit={submit} className="rd-app-input">
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
              <div className="rd-app-buttons">
                <button type="submit" className="rd-btn rd-btn--amber">
                  Run workflow <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={reset} className="rd-btn rd-btn--ghost">
                  Reset <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="rd-app-state" aria-live="polite" data-active={processed ? "true" : "false"}>
              <dl>
                <div>
                  <dt>Classification</dt>
                  <dd className="rd-app-chip">{processed ? category : "Not processed"}</dd>
                </div>
                <div>
                  <dt>Current stage</dt>
                  <dd className="rd-app-chip">{processed ? stage : "—"}</dd>
                </div>
                <div className="rd-app-next">
                  <dt>Suggested next step</dt>
                  <dd>{nextStep}</dd>
                </div>
              </dl>
              <ol className="rd-app-stages" aria-label="Pipeline stage">
                {stages.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      disabled={!processed}
                      onClick={() => setStage(item)}
                      aria-pressed={processed && stage === item}
                      className={processed && stage === item ? "is-active" : ""}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="rd-lab-arch" data-reveal aria-label="Production architecture prepared">
          <p className="rd-label">Production architecture prepared</p>
          <ol>
            {architecture.map((item, index) => (
              <li key={item}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              </li>
            ))}
          </ol>
          <details className="rd-lab-note">
            <summary>Integration details</summary>
            <p>
              The contact workflow supports Supabase storage, an optional n8n
              webhook, and the existing Google Apps Script email integration.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
