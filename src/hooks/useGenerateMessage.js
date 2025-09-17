import { useState } from "react";
import { generateAgentMessage } from "../api/api";

// Hook para generar la creación del mensaje con IA
export default function useGenerateMessage(selectedClient, setMessages) {
  const [generating, setGenerating] = useState(false);

  const generateMessage = async () => {
    if (!selectedClient) return;
    try {
      setGenerating(true);
      const newMsg = await generateAgentMessage(selectedClient.id);
      setMessages(prev => Array.isArray(prev) ? [...prev, newMsg] : [newMsg]);
    } finally {
      setGenerating(false);
    }
  };

  return { generating, generateMessage };
}
