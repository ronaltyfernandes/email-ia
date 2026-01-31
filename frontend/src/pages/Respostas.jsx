import { useEffect, useState } from "react";
import { Table } from "../components/Tables/Tabelas";

const columns = [
  { header: "Categoria", accessor: "category" },
  { header: "Conteúdo", accessor: "content" },
  { header: "Resposta", accessor: "response" },
  { header: "Fonte", accessor: "font" },
  {
    header: "Criado em",
    accessor: "created_at",
    render: (value) => new Date(value).toLocaleString("pt-BR")
  },
];


function Respostas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch("http://localhost:8000/emails");
        const result = await response.json();
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.error("Erro ao buscar emails:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, []);

  if (loading) {
    return <p className="p-6">Carregando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 text-text sombra-azul bg-bg-secondary">
        Respostas de Emails
      </h1>

      <Table columns={columns} data={data} />
    </div>
  );
}

export default Respostas;
