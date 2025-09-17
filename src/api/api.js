import axios from "axios";
import API_URL from '../config'

// Instancia de Axios con URL base y timeout
export const http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Obtener todos los clientes
export const getClients = async () => {
  const { data } = await http.get("/clients");
  return data || [];
};

// Obtener clientes que necesitan seguimiento
export const getClientsToFollowUp = async () => {
  const { data } = await http.get("/clients-to-do-follow-up");
  return data || [];
};

// Obtener un cliente por su ID
export const getClientbyId = async (clientId) => {
  const { data } = await http.get(`/clients/${clientId}`);
  return data || [];
};

// Obtener clientes que NO necesitan seguimiento
export const getClientsNotToFollowUp = async () => {
  const [allClients, followUpClients] = await Promise.all([
    getClients(),
    getClientsToFollowUp(),
  ]);

  const followUpIds = new Set(followUpClients.map((c) => c.id));
  return allClients.filter((c) => !followUpIds.has(c.id));
};

// Generar mensaje automático para un cliente
export const generateAgentMessage = async (clientId) => {
  const { data } = await http.get(`/clients/${clientId}/generateMessage`);
  return data || [];
};