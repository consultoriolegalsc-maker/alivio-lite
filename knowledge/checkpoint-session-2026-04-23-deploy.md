# Checkpoint Alivio IA — Sesión 2026-04-23 Parte 2 (DEPLOY PÚBLICO)

**Cierre del día:** `alivioia.com` está vivo, público, respondiendo con Claude, sin password. Listo para compartir con psicólogos.

---

## 1. Lo que se logró HOY (sesión de deploy)

### Aceptación de invitación y acceso al repo
- Erik envió invitación de colaborador a GitHub
- Aceptada vía `gh api PATCH user/repository_invitations/316056217`
- `delfinsin82-bit` ahora es colaborador **write** del repo `consultoriolegalsc-maker/alivio-lite`

### Push del PR gigante
- Branch: `feat/alivio-v1-complete`
- Commit: `4c8d11d` — 46 archivos, +8,510 / -1,964 líneas
- PR #1 abierto con descripción completa: https://github.com/consultoriolegalsc-maker/alivio-lite/pull/1
- **Mergeado a `main`** (`mergedBy: delfinsin82-bit`, `mergedAt: 2026-04-24T01:37:55Z`)

### Problema del dominio — ICANN Lock
- Erik intentó transferir proyecto Vercel a Jorge → Vercel exige Team Pro ($20/mes) para transferir entre Hobby
- Erik intentó transferir solo el dominio → bloqueado por ICANN Lock hasta **2026-06-20** (60 días desde compra)
- **Decisión:** trabajar con el proyecto en cuenta Vercel de Erik vía API token

### Setup de env vars en Vercel (vía API)
Proyecto: `prj_0ioaq2c2ykBO0NNZJBYIExbahIxk` (en cuenta `e.alvarado@intercapmm.com`)

Agregadas vía POST `api.vercel.com/v10/projects/{id}/env`:
- `ANTHROPIC_MODEL` = `claude-haiku-4-5-20251001`
- `RATE_LIMIT_PER_DAY` = `30`
- `BASIC_AUTH_USER` = `alivio` (temporal, luego eliminada)
- `BASIC_AUTH_PASSWORD` = `tzE1x0qtn3X4lcd7q0IC` (temporal, luego eliminada)
- `ANTHROPIC_API_KEY` = [leída de `.env.local` local, 108 chars, `sk-ant-api03-...`]

### Tokens de Vercel
- Token 1 (Erik, inicial): `vcp_5f1bGlj0w3mg9hWr...` — funcionó para setup inicial pero perdió scope al proyecto
- Token 2 (Erik, nuevo con Full Account scope): `vcp_8ge48zrR...` — funciona correctamente
- Guardado en `/tmp/erik-vercel-token.txt` (permisos 600)

### Conexión de dominios
Descubierto: `alivioia.com` NO estaba conectado al proyecto (solo `alivio-lite.vercel.app`).

Agregados vía `api.vercel.com/v10/projects/{id}/domains`:
- `alivioia.com` → apunta al proyecto, SSL automático, verified
- `www.alivioia.com` → redirect al apex, verified

### Primera prueba en vivo (con Basic Auth)
- Deploy forzado vía API (v13/deployments con gitSource)
- Estado: READY después de ~30 segundos de BUILDING
- `alivioia.com`: HTTP 401 sin auth → HTTP 200 con `alivio:tzE1x0qtn3X4lcd7q0IC`
- Chat `/api/chat` respondiendo con Claude Haiku 4.5 correctamente

### Apertura al público (último paso del día)
**Motivo:** Jorge quiere compartir a psicólogos sin fricción de password.

1. Modificado `middleware.ts` → **toggleable** por env vars:
   - Sin `BASIC_AUTH_USER` y `BASIC_AUTH_PASSWORD` → sitio público
   - Con ambas → exige Basic Auth
2. Commit `62ae6e2` directo a `main` (tras cherry-pick desde branch)
3. Eliminadas env vars `BASIC_AUTH_*` vía DELETE en Vercel API
4. Deploy nuevo disparado → READY
5. Verificación final: `curl -I https://alivioia.com` → **HTTP 200 sin credenciales** ✅

