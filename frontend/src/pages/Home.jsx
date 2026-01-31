import ResultModal from "../components/ResultModal";
import CardSendEmail from "../components/CardSendEmail";
import { useEmailProcessor } from "../hooks";

export function Home() {
  const { state, processEmail, setContent, closeModal } = useEmailProcessor();

  const handleSubmit = () => {
    processEmail(state.content);
  };

  return (
    <>
      <CardSendEmail
        content={state.content}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        isLoading={state.loading}
        error={state.error}
      />

      <ResultModal
        isOpen={state.isModalOpen}
        onClose={closeModal}
        category={state.category}
        responseText={state.responseText}
      />
    </>
  );
}
