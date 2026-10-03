import { AnimatePresence, motion } from 'framer-motion';
import { approachSteps, experience, opportunityGroups, whatIDo } from '../../data/content';
import { solarCaseStudy } from '../../data/story';
import { useFilm } from './FilmController';

const labFlow = ['Inquiry', 'Supabase', 'n8n', 'Acknowledgement', 'Notification', 'Follow-up'];

export default function PurposeStage() {
  const { active, local, reducedMotion, compact } = useFilm();
  const drift = reducedMotion || compact ? 0 : (local - .5) * -16;

  return (
    <div className={`purpose-stage purpose-stage--${active}`} aria-hidden="true">
      <div className="purpose-stage-camera" style={{ transform: `translate3d(0,${drift}px,0)` }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="purpose-stage-scene"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, z: -110 }}
            animate={{ opacity: 1, z: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, z: 90 }}
            transition={{ duration: reducedMotion ? .12 : .62, ease: [0.22, 1, 0.36, 1] }}
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
  if (scene === 0) return <IdentityScene />;
  if (scene === 1) return <StoryScene />;
  if (scene === 2) return <CapabilityScene />;
  if (scene === 3) return <ProcessScene />;
  if (scene === 4) return <ProjectScene />;
  if (scene === 5) return <JourneyScene />;
  if (scene === 6) return <LabScene />;
  if (scene === 7) return <FutureScene />;
  return <ContactScene />;
}

function IdentityScene() {
  return (
    <div className="simple-stage simple-stage--identity">
      <div className="simple-core">
        <span>IE</span>
        <strong>Industrial Engineering</strong>
      </div>
      <div className="simple-ring simple-ring--one" />
      <div className="simple-ring simple-ring--two" />
      <div className="simple-label simple-label--a">Process</div>
      <div className="simple-label simple-label--b">Systems</div>
      <div className="simple-label simple-label--c">Automation</div>
    </div>
  );
}

function StoryScene() {
  const steps = ['Observe', 'Analyze', 'Improve'];
  return (
    <div className="simple-stage simple-stage--story">
      <div className="simple-line" />
      {steps.map((step, index) => (
        <div key={step} className="simple-story-step">
          <span>0{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function CapabilityScene() {
  return (
    <div className="simple-stage simple-stage--capabilities">
      <div className="simple-capability-core">Industrial Engineering</div>
      <div className="simple-capability-grid">
        {whatIDo.map((item, index) => (
          <div key={item.title}>
            <span>0{index + 1}</span>
            <strong>{item.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessScene() {
  return (
    <div className="simple-stage simple-stage--process">
      <div className="simple-process-track" />
      {approachSteps.map((step, index) => (
        <div key={step.number} className="simple-process-node">
          <span>{step.number}</span>
          <strong>{step.title}</strong>
          {index < approachSteps.length - 1 && <i />}
        </div>
      ))}
    </div>
  );
}

function ProjectScene() {
  return (
    <div className="simple-stage simple-stage--project">
      <div className="simple-project-title">Solar Proposal System</div>
      <div className="simple-project-track">
        {solarCaseStudy.flow.map((step, index) => (
          <div key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyScene() {
  return (
    <div className="simple-stage simple-stage--journey">
      <div className="simple-journey-line" />
      {experience.slice().reverse().map((item) => (
        <div key={item.id} className="simple-journey-stop">
          <span>{item.period}</span>
          <strong>{item.company}</strong>
        </div>
      ))}
    </div>
  );
}

function LabScene() {
  return (
    <div className="simple-stage simple-stage--lab">
      <div className="simple-lab-track">
        {labFlow.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
      <div className="simple-lab-pulse" />
    </div>
  );
}

function FutureScene() {
  return (
    <div className="simple-stage simple-stage--future">
      <div className="simple-future-core">Next</div>
      {opportunityGroups.map((group) => (
        <div key={group.title} className="simple-future-path">
          <strong>{group.title}</strong>
        </div>
      ))}
    </div>
  );
}

function ContactScene() {
  return (
    <div className="simple-stage simple-stage--contact">
      <div className="simple-contact-line simple-contact-line--a" />
      <div className="simple-contact-line simple-contact-line--b" />
      <div className="simple-contact-line simple-contact-line--c" />
      <div className="simple-contact-core">
        <span>Contact</span>
        <strong>Let’s work together.</strong>
      </div>
    </div>
  );
}
