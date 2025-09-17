import "../styles/client-list.css";

export default function ClientList({ clients, loading, selectedId, onSelect }) {
  return (
    <section className="client-list">
      <header className="client-list-header">
        <h2>Clients</h2>
        {loading && <span className="client-list-loading">Loading…</span>}
      </header>

      <div className="client-list-items">
        {clients.map((client) => (
          <button
            key={client.id}
            className={`client-pill ${selectedId === client.id ? "is-selected" : ""}`}
            onClick={() => onSelect(client)}
            title={client.name}
          >
            {client.name}
          </button>
        ))}

        {!loading && clients.length === 0 && (
          <div className="client-list-empty">No clients found.</div>
        )}
      </div>
    </section>
  );
}
