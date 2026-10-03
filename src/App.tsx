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
import { FilmProvider } from './components/film/FilmController';
import { FilmScene } from './components/film/FilmScene';
import { FilmRail } from './components/film/FilmRail';

const PurposeStage = lazy(() => import('./components/film/PurposeStage'));

export default function App() {
  return (
    <FilmProvider>
      <div className="professional-site film-site min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
        <Suspense fallback={<div className="purpose-stage-fallback" aria-hidden="true" />}>
          <PurposeStage />
        </Suspense>

        <Navbar />
        <FilmRail />

        <main className="film-main">
          <FilmScene index={0} label="Identity">
            <Hero />
          </FilmScene>

          <FilmScene index={1} label="Professional Story">
            <Highlights />
            <About />
          </FilmScene>

          <FilmScene index={2} label="Capabilities">
            <Services />
            <Skills />
          </FilmScene>

          <FilmScene index={3} label="How I Work">
            <Approach />
          </FilmScene>

          <FilmScene index={4} label="Proof of Work">
            <FeaturedWorks />
          </FilmScene>

          <FilmScene index={5} label="Journey">
            <Experience />
            <EducationTraining />
            <Achievements />
          </FilmScene>

          <FilmScene index={6} label="Automation Lab">
            <AutomationLab />
          </FilmScene>

          <FilmScene index={7} label="What’s Next">
            <Opportunities />
          </FilmScene>

          <FilmScene index={8} label="Contact">
            <Contact />
          </FilmScene>
        </main>

        <Footer />
      </div>
    </FilmProvider>
  );
}
