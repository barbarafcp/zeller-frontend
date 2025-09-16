export default function EmptyState({ message, spinner }) {
  return (
    <div className="empty">
      {spinner && <div className="spinner" aria-hidden />}
      <p>{message}</p>
    </div>
  );
}
