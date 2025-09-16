import "../styles/sidebar.css";

export default function Sidebar({ title, mode, onModeChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__title">{title}</div>

      <nav className="sidebar__nav">
        <button
          className={`sidebar__btn ${mode === "followup" ? "is-active" : ""}`}
          onClick={() => onModeChange("followup")}
        >
          Clients to Follow Up
        </button>

        <button
          className={`sidebar__btn ${mode === "all" ? "is-active" : ""}`}
          onClick={() => onModeChange("all")}
        >
          All Clients
        </button>
      </nav>
    </aside>
  );
}
