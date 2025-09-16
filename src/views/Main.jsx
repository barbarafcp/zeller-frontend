import { useEffect, useMemo, useRef, useState } from "react";
import { getClients, getClientsToFollowUp, getClientsNotToFollowUp, getClientbyId } from "../api/api";

import Sidebar from "../components/Sidebar";
import ClientList from "../components/ClientList";
import ChatView from "../components/ChatView";
import EmptyState from "../components/EmptyState";

import "../styles/main-layout.css";

export default function Main() {
  const [mode, setMode] = useState("all"); // modes: "all" | "followup" | "noFollowup"
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  // Guard against race conditions when switching clients quickly
  const fetchIdRef = useRef(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingClients(true);
        setError(null);
        setSelectedClient(null);
        setMessages(null);

        let list = [];
        if (mode === "followup") {
          list = await getClientsToFollowUp();
        } else if (mode === "noFollowup") {
          list = await getClientsNotToFollowUp();
        } else {
          list = await getClients();
        }

        if (alive) setClients(list);
      } catch (err) {
        if (alive) setError(err?.response?.data?.message || err.message);
      } finally {
        if (alive) setLoadingClients(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [mode]);

  // Handle client selection → load full client (which includes messages)
  const handleSelectClient = (client) => {
    setLoadingMessages(true);
    setError(null);
    setMessages(null);

    const myFetchId = ++fetchIdRef.current;

    (async () => {
      try {
        const fullClient = await getClientbyId(client.id); // or await getClientMessages(client.id)
        // Ignore if a newer selection started
        if (fetchIdRef.current !== myFetchId) return;

        setSelectedClient(fullClient || client); // keep original basic data if null
        setMessages(fullClient?.Messages ?? []); // because /clients/:id returns messages
      } catch (err) {
        if (fetchIdRef.current !== myFetchId) return;
        setError(err?.response?.data?.message || err.message);
      } finally {
        if (fetchIdRef.current === myFetchId) setLoadingMessages(false);
      }
    })();
  };

  const showChat = useMemo(
    () => Array.isArray(messages) && messages.length > 0,
    [messages]
  );

  return (
    <div className="app-grid">
      <Sidebar title="Zellercito" mode={mode} onModeChange={setMode} />

      <ClientList
        clients={clients}
        loading={loadingClients}
        selectedId={selectedClient?.id ?? null}
        onSelect={handleSelectClient}
      />

      <main className="chat-area">
        {error && <div className="error-banner">{error}</div>}

        {!selectedClient && !loadingMessages && (
          <EmptyState message="Selecciona a un cliente para ver los mensajes." />
        )}

        {selectedClient && loadingMessages && (
          <EmptyState message="Cargando…" spinner />
        )}

        {selectedClient && !loadingMessages && !showChat && (
          <EmptyState message="No hay mensajes disponibles." />
        )}

        {selectedClient && showChat && messages && (
          <ChatView client={selectedClient} messages={messages} />
        )}
      </main>
    </div>
  );
}
