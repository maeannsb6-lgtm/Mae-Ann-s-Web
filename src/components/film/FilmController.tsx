import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

export const filmChapters = [
  { label: 'Intro', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#approach' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Lab', href: '#automation-lab' },
  { label: 'Future', href: '#opportunities' },
  { label: 'Contact', href: '#contact' },
] as const;

type FilmState = {
  active: number;
  local: number;
  overall: number;
  reducedMotion: boolean;
  compact: boolean;
};

const FilmContext = createContext<FilmState>({
  active: 0,
  local: 0,
  overall: 0,
  reducedMotion: false,
  compact: false,
});

export function FilmProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<FilmState>({
    active: 0,
    local: 0,
    overall: 0,
    reducedMotion: false,
    compact: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-film-scene]'));
      if (!scenes.length) return;

      const anchor = window.innerHeight * 0.48;
      let active = 0;
      let local = 0;
      let best = Number.POSITIVE_INFINITY;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const inside = rect.top <= anchor && rect.bottom >= anchor;
        const distance = inside ? 0 : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));

        if (distance < best) {
          best = distance;
          active = index;
          local = Math.min(1, Math.max(0, (anchor - rect.top) / Math.max(1, rect.height)));
        }
      });

      const overall = scenes.length > 1 ? (active + local) / scenes.length : local;
      setState({
        active,
        local,
        overall,
        reducedMotion: motionQuery.matches,
        compact: compactQuery.matches,
      });
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    motionQuery.addEventListener('change', update);
    compactQuery.addEventListener('change', update);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener('change', update);
      compactQuery.removeEventListener('change', update);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}

export function useFilm() {
  return useContext(FilmContext);
}
