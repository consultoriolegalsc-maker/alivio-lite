"use client";

export default function CrisisBanner() {
  return (
    <div
      role="alert"
      className="rounded-3xl p-6 mb-4 bg-[#FFE5E5] dark:bg-[#3a2a2a] shadow-soft transition-colors duration-300"
    >
      <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-2">
        Lo que sientes importa
      </h3>
      <p className="text-slate-700 dark:text-slate-200 mb-4 leading-relaxed">
        No estás sola/solo. Por favor, considera hablar ahora con alguien que
        pueda ayudarte.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href="tel:5552598121"
          className="block w-full text-center bg-white dark:bg-alivio-dark text-slate-800 dark:text-white font-medium py-4 px-6 rounded-3xl shadow-soft hover:opacity-90 transition-all duration-300"
        >
          📞 Llamar a SAPTEL
        </a>
        <a
          href="tel:8002900024"
          className="block w-full text-center bg-white/70 dark:bg-white/10 text-slate-800 dark:text-white font-medium py-3 px-6 rounded-3xl hover:opacity-90 transition-all duration-300"
        >
          Línea de la Vida
        </a>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 text-center">
        Si estás en peligro inmediato, llama al 911.
      </p>
    </div>
  );
}
