"use client";

import { useEffect, useRef, useState } from "react";
import CrisisBanner from "./CrisisBanner";

type Message = { role: "user" | "assistant"; content: string };

type Props = {
  onBack: () => void;
};

const HISTORY_KEY = "alivio-chat-history";

export default function TextMode({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al contactar el servidor.");
      }

      if (data.crisisDetected) setCrisisDetected(true);

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Algo salió mal. Intenta de nuevo.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    if (confirm("¿Seguro que quieres borrar toda la conversación?")) {
      setMessages([]);
      setCrisisDetected(false);
      try {
        localStorage.removeItem(HISTORY_KEY);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-alivio-gray to-white dark:from-alivio-dark dark:to-slate-900 transition-colors duration-300">
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-white/10">
        <button
          onClick={onBack}
          className="text-slate-700 dark:text-white font-medium px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-300"
        >
          ← Volver
        </button>
        <h2 className="text-lg font-light text-slate-800 dark:text-white">
          Alivio
        </h2>
        <button
          onClick={clearConversation}
          className="text-slate-700 dark:text-white px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-300"
          aria-label="Borrar conversación"
        >
          🗑
        </button>
      </header>

      <section className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl w-full mx-auto">
        {crisisDetected && <CrisisBanner />}

        {messages.length === 0 && !crisisDetected && (
          <div className="text-center text-slate-500 dark:text-slate-300 mt-20">
            <p className="text-lg">Cuéntame qué sientes. Estoy aquí.</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] bg-alivio-sky text-slate-800 rounded-3xl rounded-br-md px-5 py-3 shadow-soft"
                    : "max-w-[80%] bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-100 dark:border-white/10 rounded-3xl rounded-bl-md px-5 py-3 shadow-soft"
                }
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-white/10 text-slate-600 dark:text-slate-200 border border-slate-100 dark:border-white/10 rounded-3xl rounded-bl-md px-5 py-3 shadow-soft flex items-center gap-2">
                <span className="text-sm">Alivio está escribiendo</span>
                <span className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing"
                    style={{ animationDelay: "0.4s" }}
                  />
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 dark:text-red-300 text-sm py-2">
              {error}
            </div>
          )}

          <div ref={endRef} />
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe lo que sientes…"
            rows={1}
            className="flex-1 resize-none px-5 py-4 rounded-3xl bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-alivio-sky text-lg"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || input.trim() === ""}
            aria-label="Enviar"
            className="w-14 h-14 rounded-full bg-alivio-sky hover:bg-sky-300 dark:bg-alivio-mint dark:hover:bg-emerald-300 text-slate-800 text-xl shadow-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            ➤
          </button>
        </div>
      </footer>
    </main>
  );
}
