'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';

interface Props {
  visible: boolean;
  onDismiss?: () => void;
}

const EMERGENCY_LINES = [
  { name: 'SAPTEL México', number: '55 5259 8121', note: '24/7 · gratuito · confidencial' },
  { name: 'Línea de la Vida', number: '800 290 0024', note: '24/7' },
  { name: 'Emergencias', number: '911', note: 'Para peligro inmediato' },
];

export default function CrisisBanner({ visible, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sticky top-0 z-50 bg-rose-50 border-b border-rose-200 px-4 py-4 shadow-sm"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-2xl mx-auto flex items-start gap-3">
            <Phone className="w-5 h-5 text-rose-600 shrink-0 mt-1" strokeWidth={2} />
            <div className="flex-1 space-y-2">
              <p className="font-medium text-rose-900 text-sm">
                Si estás en peligro, por favor llama ahora:
              </p>
              <ul className="space-y-1.5">
                {EMERGENCY_LINES.map((line) => (
                  <li key={line.number} className="text-sm">
                    <a
                      href={`tel:${line.number.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 text-rose-800 hover:text-rose-900 font-medium underline underline-offset-2"
                    >
                      {line.name}: {line.number}
                    </a>
                    <span className="text-rose-700 ml-2 text-xs">{line.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                aria-label="Cerrar aviso"
                className="text-rose-600 hover:text-rose-800 p-1 rounded-md hover:bg-rose-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
