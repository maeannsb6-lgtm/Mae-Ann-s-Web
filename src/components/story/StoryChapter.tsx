import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

interface StoryChapterProps extends PropsWithChildren {
  number: string;
  label: string;
  title: string;
  lead: string;
  className?: string;
}

export function StoryChapter({ number, label, title, lead, className, children }: StoryChapterProps) {
  return (
    <div
      className={cn('story-chapter', className)}
      data-story-chapter={number}
      data-story-title={label}
    >
      <div className="chapter-intro mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
        <div className="chapter-rail" />
        <div className="chapter-copy">
          <p className="chapter-kicker"><span>{number}</span>{label}</p>
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
      </div>
      <div className="story-chapter-content">{children}</div>
    </div>
  );
}
