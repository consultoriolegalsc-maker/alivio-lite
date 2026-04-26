# Checkpoint Alivio IA — Sesión 2026-04-25

**Cierre del día:** modelo de producto refactorizado a v3 (simple y escalable) + paquete legal completo redactado para revisión de Erik.

`alivioia.com` sigue vivo y público (HTTP 200, sin auth, chat con Claude Haiku 4.5 respondiendo).

---

## 1. Lo que se trabajó hoy

### A) Revisión de BazarAgent canónico para identificar reuso
- Inspección de `/Users/jorgedelfin/Documents/bazaaragent/` (repo canónico, 1 cliente activo: InterCapMM)
- Identificación quirúrgica de qué archivos/patrones reusar:
 - **Copio**: `lib/supabase/{client,server}.ts`, `lib/security/rate-limiter.ts`, schema base, patrón `/registro`, middleware multi-tenant, background jobs, ManyChat webhook pattern
 - **NO copio**: scraping/Apify (innecesario), social posts, marketplace, knowledge cache por industria, agente CEO vendedor (Alivio tiene personalidad propia)
- Decisión: **copiar y adaptar** > monorepo (más simple para MVP)

### B) Otra sesión señaló 3 huecos críticos en mi plan original
Reconocidos y aceptados:
1. **Supabase debe ser separado** (datos sensibles salud mental ≠ leads comerciales)
2. **Compliance legal es más que T&C bloqueante** — LFPDPPP Art. 9, NOM-024-SSA3-2012, consentimiento expreso documentado
3. **Protocolo de crisis necesita escalamiento humano** real, no solo banner

Resultado: plan **compliance-first** acordado con 5 pasos antes de código.

### C) Discusión sobre usuarios con profesional externo
Jorge planteó: ¿qué hacemos con el 70%+ de usuarios que ya tienen psicólogo/psiquiatra propio (no en nuestro directorio)?

Resultado: nuevo tier conceptual "Alivio Acompañado" → simplificado después a feature dentro de Plus.

### D) **REFACTOR DEL MODELO DE PRODUCTO** (v3)

Eliminado el tier "Alivio Conectado $2,200" (era complejo y mal escalable). Nuevo modelo:

| Tier | Precio | Incluye |
|---|---|---|
| **Alivio Libre** | $0 | Chat texto/voz, safeguards, rate limit 30 msg/día |
| **Alivio Plus** ⭐ | **$99 MXN/mes** | Diario digital + PDF semanal + ejercicios con seguimiento + auto-insights + historial completo + invitar a profesional externo |
| **Sesión con profesional** | $675 MXN/sesión | Videollamada con psicólogo verificado del directorio |

**Por qué $99 (no $119):**
- Cruza umbral psicológico <$100
- Margen sigue siendo ~90% (~$10 costo operativo)
- Comparable: Spotify $115, Netflix $139, Yana Pro $149
- Elasticidad: $99 puede traer 2x usuarios = más revenue total

**Proyección $99 con 10,000 usuarios Plus = $990,000 MXN/mes (vs $110,000 modelo Conectado anterior).**

### E) Discusión de audio
- HeyGen NO sirve para chat tiempo real (es para videos batch)
- HeyGen SÍ para **videos pregrabados de ejercicios** con el clon de Jorge (one-time cost ~$48 USD, reusable infinito)
- ElevenLabs para voz Premium tiempo real → caro a escala
- **Decisión final: empezar con Web Speech API (gratis) + Web no robótica más adelante**
- Audio Premium queda como feature futuro cuando tengamos 500+ Plus

### F) Voz clonada — consideración ética
Si el chat de voz tiempo real usa voz clonada de Jorge, riesgo en crisis (usuario puede pensar que es humano real). Acordado: **separar usos**:
- Videos pregrabados → voz de Jorge (claramente identificada como video del fundador)
- Chat tiempo real → voz sintética genérica (más adelante)

### G) **Paquete legal completo redactado** (3 documentos, 869 líneas)

En `/Users/jorgedelfin/alivio/legal/`:

1. **`terminos-y-condiciones-v1-borrador.md`** (340 líneas, 15 secciones)
 - Identificación responsable + naturaleza del servicio
 - "Lo que Alivio NO ES" (clave para limitar responsabilidad)
 - Aceptación expresa, capacidad legal, edad mínima 18+
 - Usos permitidos/prohibidos
 - Planes y pagos transparentes
 - Protocolo de crisis con limitaciones del sistema
 - Propiedad intelectual
 - Limitación de responsabilidad
 - Directorio de profesionales (deslinda a Alivio)
 - Terminación + derechos ARCO
 - Jurisdicción CDMX + PROFECO

2. **`aviso-de-privacidad-v1-borrador.md`** (292 líneas)
 - Conforme Art. 16 LFPDPPP
 - **Datos sensibles** explícitamente identificados (Art. 9)
 - Finalidades primarias y secundarias separadas
 - "Lo que NO hacemos" (no vender datos, no entrenar modelos con conversaciones)
 - Transferencias a encargados (Vercel, Supabase, Anthropic, Stripe, Resend)
 - Derechos ARCO + procedimiento + INAI
 - Medidas de seguridad técnicas (TLS 1.3, AES-256, RLS, etc.)
 - Plazos de conservación específicos
 - Cookies (esenciales vs analíticas)

