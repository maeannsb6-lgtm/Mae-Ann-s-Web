import { useEffect, useRef, useState } from 'react';
import { approachSteps } from '../../data/content';

/**
 * 03 / Optimization: an explanatory process that becomes organised stage by stage.
 * The diagram is illustrative (generic steps), not a measured project result.
 */
type NodeId = 'input' | 'check' | 'rekey' | 'wait' | 'approve' | 'output';
type Place = { x: number; y: number; hidden?: boolean };

const NODES: { id: NodeId; label: string }[] = [
  { id: 'input', label: 'Request in' },
  { id: 'check', label: 'Check details' },
  { id: 'rekey', label: 'Re-enter data' },
  { id: 'wait', label: 'Wait for sign-off' },
  { id: 'approve', label: 'Approve' },
  { id: 'output', label: 'Deliver' },
];

const MESSY: Record<NodeId, Place> = {
  input: { x: 90, y: 120 }, check: { x: 330, y: 70 }, rekey: { x: 180, y: 260 },
  wait: { x: 470, y: 250 }, approve: { x: 300, y: 175 }, output: { x: 545, y: 120 },
};
const LANE: Record<NodeId, Place> = {
  input: { x: 60, y: 180 }, check: { x: 160, y: 180 }, rekey: { x: 260, y: 180 },
  wait: { x: 360, y: 180 }, approve: { x: 460, y: 180 }, output: { x: 560, y: 180 },
};
const LEAN: Record<NodeId, Place> = {
  input: { x: 80, y: 180 }, check: { x: 240, y: 180 }, rekey: { x: 260, y: 180, hidden: true },
  wait: { x: 360, y: 180, hidden: true }, approve: { x: 400, y: 180 }, output: { x: 560, y: 180 },
};
const LAYOUT = [MESSY, LANE, LANE, LEAN, LEAN, LEAN, LEAN];

/** What the diagram is showing at each stage, in plain words. */
const CAPTIONS = [
  'The process as it runs today: steps, loops and hand-offs nobody has drawn yet.',
  'Inputs, steps, decisions and outputs laid out in order.',
  'Duplicate data entry and a waiting step stand out as waste and a bottleneck.',
  'The redesigned flow keeps only the steps that add value.',
  'Repetitive hand-offs are connected by automation where it helps.',
  'Each step is checked, with a defined path for exceptions.',
  'The final process, written down as a reusable SOP.',
];

