"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "alivio-disclaimer-seen";

export default function Disclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="max-w-md w-full bg-white dark:bg-alivio-dark rounded-3xl shadow-soft p-8 transition-colors duration-300">
        <h2
          id="disclaimer-title"
          className="text-2xl font-light text-slate-800 dark:text-white mb-4"
        >
          Antes de comenzar
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-200 leading-relaxed mb-6">
          Soy Alivio, una IA de apoyo emocional. No sustituyo atención
          profesional de un psicólogo o psiquiatra. Si estás en crisis, por
          favor busca ayuda de un profesional.
        </p>
        <button
          onClick={handleAccept}
          className="w-full bg-alivio-sky hover:bg-sky-300 dark:bg-alivio-mint dark:hover:bg-emerald-300 text-slate-800 font-medium py-4 px-6 rounded-3xl shadow-soft transition-all duration-300"
        >
          Entiendo, continuar
        </button>
      </div>
    </div>
  );
}
