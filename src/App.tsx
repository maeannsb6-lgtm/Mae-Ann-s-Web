/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { About } from './components/sections/About';
import { Achievements } from './components/sections/Achievements';
import { Skills } from './components/sections/Skills';
import { Services } from './components/sections/Services';
import { FeaturedWorks, AllProjects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { EducationTraining } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { SceneReveal } from './components/ui/SceneReveal';
import { Approach } from './components/sections/Approach';
import { AutomationLab } from './components/sections/AutomationLab';
import { Opportunities } from './components/sections/Opportunities';
import { StoryChapter } from './components/story/StoryChapter';
import { StoryProgress } from './components/story/StoryProgress';

const SceneCanvas = lazy(() => import('./components/three/SceneCanvas'));

export default function App() {
  return (
    <div className="site-environment min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
      <Suspense fallback={<div className="scene-canvas-fallback" aria-hidden="true" />}>
        <SceneCanvas />
      </Suspense>

      <Navbar />
      <StoryProgress />

      <main className="relative z-10">
        <Hero />

        <StoryChapter
          number="02"
          label="The person behind the work"
          title="Process thinking before tools."
          lead="A closer look at the engineering mindset, operational focus, and interests that shape how I approach work."
          className="story-chapter--person"
        >
          <SceneReveal><Highlights /></SceneReveal>
          <SceneReveal><About /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="03"
          label="What I can do"
          title="From a process problem to a connected system."
          lead="My capabilities sit at the intersection of Industrial Engineering, workflow design, automation, project coordination, and practical business systems."
          className="story-chapter--capabilities"
        >
          <Services />
          <SceneReveal><Skills /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="04"
          label="Proof of work"
          title="The work becomes the evidence."
          lead="Projects are presented as operating systems and case studies: the problem, my role, the flow I designed, and the result that can be inspected."
          className="story-chapter--work"
        >
          <SceneReveal><FeaturedWorks /></SceneReveal>
          <SceneReveal><AllProjects /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="05"
          label="How I work"
          title="Understand first. Improve deliberately. Automate where it matters."
          lead="A repeatable problem-solving sequence connects the work above to the way I execute future projects."
          className="story-chapter--approach"
        >
          <SceneReveal><Approach /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="06"
          label="The journey"
          title="Growth through operations, research, systems, and execution."
          lead="Experience, education, training, and recognition are connected here as one progression rather than separate résumé blocks."
          className="story-chapter--journey"
        >
          <SceneReveal><Experience /></SceneReveal>
          <SceneReveal><EducationTraining /></SceneReveal>
          <SceneReveal><Achievements /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="07"
          label="Experimentation"
          title="A small lab for turning workflow ideas into working systems."
          lead="This is where I test automation logic, routing, status models, integrations, and client-flow concepts beyond ordinary project delivery."
          className="story-chapter--lab"
        >
          <SceneReveal><AutomationLab /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="08"
          label="What’s next"
          title="The next chapter is collaborative."
          lead="The work I am open to continues the same direction: process improvement, automation, operational systems, and hybrid roles that connect them."
          className="story-chapter--future"
        >
          <SceneReveal><Opportunities /></SceneReveal>
        </StoryChapter>

        <StoryChapter
          number="09"
          label="Contact"
          title="You’ve seen the journey. The next step can be practical."
          lead="If there is a process, role, or system worth improving, this is where the conversation starts."
          className="story-chapter--contact"
        >
          <SceneReveal><Contact /></SceneReveal>
        </StoryChapter>
      </main>

      <Footer />
    </div>
  );
}
