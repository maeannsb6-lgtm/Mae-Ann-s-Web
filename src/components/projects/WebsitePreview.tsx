import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ExternalLink, Monitor, Smartphone, X } from 'lucide-react';
import type { Shot, WebsiteProject } from '../../data/websites';

/** A browser window around a real screenshot of the site. */
export function BrowserFrame({ url, shot, children, className = '' }: { url: string; shot?: Shot; children?: ReactNode; className?: string }) {
  return (
    <div className={`rd-browser ${className}`}>
      <div className="rd-browser-bar" aria-hidden="true">
        <span className="rd-browser-dots"><i /><i /><i /></span>
        <span className="rd-browser-url">{url.replace(/^https?:\/\//, '')}</span>
      </div>
      <div className="rd-browser-view">
        {children ?? (shot && <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" width={800} height={500} />)}
      </div>
    </div>
  );
}

/** A phone around a real mobile capture of the site. */
export function PhoneFrame({ shot, className = '' }: { shot: Shot; className?: string }) {
  return (
    <div className={`rd-phone ${className}`}>
      <span className="rd-phone-notch" aria-hidden="true" />
      <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" width={469} height={1015} />
    </div>
  );
}

/**
 * Interactive preview of the real site in an iframe (only for sites that allow framing),
 * with a desktop / mobile switch. The iframe loads only when the dialog opens.
 */
export function LivePreviewButton({ project, label = 'Live preview' }: { project: WebsiteProject; label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    el.addEventListener('close', onClose);
    return () => el.removeEventListener('close', onClose);
  }, []);

  if (!project.url || !project.embeddable) return null;

  return (
    <>
      <button
        type="button"
        className="rd-btn rd-btn--amber"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        {label} <Monitor size={16} />
      </button>
      <dialog
        ref={dialog}
        className="rd-preview"
        aria-label={`Live preview of ${project.name}`}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="rd-preview-inner">
          <header className="rd-preview-head">
            <strong>{project.name}</strong>
            <div className="rd-preview-switch" role="group" aria-label="Preview size">
              <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>
                <Monitor size={15} /> Desktop
              </button>
              <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>
                <Smartphone size={15} /> Mobile
              </button>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="rd-preview-open">
              Open live website <ExternalLink size={14} />
            </a>
            <button type="button" className="rd-preview-close" onClick={() => dialog.current?.close()} aria-label="Close preview">
              <X size={18} />
            </button>
          </header>
          <div className={`rd-preview-stage rd-preview-stage--${device}`}>
            {open && (
              <iframe
                src={project.url}
                title={`${project.name} (live site)`}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>
          <p className="rd-preview-note">This is the live website running inside the portfolio. If it does not load, use “Open live website”.</p>
        </div>
      </dialog>
    </>
  );
}

export function OpenSiteLink({ url, label = 'Open live website' }: { url: string; label?: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="rd-btn rd-btn--ghost">
      {label} <ExternalLink size={15} />
    </a>
  );
}
