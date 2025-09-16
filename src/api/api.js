import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  timeout: 10000,
});

export const getClients = async () => {
  const { data } = await http.get("/clients");
  return data || [];
};

export const getFollowUpClients = async () => {
  const { data } = await http.get("/clients-follow-up");
  return data || [];
};

export const getClientMessages = async (clientId) => {
  const { data } = await http.get(`/clients/${clientId}/messages`);
  return data || [];
};