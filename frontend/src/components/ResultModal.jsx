import { useEffect, useRef, useState } from "react";

export default function ResultModal({
  isOpen,
  onClose,
  category,
  responseText,
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(responseText);
      setCopied(true);

      // Limpa timeout anterior se existir
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Volta ao normal após 2s
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar texto", err);
    }
  }

  // Fechar com ESC
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") onClose();
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  // Cleanup do timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-xl bg-bg-secondary shadow-xl p-8 relative">

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-text">
            Resultado da Classificação
          </h2>
          <p
            className={`mt-2 font-medium ${
              category === "Produtivo"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Classificação: {category}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Response */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text mb-2">
            Resposta sugerida
          </h3>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-800 whitespace-pre-wrap">
            {responseText}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCopy}
            disabled={copied}
            className={`px-6 py-2 text-base sombra-azul transition text-text hover:bg-bg hover:text-primary
              ${copied ? "opacity-70 cursor-default" : ""}
            `}
          >
            {copied ? "Resposta copiada ✓" : "Copiar resposta"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-gray-300 text-text hover:bg-bg hover:text-primary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
