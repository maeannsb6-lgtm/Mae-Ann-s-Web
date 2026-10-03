import { ArrowDown, Download } from 'lucide-react';
import { contactInfo } from '../data/content';
import { useStory } from './StoryController';

export function OriginChapter() {
  const { activeIndex, progress, reducedMotion } = useStory();
  const local = activeIndex === 0 ? progress : activeIndex > 0 ? 1 : 0;
  const reveal = reducedMotion ? 1 : Math.min(1, Math.max(0, (local - .08) / .2));
  const detail = reducedMotion ? 1 : Math.min(1, Math.max(0, (local - .28) / .22));

  return (
    <section id="home" className="origin-chapter" aria-labelledby="origin-title">
      <div className="origin-sticky">
        <div className="origin-coordinate" aria-hidden="true">00 / ORIGIN</div>
        <div className="origin-seed" aria-hidden="true">
          <span className="origin-point" />
          <span className="origin-seed-line" style={{ transform: `scaleY(${Math.max(.08, local)})` }} />
        </div>

        <div className="origin-copy" style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 18}px)` }}>
          <p className="origin-prelude">Industrial Engineering / Systems / Automation</p>
          <h1 id="origin-title">MAE ANN</h1>
          <p className="origin-role">Industrial Engineer building better processes, connected workflows, and practical AI-enabled systems.</p>
        </div>

        <div className="origin-actions" style={{ opacity: detail }}>
          <a href="#about">Enter the work <ArrowDown className="h-4 w-4" /></a>
          <a href={contactInfo.cvUrl} target="_blank" rel="noopener noreferrer" data-track="resume-download">Resume <Download className="h-4 w-4" /></a>
        </div>

        <p className="origin-footnote" style={{ opacity: detail }}>
          Philippines · {contactInfo.availability}
        </p>
      </div>
    </section>
  );
}
