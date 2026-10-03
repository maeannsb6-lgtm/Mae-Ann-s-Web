import type { PropsWithChildren } from 'react';

interface FilmSceneProps extends PropsWithChildren {
  index: number;
  label: string;
  className?: string;
}

export function FilmScene({ index, label, className = '', children }: FilmSceneProps) {
  return (
    <div
      data-film-scene
      data-film-index={index}
      data-film-label={label}
      className={`film-scene film-scene--${index} ${className}`}
    >
      {children}
    </div>
  );
}
