function CardSendEmail({ content, setContent, handleSubmit, loading, result, error }) {
   return (
    <div className="min-h-[85vh] w-full px-8 flex items-center justify-center bg-bg-primary">
      <div className="w-full max-w-6xl h-[75vh]">
        <div className="h-full flex flex-col rounded-xl border border-gray-200 bg-bg-secondary shadow-sm">
          
          {/* Header */}
          <div className="px-10 pt-8 pb-4">
            <h1 className="text-text text-4xl font-semibold text-center tracking-tight">
              Envie seu email
            </h1>
            <p className="text-text/60 text-center mt-2 text-sm">
              Escreva uma mensagem que será classificada automaticamente.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-10" />

          {/* Editor */}
          <div className="flex-1 px-10 py-3">
            <textarea
              placeholder="Digite sua mensagem aqui…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full resize-none rounded-lg border border-gray-200
                         bg-white px-6 py-5 text-base text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         placeholder:text-gray-400"
            />
          </div>

          {/* Resultado */}
          {(result || error) && (
            <div className="px-10 pb-2">
              {result && (
                <p className="text-green-600 font-medium">
                  Classificação: <strong>{result}</strong>
                </p>
              )}

              {error && (
                <p className="text-red-600 font-medium">
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-10 pb-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="sombra-azul px-8 py-1 text-xl font-medium
                        transition text-text h-14 hover:text-primary
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardSendEmail;