import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import "../styles/chat.css";

export default function ChatView({ client, messages, onGenerate, generating }) {
  const listRef = useRef(null);
  const [atBottom, setAtBottom] = useState(true);

  // Mantener scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    const el = listRef.current;
    if (el && atBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, atBottom]);

  // Detectar si el usuario está al final del scroll
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 40;
      const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      setAtBottom(isBottom);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcular total de deudas del cliente
  const totalDebts = client.Debts?.length > 0
    ? client.Debts.reduce((sum, d) => sum + (d.amount ?? 0), 0)
    : "No tiene";

  return (
    <div className="chat">
      <header className="chat-header">
        <h2 className="chat-title">{client.name}</h2>
         <p className="client-info">RUT: {client.rut} - Deudas: {totalDebts}</p>
      </header>

      <div className="chat-messages" ref={listRef}>
        {messages.map((m, idx) => (
          <MessageBubble key={m.id ?? `msg-${idx}`} role={m.role} text={m.text} />
        ))}
      </div>

      {atBottom && (
        <div className="chat-footer">
          <button
            className="chat-generate-btn"
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
