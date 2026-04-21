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
