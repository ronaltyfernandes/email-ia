import { Table } from "../components/Tables/Tabelas";
import { Pagination } from "../components/Pagination";
import { useEmailList } from "../hooks";
import { emailTableColumns } from "../constants/emailColumns";

function Respostas() {
  const { state, goToPreviousPage, goToNextPage } = useEmailList();

  const totalPages = Math.ceil(state.total / 10) || 1;

  if (state.loading) {
    return <p className="p-6">Carregando...</p>;
  }

  if (state.error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">{state.error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 text-text sombra-azul bg-bg-secondary">
        Respostas de Emails
      </h1>

      <Table columns={emailTableColumns} data={state.data} />

      <Pagination
        currentPage={state.page}
        totalPages={totalPages}
        onPreviousPage={goToPreviousPage}
        onNextPage={() => goToNextPage(totalPages)}
      />
    </div>
  );
}

export default Respostas;
