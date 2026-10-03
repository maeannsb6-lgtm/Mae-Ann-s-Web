import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { approachSteps, experience, opportunityGroups, whatIDo } from '../../data/content';
import { solarCaseStudy } from '../../data/story';
import { useFilm } from './FilmController';

const labFlow = ['Website Inquiry', 'Supabase', 'n8n', 'Acknowledgement', 'Owner Notification', 'Follow-up'];
const storySteps = ['Observe', 'Analyze', 'Improve'];

export default function PurposeStage() {
  const { active, local, reducedMotion, compact } = useFilm();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || compact || reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = (event.clientX / Math.max(1, window.innerWidth) - .5) * 2;
      targetY = (event.clientY / Math.max(1, window.innerHeight) - .5) * 2;
    };

    const render = () => {
      x += (targetX - x) * .045;
      y += (targetY - y) * .045;
      stage.style.setProperty('--film-ry', `${x * 3.2}deg`);
      stage.style.setProperty('--film-rx', `${y * -2.4}deg`);
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, [compact, reducedMotion]);

  const travelZ = reducedMotion || compact ? 0 : (local - .5) * 72;
  const travelY = reducedMotion || compact ? 0 : (local - .5) * -18;

  return (
    <div ref={stageRef} className="purpose-stage" aria-hidden="true">
      <div className="purpose-stage-camera" style={{ transform: `translate3d(0,${travelY}px,${travelZ}px) rotateX(var(--film-rx)) rotateY(var(--film-ry))` }}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active}
            className="purpose-stage-scene"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: .88, z: -240 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08, z: 180 }}
            transition={{ duration: reducedMotion ? .12 : .75, ease: [0.16, 1, 0.3, 1] }}
          >
            <SceneContent scene={active} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="purpose-stage-vignette" />
    </div>
  );
}

function SceneContent({ scene }: { scene: number }) {
  if (scene === 0) return <IdentitySystem />;
  if (scene === 1) return <StorySystem />;
  if (scene === 2) return <CapabilitySystem />;
  if (scene === 3) return <ProcessSystem />;
  if (scene === 4) return <ProjectSystem />;
  if (scene === 5) return <JourneySystem />;
  if (scene === 6) return <LabSystem />;
  if (scene === 7) return <FutureSystem />;
  return <ContactSystem />;
}

function IdentitySystem() {
  const layers = ['Process', 'Systems', 'Automation'];
  return (
    <div className="stage-system stage-system--identity">
      <div className="stage-core"><span>IE</span><strong>Industrial<br/>Engineering</strong></div>
      {layers.map((item, index) => (
        <div key={item} className="stage-plate" style={{ '--i': index } as CSSProperties}>
          <span>0{index + 1}</span><strong>{item}</strong>
        </div>
      ))}
      <div className="stage-axis stage-axis--x" />
      <div className="stage-axis stage-axis--y" />
    </div>
  );
}

function StorySystem() {
  return (
    <div className="stage-system stage-system--story">
      {storySteps.map((item, index) => (
        <div key={item} className="stage-story-module" style={{ '--i': index } as CSSProperties}>
          <span>0{index + 1}</span>
          <strong>{item}</strong>
          <small>{index === 0 ? 'How does work move?' : index === 1 ? 'Where is the constraint?' : 'What should change?'}</small>
        </div>
      ))}
      <div className="stage-story-path" />
    </div>
  );
}

function CapabilitySystem() {
  return (
    <div className="stage-system stage-system--capabilities">
      <div className="stage-capability-core"><span>Foundation</span><strong>Industrial<br/>Engineering</strong></div>
      {whatIDo.map((item, index) => (
        <div key={item.title} className="stage-capability-module" style={{ '--i': index } as CSSProperties}>
          <span>0{index + 1}</span><strong>{item.title}</strong>
        </div>
      ))}
    </div>
  );
}

function ProcessSystem() {
  return (
    <div className="stage-system stage-system--process">
      <div className="stage-process-track" />
      {approachSteps.map((step, index) => (
        <div key={step.number} className="stage-process-step" style={{ '--i': index } as CSSProperties}>
          <span>{step.number}</span><strong>{step.title}</strong>
        </div>
      ))}
    </div>
  );
}

function ProjectSystem() {
  return (
    <div className="stage-system stage-system--project">
      <div className="stage-project-spine" />
      {solarCaseStudy.flow.map((step, index) => (
        <div key={step} className="stage-project-station" style={{ '--i': index } as CSSProperties}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>
        </div>
      ))}
      <div className="stage-project-output"><span>Output</span><strong>Proposal + Client Workflow</strong></div>
    </div>
  );
}

function JourneySystem() {
  return (
    <div className="stage-system stage-system--journey">
      <div className="stage-journey-path" />
      {experience.slice().reverse().map((item, index) => (
        <div key={item.id} className="stage-journey-stop" style={{ '--i': index } as CSSProperties}>
          <span>{item.period}</span><strong>{item.company}</strong>
        </div>
      ))}
      <div className="stage-journey-degree"><span>2021–2025</span><strong>BS Industrial Engineering</strong></div>
    </div>
  );
}

function LabSystem() {
  return (
    <div className="stage-system stage-system--lab">
      {labFlow.map((step, index) => (
        <div key={step} className="stage-lab-node" style={{ '--i': index } as CSSProperties}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>
        </div>
      ))}
      <div className="stage-lab-pulse" />
    </div>
  );
}

function FutureSystem() {
  return (
    <div className="stage-system stage-system--future">
      <div className="stage-future-origin"><span>Next</span></div>
      {opportunityGroups.map((group, index) => (
        <div key={group.title} className="stage-future-path" style={{ '--i': index } as CSSProperties}>
          <span>0{index + 1}</span><strong>{group.title}</strong>
        </div>
      ))}
    </div>
  );
}

function ContactSystem() {
  return (
    <div className="stage-system stage-system--contact">
      <div className="stage-contact-source stage-contact-source--a">Role</div>
      <div className="stage-contact-source stage-contact-source--b">Process</div>
      <div className="stage-contact-source stage-contact-source--c">System</div>
      <div className="stage-contact-destination"><span>Contact</span><strong>Let’s work together.</strong></div>
    </div>
  );
}
