import { useState } from "react";
import ResultModal from "../components/ResultModal";
import { api } from "../services/api";
import CardSendEmail from "../components/CardSendEmail";

export function Home() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/process-email", {
        content,
      });

      setCategory(response.data.category);
      setResponseText(response.data.response);
      setIsModalOpen(true);
    } catch (err) {
      setError("Erro ao processar email");
    } finally {
      setLoading(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <CardSendEmail
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <ResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={category}
        responseText={responseText}
      />
    </>
  );
}