---

## 2. Estado al cierre

| Componente | Estado |
|---|---|
| `alivioia.com` | ✅ PÚBLICO, HTTP 200 |
| `www.alivioia.com` | ✅ Redirect al apex |
| Chat con Claude | ✅ Haiku 4.5 respondiendo |
| SSL | ✅ Automático |
| Rate limiting | ✅ 30 msgs/día por sessionId |
| Detector de crisis | ✅ Regex + fallback pre-escrito |
| System prompt v3 + knowledge base | ✅ 8,500 tokens cacheados |
| Middleware toggleable | ✅ Documentado en el código |

**Env vars activas en Vercel:**
- `ANTHROPIC_API_KEY` (encrypted)
- `ANTHROPIC_MODEL` = `claude-haiku-4-5-20251001`
- `RATE_LIMIT_PER_DAY` = `30`

---

## 3. Decisiones clave del día

1. **NO transferir proyecto a Jorge** (Vercel exige Team Pro $20/mes para transferencias Hobby-to-Hobby)
2. **NO transferir dominio ahora** (ICANN Lock hasta 2026-06-20)
3. **Trabajar con token de Erik** (Full Account, 1 day expiration) para configurar todo vía API
4. **Reusar la Anthropic API key existente** (no crear dedicada `alivio-prod` aún — se puede rotar después)
5. **Middleware toggleable por env vars** — permite alternar privado/público sin tocar código
6. **Abrir sitio público ya** — para demos con psicólogos. Riesgo legal mitigado con disclaimer bloqueante mientras implementamos Auth + T&C real en 2-3 días
7. **Registro obligatorio con T&C viene pronto** (Supabase Auth + Resend magic link)
8. **Diario digital funcionará para TODOS los usuarios** (no solo los conectados a terapeuta) — auto-insights de patrones temporales

---

## 4. Features discutidas y confirmadas

### Feature 1: Registro obligatorio con T&C
- **Por qué:** protección legal — consentimiento documentado en DB con timestamp, IP, versión de T&C
- **Cómo:** Supabase Auth con magic link vía Resend
- **Cuándo:** próximos 2-3 días

### Feature 2: Diario digital de DOS niveles
- **Nivel 1 (todos):** auto-insights al usuario — "Los lunes sueles sentirte más abrumado" / "Esta semana mencionaste tu mamá 4 veces" / "La respiración 4-7-8 te ayudó 3 veces"
- **Nivel 2 (Alivio Conectado $2,200/mes):** resúmenes pre-sesión para el terapeuta asignado (con consentimiento)
- Funcional para los que NO tienen terapeuta — es valor del producto gratis

### Feature 3: Nudge al directorio si patrón empeora
- Alivio detecta empeoramiento sostenido (3+ semanas)
- Sugiere referir a profesional proactivamente
- Ethical conversion funnel

---

## 5. Artefactos generados / archivos importantes

### En disco local
- `/tmp/erik-vercel-token.txt` (perm 600) — token activo de Vercel
- `/tmp/save-vercel-token.sh` — script para recibir tokens de forma segura
- `/tmp/save-anthropic-key.sh` — script para recibir API keys de Anthropic
- `/tmp/save-resend-key.sh` — script para recibir API key de Resend (pendiente)
- `/tmp/alivio-basic-pass.txt` — password antiguo de Basic Auth (ya inútil, sitio público)
- `/Users/jorgedelfin/alivio/.env.local` — env vars locales (API key Anthropic real)

### Commits al repo
1. `4c8d11d` — feat: Alivio v1 complete (logo, knowledge base, UI refactor, voice rework, PWA)
2. `62ae6e2` — feat: middleware toggleable — público por default, privado si hay env vars

