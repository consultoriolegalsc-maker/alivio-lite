# Checkpoint Alivio IA — Sesión 2026-04-21

Estado completo del proyecto al cierre del día. Este documento es la fuente única para retomar el trabajo al día siguiente sin fricción.

---

## 1. Identidad del producto

**Alivio IA** — Compañero de apoyo emocional con IA en español neutro latino. Gratis, anónimo, 24/7. No es servicio médico ni reemplaza atención profesional.

**Dominio:** [alivioia.com](https://alivioia.com)
**Subdominio Vercel:** `alivio-lite.vercel.app`
**Estado actual del dominio:** desplegado, devuelve HTTP 401 (Basic Auth middleware activo — solo accesible con credenciales)

**Socios:** Jorge Delfin + Erik Alvarado
**Usernames:**
- Jorge GitHub: `delfinsin82-bit` · email: `delfinsin82@gmail.com`
- Erik Vercel: `e.alvarado@intercapmm.com`
- Erik GitHub: `consultoriolegalsc-maker` (repo público confirmado)
- Erik GitHub privado `ealvarado-bot`: **no encontrado — verificar con Erik si realmente existe**

---

## 2. Modelo de producto — 3 tiers acordados

| Tier | Qué incluye | Precio | Para quién |
|---|---|---|---|
| **Alivio Libre** | Chat y voz 24/7, safeguards, directorio visible | $0 | Cualquiera que quiera desahogarse |
| **Alivio + Directorio** | Sesión única con profesional vía videollamada | $675 MXN | Quien quiere probar terapia |
| **Alivio Conectado** ⭐ | 4 sesiones/mes con terapeuta fijo + Alivio como diario digital que genera resumen pre-sesión para el profesional | $2,200 MXN/mes | Quien quiere terapia continua |

### Economía aprobada
- Usuario paga: $675 MXN por sesión (incluye $27 fee Stripe)
- Profesional recibe: $500 MXN (77%)
- Plataforma retiene: $148 MXN (~23%)
- Jornada del profesional: **8 consultas/día** (no 10, por burnout)
- **Primeros 2 meses:** beta gratuita para los psicólogos reclutados — ellos no pagan nada, nosotros no cobramos comisión

### Proyección
- Beta: 10 psicólogos × 3 pacientes × ~5 usos Alivio/mes = 600 conversaciones/mes
- Costo operativo beta: **$40 USD/mes** (~$750 MXN)
- Mes 2-3 post-beta: ~$47,360 MXN/mes para plataforma con 2 psicólogos a full

---

## 3. Stack técnico actual

**Frontend:** Next.js 14.2.35 + TypeScript + Tailwind 3.4 + Framer Motion + shadcn/ui base
**LLM:** Claude Haiku 4.5 por defecto (variable ANTHROPIC_MODEL permite cambiar a sonnet-4-6)
**Voz:** Web Speech API (ES-MX). Migración futura → ElevenLabs
**Deploy:** Vercel (cuenta personal de Erik hasta liberar Pro de Jorge)
**Fonts:** Fraunces (serif, headlines) + Inter (sans, body) via next/font
**Paleta:** Warm cream + sage green + soft peach/sky accents

### Costo API por conversación (~10 turnos)
- Claude Haiku 4.5 con prompt caching activo: **~$0.03 USD**
- System prompt cacheado: prompt v3 (~3000 tokens) + knowledge base (~5500 tokens) = 8500 tokens cacheados
- Rate limit: 30 msgs/día por sesión

---

## 4. Código local

**Workbench principal:** `/Users/jorgedelfin/alivio/`

```
alivio/
├── .env.local (con key temporal de Jorge de Claude Code)
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts (paleta warm, animations breath/drift)
├── tsconfig.json
├── README.md
├── public/
│   └── manifest.json (PWA)
├── app/
│   ├── layout.tsx (Fraunces + Inter)
│   ├── page.tsx (router de modos)
│   ├── globals.css (aurora + grain + breath-line)
│   ├── components/
│   │   ├── AlivioMark.tsx (logo SVG: 3 círculos concéntricos respirando)
│   │   ├── HomeScreen.tsx
│   │   ├── TextMode.tsx (chat con streaming + meta timestamps + typing dots)
│   │   ├── VoiceMode.tsx (círculo pulsante con halo glow)
│   │   ├── Disclaimer.tsx (bloqueante, localStorage)
│   │   └── CrisisBanner.tsx (tel: links emergencia MX)
│   └── api/chat/route.ts (Haiku 4.5 + prompt caching + rate limit + crisis fallback)
├── lib/
│   ├── alivio-system-prompt.ts (system prompt v3 base + dynamic context)
│   ├── alivio-knowledge-base.ts (13 secciones clínicas destiladas, ~5500 tokens)
│   ├── crisis-detector.ts (regex + keywords español LATAM, fallback pre-escrito)
│   └── rate-limit.ts (30 msgs/día in-memory, migrar a Upstash en prod)
├── prompts/
│   └── system-prompt-alivio.md (doc canónica markdown)
├── knowledge/
│   ├── techniques-distilled.md (manual clínico destilado desde NotebookLM)
│   └── checkpoint-session-2026-04-21.md (este archivo)
└── design-refs/
    ├── 1-home.png (mockup Stitch — Home)
    ├── 2-chat.png (mockup Stitch — Chat)
    └── 3-voice.png (mockup Stitch — Voice)
```

**Repo público de Erik clonado en:** `/Users/jorgedelfin/alivio-erik/alivio-lite/`

---

## 5. System Prompt v3 (cerebro del agente)

Dos partes que van como `system` a Claude:

1. **BASE (cacheada):** identidad, tono, regla de oro (validar primero), técnicas básicas, protocolo crisis, marcadores de control
2. **KNOWLEDGE BASE (cacheada):** biblioteca clínica destilada con 13 secciones

### Marcadores de control (frontend los interpreta)
- `[CRISIS_DETECTADA]` — activa CrisisBanner + líneas emergencia
- `[MOSTRAR_DIRECTORIO]` — render de pantalla profesionales
- `[INICIAR_RESPIRACION:4-7-8|BOX|COHERENCIA]` — animación guiada
- `[INICIAR_GROUNDING:5-4-3-2-1|PLANTAR]` — ejercicio guiado
- `[NOTIFICAR_TERAPEUTA_URGENTE]` — solo si Alivio Conectado + crisis
- `[FIN_SESION_RESUMIR]` — batch job genera resumen

---

## 6. Knowledge base clínico (13 secciones)

Destilado desde NotebookLM "Psicologos tecnicas y trtamientos" (ID `91d84038-4702-4c05-84c0-73359aa1b7a4`).

Fuentes principales:
- Manual CBT Vicente Caballo (Beck Perú, 580 pgs)
- Guía Depresión Adulto GuíaSalud (388 pgs)
- Guía Manejo de Crisis SEP Sonora
- Técnicas Relajación Redalyc
- **David Burns "Adiós, Ansiedad"**
- **Steven Hayes "Sal de tu mente, entra en tu vida"** (ACT)
- **Viktor Frankl "El hombre en busca de sentido"** (logoterapia)
- **Beck "Terapia Cognitiva de la Depresión"**
- Guía Autoayuda Confederación Salud Mental España
- Guía Lasea "(Con)vivir con la ansiedad"

### Secciones cubiertas
1. Respiración (re-entrenamiento hiperventilación, 4-7-8, coherencia cardíaca) con guion exacto
2. Relajación muscular progresiva (método contraste)
3. Grounding sensorial 5-4-3-2-1 + anclaje plantar
4. Protocolo validación emocional 3 pasos + frases SÍ/NO
5. Reestructuración cognitiva (modelo A-B-C-D-E + 10 distorsiones + 10 preguntas socráticas)
6. Principios Rogers (counseling humanista)
7. 15 preguntas abiertas probadas
8. Protocolo de crisis ampliado (señales + actuación + qué decir)
9. **ACT (6 procesos Hayes):** defusión, valores, aceptación, presente, yo observador, acción comprometida
10. **Logoterapia Frankl:** resignificación, intención paradójica, desreflexión, 5 preguntas de sentido
11. **5 técnicas Burns:** doble estándar, encuesta, experimentos conductuales, exposición gradual, aceptación paradójica
12. **Tristeza vs Depresión clínica** (criterios operables + cuándo escalar)
13. **Activación conductual Beck:** hacer-para-sentir, plan diario L/P, mini-actividades, técnicas anti-rumiación y anti-aislamiento

Descartados intencionalmente del cuaderno: "Técnicas de manipulación" y "Leer personas como FBI" (no clínicos / peligrosos en contexto salud mental).

---

## 7. Diseño visual — Estilo Emil Kowalski

**Filosofía:** Calm over hype. Quietness over loudness. Serious warmth. Japandi meets editorial.

**Design System Stitch MCP generado:** project_id `10500398176664050836`, design system `Alivio — Warm Minimal`

**Screens generadas en Stitch:**
- Home: `projects/10500398176664050836/screens/a9b854ac24d04df0b4a28ed08e436dcb`
- Chat: `projects/10500398176664050836/screens/86f4f7db2b9a4e068c11599ea25f426d`
- Voice: `projects/10500398176664050836/screens/0db7555e66c54ec8bf1f0150c786e60f`

**Elementos clave del look:**
- Aurora blobs drifting lentos (sky-blue + peach, blur 80px, opacity bajo)
- Grain noise SVG 3.5% multiply mode
- Breath-line sutil en bottom (respira a 6 rpm = coherencia cardíaca)
- Typography: Newsreader/Fraunces serif para emotional headlines, Inter para body
- Bubbles asimétricos con corner cuts
- Meta timestamps "ALIVIO · AHORA" / "TÚ · AHORA" debajo de cada mensaje
- Microfooter "ESPACIO SEGURO Y ANÓNIMO"
- AlivioMark: 3 círculos concéntricos breathing con delay diferencial

---

## 8. Go-to-market — beta con 10 psicólogos

### Criterios de selección
- Calificación Google ≥ 4.5, 15+ reseñas
- Ofrecen telemedicina
- Escuela: CBT / DBT / ACT / Gestalt moderna (descartar psicoanálisis clásico)
- 3-15 años experiencia
- Precio actual $500-1000 MXN/sesión
- Activos en Instagram/LinkedIn
- CDMX, GDL, MTY, Puebla

### Reclutamiento
Se hará vía **BazarAgent** (otro proyecto SaaS de Jorge), configurando un agente CEO llamado "Valeria — Outreach Alivio":
- 20 leads/día verificados de Google Maps, Doctoralia, Topdoctors
- Outreach por email + LinkedIn con pitch aprobado
- Agendar demos en Cal.com
- KPI: 10 demos en 14 días, 6+ conversiones a beta

### Pitch aprobado
Core: "diario digital que escribe el resumen de tu paciente". Beta gratuita 1 mes sin costo.

### Cross-sell BazarAgent
Los psicólogos reclutados son clientes ideales de BazarAgent (agenda, WhatsApp, posts de redes). Un outreach = dos productos.

---

## 9. Safeguards y ética

### Legal
- LFPDP: datos de salud mental son sensibles → encriptación, retención limitada, derecho ARCO
- Disclaimer bloqueante al primer uso (localStorage `alivio_disclaimer_accepted_v1`)
- Copy claro: "Alivio no es servicio médico ni reemplaza atención profesional"
- Directorio = facilitador, no intermediario médico
- Verificar cédula profesional en RNP (SEP) antes de listar

### Técnicos
- Detector de crisis **independiente** del LLM (regex + keywords)
- Fallback pre-escrito de crisis disponible en <5ms si Claude falla/tarda
- Rate limiting: 30 msgs/día por sessionId (in-memory MVP, migrar a Upstash)
- Logs solo de metadata (nunca contenido de conversación)
- Headers seguridad: CSP, X-Frame-Options, Permissions-Policy (mic=self, camera=())
- PWA con manifest
- Prompt caching activo → costo bajo

### Próximo a agregar
- Cloudflare Turnstile (anti-bot)
- ElevenLabs para voz cálida
- Supabase con RLS para sesiones persistentes
- n8n workflows para ingesta, resúmenes batch, check-ins

---

## 10. Estado de bloqueos al cierre del 2026-04-21

### Resuelto hoy
- ✅ System prompt v3 completo con marcadores de control
- ✅ Knowledge base clínico destilado (13 secciones, 5500 tokens)
- ✅ Scaffold Next.js funcional en `/Users/jorgedelfin/alivio/`
- ✅ Estilo visual Emil Kowalski aplicado (aurora, grain, breath-line, Fraunces)
- ✅ 3 mockups de Stitch generados como referencia
- ✅ Rate limiting + crisis detector + prompt caching integrados
- ✅ Type-check pasa sin errores
- ✅ Dev server local funcional en `http://localhost:3000`
- ✅ Repo público de Erik clonado para comparación
- ✅ Identificado: nuestro scaffold supera al de Erik en todo excepto middleware Basic Auth
- ✅ Dominio `alivioia.com` confirmado desplegado en Vercel (cuenta Erik)

### Pendientes NO bloqueantes (pueden avanzar sin nada)
- [ ] Cerrar PR contra repo de Erik con scaffold nuevo (esperando admin access)
- [ ] Generar logo con Nano Banana 2 (fal-ai sin saldo — opción A pagar, B Gemini web, C mantener AlivioMark SVG actual)
- [ ] Workflow `Agente Alivio` en n8n (pendiente definir arquitectura híbrida)
- [ ] Spec Supabase para tabla `profesionales` + RLS
- [ ] Cal.com embebido + Stripe Connect para agendamiento
- [ ] Pantalla directorio cuando agente emita `[MOSTRAR_DIRECTORIO]`

### Bloqueos reales activos
1. **Erik no me ha dado Admin al repo** GitHub público `consultoriolegalsc-maker/alivio-lite` — Jorge le mandó mensaje hoy, esperando
2. **Repo privado de Erik** (`ealvarado-bot/alivio-lite`) → no existe en GitHub o nombre incorrecto. Verificar con Erik
3. **Vercel Pro de Jorge:** reembolso en 5-10 días por alerta antifraude. No podemos invitar a Erik al team `jorge-delfin` hasta resolverse
4. **fal-ai sin saldo:** no se puede generar logo con Nano Banana 2 directo. Alternativas: recargar $5 USD, usar Gemini web, o mantener AlivioMark SVG actual
5. **API key Anthropic dedicada** (`alivio-prod`): aún no creada. Actualmente se usa la de Claude Code de Jorge como placeholder temporal

---

## 11. Decisiones clave tomadas en la sesión

1. **Arquitectura híbrida** — chat directo a Claude para voz (latencia), n8n para RAG/batch/orquestación (control). NO todo en n8n ni todo en Next.js
2. **Modelo LLM: Claude Haiku 4.5** por default (costo bajo, calidad alta en chat emocional)
3. **Prompt caching activado** — system prompt base + knowledge base ambos cacheados → reduce costo 90% en turnos 2+
4. **Precio ajustado a $675 MXN** por sesión (antes $650) para absorber fee Stripe sin tocar comisión
5. **8 consultas/día** por profesional (no 10) para evitar burnout
6. **3 tiers de producto** definidos: Libre / Directorio one-time / Conectado mensual
7. **Beta gratuita de 1 mes** para los primeros 2-10 psicólogos reclutados
8. **Sin música** en MVP (posible feature de Alivio Pro en v2)
9. **Deployment en Vercel** bajo cuenta de Erik temporalmente (hasta liberar Pro de Jorge)
10. **Framing "diario digital"** para vender a psicólogos — no competir, complementar
11. **Voz serif + Fraunces** como identidad tipográfica (warm, editorial)
12. **AlivioMark SVG** como logo provisional hasta tener generación Nano Banana 2

---

## 12. Prioridades para la siguiente sesión

### Orden sugerido al retomar

1. **Verificar si Erik ya me dio Admin al repo**. Si sí → preparar PR gigante
2. **Verificar estado Vercel Pro** (¿llegó reembolso? ¿se resolvió alerta?)
3. **Confirmar existencia del repo privado** o descartarlo
4. **Preparar workflow n8n "Agente Alivio"** — arquitectura híbrida: webhook recibe mensaje → crisis check → RAG opcional → Claude con system prompt → respond
5. **Supabase spec:** tabla `profesionales` con RLS (id, nombre, cédula, especialidad, escuela_teórica, precio, disponibilidad_json, activo, verified_at, bio)
6. **Reclutar primer psicólogo** con pitch vía BazarAgent (si Jorge tiene BazarAgent listo)
7. **Diseño del pitch visual** para profesionales (deck en Canva o similar)
8. **Generar logo real con Nano Banana 2** (si fal-ai se recargó)
9. **ElevenLabs** integration para voz cálida
10. **Cloudflare Turnstile** anti-bot en /api/chat

### Criterio de "día bueno"
En una sola sesión, idealmente:
- Mergear PR con mejoras al repo de Erik
- Deploy preview a alivioia.com funcionando con las mejoras
- Probar el agente end-to-end con preguntas emocionales reales
- Cerrar al menos 1 decisión administrativa bloqueante (Vercel / repo privado)

---

## 13. Tono y filosofía del producto (invariantes)

- Calmness over hype. Quietness over loudness.
- Validación emocional SIEMPRE antes que cualquier técnica
- Español neutro latino (no mexicanismos ni españolismos)
- Nunca emojis en UI
- Nunca diagnosticar, nunca prescribir
- Cada pantalla = un pensamiento = una respiración
- Nunca frases motivacionales vacías
- Respuestas cortas al inicio de cada conversación (2-3 oraciones)
- Modo voz: aún más breve
- Respetar `prefers-reduced-motion` para sensibilidad
- Dark mode tan cuidado como light

---

## 14. Riesgos a vigilar

1. **Abuso del API key** → rate limit + Turnstile + alerta a WhatsApp si uso >$5/día
2. **Falso negativo en detector de crisis** → doble capa (regex + LLM) + escalamiento directo a línea emergencia
3. **Latencia en modo voz** → evitar hop por n8n en voz (directo a Claude)
4. **LFPDP y secreto profesional** en Alivio Conectado → RLS estricto en Supabase, consentimiento informado digital firmado
5. **Burnout de psicólogos del directorio** → limitar a 8 sesiones/día, check-in mensual
6. **Dependencia del dominio en cuenta de Erik** → migrar al team de Jorge cuando Pro se libere
7. **Deriva del agente fuera de los límites terapéuticos** → knowledge base fija el tono y técnicas permitidas
8. **Costos fal-ai/Claude descontrolados** → alertas + rate limit + techos duros

---

## 15. Referencias rápidas

### Memorias persistentes (auto-memory de Claude)
- `project_alivio.md` — contexto del proyecto, stack, modelo, dominio
- `project_bazaragent.md` — SaaS relacionado que sirve para outreach
- `project_intercapmm.md` — otro proyecto de Jorge en Vercel
- `reference_jorge_accounts.md` — usernames, emails, team IDs
- `reference_notion_intercapmm.md` — estructura Notion
- `feedback_icloud_cleanup.md` — regla absoluta de no borrar en iCloud
- `feedback_save_all_config.md` — regla de guardar estado antes de cambiar

### Workbench canónico
`/Users/jorgedelfin/alivio/` (scaffold Next.js con todas las mejoras)

### Notion principal
Página Alivio Lite original: `349a1719-aa52-8161-8919-f23c2f570b81`

### NotebookLM principal de conocimiento clínico
ID: `91d84038-4702-4c05-84c0-73359aa1b7a4` ("Psicologos tecnicas y trtamientos")

### Cuenta fal-ai
Sin saldo — recargar $5-10 USD para generar logo con Nano Banana 2

### Emergencias México (siempre visibles en crisis)
- SAPTEL: 55 5259 8121 (24/7 gratis)
- Línea de la Vida: 800 290 0024
- Emergencias: 911

---

_Checkpoint generado al cierre del 2026-04-21. Próxima sesión: retomar desde sección 12 (Prioridades)._
