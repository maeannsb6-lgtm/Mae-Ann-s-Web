import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

export const chapters = [
  { id: 'home', number: '00', label: 'Origin' },
  { id: 'about', number: '01', label: 'Curiosity' },
  { id: 'capabilities', number: '02', label: 'Connections' },
  { id: 'approach', number: '03', label: 'Structure' },
  { id: 'projects', number: '04', label: 'Proof' },
  { id: 'journey', number: '05', label: 'Growth' },
  { id: 'automation-lab', number: '06', label: 'Lab' },
  { id: 'opportunities', number: '07', label: 'Future' },
  { id: 'contact', number: '08', label: 'Contact' },
] as const;

interface StoryState {
  activeIndex: number;
  progress: number;
  reducedMotion: boolean;
  compact: boolean;
}

const StoryContext = createContext<StoryState>({
  activeIndex: 0,
  progress: 0,
  reducedMotion: false,
  compact: false,
});

export function StoryProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<StoryState>({
    activeIndex: 0,
    progress: 0,
    reducedMotion: false,
    compact: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia('(max-width: 767px), (pointer: coarse)');

    const updatePreferences = () => {
      setState((current) => ({
        ...current,
        reducedMotion: motionQuery.matches,
        compact: compactQuery.matches,
      }));
    };

    let frame = 0;
    const updateStory = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.46;
      let activeIndex = 0;
      let progress = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      chapters.forEach((chapter, index) => {
        const element = document.getElementById(chapter.id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const containsAnchor = rect.top <= anchor && rect.bottom >= anchor;
        const distance = containsAnchor ? 0 : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));

        if (distance < bestDistance) {
          bestDistance = distance;
          activeIndex = index;
          const travel = Math.max(1, rect.height - window.innerHeight * 0.18);
          progress = Math.min(1, Math.max(0, (anchor - rect.top) / travel));
        }
      });

      setState((current) => {
        if (
          current.activeIndex === activeIndex &&
          Math.abs(current.progress - progress) < 0.004 &&
          current.reducedMotion === motionQuery.matches &&
          current.compact === compactQuery.matches
        ) return current;

        return {
          activeIndex,
          progress,
          reducedMotion: motionQuery.matches,
          compact: compactQuery.matches,
        };
      });
    };

    const queueUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateStory);
    };

    motionQuery.addEventListener('change', updatePreferences);
    compactQuery.addEventListener('change', updatePreferences);
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });

    updatePreferences();
    updateStory();

    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener('change', updatePreferences);
      compactQuery.removeEventListener('change', updatePreferences);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
  return useContext(StoryContext);
}
