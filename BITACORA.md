# Bitácora de Trabajo — Alivio Lite

Registro cronológico de avances, decisiones y pendientes del proyecto **Alivio Lite** (compañero de apoyo emocional con IA en español neutro).

---

## Información general

- **Proyecto:** Alivio Lite
- **Descripción:** App web de acompañamiento emocional con IA (Claude), con modo voz y modo texto.
- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Anthropic SDK (`claude-sonnet-4-5`) · Web Speech API.
- **Ruta local:** `C:\Users\ERIK ALVARADO\alivio-lite`
- **Responsable:** Erik Alvarado
- **Inicio de bitácora:** 2026-04-20

---

## Estado actual (2026-04-20)

**Estructura del proyecto:**

- `app/page.tsx` — página principal
- `app/layout.tsx` — layout raíz
- `app/globals.css` — estilos globales (Tailwind)
- `app/api/chat/route.ts` — endpoint del chat con Claude
- `app/components/HomeScreen.tsx` — pantalla de inicio
- `app/components/TextMode.tsx` — modo de chat por texto
- `app/components/VoiceMode.tsx` — modo de chat por voz
- `app/components/Disclaimer.tsx` — aviso legal
- `app/components/CrisisBanner.tsx` — banner con líneas de crisis
- `lib/` — utilidades compartidas

**Dependencias instaladas:** ✅ (`node_modules/` presente)

**Pendiente técnico conocido:**

- Configurar `ANTHROPIC_API_KEY` real en `.env.local`
- Probar en Chrome/Edge para validar Web Speech API

---

## Registro de sesiones

### 2026-04-20 — Creación de bitácora

- Se inicia este archivo `BITACORA.md` para llevar control del proyecto.
- Estado del repositorio: código base montado, faltan sesiones de prueba y ajuste de prompts.
- **Próximo paso propuesto:** correr `npm run dev`, probar flujo voz + texto y afinar el prompt del sistema de Alivio.

---

## Mejoras futuras (del README)

- Integrar ElevenLabs para voz más cálida y natural
- Historial de sesiones con resúmenes automáticos
- Ejercicios de respiración con animación visual guiada
- Modo journaling con entradas privadas
- Check-ins diarios con notificaciones
- Exportar conversación para compartir con profesional
- Versión React Native móvil
- Multi-idioma (portugués, inglés)

---

## Plantilla para nuevas entradas

```
### YYYY-MM-DD — Título breve de la sesión

- Qué se trabajó:
- Decisiones tomadas:
- Problemas / dudas:
- Próximo paso:
```

---

### 2026-04-23 — Identidad visual (logo + lockups) + modo voz con gota animada

- **Qué se trabajó:**
  - Logo final generado con ChatGPT (gota verde salvia, gradient vertical, halo) y aprobado
  - Recreación en SVG vector puro para escalar sin artefactos de fondo
  - 3 lockups creados en `public/logos/`: horizontal (3:1), vertical (1:1 con tagline), wordmark puro
  - Iconos PWA: favicon-16, favicon-32, icon-192, icon-512, apple-touch-icon
  - `AlivioMark` refactorizado: 3 círculos concéntricos → gota vectorial con halo radial pulsante
  - `VoiceMode`: círculo central con `Mic` → gota 128px animada con 3 ondas de sonido emanando
  - Estados diferenciados: idle (respira suave), listening (scale +22% + ondas), thinking (sin ondas), speaking (+17% + ondas)
  - Gota más compacta en idle para que el cambio al hablar sea impactante
  - Botón mic de abajo mantiene `Mic`/`MicOff` por affordance funcional
  - `app/layout.tsx` con `icons` config completa + `public/manifest.json` con 5 icon entries
  - Instrucciones detalladas para Erik preparadas (6 fases para que `alivioia.com` viva)

- **Decisiones:**
  - Gota como símbolo central definitivo (no más 3 círculos)
  - Fraunces italic confirmada como tipografía de identidad
  - SVG vector sobre PNG embebido para todos los lockups
  - Botón grabador conserva iconos funcionales — affordance > consistencia

- **Próximo paso:**
  - Este PR (`feat/alivio-v1-complete`) entrega todos los cambios al repo
  - Erik revisa y mergea → Vercel redeploya automático
  - Configurar env vars en Vercel (ANTHROPIC_API_KEY dedicada, modelo, rate limit)

---

### 2026-04-21 — Rediseño completo + knowledge base clínico + GTM

- **Qué se trabajó:**
  - Scaffold Next.js 14 con UI rediseñada (Fraunces + Inter, aurora background, grain, breath-line)
  - System Prompt v3 con prompt caching y marcadores de control (`[CRISIS_DETECTADA]`, `[MOSTRAR_DIRECTORIO]`, `[INICIAR_RESPIRACION:...]`, `[INICIAR_GROUNDING:...]`, `[NOTIFICAR_TERAPEUTA_URGENTE]`, `[FIN_SESION_RESUMIR]`)
  - Knowledge base clínico: 13 secciones destiladas (respiración, grounding, validación 3-pasos, CBT Beck, Rogers, 15 preguntas abiertas, crisis, ACT Hayes, logoterapia Frankl, 5 técnicas Burns, tristeza vs depresión clínica, activación conductual)
  - Detector de crisis independiente del LLM (regex + fallback <5ms)
  - Rate limiting 30 msgs/día por sessionId
  - Claude Haiku 4.5 default con caching (~$0.03 por conversación 10 turnos)
  - Modelo de producto 3 tiers (Libre, Directorio $675, Conectado $2,200)

- **Próximo paso:**
  - Sesión 2026-04-23 aplicó identidad visual y modo voz
