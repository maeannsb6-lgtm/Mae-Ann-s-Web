import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "mae"; text: string };
type Point = { x: number; y: number };

// Gemini replies in light markdown: render **bold** and "* " / "- " bullets as real elements.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part.replace(/\*/g, ""),
  );
}

function Formatted({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={blocks.length} className="list-disc space-y-1 pl-4">
        {bullets.map((b, i) => <li key={i}>{inline(b)}</li>)}
      </ul>,
    );
    bullets = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[*\-•]\s+(.*)$/);
    if (bullet) { bullets.push(bullet[1]); continue; }
    flush();
    if (line) blocks.push(<p key={blocks.length}>{inline(line.replace(/^#+\s*/, ""))}</p>);
  }
  flush();
  return <div className="space-y-2 whitespace-normal">{blocks}</div>;
}

const greeting: Message = {
  role: "mae",
  text: "Hello, I'm Mae. I can walk you through Mae Ann's skills, projects and experience, or help you get in touch with her. How can I help you today?",
};
const suggestions = ["What does Mae Ann do?", "Her solar project", "How can I contact her?"];

const SIZE = 52; // launcher diameter
const GAP = 12; // minimum viewport margin while dragging
const HOME = 32; // default inset from the bottom-right corner
const POS_KEY = "mae-position-v2";

// clientWidth/clientHeight exclude the scrollbar, so Mae never sits underneath it.
const viewport = () => ({ w: document.documentElement.clientWidth, h: document.documentElement.clientHeight });

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));
const keepInView = (p: Point): Point => ({
  x: clamp(p.x, GAP, viewport().w - SIZE - GAP),
  y: clamp(p.y, GAP, viewport().h - SIZE - GAP),
});
function savedPosition(): Point | null {
  try {
    const saved = JSON.parse(localStorage.getItem(POS_KEY) ?? "null");
    if (saved && typeof saved.x === "number" && typeof saved.y === "number") return keepInView(saved);
  } catch { /* storage unavailable */ }
  return null;
}
function homePosition(): Point {
  const { w, h } = viewport();
  return keepInView({ x: w - SIZE - HOME, y: h - SIZE - HOME });
}

