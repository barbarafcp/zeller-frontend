import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ClientList from "../components/ClientList";
import ChatView from "../components/ChatView";
import EmptyState from "../components/EmptyState";
import useClients from "../hooks/useClients";
import useGenerateMessage from "../hooks/useGenerateMessage";

import "../styles/main-layout.css";

export default function Main() {
  const [mode, setMode] = useState("all"); // modes: "all" | "followup" | "noFollowup"

  const {
    clients,
    selectedClient,
    messages,
    loadingClients,
    loadingMessages,
    error,
    selectClient,
    setMessages,
  } = useClients(mode);

  // Hook para generar mensajes automáticos
  const { generating, generateMessage } = useGenerateMessage(selectedClient, setMessages);

  // Indica si hay mensajes para mostrar
  const showChat = Array.isArray(messages) && messages.length > 0;

  return (
    <div className="app-grid">
      <Sidebar title="Zellercito" mode={mode} onModeChange={setMode} />

      <ClientList
        clients={clients}
        loading={loadingClients}
        selectedId={selectedClient?.id ?? null}
        onSelect={selectClient}
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

        {selectedClient && showChat && (
          <ChatView
            client={selectedClient}
            messages={messages}
            onGenerate={generateMessage}
            generating={generating}
          />
        )}
      </main>
    </div>
  );
}
