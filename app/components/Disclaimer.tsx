'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Phone, Lock } from 'lucide-react';
import AlivioMark from './AlivioMark';

interface Props {
  onAccept: () => void;
}

export default function Disclaimer({ onAccept }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <main className="aurora-bg min-h-[100dvh] flex items-center justify-center p-6 bg-warm-bg">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full glass-card rounded-3xl p-8 space-y-6"
      >
        <div className="flex justify-center">
          <AlivioMark size={64} />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif text-sage-900">Antes de empezar</h1>
          <p className="text-sm text-sage-700 leading-relaxed">
            Alivio es una IA de apoyo emocional para acompañarte y escucharte.
          </p>
        </div>

        <ul className="space-y-3 text-sm text-sage-800">
          <li className="flex gap-3">
            <Shield className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <span>
              <strong>No soy un terapeuta.</strong> No doy diagnósticos, no receto
              medicamentos, no reemplazo atención profesional.
            </span>
          </li>
          <li className="flex gap-3">
            <Lock className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <span>
              Lo que compartas se guarda solo en tu dispositivo. Nada se publica ni se
              comparte con nadie.
            </span>
          </li>
          <li className="flex gap-3">
            <Phone className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <span>
              Si estás en crisis, llama <strong>SAPTEL 55 5259 8121</strong> o{' '}
              <strong>911</strong>. Siempre te voy a mostrar estas líneas cuando sea
              necesario.
            </span>
          </li>
        </ul>

        <label className="flex items-start gap-3 text-sm text-sage-800 cursor-pointer select-none pt-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-sage-300 text-sage-500 focus:ring-sage-400"
          />
          <span>Entiendo que Alivio no sustituye atención médica ni psicológica.</span>
        </label>

        <button
          onClick={onAccept}
          disabled={!checked}
          className="w-full btn-primary-soft disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Entrar
        </button>
      </motion.div>
    </main>
  );
}
