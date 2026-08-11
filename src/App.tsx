/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { About } from './components/sections/About';
import { Achievements } from './components/sections/Achievements';
import { Skills } from './components/sections/Skills';
import { Services } from './components/sections/Services';
import { FeaturedWorks, AllProjects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Journey } from './components/sections/Journey';
import { EducationTraining } from './components/sections/Testimonials';
import { ResearchPublications } from './components/sections/ResearchPublications';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { SceneReveal } from './components/ui/SceneReveal';

export default function App() {
  return (
    <div className="site-environment min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-pink-primary/30 selection:text-white">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SceneReveal><Highlights /></SceneReveal>
        <SceneReveal><About /></SceneReveal>
        <SceneReveal><Achievements /></SceneReveal>
        <SceneReveal><Skills /></SceneReveal>
        <SceneReveal><Services /></SceneReveal>
        <SceneReveal><FeaturedWorks /></SceneReveal>
        <SceneReveal><AllProjects /></SceneReveal>
        <SceneReveal><Experience /></SceneReveal>
        <SceneReveal><Journey /></SceneReveal>
        <SceneReveal><EducationTraining /></SceneReveal>
        <SceneReveal><ResearchPublications /></SceneReveal>
        <SceneReveal><Contact /></SceneReveal>
      </main>
      <Footer />
    </div>
  );
}
