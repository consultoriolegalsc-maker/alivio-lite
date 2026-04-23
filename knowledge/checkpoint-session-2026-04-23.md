# Checkpoint Alivio IA — Sesión 2026-04-23

Avance del día. Enfoque: **identidad visual** (logo + lockups) y **modo voz** con la gota animada.

---

## 1. Lo que se hizo hoy

### Logo y identidad visual
- **Logo generado con ChatGPT:** gota verde salvia con gradient vertical + halo sutil, fondo cream — Jorge la aprobó
- **Recreación en SVG vector puro** para evitar el artefacto del fondo cuadrado en embebido PNG
- **3 lockups creados** en `/public/logos/`:
  - `alivio-horizontal.svg/.png` — gota + "Alivio" a la derecha, formato 3:1 para headers, firma, redes
  - `alivio-vertical.svg/.png` — gota arriba + "Alivio" + tagline "APOYO EMOCIONAL CON IA", formato 1:1 para splash/hero
  - `alivio-wordmark.svg/.png` — solo "Alivio" en Fraunces italic, para footers y watermarks
- **Tipografía confirmada:** Fraunces italic lowercase, letter-spacing tight (-6px), color deep sage #2B443A
- **Iconos PWA generados** desde la gota original de ChatGPT con `sips`:
  - `favicon-16.png`, `favicon-32.png`
  - `icon-192.png`, `icon-512.png`
  - `apple-touch-icon.png` (180×180)

### AlivioMark refactorizado
- **Antes:** 3 círculos concéntricos animados (abstracto)
- **Ahora:** gota vectorial con gradient sage `#9EC3A8 → #7FB89E → #4A8168` + halo radial pulsante
- Mantiene animación breathing (scale 1 → 1.03 → 1 cada 4s)
- Viewbox `0 0 200 200` para escalar limpio
- Se usa automáticamente en: `HomeScreen`, `Disclaimer`, headers de `TextMode` y `VoiceMode`

### Modo Voz con gota animada (reemplaza ícono micro)
- **Centro de la pantalla:** gota respirando en lugar de círculo liso con ícono `Mic`
- **Tamaño base:** 128px (más compacta que antes, para que el cambio al hablar sea notorio)
- **Estados animados:**
  - `idle`: gota respira suave (scale 1 → 1.04 → 1 en 4s)
  - `listening`: gota pulsa hasta +22% (scale 1 → 1.22 → 0.98 → 1.2 → 1 en 1.4s) + **3 ondas sage emanan cada 0.7s** (0.95 → 2.6 scale, fade out)
  - `thinking`: respira normal, sin ondas (pausa sonora)
  - `speaking` (Alivio habla): pulsa +17% + ondas emanando sincronizadas
- **Halo ambient** respira en opacity 0.45 → 0.85 → 0.45
- **Botón mic de abajo** (80px) mantiene iconos `Mic`/`MicOff` por affordance funcional

### Layout y PWA
- `app/layout.tsx` ahora declara `icons` con las 4 variantes PNG (16, 32, 192, 512) + `apple-touch-icon`
- `public/manifest.json` actualizado con 5 sizes de iconos, todos apuntando a los archivos correctos
- Vercel tomará automáticamente el manifest y favicons al deployar

### Validación técnica
- `npm run type-check` → verde, sin errores
- Dev server `http://localhost:3000` → respondiendo HTTP 200
- Chrome headless generó PNGs de lockups correctamente

---

## 2. Decisiones del día

1. **Gota como símbolo central** de Alivio (reemplaza los 3 círculos concéntricos iniciales)
2. **Fraunces italic** confirmada como tipografía de identidad
3. **Gota vectorial** sobre embebido PNG — escala mejor, sin artefactos de fondo
4. **VoiceMode con gota + ondas** en lugar de `Mic` icon en el círculo central
5. **Botón grabador inferior mantiene `Mic`/`MicOff`** — el affordance funcional importa más que la consistencia visual
6. **Tamaño de gota 128px** en idle — suficientemente compacta para que el scale 1.22 al escuchar sea visualmente impactante

---

## 3. Bloqueos sin cambio desde 2026-04-22

1. **Erik no ha dado Admin al repo GitHub** (`consultoriolegalsc-maker/alivio-lite`) — Jorge tiene mensaje listo para mandarle
2. **Repo privado `ealvarado-bot/alivio-lite`** — no existe en GitHub, verificar con Erik
3. **Vercel Pro de Jorge** — reembolso pendiente 5-10 días por alerta antifraude, no puede invitar a Erik al team
4. **fal-ai sin saldo** — se resolvió usando ChatGPT directo para generar la gota; ya no es bloqueante
5. **API key Anthropic dedicada `alivio-prod`** — no creada. Se sigue usando la de Claude Code de Jorge como placeholder

