export default function MessageBubble({ role, text, sentAt }) {
  const isClient = role === "client";

  return (
    <div className={`bubble-row ${isClient ? "left" : "right"}`}>
      <div className={`bubble ${isClient ? "bubble--client" : "bubble--agent"}`}>
        <p>{text}</p>
        {sentAt && <time className="bubble__time">{new Date(sentAt).toLocaleString()}</time>}
      </div>
    </div>
  );
}
