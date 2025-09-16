import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  timeout: 10000,
});

export const getClients = async () => {
  const { data } = await http.get("/clients");
  return data || [];
};

export const getClientsToFollowUp = async () => {
  const { data } = await http.get("/clients-to-do-follow-up");
  return data || [];
};

export const getClientbyId = async (clientId) => {
  const { data } = await http.get(`/clients/${clientId}`);
  return data || [];
};

export const getClientsNotToFollowUp = async () => {
  const [allClients, followUpClients] = await Promise.all([
    getClients(),
    getClientsToFollowUp(),
  ]);

  const followUpIds = new Set(followUpClients.map((c) => c.id));
  return allClients.filter((c) => !followUpIds.has(c.id));
};