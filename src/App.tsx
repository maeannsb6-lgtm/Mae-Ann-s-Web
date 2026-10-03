/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export default function App() {
  return (
    <div className="professional-site min-h-screen bg-brand-bg-primary text-brand-text-secondary selection:bg-brand-accent/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Skills />
        <FeaturedWorks />
        <Approach />
        <Experience />
        <EducationTraining />
        <Achievements />
        <AutomationLab />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
