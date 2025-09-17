export default function MessageBubble({ role, text }) {
  const isClient = role === "client";

  return (
    <div className={`bubble-row ${isClient ? "left" : "right"}`}>
      <div className={`bubble ${isClient ? "bubble--client" : "bubble--agent"}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}
