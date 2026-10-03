/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { FeaturedWorks } from './components/sections/Projects';
import { Approach } from './components/sections/Approach';
import { Experience } from './components/sections/Experience';
import { EducationTraining } from './components/sections/Testimonials';
import { Achievements } from './components/sections/Achievements';
import { AutomationLab } from './components/sections/AutomationLab';
import { Opportunities } from './components/sections/Opportunities';
import { Contact } from './components/sections/Contact';
import { CinematicScene } from './components/cinematic/CinematicScene';
import { CinematicProgress } from './components/cinematic/CinematicProgress';

const CinematicWorld = lazy(() => import('./components/cinematic/CinematicWorld'));

export default function App() {
  return (
    <div className="professional-site cinematic-site min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
      <Suspense fallback={<div className="cinematic-world-fallback" aria-hidden="true" />}>
        <CinematicWorld />
      </Suspense>

      <Navbar />
      <CinematicProgress />

      <main className="cinematic-main">
        <CinematicScene index={0} label="Identity"><Hero /></CinematicScene>
        <CinematicScene index={1} label="Overview"><Highlights /></CinematicScene>
        <CinematicScene index={2} label="Mindset"><About /></CinematicScene>
        <CinematicScene index={3} label="Services"><Services /></CinematicScene>
        <CinematicScene index={4} label="Skills"><Skills /></CinematicScene>
        <CinematicScene index={5} label="Work"><FeaturedWorks /></CinematicScene>
        <CinematicScene index={6} label="Approach"><Approach /></CinematicScene>
        <CinematicScene index={7} label="Experience"><Experience /></CinematicScene>
        <CinematicScene index={8} label="Education"><EducationTraining /></CinematicScene>
        <CinematicScene index={9} label="Recognition"><Achievements /></CinematicScene>
        <CinematicScene index={10} label="Lab"><AutomationLab /></CinematicScene>
        <CinematicScene index={11} label="Future"><Opportunities /></CinematicScene>
        <CinematicScene index={12} label="Contact"><Contact /></CinematicScene>
      </main>

      <Footer />
    </div>
  );
}
