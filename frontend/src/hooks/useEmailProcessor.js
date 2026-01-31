/**
 * Hook customizado para processar e-mails
 * Responsável pela lógica de negócio e gerenciamento de estado
 */
import { useState } from "react";
import { api } from "../services/api";

const INITIAL_STATE = {
  content: "",
  category: null,
  responseText: "",
  loading: false,
  error: null,
  isModalOpen: false,
};

const ERROR_MESSAGES = {
  EMPTY_CONTENT: "Por favor, insira o conteúdo do email",
  PROCESSING_FAILED: "Erro ao processar email",
  API_ERROR: (detail) => detail || "Erro ao processar email",
};

export function useEmailProcessor() {
  const [state, setState] = useState(INITIAL_STATE);

  /**
   * Atualiza estado de forma segura
   */
  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Processa um email com IA
   */
  const processEmail = async (content) => {
    if (!content.trim()) {
      updateState({ error: ERROR_MESSAGES.EMPTY_CONTENT });
      return false;
    }

    updateState({ loading: true, error: null });

    try {
      const response = await api.post("/emails/process", { content });

      updateState({
        category: response.data.category,
        responseText: response.data.response,
        isModalOpen: true,
      });

      return true;
    } catch (err) {
      const errorDetail =
        err.response?.data?.detail || ERROR_MESSAGES.PROCESSING_FAILED;
      updateState({ error: ERROR_MESSAGES.API_ERROR(errorDetail) });
      return false;
    } finally {
      updateState({ loading: false });
    }
  };

  /**
   * Define o conteúdo do email
   */
  const setContent = (content) => {
    updateState({ content });
  };

  /**
   * Fecha o modal
   */
  const closeModal = () => {
    updateState({ isModalOpen: false });
  };

  /**
   * Reseta o estado para o inicial
   */
  const reset = () => {
    setState(INITIAL_STATE);
  };

  return {
    state,
    processEmail,
    setContent,
    closeModal,
    reset,
  };
}
