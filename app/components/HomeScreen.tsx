'use client';

import { motion } from 'framer-motion';
import { Mic, MessageCircle } from 'lucide-react';
import AlivioMark from './AlivioMark';

interface Props {
  onSelectText: () => void;
  onSelectVoice: () => void;
}

export default function HomeScreen({ onSelectText, onSelectVoice }: Props) {
  return (
    <main className="aurora-bg min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-warm-bg">
      <div className="breath-line" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full space-y-14 text-center"
      >
        <div className="flex flex-col items-center space-y-5">
          <AlivioMark size={72} />

          <div className="space-y-2">
            <h1 className="text-6xl font-serif text-sage-900 tracking-tight leading-none">
              Alivio
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sage-700 text-[15px] leading-relaxed italic font-serif"
            >
              Toma aire. Estoy aquí.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={onSelectVoice}
            className="w-full btn-primary-soft flex items-center justify-center gap-3 text-lg"
          >
            <Mic className="w-5 h-5" strokeWidth={2} />
            Hablar
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={onSelectText}
            className="w-full btn-secondary-soft flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2} />
            Escribir
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="space-y-3"
        >
          <p className="text-[10px] text-sage-700/90 tracking-[0.18em] uppercase leading-relaxed">
            IA de apoyo emocional — no sustituye atención profesional
          </p>
          <div className="flex items-center justify-center gap-5 text-[10px] tracking-[0.18em] uppercase text-sage-600/70">
            <a href="#" className="hover:text-sage-800 transition-colors">Privacidad</a>
            <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-sage-400/60" />
            <a href="#" className="hover:text-sage-800 transition-colors">Términos</a>
            <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-sage-400/60" />
            <a href="#" className="hover:text-sage-800 transition-colors">Contacto</a>
          </div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-sage-600/60">
            © Alivio · No es un servicio médico
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