3. **`notas-para-revisor-legal.md`** (237 líneas)
 - 10 puntos críticos para Erik validar (responsabilidad civil, NOM-024, consentimiento art. 9, edad, transferencias internacionales, directorio, etc.)
 - Datos pendientes (RFC, domicilio, email legal)
 - Schema SQL para tabla `consentimientos` inmutable append-only
 - Plan de implementación sugerido

---

## 2. Decisiones clave del día

1. **Modelo de producto v3:** Libre / Plus $99 / Sesión $675 (eliminado Conectado $2,200)
2. **$99 MXN/mes** confirmado para Plus (no $119)
3. **Audio:** Web Speech API gratis para todos, voz natural/clonada queda para fase posterior
4. **HeyGen:** lo usaremos para videos pregrabados de ejercicios con clon de Jorge (decisión futura)
5. **BazarAgent:** copiar patrones específicos (Supabase auth, security, registro), no fusionar productos
6. **Plan compliance-first** aceptado: 5 pasos antes de tocar código nuevo
7. **Paquete legal completo redactado** para revisión de Erik (abogado titulado)
8. **Documentos legales en español MX** con marco LFPDPPP, CCF, LFPC, NOM-024

---

## 3. Pendientes para la siguiente sesión

### Inmediato (cuando Erik revise legal)
1. Erik revisa los 3 documentos legales y los 10 puntos críticos
2. Ajustar redacción según su feedback
3. Completar campos `[CORCHETES]` con datos reales (RFC, domicilio, emails)

### Alta prioridad
4. **Paso 1:** Crear proyecto Supabase nuevo `alivio-prod` (separado de bazaaragent)
5. **Paso 2:** Definir política de datos (qué guardamos, retención, derecho de borrado)
6. **Paso 3:** Aviso de Privacidad final (con cambios de Erik)
7. **Paso 4:** Diseñar protocolo de crisis operativo (detector → log → notificación a Jorge+Erik via WhatsApp/email)
8. **Paso 5:** Recién entonces, código:
 - Schema base 10 tablas + RLS
 - Auth con magic link vía Resend
 - Pantalla de registro con 3 checkboxes (T&C / consentimiento sensibles / opcional secundarios)
 - Tabla `consentimientos` append-only con schema SQL ya diseñado
 - Páginas `/terminos` y `/privacidad`

### Media prioridad
9. Pantalla del directorio (marcador `[MOSTRAR_DIRECTORIO]`)
10. Generador de insights usuario (batch Haiku)
11. Cal.com + Stripe Connect Express (no Standard) para agendamiento
12. PDF semanal con Resend

### Baja prioridad / fase futura
13. ElevenLabs voz natural (cuando tengamos 500+ usuarios Plus)
14. HeyGen videos pregrabados de ejercicios con clon de Jorge
15. Cloudflare Turnstile anti-bot
16. Rotar Anthropic API key a dedicada `alivio-prod`

---

## 4. Estado del producto al cierre

| Componente | Estado |
|---|---|
| `alivioia.com` | ✅ VIVO Y PÚBLICO (HTTP 200, chat funcionando) |
| Modelo de producto | ✅ v3 definido (Libre / Plus $99 / Sesión $675) |
| Documentos legales | ✅ Borradores listos para Erik |
| Supabase para Alivio | ⏳ Pendiente crear `alivio-prod` |
| Auth obligatorio + T&C en DB | ⏳ Pendiente |
| Stripe Subscription Plus | ⏳ Pendiente |
| Páginas `/terminos` y `/privacidad` | ⏳ Pendiente |
| HeyGen videos ejercicios | ⏳ Decidido, pendiente ejecutar |

---

## 5. Métricas y referencias rápidas

- **Workbench local:** `/Users/jorgedelfin/alivio/`
- **Workbench legal:** `/Users/jorgedelfin/alivio/legal/`
- **Repo principal Erik:** `consultoriolegalsc-maker/alivio-lite`
- **Repo privado Jorge:** `delfinsin82-bit/alivio`
- **NotebookLM alivioia:** `5678d0fa-08ce-4fca-86e3-0642c785c79f`
- **Notion Alivio Lite:** `349a1719-aa52-8161-8919-f23c2f570b81`
- **Costo operativo Plus:** ~$10 MXN/mes por usuario (margen ~90%)
- **Vercel project:** `prj_0ioaq2c2ykBO0NNZJBYIExbahIxk` (cuenta Erik)
- **Token Vercel activo:** `/tmp/erik-vercel-token.txt` (perm 600, expira 1 day desde 2026-04-23)

---

## 6. Decisiones de arquitectura confirmadas (acumuladas)

1. Claude Haiku 4.5 con prompt caching (~$0.03/conversación)
2. Knowledge base clínico de 13 secciones cacheadas (5,500 tokens)
3. Detector de crisis independiente del LLM (regex + fallback <5ms)
4. Rate limiting 30 msgs/día por sessionId
5. Middleware toggleable (público sin BASIC_AUTH env vars)
6. Logo gota verde salvia con halo (SVG vector + lockups)
7. Tipografía Fraunces italic + Inter
8. Aurora background + grain + breath-line 6 rpm
9. AlivioMark refactorizado en VoiceMode con ondas de sonido
10. Stripe Connect **Express** (no Standard) — terapeuta es prestador directo
11. WhatsApp Business API directa > ManyChat (más limpio para datos clínicos)
12. RLS estricto multi-tenant en dashboard de terapeuta
13. Documentos legales en `legal/` aparte de código

---

_Checkpoint generado al cierre del 2026-04-25._
_Próxima sesión: arrancar Paso 1 (Supabase nuevo) cuando Erik confirme revisión legal._
