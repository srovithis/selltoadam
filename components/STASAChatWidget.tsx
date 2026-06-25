"use client";

// STASAChatWidget — persistent AI chat for selltoadam.com ("Sell to Adam").
// Bottom-right launcher, proactive popup after 30s, AI replies via /api/stasa-chat,
// and a live human-handoff mode that polls history every 5s for Adam's replies.

import { useEffect, useRef, useState, useCallback } from "react";

const VISITOR_KEY = "stasa_visitor_id";
const OPENING_MESSAGE =
  "Hey there! Thinking about selling your home? I can answer questions and connect you with Adam — what's on your mind?";

interface ChatMessage {
  role: "user" | "assistant" | "staff";
  content: string;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export default function STASAChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [handoffRequested, setHandoffRequested] = useState(false);

  const visitorIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);

  const loadHistory = useCallback(async () => {
    const visitorId = visitorIdRef.current;
    if (!visitorId) return;
    try {
      const res = await fetch(`/api/stasa-chat/history?visitorId=${encodeURIComponent(visitorId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.messages)) {
        setMessages(data.messages.map((m: any) => ({ role: m.role, content: m.content })));
      }
      setHandoffRequested(Boolean(data.handoffRequested));
    } catch {
      /* fail-soft */
    }
  }, []);

  // Client-only: mount, init visitor id, load any prior history. Rendering
  // nothing on the server avoids hydration mismatches from the inline <style>.
  useEffect(() => {
    setMounted(true);
    visitorIdRef.current = getVisitorId();
    loadHistory();
  }, [loadHistory]);

  // Proactive popup after 30s (only if never opened).
  useEffect(() => {
    const t = setTimeout(() => {
      if (!openedRef.current) setShowProactive(true);
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  // Poll history every 5s while a live handoff is active and the panel is open.
  useEffect(() => {
    if (!open || !handoffRequested) return;
    const iv = setInterval(loadHistory, 5000);
    return () => clearInterval(iv);
  }, [open, handoffRequested, loadHistory]);

  function openWidget() {
    openedRef.current = true;
    setOpen(true);
    setShowProactive(false);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/stasa-chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorIdRef.current, message: text }),
      });
      const data = await res.json();
      const additions: ChatMessage[] = [];
      if (data.reply) additions.push({ role: "assistant", content: data.reply });
      if (data.followUp) additions.push({ role: "assistant", content: data.followUp });
      if (additions.length) setMessages((prev) => [...prev, ...additions]);
      if (typeof data.handoffRequested === "boolean") setHandoffRequested(data.handoffRequested);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry — I couldn't send that. You can reach Adam directly at 413-423-1110. 😊",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const shownMessages: ChatMessage[] =
    messages.length === 0 ? [{ role: "assistant", content: OPENING_MESSAGE }] : messages;

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .stasa-fab {
          position: fixed; bottom: 20px; right: 20px; z-index: 2147483000;
          width: 60px; height: 60px; border-radius: 50%;
          background: #2d6a2d; color: #fff;
          border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25); transition: transform .15s, background .15s;
        }
        .stasa-fab:hover { transform: scale(1.05); background: #234f23; }
        .stasa-proactive {
          position: fixed; bottom: 92px; right: 20px; z-index: 2147483000;
          max-width: 260px; background: #fff; color: #1a1a1a;
          border: 1px solid #EAECF0; border-radius: 14px; padding: 14px 16px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18); font-size: 14px; line-height: 1.4;
          cursor: pointer; animation: stasa-pop .25s ease-out;
        }
        .stasa-proactive-close {
          position: absolute; top: 6px; right: 8px; background: none; border: none;
          color: #999; cursor: pointer; font-size: 16px; line-height: 1;
        }
        .stasa-panel {
          position: fixed; bottom: 20px; right: 20px; z-index: 2147483000;
          width: 380px; max-width: calc(100vw - 32px); height: 560px; max-height: calc(100vh - 40px);
          background: #fff; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
          box-shadow: 0 12px 40px rgba(0,0,0,0.3); animation: stasa-pop .2s ease-out;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }
        .stasa-header {
          background: #2d6a2d; color: #fff; padding: 16px 18px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .stasa-header h3 { margin: 0; font-size: 16px; font-weight: 700; }
        .stasa-header p { margin: 2px 0 0; font-size: 12px; opacity: .85; }
        .stasa-x { background: none; border: none; color: #fff; cursor: pointer; font-size: 20px; line-height: 1; }
        .stasa-body { flex: 1; overflow-y: auto; padding: 16px; background: #f7f7f7; display: flex; flex-direction: column; gap: 10px; }
        .stasa-row { display: flex; flex-direction: column; max-width: 85%; }
        .stasa-row.user { align-self: flex-end; align-items: flex-end; }
        .stasa-row.assistant, .stasa-row.staff { align-self: flex-start; align-items: flex-start; }
        .stasa-label { font-size: 11px; font-weight: 700; color: #e0951a; margin: 0 0 2px 2px; }
        .stasa-bubble { padding: 9px 13px; border-radius: 14px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; word-wrap: break-word; }
        .stasa-bubble.user { background: #2d6a2d; color: #fff; border-bottom-right-radius: 4px; }
        .stasa-bubble.assistant { background: #fff; color: #1a1a1a; border: 1px solid #EAECF0; border-bottom-left-radius: 4px; }
        .stasa-bubble.staff { background: #fff7e6; color: #1a1a1a; border: 1px solid #f5a623; border-bottom-left-radius: 4px; }
        .stasa-typing { font-size: 13px; color: #888; padding: 4px 6px; }
        .stasa-footer { border-top: 1px solid #EAECF0; padding: 10px; display: flex; gap: 8px; background: #fff; }
        .stasa-input {
          flex: 1; resize: none; border: 1px solid #EAECF0; border-radius: 10px;
          padding: 9px 11px; font-size: 14px; font-family: inherit; max-height: 96px; outline: none;
        }
        .stasa-input:focus { border-color: #2d6a2d; }
        .stasa-send {
          background: #2d6a2d; color: #fff; border: none; border-radius: 10px;
          padding: 0 16px; font-weight: 700; cursor: pointer; font-size: 14px;
        }
        .stasa-send:disabled { opacity: .5; cursor: default; }
        @keyframes stasa-pop { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      {/* Proactive popup */}
      {showProactive && !open && (
        <div className="stasa-proactive" onClick={openWidget}>
          <button
            className="stasa-proactive-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowProactive(false);
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
          {OPENING_MESSAGE}
        </div>
      )}

      {/* Launcher */}
      {!open && (
        <button className="stasa-fab" onClick={openWidget} aria-label="Open chat">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="stasa-panel">
          <div className="stasa-header">
            <div>
              <h3>Chat with Sell to Adam</h3>
              <p>{handoffRequested ? "Adam has been notified — hang tight!" : "Usually replies in a few minutes"}</p>
            </div>
            <button className="stasa-x" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="stasa-body" ref={scrollRef}>
            {shownMessages.map((m, i) => (
              <div key={i} className={`stasa-row ${m.role}`}>
                {m.role === "staff" && <span className="stasa-label">Adam</span>}
                <div className={`stasa-bubble ${m.role}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="stasa-typing">typing…</div>}
          </div>

          <div className="stasa-footer">
            <textarea
              className="stasa-input"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
            />
            <button className="stasa-send" onClick={send} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
