import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
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
import { MaeAgent } from "./components/ui/MaeAgent";
const EngineeringScene = lazy(
  () => import("./components/three/EngineeringScene"),
);

const sceneFallback = (
  <div className="scene-fallback">
    <span />
    <span />
    <span />
  </div>
);

export default function App() {
  return (
    <div className="professional-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="story-opening" id="story-opening">
          <div className="story-content">
            <About />
            <Approach />
            <Intelligence />
          </div>
          {/* One 3D model, held in this column only: it never travels into other chapters. */}
          <div className="story-visual">
            <div className="story-visual-sticky">
              <div className="scene-slot">
                <Suspense fallback={sceneFallback}>
                  <EngineeringScene />
                </Suspense>
              </div>
              <div className="scene-caption" aria-hidden="true">
                <span>A digital twin of how I improve operations</span>
                <span>Scroll to see each step ↓</span>
              </div>
            </div>
          </div>
        </div>
        <Highlights />
        <PortfolioChapter
          number="05"
          stage={4}
          title="Work & execution"
          tone="paper"
          links={[["Projects", "projects"]]}
        >
          <FeaturedWorks />
        </PortfolioChapter>
        <PortfolioChapter
          number="06"
          stage={5}
          title="Experience & foundation"
          tone="stone"
          links={[
            ["Experience", "experience"],
            ["Education", "certifications"],
            ["Achievements", "awards"],
          ]}
        >
          <Experience />
          <EducationTraining />
          <Achievements />
        </PortfolioChapter>
        <PortfolioChapter
          number="07"
          stage={6}
          title="Capabilities & services"
          tone="paper"
          links={[
            ["Services", "services"],
            ["Skills", "capabilities"],
          ]}
        >
          <Services />
          <Skills />
        </PortfolioChapter>
        <PortfolioChapter
          number="08"
          stage={7}
          title="Automation in practice"
          tone="blue"
          links={[["Try the demo", "automation-lab"]]}
        >
          <AutomationLab />
        </PortfolioChapter>
        <PortfolioChapter
          number="09"
          stage={8}
          title="Opportunities & connection"
          tone="stone"
          links={[
            ["Opportunities", "opportunities"],
            ["Contact", "contact"],
          ]}
        >
          <Opportunities />
          <Contact />
        </PortfolioChapter>
      </main>
      <Footer />
      <MaeAgent />
    </div>
  );
}

function PortfolioChapter({
  number,
  stage,
  title,
  tone,
  links,
  children,
}: {
  number: string;
  stage: number;
  title: string;
  tone: string;
  links: string[][];
  children: ReactNode;
}) {
  return (
    <div
      className={`portfolio-chapter chapter--${tone}`}
      data-story-stage={stage}
    >
      <div className="chapter-header">
        <div className="chapter-heading">
          <span>{number}</span>
          <p>{title}</p>
        </div>
        <nav aria-label={`${title} sections`}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
