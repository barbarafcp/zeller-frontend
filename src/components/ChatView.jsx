import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import "../styles/chat.css";

export default function ChatView({ client, messages, onGenerate, generating }) {
  const listRef = useRef(null);
  const [atBottom, setAtBottom] = useState(true);

  useEffect(() => {
    const el = listRef.current;
    if (el && atBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, atBottom]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 40;
      const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      setAtBottom(isBottom);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="chat">
      <header className="chat__header">
        <h2 className="chat__title">{client.name}</h2>
      </header>

      <div className="chat__messages" ref={listRef}>
        {messages.map((m, idx) => (
          <MessageBubble key={m.id ?? `msg-${idx}`} role={m.role} text={m.text} sentAt={m.sent_at} />
        ))}
      </div>

      {atBottom && (
        <div className="chat__footer">
          <button
            className="chat__generate-btn"
            onClick={onGenerate}
            disabled={generating}
            aria-busy={generating ? "true" : "false"}
          >
            {generating ? "Generando…" : "Generar mensaje"}
          </button>
        </div>
      )}
    </div>
  );
}
