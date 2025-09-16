import "../styles/client-list.css";

export default function ClientList({ clients, loading, selectedId, onSelect }) {
  return (
    <section className="client-list">
      <header className="client-list__header">
        <h2>Clients</h2>
        {loading && <span className="client-list__loading">Loading…</span>}
      </header>

      <div className="client-list__items">
        {clients.map((c) => (
          <button
            key={c.id}
            className={`client-pill ${selectedId === c.id ? "is-selected" : ""}`}
            onClick={() => onSelect(c)}
            title={c.name}
          >
            {c.name}
          </button>
        ))}

        {!loading && clients.length === 0 && (
          <div className="client-list__empty">No clients found.</div>
        )}
      </div>
    </section>
  );
}
