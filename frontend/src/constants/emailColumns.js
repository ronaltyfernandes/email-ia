/**
 * Componente para exibir coluna de data formatada
 */
export const dateColumn = {
  header: "Criado em",
  accessor: "created_at",
  render: (value) => new Date(value).toLocaleString("pt-BR"),
};

/**
 * Configuração das colunas da tabela de emails
 */
export const emailTableColumns = [
  dateColumn,
  { header: "Categoria", accessor: "category" },
  { header: "Conteúdo", accessor: "content" },
  { header: "Resposta", accessor: "response" },
  { header: "Fonte", accessor: "font" },
];
