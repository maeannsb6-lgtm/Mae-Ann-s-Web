import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "mae"; text: string };

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
const suggestions = ["What does Mae Ann do?", "Tell me about her solar project", "How can I contact her?"];

export function MaeAgent() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(true);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

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

  return (
    <div className="mae-agent print:hidden">
      {open && (
        <section aria-label="Chat with Mae" className="mae-panel">
          <header className="mae-panel-head">
            <MaeAvatar size="sm" />
            <div className="min-w-0 flex-1">
              <p className="mae-panel-name">
                Mae <span className="mae-ai-tag">AI</span>
              </p>
              <p className="mae-panel-status">
                <span className="mae-online" /> Mae Ann's AI assistant
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="mae-icon-btn">
              <X size={18} />
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
              <div className="flex flex-wrap gap-2">
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
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
      {!open && teaser && (
        <div className="mae-teaser">
          <button type="button" className="mae-teaser-body" onClick={() => { setOpen(true); setTeaser(false); }}>
            <span className="mae-teaser-kicker">
              <Sparkles size={12} /> AI assistant
            </span>
            <strong>Hi, I'm Mae! Let's talk.</strong>
            <span className="mae-teaser-sub">Ask me about Mae Ann's work and projects.</span>
          </button>
          <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="mae-teaser-close">
            <X size={12} />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setTeaser(false); }}
        aria-expanded={open}
        aria-label={open ? "Close chat with Mae" : "Chat with Mae, AI assistant"}
        className="mae-launcher"
      >
        {open ? <X size={22} /> : <MaeAvatar size="lg" />}
      </button>
    </div>
  );
}

function MaeAvatar({ size }: { size: "sm" | "lg" }) {
  return (
    <span className={`mae-avatar mae-avatar-${size}`} aria-hidden="true">
      <img src="/mae-avatar.webp" alt="" width={192} height={192} />
      <span className="mae-avatar-badge">
        <Sparkles size={size === "lg" ? 10 : 8} />
      </span>
    </span>
  );
}
