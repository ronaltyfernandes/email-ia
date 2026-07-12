import { useEffect, useState } from "react";
import {
  LoaderCircle,
  Server,
  Cloud,
  Coffee,
  Rocket,
  XCircle,
} from "lucide-react";
import { getStatus } from "./src/services/api";

const FUN_MESSAGES = [
  "Acordando o servidor que estava tirando uma soneca 😴",
  "Esquentando os circuitos...",
  "Convencendo os hamsters a correr mais rápido 🐹",
  "Quase lá, prometo!",
  "O servidor tá tomando um café ☕ antes de começar",
];

function BackendBootstrap({ children }) {
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);
  const [dots, setDots] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % FUN_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const MAX_RETRIES = 20;

    async function waitForBackend() {
      let retries = 0;

      while (!cancelled && retries < MAX_RETRIES) {
        try {
          await getStatus();

          if (!cancelled) {
            setServerOnline(true);
            setLoading(false);
          }

          return;
        } catch {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }

      if (!cancelled) {
        setLoading(false);
        setServerOnline(false);
      }
    }

    waitForBackend();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
        {/* Fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        </div>

        <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-10 shadow-2xl">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full border-4 border-primary/20 animate-ping" />
            <div className="absolute h-20 w-20 rounded-full border-4 border-primary/30" />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <Server size={30} />
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold">
            Chamando o servidor{dots}
          </h1>

          <p className="mt-4 text-center text-muted-foreground leading-relaxed transition-opacity duration-500">
            {FUN_MESSAGES[msgIndex]}
          </p>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Este projeto está hospedado em um plano gratuito.
            Quando fica algum tempo sem acessos, o servidor entra em modo de
            espera e precisa de alguns segundos para iniciar novamente.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <LoaderCircle className="animate-spin text-primary" />
              <span>Ligando a API</span>
            </div>

            <div className="flex items-center gap-4">
              <Cloud className="text-primary animate-pulse" />
              <span>Conectando aos serviços</span>
            </div>

            <div className="flex items-center gap-4">
              <Coffee className="text-primary animate-bounce" />
              <span>Aguardando o servidor terminar o café</span>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-full bg-muted">
            <div className="h-2 w-1/2 rounded-full bg-primary animate-pulse" />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Normalmente leva entre <strong>20 e 60 segundos</strong> na primeira
            visita. Vale a pena esperar, prometo 🚀
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Feito com 💻 e muito enérgetico por{" "}
            <a
              href="https://ronaltyfernandes.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            >
              confira meu portfólio
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (!serverOnline) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-3xl border bg-card p-10 text-center shadow-xl">
          <XCircle size={60} className="mx-auto mb-6 text-destructive" />
          <h1 className="text-2xl font-bold mb-4">
            Ih, o servidor não apareceu 🙁
          </h1>
          <p className="text-muted-foreground mb-8">
            Ele deve ter ido tomar um ar. Tenta de novo em alguns instantes,
            geralmente resolve.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-primary px-6 py-3 text-white transition hover:scale-105"
          >
            Tentar de novo
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <a
              href="https://ronaltyfernandes.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            >
              confira meu portfólio
            </a>
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default BackendBootstrap;