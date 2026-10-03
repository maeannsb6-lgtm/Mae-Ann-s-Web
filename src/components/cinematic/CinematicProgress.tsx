import { useEffect, useState } from 'react';

const labels = ['Identity','Overview','Mindset','Services','Skills','Work','Approach','Experience','Education','Recognition','Lab','Future','Contact'];

export function CinematicProgress() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-scene]'));
      if (!scenes.length) return;

      const anchor = window.innerHeight * .5;
      let best = 0;
      let bestDistance = Infinity;
      let local = 0;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const within = rect.top <= anchor && rect.bottom >= anchor;
        const distance = within ? 0 : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
          local = Math.min(1, Math.max(0, (anchor - rect.top) / Math.max(1, rect.height)));
        }
      });

      setActive(best);
      setProgress(local);
    };

    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  const total = labels.length;
  const overall = (active + progress) / total;

  return (
    <div className="cinematic-progress" aria-hidden="true">
      <div className="cinematic-progress-track"><span style={{ transform: `scaleX(${overall})` }} /></div>
      <div className="cinematic-progress-meta">
        <span>{String(active + 1).padStart(2, '0')}</span>
        <i />
        <em>{labels[active]}</em>
      </div>
    </div>
  );
}