export function Approach() {
  const [stage, setStage] = useState(0);
  const section = useRef<HTMLElement>(null);
  const manual = useRef<number | null>(null);

  // Scrolling through the section advances the stages; a click takes over until the visitor scrolls on.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = section.current?.querySelector<HTMLElement>('.rd-opt-runway');
      // Phones and tablets use the stepper by tap; only wide screens pin and scroll through the stages.
      if (!el || window.innerWidth <= 1080) return;
      if (manual.current !== null) {
        if (Math.abs(window.scrollY - manual.current) < 260) return;
        manual.current = null;
      }
      // The studio is pinned while its runway scrolls past: one screen of scrolling covers all seven stages.
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight * 0.9;
      const progress = (window.innerHeight * 0.12 - rect.top) / Math.max(span, 1);
      setStage(Math.max(0, Math.min(6, Math.floor(progress * 7))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const choose = (index: number) => {
    manual.current = window.scrollY;
    setStage(index);
  };

  return (
    <section id="approach" ref={section} className="rd-opt" data-story-stage="2" data-stage={stage}>
      <div className="rd-shell">
        <header className="rd-opt-head" data-reveal>
          <p className="rd-kicker">03 / Optimization</p>
          <h2>
            Understand first.
            <br />
            <span>Automate</span> second.
          </h2>
          <p>A practical sequence for turning unclear work into an improved, documented system.</p>
        </header>

        <div className="rd-opt-runway">
        <div className="rd-opt-studio" data-reveal>
          <ol className="rd-opt-steps" aria-label="Optimization stages">
            {approachSteps.map((step, index) => (
              <li key={step.number} className={index === stage ? 'is-active' : index < stage ? 'is-done' : ''}>
                <button type="button" onClick={() => choose(index)} aria-current={index === stage ? 'step' : undefined}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                </button>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <figure className="rd-opt-canvas">
            <div className="rd-opt-canvas-top">
              <span>
                Stage {approachSteps[stage].number} · {approachSteps[stage].title}
              </span>
              <span className="rd-opt-dots" aria-hidden="true">
                {approachSteps.map((step, index) => (
                  <i key={step.number} className={index <= stage ? 'is-on' : ''} />
                ))}
              </span>
            </div>
            <ProcessDiagram stage={stage} />
            <figcaption aria-live="polite">{CAPTIONS[stage]}</figcaption>
          </figure>
        </div>
        </div>
      </div>
    </section>
  );
}

function ProcessDiagram({ stage }: { stage: number }) {
  const place = LAYOUT[stage];
  const visible = NODES.filter((n) => !place[n.id].hidden);
  const at = (id: NodeId) => place[id];

  // Before mapping: tangled loops between steps. After: one ordered lane.
  const messyPaths = [
    'M90 120 C 200 20, 260 40, 330 70', 'M330 70 C 420 120, 160 160, 180 260', 'M180 260 C 260 330, 420 330, 470 250',
    'M470 250 C 520 180, 200 120, 300 175', 'M300 175 C 360 230, 120 230, 180 260', 'M300 175 C 420 90, 500 80, 545 120',
  ];

  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={`Process diagram: ${CAPTIONS[stage]}`}>
      <defs>
        <marker id="rd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
      </defs>

      <g className="rd-opt-grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="360" />)}
        {Array.from({ length: 5 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 90} x2="640" y2={i * 90} />)}
      </g>

      {stage === 0 && (
        <g className="rd-opt-tangle">
          {messyPaths.map((d) => <path key={d} d={d} />)}
        </g>
      )}

      {stage >= 1 && (
        <g className="rd-opt-flow">
          {visible.slice(0, -1).map((node, i) => {
            const a = at(node.id);
            const b = at(visible[i + 1].id);
            const waste = stage === 2 && (node.id === 'check' || node.id === 'rekey' || node.id === 'wait');
            return (
              <line key={`${node.id}-${visible[i + 1].id}`} x1={a.x + 34} y1={a.y} x2={b.x - 38} y2={b.y}
                className={waste ? 'is-waste' : ''} markerEnd="url(#rd-arrow)" />
            );
          })}
        </g>
      )}

      {stage === 1 && (
        <g className="rd-opt-io">
          <text x="60" y="122" textAnchor="middle">INPUT</text>
          <text x="560" y="122" textAnchor="middle">OUTPUT</text>
          <text x="460" y="252" textAnchor="middle">DECISION</text>
        </g>
      )}

      {stage === 4 && (
        <g className="rd-opt-auto">
          <rect x="270" y="38" width="100" height="34" rx="17" />
          <text x="320" y="60" textAnchor="middle">Automation</text>
          {visible.map((n) => (
            <path key={n.id} d={`M320 72 Q ${(320 + at(n.id).x) / 2} ${110} ${at(n.id).x} ${at(n.id).y - 30}`} />
          ))}
        </g>
      )}

      {stage === 5 && (
        <g className="rd-opt-exception">
          <path d="M240 210 L240 290 L400 290 L400 210" markerEnd="url(#rd-arrow)" />
          <rect x="262" y="272" width="116" height="36" rx="8" />
          <text x="320" y="295" textAnchor="middle">Exception review</text>
        </g>
      )}

      {NODES.map((node) => {
        const p = at(node.id);
        const flagged = stage === 2 && (node.id === 'rekey' || node.id === 'wait');
        const diamond = stage >= 1 && node.id === 'approve';
        return (
          <g key={node.id} className={`rd-opt-node${flagged ? ' is-flagged' : ''}${p.hidden ? ' is-gone' : ''}`}
            style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
            {diamond ? <rect x="-26" y="-26" width="52" height="52" rx="6" transform="rotate(45)" /> : <rect x="-36" y="-24" width="72" height="48" rx="10" />}
            <text y="44" textAnchor="middle">{node.label}</text>
            {flagged && <text className="rd-opt-flag" y="-34" textAnchor="middle">{node.id === 'wait' ? 'Bottleneck' : 'Duplicate'}</text>}
            {stage >= 5 && !p.hidden && <circle className="rd-opt-check" cx="30" cy="-22" r="9" />}
            {stage >= 5 && !p.hidden && <path className="rd-opt-tick" d="M26 -22 l3 3 l5 -6" />}
          </g>
        );
      })}

      {stage === 6 && (
        <g className="rd-opt-doc">
          <rect x="440" y="234" width="170" height="112" rx="10" />
          <text x="458" y="260">SOP · Request handling</text>
          {['1  Request in', '2  Check details', '3  Approve', '4  Deliver'].map((line, i) => (
            <text key={line} className="rd-opt-doc-line" x="458" y={284 + i * 16}>{line}</text>
          ))}
        </g>
      )}
    </svg>
  );
}
