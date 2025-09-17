import { useEffect, useRef, useState } from "react";
import { getClients, getClientsToFollowUp, getClientsNotToFollowUp, getClientbyId } from "../api/api";

//Hook para manejar clientes, selección y mensajes de main.jsx
export default function useClients(mode) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState(null);
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  const fetchIdRef = useRef(0);

  // Fetch clients
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingClients(true);
        setError(null);
        setSelectedClient(null);
        setMessages(null);

        let list = [];
        if (mode === "followup") list = await getClientsToFollowUp();
        else if (mode === "noFollowup") list = await getClientsNotToFollowUp();
        else list = await getClients();

        if (alive) setClients(list);
      } catch (err) {
        if (alive) setError(err?.response?.data?.message || err.message);
      } finally {
        if (alive) setLoadingClients(false);
      }
    })();

    return () => { alive = false; };
  }, [mode]);

  // Manejo de selección de cliente
  const selectClient = (client) => {
    setLoadingMessages(true);
    setError(null);
    setMessages(null);

    const myFetchId = ++fetchIdRef.current;

    (async () => {
      try {
        const fullClient = await getClientbyId(client.id);
        if (fetchIdRef.current !== myFetchId) return;

        setSelectedClient(fullClient || client);
        setMessages(fullClient?.Messages ?? []);
      } catch (err) {
        if (fetchIdRef.current !== myFetchId) return;
        setError(err?.response?.data?.message || err.message);
      } finally {
        if (fetchIdRef.current === myFetchId) setLoadingMessages(false);
      }
    })();
  };

  return {
    clients,
    selectedClient,
    messages,
    loadingClients,
    loadingMessages,
    error,
    selectClient,
    setMessages,
  };
}