---

## 4. Archivos nuevos o modificados hoy

```
public/logos/
  alivio-horizontal.svg  (nuevo)
  alivio-horizontal.png  (nuevo)
  alivio-vertical.svg    (nuevo)
  alivio-vertical.png    (nuevo)
  alivio-wordmark.svg    (nuevo)
  alivio-wordmark.png    (nuevo)

public/
  favicon-16.png         (nuevo)
  favicon-32.png         (nuevo)
  icon-192.png           (actualizado desde gota de ChatGPT)
  icon-512.png           (actualizado desde gota de ChatGPT)
  apple-touch-icon.png   (nuevo)
  manifest.json          (5 icon entries)

app/
  layout.tsx             (icons config agregada)
  components/
    AlivioMark.tsx       (rewrite: 3 círculos → gota vectorial con halo)
    VoiceMode.tsx        (círculo central → gota animada + ondas de sonido)

design-refs/
  alivio-logo-original.png  (nuevo, gota de ChatGPT 1254×1254)
  alivio-drop-300.png       (nuevo, version 300px para embedding)
  drop-b64.txt              (nuevo, base64 para primera versión de SVGs)

knowledge/
  checkpoint-session-2026-04-23.md  (este archivo)
```

---

## 5. Instrucciones preparadas para Erik

Documento con checklist de 6 fases entregado para que Erik:

1. Agregue a `delfinsin82-bit` como Admin al repo GitHub
2. Cree API key dedicada `alivio-prod` en console.anthropic.com
3. Configure env vars en Vercel (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `RATE_LIMIT_PER_DAY`, Basic Auth opcional)
4. Reciba y revise el PR gigante con las mejoras
5. Haga merge y redeploy
6. Verifique dominio, SSL y haga smoke test

Mensaje corto para WhatsApp listo, checklist técnico detallado también.

---

## 6. Prioridades para la siguiente sesión

1. **Seguimiento con Erik** para desbloquear repo y Vercel
2. Si Erik da Admin: **preparar y subir PR** `feat/alivio-v1-complete` con todos los cambios
3. Si no: **zip del workbench** para que Erik lo aplique manualmente (plan B)
4. **Workflow n8n "Agente Alivio"** con webhook + detector crisis + Claude (pendiente arquitectura híbrida)
5. **Supabase spec** tabla `profesionales` con RLS para el directorio
6. **Pantalla del directorio** que se renderiza con `[MOSTRAR_DIRECTORIO]`
7. **Pitch deck visual** para los 10 psicólogos beta
8. **Configurar "Valeria — Outreach Alivio"** en BazarAgent
9. **ElevenLabs** integration para voz más cálida natural
10. **Cloudflare Turnstile** anti-bot en `/api/chat`

---

## 7. Métricas del agente al cierre del día

- System prompt base + knowledge base cacheados: **~8,500 tokens**
- Costo por conversación de 10 turnos (Haiku 4.5 con caching): **~$0.03 USD**
- Rate limit: 30 msgs/día por sessionId
- Modelo default: `claude-haiku-4-5-20251001`
- Knowledge base: **13 secciones clínicas** (respiración, grounding, validación, CBT Beck, Rogers, 15 preguntas abiertas, crisis, ACT Hayes, logoterapia Frankl, 5 técnicas Burns, tristeza vs depresión, activación conductual)

---

## 8. Referencias rápidas

- **Workbench local:** `/Users/jorgedelfin/alivio/`
- **Dev server:** `http://localhost:3000` (corriendo en background)
- **Dominio:** `alivioia.com` (aún con Basic Auth, cuenta de Erik)
- **Repo público:** `github.com/consultoriolegalsc-maker/alivio-lite`
- **NotebookLM alivioia:** `5678d0fa-08ce-4fca-86e3-0642c785c79f`
- **Notion Alivio Lite:** `349a1719-aa52-8161-8919-f23c2f570b81`
- **Stitch project:** `10500398176664050836`
- **NotebookLM clínico:** `91d84038-4702-4c05-84c0-73359aa1b7a4`

---

_Checkpoint generado al cierre del 2026-04-23. Próxima sesión: retomar desde "Prioridades" (sección 6)._
