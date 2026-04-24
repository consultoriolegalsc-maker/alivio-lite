# Alivio

Compañero de apoyo emocional con IA en español neutro latino. Gratis, anónimo, 24/7.

> **Aviso:** Alivio no es servicio médico ni sustituye atención profesional.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Anthropic Claude API (Haiku 4.5 por default, con prompt caching)
- Web Speech API (voz, modo texto siempre disponible)
- Framer Motion (animaciones con spring physics)
- PWA instalable en móvil y desktop
- Rate limiting en memoria (migrar a Upstash/Vercel KV en prod)

## Estructura

```
alivio/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── components/
│   │   ├── HomeScreen.tsx      # Pantalla de inicio (Hablar / Escribir)
│   │   ├── TextMode.tsx        # Chat por texto con streaming
│   │   ├── VoiceMode.tsx       # Chat por voz (Web Speech API)
│   │   ├── Disclaimer.tsx      # Aviso legal bloqueante (primer uso)
│   │   └── CrisisBanner.tsx    # Banner con líneas de emergencia
│   └── api/chat/route.ts       # Endpoint Claude + caching + crisis fallback
├── lib/
│   ├── alivio-system-prompt.ts # System prompt v3 base + contexto dinámico
│   ├── crisis-detector.ts      # Clasificador regex independiente del LLM
│   └── rate-limit.ts           # Techo duro de costo (30 msgs/día default)
├── prompts/
│   └── system-prompt-alivio.md # Documentación canónica del prompt v3
├── public/
│   └── manifest.json           # PWA manifest
└── .env.example                # Variables requeridas
```

## Correr local

```bash
npm install
cp .env.example .env.local
# editar .env.local y pegar ANTHROPIC_API_KEY real

npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Para modo voz, usar Chrome, Edge o Brave.

## Seguridad y ética

- **Detector de crisis independiente del LLM** — si Claude falla, el mensaje de emergencia se muestra igual
- **Rate limit por sesión** — 30 mensajes/día por default, protege contra abuso de API key
- **Sin logs de contenido** — solo metadata (timestamps, categorías de crisis, sessionId)
- **Disclaimer bloqueante al primer uso** — checkbox obligatorio
- **Banner de emergencia siempre visible** cuando se detecta crisis
- **Headers de seguridad** (CSP, X-Frame-Options, Permissions-Policy)

## Claude API

- Modelo default: `claude-haiku-4-5-20251001` (~$0.03 por conversación con caching)
- Prompt caching activo sobre `ALIVIO_SYSTEM_PROMPT_BASE` (-90% costo en turnos 2+)
- Max tokens: 600 (texto) / 300 (voz)
- Si quieres más calidad, cambia `ANTHROPIC_MODEL=claude-sonnet-4-6` en `.env.local`

## Próximas iteraciones

- [ ] Cloudflare Turnstile (anti-bot) en `/api/chat`
- [ ] Migrar Web Speech API a ElevenLabs para voz cálida natural
- [ ] Supabase: tabla `profesionales` + RLS
- [ ] Cal.com embebido + Stripe Connect para agendamiento
- [ ] Pantalla de directorio al marcador `[MOSTRAR_DIRECTORIO]`
- [ ] n8n workflow "Agente Alivio" con RAG + tool use
- [ ] Dashboard para terapeutas (Alivio Conectado)
- [ ] Resúmenes pre-sesión generados por Haiku batch
- [ ] Migrar rate-limit en memoria a Vercel KV

## Contacto

Jorge Delfin · Erik Alvarado · Alivio 2026
