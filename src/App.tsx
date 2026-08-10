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

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-pink-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Achievements />
        <Skills />
        <Services />
        <FeaturedWorks />
        <AllProjects />
        <Experience />
        <Journey />
        <EducationTraining />
        <ResearchPublications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
