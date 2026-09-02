declare global {
  interface Window {
    va?: (command: 'event', payload: { name: string }) => void;
  }
}

/** Privacy-safe event hooks. No event is sent unless a compatible analytics
 * provider is enabled separately. Only fixed data-track labels are recorded. */
export function initAnalytics() {
  const onClick = (event: MouseEvent) => {
    const element = (event.target as Element | null)?.closest<HTMLElement>('[data-track]');
    const name = element?.dataset.track;
    if (name && window.va) window.va('event', { name });
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
