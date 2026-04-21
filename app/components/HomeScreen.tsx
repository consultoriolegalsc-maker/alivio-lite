"use client";

import { useEffect, useState } from "react";

type Mode = "home" | "voice" | "text";

type Props = {
  onNavigate: (mode: Mode) => void;
};

const THEME_KEY = "alivio-theme";

export default function HomeScreen({ onNavigate }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const shouldDark = stored ? stored === "dark" : prefersDark;
      setIsDark(shouldDark);
      document.documentElement.classList.toggle("dark", shouldDark);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-alivio-sky via-white to-alivio-mint dark:from-alivio-dark dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-soft flex items-center justify-center text-xl hover:scale-105 transition-transform duration-300"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md w-full">
        <h1
          className="text-7xl md:text-8xl font-light text-slate-800 dark:text-white mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Alivio
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-200 mb-12">
          Estoy aquí para escucharte.
        </p>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => onNavigate("voice")}
            className="w-full bg-white dark:bg-white/10 text-slate-800 dark:text-white text-xl font-medium py-6 px-6 rounded-3xl shadow-soft hover:scale-[1.02] transition-transform duration-300"
          >
            🎙️ Hablar
          </button>
          <button
            onClick={() => onNavigate("text")}
            className="w-full bg-white dark:bg-white/10 text-slate-800 dark:text-white text-xl font-medium py-6 px-6 rounded-3xl shadow-soft hover:scale-[1.02] transition-transform duration-300"
          >
            💬 Escribir
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-10">
        Gratis • Anónimo • 24/7
      </p>
    </main>
  );
}
