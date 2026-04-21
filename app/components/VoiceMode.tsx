"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CrisisBanner from "./CrisisBanner";

type Message = { role: "user" | "assistant"; content: string };

type Props = {
  onBack: () => void;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

export default function VoiceMode({ onBack }: Props) {
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [transcript, setTranscript] = useState("");
  const [lastReply, setLastReply] = useState("");
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const messagesRef = useRef<Message[]>([]);
  const activeRef = useRef(true);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        resolve();
        return;
      }
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang === "es-MX") ||
        voices.find((v) => v.lang === "es-ES") ||
        voices.find((v) => v.lang.startsWith("es"));
      if (preferred) utter.voice = preferred;
      utter.lang = preferred?.lang || "es-MX";
      utter.pitch = 1;
      utter.rate = 0.9;
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    });
  }, []);

  const sendToServer = useCallback(
    async (userText: string) => {
      setStatus("thinking");
      const newMessages: Message[] = [
        ...messagesRef.current,
        { role: "user", content: userText },
      ];
      messagesRef.current = newMessages;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error del servidor");

        if (data.crisisDetected) setCrisisDetected(true);

        const reply = data.reply as string;
        messagesRef.current = [
          ...newMessages,
          { role: "assistant", content: reply },
        ];
        setLastReply(reply);
        setStatus("speaking");
        await speak(reply);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Error al procesar la voz.";
        setError(msg);
      } finally {
        if (activeRef.current) {
          setStatus("listening");
          startListening();
        }
      }
    },
    [speak]
  );

  const startListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      setTranscript("");
      rec.start();
      setStatus("listening");
    } catch {
      /* ya está escuchando */
    }
  }, []);

  useEffect(() => {
    activeRef.current = true;

    const AnyWindow = window as any;
    const SpeechRecognition =
      AnyWindow.SpeechRecognition || AnyWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec: SpeechRecognitionLike = new SpeechRecognition();
    rec.lang = "es-MX";
    rec.continuous = false;
    rec.interimResults = true;

    let finalText = "";

    rec.onresult = (event: any) => {
      let interim = "";
      finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      setTranscript(finalText || interim);
    };

    rec.onerror = (event: any) => {
      if (event?.error === "no-speech" || event?.error === "aborted") return;
      setError(`Error de reconocimiento: ${event?.error || "desconocido"}`);
    };

    rec.onend = () => {
      const text = finalText.trim();
      if (text && activeRef.current) {
        sendToServer(text);
      } else if (activeRef.current && status === "listening") {
        try {
          rec.start();
        } catch {
          /* ignore */
        }
      }
    };

    recognitionRef.current = rec;

    // Cargar voces (algunos navegadores las cargan async)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    startListening();

    return () => {
      activeRef.current = false;
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    activeRef.current = false;
    try {
      recognitionRef.current?.abort();
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    onBack();
  };

  if (!supported) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-alivio-sky to-white dark:from-alivio-dark dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-md text-center bg-white dark:bg-white/10 rounded-3xl p-8 shadow-soft">
          <p className="text-lg text-slate-800 dark:text-white mb-6">
            Tu navegador no soporta voz. Usa Chrome o prueba el modo texto.
          </p>
          <button
            onClick={onBack}
            className="bg-alivio-sky hover:bg-sky-300 text-slate-800 font-medium py-3 px-6 rounded-3xl shadow-soft transition-all duration-300"
          >
            ← Volver
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-gradient-to-b from-alivio-sky via-white to-alivio-mint dark:from-alivio-dark dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <header className="w-full max-w-md flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-slate-700 dark:text-white font-medium px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-300"
        >
          ← Volver
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {status === "listening" && "Escuchando…"}
          {status === "thinking" && "Pensando…"}
          {status === "speaking" && "Hablando…"}
          {status === "idle" && "Preparando…"}
        </span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {crisisDetected && (
          <div className="w-full mb-6">
            <CrisisBanner />
          </div>
        )}

        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {status === "listening" && (
            <>
              <span className="absolute inset-0 rounded-full bg-alivio-sky/60 dark:bg-alivio-mint/40 animate-pulseRing" />
              <span
                className="absolute inset-0 rounded-full bg-alivio-sky/40 dark:bg-alivio-mint/30 animate-pulseRing"
                style={{ animationDelay: "0.4s" }}
              />
            </>
          )}
          {status === "speaking" && (
            <>
              <span className="absolute inset-4 rounded-full bg-alivio-mint/60 dark:bg-alivio-sky/40 animate-wave" />
              <span
                className="absolute inset-8 rounded-full bg-alivio-mint/40 dark:bg-alivio-sky/30 animate-wave"
                style={{ animationDelay: "0.3s" }}
              />
            </>
          )}
          <div className="relative w-32 h-32 rounded-full bg-white dark:bg-white/10 shadow-soft flex items-center justify-center text-5xl">
            {status === "speaking" ? "💬" : "🎙️"}
          </div>
        </div>

        <div className="w-full min-h-[120px] text-center">
          {transcript && (
            <p className="text-slate-600 dark:text-slate-200 italic mb-3">
              "{transcript}"
            </p>
          )}
          {lastReply && (
            <p className="text-slate-800 dark:text-white leading-relaxed">
              {lastReply}
            </p>
          )}
          {error && (
            <p className="text-red-600 dark:text-red-300 text-sm mt-3">
              {error}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleBack}
        className="w-full max-w-md bg-white dark:bg-white/10 text-slate-800 dark:text-white font-medium py-4 px-6 rounded-3xl shadow-soft hover:scale-[1.02] transition-transform duration-300"
      >
        Terminar conversación
      </button>
    </main>
  );
}
