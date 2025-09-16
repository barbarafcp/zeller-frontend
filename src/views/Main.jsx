import { useEffect, useMemo, useState } from "react";
import { getClients, getFollowUpClients, getClientMessages } from "../api/api";

import Sidebar from "../components/Sidebar";
import ClientList from "../components/ClientList";
import ChatView from "../components/ChatView";
import EmptyState from "../components/EmptyState";

import "../styles/main-layout.css";

export default function Main() {
  const [mode, setMode] = useState("followup"); // "followup" | "all"
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingClients(true);
        setError(null);
        setSelectedClient(null);
        setMessages(null);

        const list =
          mode === "followup"
            ? await getFollowUpClients()
            : await getClients();

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

  // Handle client selection → load messages
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setLoadingMessages(true);
    setError(null);
    setMessages(null);

    let alive = true;
    (async () => {
      try {
        const msgs = await getClientMessages(client.id);
        if (alive) setMessages(msgs);
      } catch (err) {
        if (alive) setError(err?.response?.data?.message || err.message);
      } finally {
        if (alive) setLoadingMessages(false);
      }
    })();

    return () => {
      alive = false;
    };
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
          <EmptyState message="Select a client to view messages." />
        )}

        {selectedClient && loadingMessages && (
          <EmptyState message="Loading messages…" spinner />
        )}

        {selectedClient && !loadingMessages && !showChat && (
          <EmptyState message="No messages for this client yet." />
        )}

        {selectedClient && showChat && messages && (
          <ChatView client={selectedClient} messages={messages} />
        )}
      </main>
    </div>
  );
}
