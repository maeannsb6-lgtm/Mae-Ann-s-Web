import { lazy, Suspense, useSyncExternalStore } from "react";
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
const EngineeringScene = lazy(
  () => import("./components/three/EngineeringScene"),
);

const compactQuery = "(max-width: 760px)";
const subscribeCompact = (onChange: () => void) => {
  const query = window.matchMedia(compactQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isCompact = () => window.matchMedia(compactQuery).matches;

const sceneFallback = (
  <div className="scene-fallback">
    <span />
    <span />
    <span />
  </div>
);

export default function App() {
  // One canvas at a time: a fixed backdrop behind every chapter on wider
  // screens, or the opening's inline band on phones.
  const compact = useSyncExternalStore(subscribeCompact, isCompact);
  return (
    <div className="professional-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {!compact && (
        <div className="scene-backdrop" aria-hidden="true">
          <Suspense fallback={null}>
            <EngineeringScene mode="backdrop" />
          </Suspense>
        </div>
      )}
      <Navbar />
      <main id="main">
        <Hero />
        <div className="story-opening" id="story-opening">
          <div className="story-content">
            <About />
            <Approach />
            <Intelligence />
          </div>
          <div className="story-visual" aria-hidden="true">
            <div className="story-visual-sticky">
              <div className="scene-slot">
                {compact && (
                  <Suspense fallback={sceneFallback}>
                    <EngineeringScene />
                  </Suspense>
                )}
              </div>
              <div className="scene-caption">
                <span>One system. Four states.</span>
                <span>Scroll to assemble &amp; connect ↓</span>
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
