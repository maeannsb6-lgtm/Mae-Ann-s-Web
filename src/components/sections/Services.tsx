import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Check, Move3D } from 'lucide-react';
import { whatIDo } from '../../data/content';

type Offering = (typeof whatIDo)[number];

type StoryScene = Offering & {
  act: string;
  headline: string;
  narrative: string;
  qualification: string;
  proof: string;
};

const storyDetails = [
  {
    act: 'Act 01 — Understand',
    headline: 'Start with the process, not the tool.',
    narrative: 'I study how work actually moves, locate bottlenecks and unnecessary handoffs, then redesign the flow using Industrial Engineering methods.',
    qualification: 'Industrial Engineering foundation',
    proof: 'Applied through time-and-motion studies, process mapping, Lean analysis, KPI review, and root-cause work at JCV Enterprises and ELPS Industries.',
  },
  {
    act: 'Act 02 — Automate',
    headline: 'Remove repetition from the improved flow.',
    narrative: 'Once the process is clear, I identify the steps where automation can reduce repetitive handling while keeping human decisions visible and controlled.',
    qualification: 'Project-based automation',
    proof: 'Demonstrated with n8n, Google Workspace workflows, automated reporting, and AI-assisted operations support in project work at SUWECO.',
  },
  {
    act: 'Act 03 — Connect',
    headline: 'Turn scattered information into one system.',
    narrative: 'I connect forms, business rules, databases, dashboards, and outputs so the team can follow one structured source of information.',
    qualification: 'Business-system development',
    proof: 'Demonstrated through the AI-enabled solar proposal application using Supabase, Vercel, structured engineering logic, and centralized project data.',
  },
  {
    act: 'Act 04 — Deliver',
    headline: 'Make the client journey easier to follow.',
    narrative: 'The final layer connects inquiry, information collection, proposals, follow-up, and status tracking into a clearer experience for both the client and the team.',
    qualification: 'Client workflow specialization',
    proof: 'Presented as a transparent portfolio and project workflow: lead capture, onboarding, proposal preparation, communication, and operational tracking.',
  },
] as const;

const storyScenes: StoryScene[] = whatIDo.map((offering, index) => ({
  ...offering,
  ...storyDetails[index],
}));

function StoryFace({ scene, index }: { scene: StoryScene; index: number }) {
  const Icon = scene.icon;

  return (
    <article
      className="absolute left-1/2 top-1/2 flex h-[18rem] w-[23rem] flex-col overflow-hidden rounded-[2rem] border border-brand-accent/30 bg-[#0b1c2e]/95 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_35px_80px_rgba(0,0,0,.55),0_0_45px_rgba(45,212,191,.08)]"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translate(-50%, -50%) rotateY(' + index * 90 + 'deg) translateZ(18rem)',
      }}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">Scene 0{index + 1}</p>
          <h3 className="max-w-[17rem] text-2xl font-semibold leading-tight text-white">{scene.title}</h3>
        </div>
        <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/10 p-4 shadow-[0_12px_28px_rgba(45,212,191,.12)]">
          <Icon className="h-7 w-7 text-brand-accent" />
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-brand-text-muted">{scene.description}</p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text-secondary">{scene.qualification}</span>
        <span className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(45,212,191,.9)]" />
      </div>
    </article>
  );
}

