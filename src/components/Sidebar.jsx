import "../styles/sidebar.css";

export default function Sidebar({ title, mode, onModeChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">{title}</div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-btn ${mode === "all" ? "is-active" : ""}`}
          onClick={() => onModeChange("all")}
        >
          All Clients
        </button>

         <button
          className={`sidebar-btn ${mode === "followup" ? "is-active" : ""}`}
          onClick={() => onModeChange("followup")}
        >
          Clients to Follow Up
        </button>

        <button
          className={`sidebar-btn ${mode === "noFollowup" ? "is-active" : ""}`}
          onClick={() => onModeChange("noFollowup")}
        >
          Clients that don't need follow up
        </button>
      </nav>
    </aside>
  );
}
