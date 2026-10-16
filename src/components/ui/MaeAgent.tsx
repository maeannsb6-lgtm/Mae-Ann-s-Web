import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Bot, Send, X } from "lucide-react";

type Message = { role: "user" | "mae"; text: string };

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
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 print:hidden">
      {open && (
        <section
          aria-label="Chat with Mae"
          className="flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-black/10 bg-brand-bg-primary shadow-2xl"
        >
          <header className="flex items-center justify-between bg-brand-accent px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Mae</p>
              <p className="text-xs opacity-80">Portfolio assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded p-1 hover:bg-white/15">
              <X size={18} />
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm" aria-live="polite">
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-brand-accent px-3 py-2 text-white"
                    : "w-fit max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-brand-bg-secondary px-3 py-2 text-brand-text-white"
                }
              >
                {m.text}
              </p>
            ))}
            {busy && <p className="text-xs text-brand-text-muted">Mae is thinking…</p>}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="rounded-full border border-brand-accent/40 px-3 py-1 text-xs text-brand-accent hover:bg-brand-accent/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-black/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask Mae…"
              aria-label="Message to Mae"
              className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-brand-text-white outline-none focus:border-brand-accent"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-accent text-white disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
      {!open && teaser && (
        <div className="relative max-w-[11rem] rounded-xl rounded-br-sm border border-black/10 bg-white px-3 py-2 pr-6 text-xs text-brand-text-white shadow-lg">
          Hi, I'm Mae! Let's talk.
          <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="absolute right-1 top-1 rounded p-0.5 text-brand-text-muted hover:text-brand-text-white">
            <X size={12} />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setTeaser(false); }}
        aria-expanded={open}
        aria-label={open ? "Close chat with Mae" : "Chat with Mae"}
        className="grid h-12 w-12 place-items-center rounded-full bg-brand-accent text-white shadow-lg ring-4 ring-white/70 transition hover:scale-105"
      >
        {open ? <X size={20} /> : <Bot size={24} />}
      </button>
    </div>
  );
}
