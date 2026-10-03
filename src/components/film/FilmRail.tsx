import { filmChapters, useFilm } from './FilmController';

export function FilmRail() {
  const { active, overall } = useFilm();
  const chapter = filmChapters[active];

  return (
    <div className="film-progress" aria-hidden="true">
      <div className="film-progress-track">
        <span style={{ transform: `scaleX(${overall})` }} />
      </div>
      <div className="film-progress-label">
        <span>{String(active + 1).padStart(2, '0')}</span>
        <i />
        <strong>{chapter.label}</strong>
      </div>
    </div>
  );
}
