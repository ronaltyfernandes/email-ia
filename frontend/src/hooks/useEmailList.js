/**
 * Hook customizado para listar e-mails com paginação
 * Responsável pela lógica de busca, paginação e gerenciamento de estado
 */
import { useEffect, useState } from "react";
import { api } from "../services/api";

const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 10,
  INITIAL_PAGE: 1,
};

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: null,
  page: PAGINATION_CONFIG.INITIAL_PAGE,
  total: 0,
};

export function useEmailList() {
  const [state, setState] = useState(INITIAL_STATE);

  /**
   * Atualiza estado de forma segura
   */
  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Busca emails da API
   */
  const fetchEmails = async (page) => {
    updateState({ loading: true, error: null });

    try {
      const response = await api.get("/emails", {
        params: {
          page,
          limit: PAGINATION_CONFIG.DEFAULT_LIMIT,
        },
      });

      updateState({
        data: response.data.data,
        total: response.data.total,
        page,
      });
    } catch (error) {
      console.error("Erro ao buscar emails:", error);
      updateState({
        error:
          error.response?.data?.detail || "Erro ao buscar emails",
      });
    } finally {
      updateState({ loading: false });
    }
  };

  /**
   * Carrega emails quando página muda
   */
  useEffect(() => {
    fetchEmails(state.page);
  }, [state.page]);

  /**
   * Navega para página anterior
   */
  const goToPreviousPage = () => {
    updateState((prev) => ({
      page: Math.max(prev.page - 1, PAGINATION_CONFIG.INITIAL_PAGE),
    }));
  };

  /**
   * Navega para página seguinte
   */
  const goToNextPage = (totalPages) => {
    updateState((prev) => ({
      page: Math.min(prev.page + 1, totalPages),
    }));
  };

  /**
   * Navega para página específica
   */
  const goToPage = (page) => {
    const validPage = Math.max(page, PAGINATION_CONFIG.INITIAL_PAGE);
    updateState({ page: validPage });
  };

  /**
   * Reseta para estado inicial
   */
  const reset = () => {
    setState(INITIAL_STATE);
  };

  return {
    state,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    reset,
  };
}
