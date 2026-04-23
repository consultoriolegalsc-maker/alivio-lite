'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, MicOff } from 'lucide-react';
import CrisisBanner from './CrisisBanner';
import AlivioMark from './AlivioMark';

interface Props {
  onExit: () => void;
}

type Status = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

const SESSION_ID_KEY = 'alivio_session_id';

function stripMarkers(text: string): { clean: string; crisis: boolean } {
  const crisis = /\[CRISIS_DETECTADA\]/.test(text);
  const clean = text
    .replace(/\[(CRISIS_DETECTADA|MOSTRAR_DIRECTORIO|INICIAR_RESPIRACION:[^\]]+|INICIAR_GROUNDING:[^\]]+|NOTIFICAR_TERAPEUTA_URGENTE|FIN_SESION_RESUMIR)\]/g, '')
    .trim();
  return { clean, crisis };
}

export default function VoiceMode({ onExit }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [transcript, setTranscript] = useState('');
  const [aliviosResponse, setAliviosResponse] = useState('');
  const [crisisVisible, setCrisisVisible] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);

  const recognitionRef = useRef<any>(null);
  const sessionIdRef = useRef<string>('');
  const historyRef = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  useEffect(() => {
    let sid = typeof window !== 'undefined' ? localStorage.getItem(SESSION_ID_KEY) : null;
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, sid);
    }
    sessionIdRef.current = sid;

    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;
    setSupported(Boolean(SpeechRecognition));
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-MX';
    utter.rate = 0.92;
    utter.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /es-(MX|419|US|ES)/i.test(v.lang) && /female|woman|mujer/i.test(v.name)) ||
      voices.find((v) => /es-(MX|419|US|ES)/i.test(v.lang));
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setStatus('speaking');
    utter.onend = () => setStatus('idle');
    window.speechSynthesis.speak(utter);
  }, []);

  const handleUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      historyRef.current.push({ role: 'user', content: text.trim() });
      setStatus('thinking');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: historyRef.current,
            sessionId: sessionIdRef.current,
            session: {
              alivioConectado: false,
              modo: 'voz',
              zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          }),
        });

        let responseText = '';
        const contentType = res.headers.get('Content-Type') ?? '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          responseText = data.content ?? '';
        } else if (res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            responseText += decoder.decode(value, { stream: true });
          }
        }

        const { clean, crisis } = stripMarkers(responseText);
        if (crisis) setCrisisVisible(true);
        historyRef.current.push({ role: 'assistant', content: clean });
        setAliviosResponse(clean);
        speak(clean);
      } catch (err) {
        setStatus('error');
        setAliviosResponse('Perdona, tuve un problema. Intenta de nuevo.');
        speak('Perdona, tuve un problema. Intenta de nuevo.');
      }
    },
    [speak]
  );

  const startListening = useCallback(() => {
    if (!supported) return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setStatus('listening');
      setTranscript('');
    };
    recognition.onresult = (e: any) => {
      const text = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setTranscript(text);
    };
    recognition.onerror = () => setStatus('error');
    recognition.onend = () => {
      const finalText = transcript || (recognition as any)._lastFinal || '';
      if (finalText.trim()) handleUserMessage(finalText.trim());
      else setStatus('idle');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [supported, transcript, handleUserMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  if (supported === false) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center p-6 bg-warm-bg">
        <div className="max-w-md text-center space-y-4">
          <p className="text-sage-900">
            El modo voz necesita Chrome, Edge o Brave en tu navegador.
          </p>
          <button onClick={onExit} className="btn-secondary-soft">
            Usar modo texto
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="aurora-bg min-h-[100dvh] flex flex-col bg-warm-bg">
      <CrisisBanner visible={crisisVisible} onDismiss={() => setCrisisVisible(false)} />

      <header className="flex items-center gap-3 p-4 border-b border-sage-100/60 bg-white/60 backdrop-blur-md">
        <button
          onClick={() => {
            window.speechSynthesis?.cancel();
            onExit();
          }}
          aria-label="Volver"
          className="p-2 rounded-full hover:bg-sage-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sage-700" />
        </button>
        <AlivioMark size={28} />
        <span className="font-serif text-lg text-sage-900 -ml-1">Alivio</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
        <div className="relative flex items-center justify-center w-64 h-64">
          {/* Halo glow ambient (respira siempre) */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-sage-300/30 blur-3xl"
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />

          {/* Ondas de sonido emanando — solo cuando hay actividad de voz */}
          {(status === 'listening' || status === 'speaking') && (
            <>
              {[0, 0.7, 1.4].map((delay) => (
                <motion.div
                  key={delay}
                  className="absolute rounded-full border border-sage-400/60"
                  style={{ width: 128, height: 128 }}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    delay,
                    ease: 'easeOut',
                  }}
                  aria-hidden
                />
              ))}
            </>
          )}

          {/* Gota central — más chica en idle, crece al hablar */}
          <motion.div
            animate={{
              scale:
                status === 'listening'
                  ? [1, 1.22, 1.04, 1.2, 1]
                  : status === 'speaking'
                    ? [1, 1.15, 1.05, 1.17, 1]
                    : [1, 1.04, 1],
            }}
            transition={{
              duration:
                status === 'listening' ? 1.4 : status === 'speaking' ? 2.2 : 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 drop-shadow-[0_16px_32px_rgba(94,159,128,0.4)]"
          >
            <AlivioMark size={128} />
          </motion.div>
        </div>

        <div className="text-center max-w-md space-y-4 min-h-[120px]">
          {status === 'listening' && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-sage-700/80">
              Te escucho…
            </p>
          )}
          {transcript && (
            <p className="text-sage-900 text-base font-serif italic leading-relaxed">
              &ldquo;{transcript}&rdquo;
            </p>
          )}
          {status === 'thinking' && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-sage-600/80 animate-pulse">
              Pensando…
            </p>
          )}
          {aliviosResponse && status !== 'listening' && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sage-900 text-base leading-relaxed"
            >
              {aliviosResponse}
            </motion.p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={status === 'listening' ? stopListening : startListening}
          disabled={status === 'thinking' || status === 'speaking'}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-50 shadow-lg ${
            status === 'listening'
              ? 'bg-rose-400 hover:bg-rose-500'
              : 'bg-sage-500 hover:bg-sage-600'
          }`}
        >
          {status === 'listening' ? (
            <MicOff className="w-8 h-8" strokeWidth={2} />
          ) : (
            <Mic className="w-8 h-8" strokeWidth={2} />
          )}
        </motion.button>

        <p className="text-[10px] tracking-[0.22em] uppercase text-sage-600/70 text-center max-w-xs">
          {status === 'listening'
            ? 'Toca el micrófono cuando termines'
            : 'Toca el micrófono y cuéntame cómo te sientes'}
        </p>
      </div>
    </div>
  );
}