### Tablas que se crearán en Supabase (PENDIENTE)
1. `users` — pacientes/usuarios del chat con terapeuta_id nullable
2. `profesionales` — psicólogos del directorio
3. `sesiones_chat` — conversaciones de Alivio Libre
4. `mensajes_chat` — cada mensaje individual
5. `resumenes_pre_sesion` — DIARIO DIGITAL para terapeuta
6. `insights_usuario` — patrones detectados para el propio usuario
7. `resumenes_semanales_usuario` — email opcional con Resend
8. `notas_terapeuta` — notas privadas post-sesión
9. `agendamientos` — citas con Cal.com + Stripe Connect
10. `consentimientos` — registro legal de T&C aceptados

---

## 6. Cómo replicar este deploy (para referencia futura)

Si por algún motivo hay que rehacer el deploy desde cero:

1. **GitHub:** push a `main` del branch `feat/alivio-v1-complete`
2. **Vercel Project:** crear proyecto conectado al repo
3. **Env vars requeridas:**
 - `ANTHROPIC_API_KEY` (encrypted) — API key de Anthropic
 - `ANTHROPIC_MODEL` = `claude-haiku-4-5-20251001`
 - `RATE_LIMIT_PER_DAY` = `30`
4. **Opcional (para privatizar):**
 - `BASIC_AUTH_USER` = valor a elegir
 - `BASIC_AUTH_PASSWORD` = valor a elegir
5. **Dominios:** agregar `alivioia.com` y `www.alivioia.com` (redirect al apex)
6. **Deploy:** push a main disparará deploy automático; o forzar vía API `POST api.vercel.com/v13/deployments`

Total: ~15 minutos si no hay bloqueos administrativos.

---

## 7. Pendientes para la siguiente sesión

### Prioridad ALTA
1. **Supabase setup** — decidir reusar el proyecto pausado o crear `alivio-prod` nuevo
2. **Schema base** — las 10 tablas con RLS policies
3. **Auth con magic link** — Resend integration + pantalla de login
4. **T&C bloqueante** — consentimiento guardado en DB con timestamp

### Prioridad MEDIA
5. **Pantalla de directorio** — conectada al marcador `[MOSTRAR_DIRECTORIO]`
6. **Dashboard para terapeuta** — rutas protegidas por role
7. **Generador de insights usuario** — batch job Haiku 4.5
8. **Cal.com + Stripe Connect** — agendamiento funcional

### Prioridad BAJA
9. **ElevenLabs** para voz cálida
10. **Cloudflare Turnstile** anti-bot
11. **Rotar Anthropic API key** a dedicada `alivio-prod`

---

## 8. Mensaje listo para psicólogos (para compartir)

```
Hola Dra/Dr [nombre],

Te comparto Alivio, una herramienta que estamos construyendo:
compañero de apoyo emocional con IA, pensada para acompañar
a pacientes entre sesiones como un diario digital.

Te invito a probarla y darme tu impresión:

🔗  https://alivioia.com

Es gratis, sin registro por ahora. Habla contigo en español
neutro latino, usa técnicas CBT, ACT y validación emocional
(no diagnostica, no prescribe, nunca sustituye tu trabajo).

Dinos qué te parece — sobre todo si piensas que podría
servir de apoyo a tus pacientes entre sesiones.

Gracias.
```

---

## 9. Riesgos activos y mitigaciones

| Riesgo | Mitigación actual | Solución definitiva |
|---|---|---|
| Sin T&C documentado legal | Disclaimer bloqueante (localStorage) | Supabase Auth + T&C en DB (2-3 días) |
| Abuso del chat | Rate limit 30/día + detector crisis | Cloudflare Turnstile (próxima semana) |
| API key compartida con Claude Code | Clave funciona, no hay leak | Rotar a dedicada `alivio-prod` |
| Dominio en cuenta de Erik | Control total vía token API | Transferir el 2026-06-20 cuando ICANN lo libere |
| Sin backup DB de sesiones | Aún no guardamos nada | Supabase con RLS (próximos días) |

---

_Checkpoint generado al cierre del 2026-04-23, parte 2._
_Próxima sesión: retomar desde "Pendientes para la siguiente sesión" (sección 7)._
