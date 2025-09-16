import MessageBubble from "./MessageBubble";
import "../styles/chat.css";

export default function ChatView({ client, messages }) {
  return (
    <div className="chat">
      <header className="chat__header">
        <h2 className="chat__title">{client.name}</h2>
      </header>

      <div className="chat__messages">
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text} sentAt={m.sent_at} />
        ))}
      </div>
    </div>
  );
}
