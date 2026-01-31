export function Pagination({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between mt-4">
      <span className="text-sm text-text">
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          onClick={onPreviousPage}
          disabled={!canGoPrevious}
          className="px-3 py-1 rounded border border-text/20 disabled:opacity-40 sombra-azul bg-bg-secondary hover:text-primary transition"
        >
          Anterior
        </button>

        <button
          onClick={onNextPage}
          disabled={!canGoNext}
          className="px-3 py-1 rounded border border-text/20 disabled:opacity-40 sombra-azul bg-bg-secondary hover:text-primary transition"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
