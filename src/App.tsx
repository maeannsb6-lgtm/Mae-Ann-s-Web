import { lazy, Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Highlights } from "./components/sections/Highlights";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Skills } from "./components/sections/Skills";
import { FeaturedWorks } from "./components/sections/Projects";
import { Approach } from "./components/sections/Approach";
import { Experience } from "./components/sections/Experience";
import { EducationTraining } from "./components/sections/Testimonials";
import { Achievements } from "./components/sections/Achievements";
import { AutomationLab } from "./components/sections/AutomationLab";
import { Opportunities } from "./components/sections/Opportunities";
import { Contact } from "./components/sections/Contact";
import { Intelligence } from "./components/sections/Intelligence";
const EngineeringScene = lazy(
  () => import("./components/three/EngineeringScene"),
);

export default function App() {
  return (
    <div className="professional-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <div className="story-opening" id="story-opening">
          <div className="story-content">
            <Hero />
            <About />
            <Approach />
            <Intelligence />
          </div>
          <div className="story-visual" aria-hidden="true">
            <div className="story-visual-sticky">
              <Suspense
                fallback={
                  <div className="scene-fallback">
                    <span />
                    <span />
                    <span />
                  </div>
                }
              >
                <EngineeringScene />
              </Suspense>
              <div className="scene-caption">
                <span>AN ENGINEERING MINDSET</span>
                <span>From structure to connection ↗</span>
              </div>
            </div>
          </div>
        </div>
        <Highlights />
        <FeaturedWorks />
        <Experience />
        <EducationTraining />
        <Achievements />
        <Services />
        <Skills />
        <AutomationLab />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