function MobileStoryCard({ scene, index }: { scene: StoryScene; index: number }) {
  const reduceMotion = useReducedMotion();
  const Icon = scene.icon;

  return (
    <div className="[perspective:1200px]">
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 48, rotateY: index % 2 === 0 ? -7 : 7 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-brand-card p-6 shadow-[0_30px_70px_rgba(0,0,0,.35)] sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden="true" />
        <div className="relative [transform:translateZ(28px)]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">{scene.act}</p>
              <h3 className="text-2xl font-semibold leading-tight text-white">{scene.headline}</h3>
            </div>
            <span className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-3">
              <Icon className="h-6 w-6 text-brand-accent" />
            </span>
          </div>
          <p className="text-base leading-7 text-brand-text-muted">{scene.narrative}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {scene.items.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-brand-bg-primary/60 px-4 py-3 text-sm text-brand-text-secondary">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/[0.08] pt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-accent">Evidence from my qualifications</p>
            <p className="text-sm leading-6 text-brand-text-secondary">{scene.proof}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Services() {
  const storyRef = useRef<HTMLElement>(null);
  const activeSceneRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState(0);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 82, damping: 26, mass: 0.22 });
  const stageRotateY = useTransform(
    progress,
    [0, 0.18, 0.27, 0.43, 0.52, 0.68, 0.77, 1],
    [0, 0, -90, -90, -180, -180, -270, -270],
  );
  const stageRotateX = useTransform(progress, [0, 0.5, 1], [-5, 4, -5]);
  const stageY = useTransform(progress, [0, 0.5, 1], [18, -10, 18]);
  const progressScale = useTransform(progress, [0, 1], [0.015, 1]);

  useMotionValueEvent(progress, 'change', (latest) => {
    const nextScene = latest < 0.225 ? 0 : latest < 0.475 ? 1 : latest < 0.725 ? 2 : 3;
    if (activeSceneRef.current !== nextScene) {
      activeSceneRef.current = nextScene;
      setActiveScene(nextScene);
    }
  });

  const current = storyScenes[activeScene];

  return (
    <section ref={storyRef} id="story" className="relative bg-brand-bg-secondary" aria-label="My 3D workflow story">
      <div className="lg:hidden">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">My 3D workflow story</p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl">A process becomes a better system.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-brand-text-muted">Follow how I combine Industrial Engineering, automation, and client workflow design—from understanding the work to delivering a connected experience.</p>
          <div className="mt-12 space-y-8">
            {storyScenes.map((scene, index) => <MobileStoryCard key={scene.title} scene={scene} index={index} />)}
          </div>
        </div>
      </div>

      <div className="hidden min-h-[440vh] lg:block">
        <div className="sticky top-0 flex h-screen min-h-[46rem] overflow-hidden">
          <div className="cinematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-brand-accent" style={{ scaleX: progressScale }} aria-hidden="true" />
          <div className="pointer-events-none absolute left-[58%] top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/10 shadow-[0_0_100px_rgba(45,212,191,.08)]" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid h-full w-full max-w-[92rem] grid-cols-[minmax(0,.8fr)_minmax(36rem,1.2fr)] items-center gap-10 px-8 xl:gap-16 xl:px-12">
            <div className="relative z-20 max-w-xl">
              <div className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                <Move3D className="h-5 w-5" />
                Scroll-driven 3D story
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-brand-accent">{current.act}</p>
                  <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-white xl:text-6xl">{current.headline}</h2>
                  <p className="mt-6 text-lg leading-8 text-brand-text-muted">{current.narrative}</p>

                  <div className="mt-8 rounded-2xl border border-white/[0.08] bg-brand-bg-primary/60 p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-accent">Evidence from my qualifications</p>
                    <p className="text-sm leading-6 text-brand-text-secondary">{current.proof}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <ol className="mt-9 flex gap-2" aria-label="Story progress">
                {storyScenes.map((scene, index) => (
                  <li key={scene.title} className="flex-1">
                    <div className={'h-1 rounded-full transition-colors duration-300 ' + (index <= activeScene ? 'bg-brand-accent' : 'bg-white/10')} />
                    <span className={'mt-2 block text-xs font-semibold ' + (index === activeScene ? 'text-white' : 'text-brand-text-muted')}>0{index + 1}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-brand-text-muted">
                <ArrowDown className="h-4 w-4 text-brand-accent" />
                Keep scrolling to continue the sequence
              </div>
            </div>

            <div className="relative h-[42rem] [perspective:1500px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.055] blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-[36rem] rounded-[50%] border border-brand-accent/20 [transform:translate(-50%,-50%)_rotateX(74deg)] shadow-[0_0_60px_rgba(45,212,191,.11)]" aria-hidden="true" />

              <motion.div
                className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
                animate={reduceMotion ? { rotateY: activeScene * -90, rotateX: 0, y: 0 } : undefined}
                transition={{ duration: 0.01 }}
                style={reduceMotion ? { transformStyle: 'preserve-3d' } : { rotateY: stageRotateY, rotateX: stageRotateX, y: stageY, transformStyle: 'preserve-3d' }}
              >
                {storyScenes.map((scene, index) => <StoryFace key={scene.title} scene={scene} index={index} />)}

                <div
                  className="absolute left-1/2 top-1/2 flex h-32 w-32 items-center justify-center rounded-[2.2rem] border border-brand-accent/35 bg-[#0a2632] text-center text-xs font-bold uppercase leading-5 tracking-[0.15em] text-brand-accent shadow-[inset_0_0_35px_rgba(45,212,191,.13),0_0_55px_rgba(45,212,191,.2)]"
                  style={{ transform: 'translate(-50%, -50%)', backfaceVisibility: 'hidden' }}
                  aria-hidden="true"
                >
                  Process<br />to system
                </div>
              </motion.div>

              <div className="absolute bottom-10 left-1/2 w-[32rem] -translate-x-1/2 rounded-2xl border border-white/[0.07] bg-brand-bg-primary/75 p-4 shadow-[0_18px_50px_rgba(0,0,0,.3)]">
                <ul className="grid grid-cols-2 gap-2">
                  {current.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-brand-text-secondary">
                      <Check className="h-4 w-4 shrink-0 text-brand-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
