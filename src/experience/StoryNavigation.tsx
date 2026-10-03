import { chapters, useStory } from './StoryController';

export function StoryNavigation() {
  const { activeIndex } = useStory();

  return (
    <nav className="chapter-nav" aria-label="Portfolio journey">
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a href={'#' + chapter.id} aria-current={activeIndex === index ? 'step' : undefined}>
              <span className="chapter-nav-number">{chapter.number}</span>
              <span className="chapter-nav-label">{chapter.label}</span>
              <span className="chapter-nav-mark" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
