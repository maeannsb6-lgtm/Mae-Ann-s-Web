import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

const chapters = [
  { number: '01', label: 'Introduction', href: '#home' },
  { number: '02', label: 'Person', href: '#about' },
  { number: '03', label: 'Capabilities', href: '#capabilities' },
  { number: '04', label: 'Proof of Work', href: '#projects' },
  { number: '05', label: 'Approach', href: '#approach' },
  { number: '06', label: 'Journey', href: '#experience' },
  { number: '07', label: 'Lab', href: '#automation-lab' },
  { number: '08', label: 'Next', href: '#opportunities' },
  { number: '09', label: 'Contact', href: '#contact' },
] as const;

export function StoryProgress() {
  const [active, setActive] = useState('01');

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-story-chapter]'));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const number = (visible?.target as HTMLElement | undefined)?.dataset.storyChapter;
        if (number) setActive(number);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.01, 0.15, 0.35, 0.65] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="story-progress-line" aria-hidden="true">
        <span style={{ transform: `scaleX(${Number(active) / chapters.length})` }} />
      </div>
      <nav className="story-progress" aria-label="Portfolio chapters">
        <p className="story-progress-current" aria-live="polite">
          <span>{active}</span>
          <span className="story-progress-total">/ {String(chapters.length).padStart(2, '0')}</span>
        </p>
        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.number}>
              <a
                href={chapter.href}
                className={cn('story-progress-link', active === chapter.number && 'is-active')}
                aria-current={active === chapter.number ? 'step' : undefined}
              >
                <span className="story-progress-dot" aria-hidden="true" />
                <span className="story-progress-label">{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
