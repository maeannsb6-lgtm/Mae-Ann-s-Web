import { filmChapters, useFilm } from './FilmController';

export function FilmRail() {
  const { active, overall } = useFilm();

  return (
    <>
      <div className="film-top-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${overall})` }} />
      </div>
      <nav className="film-rail" aria-label="Portfolio chapters">
        <div className="film-rail-line" aria-hidden="true">
          <span style={{ transform: `scaleY(${overall})` }} />
        </div>
        <ol>
          {filmChapters.map((chapter, index) => (
            <li key={chapter.href}>
              <a href={chapter.href} aria-current={active === index ? 'step' : undefined}>
                <span className="film-rail-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="film-rail-label">{chapter.label}</span>
                <i aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
