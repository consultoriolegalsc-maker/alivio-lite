'use client';

import { motion } from 'framer-motion';

interface AlivioMarkProps {
  size?: number;
  className?: string;
}

/**
 * Símbolo de Alivio — gota con gradient sage y halo respirando.
 * Representa aliento, escucha y contención.
 */
export default function AlivioMark({ size = 80, className = '' }: AlivioMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-label="Alivio"
      role="img"
    >
      <defs>
        <linearGradient id="alivio-drop" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#9EC3A8" />
          <stop offset="55%" stopColor="#7FB89E" />
          <stop offset="100%" stopColor="#4A8168" />
        </linearGradient>
        <radialGradient id="alivio-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7FB89E" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#7FB89E" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7FB89E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="100"
        cy="105"
        r="85"
        fill="url(#alivio-halo)"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />

      <motion.path
        d="M 100,30 C 55,85 40,130 40,152 C 40,180 70,198 100,198 C 130,198 160,180 160,152 C 160,130 145,85 100,30 Z"
        fill="url(#alivio-drop)"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
}
