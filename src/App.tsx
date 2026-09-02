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
import { EducationTraining } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { SceneReveal } from './components/ui/SceneReveal';
import { Approach } from './components/sections/Approach';
import { AutomationLab } from './components/sections/AutomationLab';
import { Opportunities } from './components/sections/Opportunities';

export default function App() {
  return (
    <div className="site-environment min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SceneReveal><Highlights /></SceneReveal>
        <SceneReveal><About /></SceneReveal>
        <SceneReveal><Services /></SceneReveal>
        <SceneReveal><Skills /></SceneReveal>
        <SceneReveal><FeaturedWorks /></SceneReveal>
        <SceneReveal><AllProjects /></SceneReveal>
        <SceneReveal><Approach /></SceneReveal>
        <SceneReveal><Experience /></SceneReveal>
        <SceneReveal><EducationTraining /></SceneReveal>
        <SceneReveal><Achievements /></SceneReveal>
        <SceneReveal><AutomationLab /></SceneReveal>
        <SceneReveal><Opportunities /></SceneReveal>
        <SceneReveal><Contact /></SceneReveal>
      </main>
      <Footer />
    </div>
  );
}
