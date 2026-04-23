'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import CrisisBanner from './CrisisBanner';
import AlivioMark from './AlivioMark';

type Role = 'user' | 'assistant';
interface Msg {
  id: string;
  role: Role;
  content: string;
}

interface Props {
  onExit: () => void;
}

const SESSION_ID_KEY = 'alivio_session_id';

const GREETING: Msg = {
  id: 'greeting',
  role: 'assistant',
  content:
    'Hola, soy Alivio. Soy una IA de apoyo emocional, no sustituyo atención profesional ni doy diagnósticos. Estoy aquí para escucharte. ¿Cómo te sientes hoy?',
};

function stripMarkers(text: string): { clean: string; markers: string[] } {
  const markerPattern = /\[(CRISIS_DETECTADA|MOSTRAR_DIRECTORIO|INICIAR_RESPIRACION:[^\]]+|INICIAR_GROUNDING:[^\]]+|NOTIFICAR_TERAPEUTA_URGENTE|FIN_SESION_RESUMIR)\]/g;
  const markers = Array.from(text.matchAll(markerPattern), (m) => m[0]);
  const clean = text.replace(markerPattern, '').trim();
  return { clean, markers };
}

export default function TextMode({ onExit }: Props) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [crisisVisible, setCrisisVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    let sid = typeof window !== 'undefined' ? localStorage.getItem(SESSION_ID_KEY) : null;
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, sid);
    }
    sessionIdRef.current = sid;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    const assistantId = crypto.randomUUID();
    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter((m) => m.id !== 'greeting')
            .map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionIdRef.current,
          session: {
            alivioConectado: false,
            modo: 'texto',
            zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get('Content-Type') ?? '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.type === 'crisis_fallback') {
          const { clean } = stripMarkers(data.content);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: clean } : m))
          );
          setCrisisVisible(true);
          return;
        }
      }

      if (!res.body) throw new Error('no_stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const { clean, markers } = stripMarkers(accumulated);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: clean } : m))
        );
        if (markers.includes('[CRISIS_DETECTADA]')) setCrisisVisible(true);
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  'Perdona, tuve un problema técnico. ¿Me cuentas de nuevo en un momento?',
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  return (
    <div className="aurora-bg min-h-[100dvh] flex flex-col bg-warm-bg">
      <CrisisBanner visible={crisisVisible} onDismiss={() => setCrisisVisible(false)} />

      <header className="flex items-center gap-3 p-4 border-b border-sage-100/60 bg-white/60 backdrop-blur-md">
        <button
          onClick={onExit}
          aria-label="Volver"
          className="p-2 rounded-full hover:bg-sage-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sage-700" />
        </button>
        <AlivioMark size={28} />
        <span className="font-serif text-lg text-sage-900 -ml-1">Alivio</span>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl w-full mx-auto"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-sage-500 to-sage-600 text-white rounded-[20px] rounded-br-md'
                    : 'bg-white/90 backdrop-blur-sm text-sage-900 border border-sage-100/80 rounded-[20px] rounded-bl-md'
                }`}
              >
                {m.content || (isStreaming && m.role === 'assistant' ? (
                  <span className="inline-flex gap-1 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-300 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </span>
                ) : '')}
              </div>
              {m.content && m.id !== 'greeting' && (
                <span className="text-[10px] text-sage-600/80 tracking-widest uppercase mt-1.5 px-1">
                  {m.role === 'user' ? 'Tú · Ahora' : 'Alivio · Ahora'}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="pt-3 pb-4 px-4 border-t border-sage-100/60 bg-white/60 backdrop-blur-md"
      >
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Escribe cómo te sientes…"
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none rounded-2xl border border-sage-200 bg-white text-sage-900 placeholder:text-sage-500 placeholder:italic px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-sage-300 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              aria-label="Enviar"
              className="w-11 h-11 rounded-full bg-sage-500 hover:bg-sage-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_4px_14px_rgba(94,159,128,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-sage-600/70 text-center">
            Espacio seguro y anónimo
          </p>
        </div>
      </form>
    </div>
  );
}
