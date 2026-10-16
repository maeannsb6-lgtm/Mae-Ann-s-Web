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
import { useReveal } from "./lib/useReveal";

export default function App() {
  useReveal();
  return (
    <div className="professional-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {/* Pages 01 and 02 */}
        <Hero />
        <About />
        {/* Section 03 onwards: each section carries its own art direction (src/styles/redesign.css). */}
        <div className="rd">
          <Approach />
          <Intelligence />
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
        </div>
      </main>
      <div className="rd">
        <Footer />
      </div>
      <MaeAgent />
    </div>
  );
}