export function MaeAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState<Point>(() => savedPosition() ?? homePosition());
  const placed = useRef(savedPosition() !== null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ start: Point; origin: Point; moved: boolean } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  useEffect(() => {
    // Follow viewport changes (including the scrollbar appearing after load) until the visitor moves Mae.
    const onResize = () => setPos((p) => (placed.current ? keepInView(p) : homePosition()));
    const observer = new ResizeObserver(onResize);
    observer.observe(document.documentElement);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  async function ask(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    const history = messages.slice(1);
    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/mae", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json().catch(() => null);
      const reply = res.ok && data?.reply ? data.reply : data?.message || "Mae could not answer just now.";
      setMessages((m) => [...m, { role: "mae", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "mae", text: "I couldn't reach my brain. Please try again." }]);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  // Drag the launcher anywhere; a press without movement still counts as a click.
  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { start: { x: e.clientX, y: e.clientY }, origin: pos, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.start.x;
    const dy = e.clientY - d.start.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    if (!d.moved) { d.moved = true; setDragging(true); }
    setPos(keepInView({ x: d.origin.x + dx, y: d.origin.y + dy }));
  };
  const onPointerUp = () => {
    if (drag.current?.moved) {
      placed.current = true;
      setPos((p) => {
        try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
        return p;
      });
    }
    setDragging(false);
  };
  const onLauncherClick = () => {
    if (drag.current?.moved) { drag.current = null; return; }
    drag.current = null;
    setOpen((o) => !o);
  };

  // Open the panel and greeting on whichever side of the launcher has room.
  const { w: vw, h: vh } = viewport();
  const onRight = pos.x + SIZE / 2 > vw / 2;
  const onBottom = pos.y + SIZE / 2 > vh / 2;
  const panelW = Math.min(320, vw - GAP * 2);
  const panelH = Math.min(440, vh - SIZE - GAP * 3);
  const panelStyle: CSSProperties = {
    width: panelW,
    height: panelH,
    left: clamp(onRight ? pos.x + SIZE - panelW : pos.x, GAP, vw - GAP - panelW),
    top: clamp(onBottom ? pos.y - 10 - panelH : pos.y + SIZE + 10, GAP, vh - GAP - panelH),
  };
  const teaserStyle: CSSProperties = {
    ...(onRight ? { right: vw - pos.x - SIZE } : { left: pos.x }),
    ...(onBottom ? { bottom: vh - pos.y + 8 } : { top: pos.y + SIZE + 8 }),
  };

  return (
    <div className="mae-agent print:hidden">
      {open && (
        <section aria-label="Chat with Mae" className="mae-panel" style={panelStyle}>
          <header className="mae-panel-head">
            <MaeAvatar className="mae-avatar-sm" />
            <div className="min-w-0 flex-1">
              <p className="mae-panel-name">
                Mae <span className="mae-ai-tag">AI</span>
              </p>
              <p className="mae-panel-status">
                <span className="mae-online" /> Mae Ann's AI assistant
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="mae-icon-btn">
              <X size={16} />
            </button>
          </header>
          <div className="mae-messages" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "mae-msg mae-msg-user" : "mae-msg mae-msg-ai"}>
                {m.role === "mae" ? <Formatted text={m.text} /> : m.text}
              </div>
            ))}
            {busy && (
              <div className="mae-msg mae-msg-ai mae-typing" aria-label="Mae is thinking">
                <span />
                <span />
                <span />
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => void ask(s)} className="mae-chip">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="mae-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask Mae anything…"
              aria-label="Message to Mae"
              className="mae-input"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="mae-send">
              <Send size={14} />
            </button>
          </form>
        </section>
      )}
      {/* Greeting stays visible whenever the chat is closed, so visitors always know Mae is an AI assistant. */}
      {!open && !dragging && (
        <div className="mae-teaser" style={teaserStyle}>
          <button type="button" className="mae-teaser-body" onClick={() => setOpen(true)}>
            <Sparkles size={13} className="mae-teaser-spark" />
            <span>
              Hi, I'm <strong>Mae</strong>! Let's talk.
            </span>
          </button>
        </div>
      )}
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onLauncherClick}
        aria-expanded={open}
        aria-label={open ? "Close chat with Mae" : "Chat with Mae, AI assistant (drag to move)"}
        title="Chat with Mae · drag to move"
        className={`mae-launcher${dragging ? " is-dragging" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      >
        {open ? <X size={20} /> : <MaeAvatar className="mae-avatar-lg" />}
      </button>
    </div>
  );
}

/** Animated AI illustration of Mae Ann: hard hat, long dark hair, pearl earrings, glowing eyes. */
function MaeAvatar({ className }: { className: string }) {
  return (
    <span className={`mae-avatar ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <defs>
          <radialGradient id="mae-bg" cx="50%" cy="38%" r="70%">
            <stop offset="0" stopColor="#3a3123" />
            <stop offset="1" stopColor="#1c1913" />
          </radialGradient>
          <linearGradient id="mae-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6d2b1" />
            <stop offset="1" stopColor="#eab98f" />
          </linearGradient>
          <linearGradient id="mae-hat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e4dfd2" />
          </linearGradient>
          <clipPath id="mae-clip">
            <circle cx="32" cy="32" r="32" />
          </clipPath>
        </defs>
        <g clipPath="url(#mae-clip)">
          <circle cx="32" cy="32" r="32" fill="url(#mae-bg)" />
          <g className="mae-circuit" stroke="#f5a000" strokeWidth=".8" fill="none" strokeLinecap="round">
            <path d="M2 18h7l3 3h4" />
            <path d="M62 14h-6l-3 3h-3" />
            <path d="M2 46h5l3-3" />
            <path d="M62 44h-5l-3-3" />
            <circle cx="16.5" cy="21" r="1" fill="#f5a000" />
            <circle cx="49.5" cy="17" r="1" fill="#f5a000" />
          </g>
          <g transform="translate(32 36) scale(1.22) translate(-32 -36)">
          <path d="M17 30c-2 12-3 22 0 34h30c3-12 2-22 0-34z" fill="#1b1411" />
          <path d="M13 64c2-9 10-13 19-13s17 4 19 13z" fill="#fffdf5" />
          <path d="M26.5 51 32 58l5.5-7" fill="none" stroke="#ddd6c4" strokeWidth="1.2" />
          <rect x="28" y="42" width="8" height="10" rx="3" fill="#e5b38b" />
          <ellipse cx="32" cy="34.5" rx="10.5" ry="12" fill="url(#mae-skin)" />
          <path d="M21.5 30c-1.8 8-1.6 16 1.8 22.5 1-6-.1-14 .9-21.5z" fill="#1b1411" />
          <path d="M42.5 30c1.8 8 1.6 16-1.8 22.5-1-6 .1-14-.9-21.5z" fill="#1b1411" />
          <path d="M21.5 30.5c3-5.5 18-5.5 21 0-5-2.5-16-2.5-21 0z" fill="#1b1411" />
          <path d="M25.3 31.6q2.7-1.4 4.8-.2M33.9 31.4q2.1-1.2 4.8.2" stroke="#2a1d17" strokeWidth=".9" fill="none" strokeLinecap="round" />
          <g className="mae-eyes">
            <ellipse cx="28" cy="35" rx="1.6" ry="1.9" fill="#1c1310" />
            <ellipse cx="36" cy="35" rx="1.6" ry="1.9" fill="#1c1310" />
            <circle cx="28.5" cy="34.4" r=".55" fill="#ffc247" />
            <circle cx="36.5" cy="34.4" r=".55" fill="#ffc247" />
          </g>
          <path d="M32 36.4q-.9 2.4.5 2.7" stroke="#d39a76" strokeWidth=".7" fill="none" strokeLinecap="round" />
          <ellipse cx="25.8" cy="39.2" rx="1.8" ry="1" fill="#f0907f" opacity=".45" />
          <ellipse cx="38.2" cy="39.2" rx="1.8" ry="1" fill="#f0907f" opacity=".45" />
          <path d="M28.6 41q3.4 3.8 6.8 0-3.4 1.3-6.8 0z" fill="#c95f5c" />
          <circle cx="21.6" cy="40" r=".8" fill="#fff" />
          <circle cx="21.6" cy="42.6" r=".9" fill="#fff" />
          <circle cx="42.4" cy="40" r=".8" fill="#fff" />
          <circle cx="42.4" cy="42.6" r=".9" fill="#fff" />
          <path d="M19 27.5C19 15 45 15 45 27.5z" fill="url(#mae-hat)" />
          <path d="M32 15.8v11.4" stroke="#d9d3c3" strokeWidth="2" />
          <path d="M15.5 28c8-2.2 25-2.2 33 0 .3 2-33.3 2-33 0z" fill="#f2efe6" />
          <circle className="mae-hat-light" cx="38.5" cy="21.5" r="1.5" fill="#f5a000" />
          </g>
          <rect className="mae-scan" x="0" y="0" width="64" height="6" fill="#ffc247" opacity=".12" />
        </g>
      </svg>
      <span className="mae-avatar-badge">
        <Sparkles size={9} />
      </span>
    </span>
  );
}
