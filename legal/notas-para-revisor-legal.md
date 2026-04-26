# Notas para el Revisor Legal — Erik Alvarado

**Documento:** Paquete legal de Alivio (T&C + Aviso de Privacidad)
**Fecha:** 2026-04-24
**Elaborado por:** Claude (Jorge Delfin) como borrador base
**Revisor:** Erik Alvarado, abogado titulado

---

## 📦 Archivos en este paquete

1. `terminos-y-condiciones-v1-borrador.md`
2. `aviso-de-privacidad-v1-borrador.md`
3. `notas-para-revisor-legal.md` (este documento)

---

## 🎯 Objetivo

Operar Alivio (app web de acompañamiento emocional con IA) en México con cumplimiento legal sólido, con énfasis en:

- Protección contra responsabilidad civil derivada del contexto de salud mental
- Cumplimiento LFPDPPP con especial cuidado en datos sensibles (Art. 9)
- Claridad en la no sustitución de servicios médicos profesionales
- Protección del usuario en crisis mediante protocolo documentado
- Transparencia en el modelo de negocio freemium + directorio

---

## ⚖️ Marco legal base considerado

- **LFPDPPP** — Ley Federal de Protección de Datos Personales en Posesión de los Particulares (2010)
- **Reglamento LFPDPPP** (2011)
- **Lineamientos del Aviso de Privacidad** del IFAI/INAI
- **Código Civil Federal** — especialmente Arts. 1910 (responsabilidad civil), 2117 (limitación)
- **Ley Federal de Protección al Consumidor** — contratos de adhesión, servicios a distancia
- **Código de Comercio** — operaciones mercantiles
- **NOM-024-SSA3-2012** — si el diario digital constituye expediente clínico electrónico, aplica (revisar)
- **Ley Federal del Derecho de Autor** — propiedad intelectual
- **Código Fiscal de la Federación** — plazos de conservación fiscal

---

## 🚨 Puntos críticos que necesito que valides

### Alta prioridad

#### 1. Responsabilidad civil en salud mental
Mi borrador incluye limitación de responsabilidad en sección 8. **En México NO se puede excluir responsabilidad por dolo o negligencia grave** (Art. 2117 CCF). Necesito que valides:
- Si la redacción actual sobrevive un análisis judicial
- Si conviene reformular como "asunción de riesgo informada" por parte del usuario
- Si el cap de responsabilidad limitada al mes de suscripción es ejecutable

#### 2. NOM-024-SSA3-2012 — ¿aplica a Alivio?
La norma regula el **Expediente Clínico Electrónico**. Alivio permite al usuario guardar un "diario digital" con temas emocionales. Pregunta:
- ¿El diario del usuario constituye expediente clínico si no hay médico responsable?
- ¿El resumen pre-sesión compartido con profesional externo activa la norma?
- ¿Requerimos certificación o es suficiente cumplir estándares de seguridad?

#### 3. Consentimiento expreso Art. 9 LFPDPPP
Datos sensibles requieren consentimiento **expreso y por escrito**. Validar:
- ¿Checkbox digital con firma de aceptación inmutable (IP, timestamp, versión de T&C) cumple "por escrito"?
- ¿Requerimos firma electrónica simple o avanzada?
- ¿Es suficiente guardar log en Supabase o necesitamos blockchain / tercero de confianza?

#### 4. Protocolo de crisis — responsabilidad civil
Si el detector no identifica una situación de crisis y ocurre daño, ¿cómo queda Alivio?
- La cláusula 6.2 advierte que el sistema no es infalible
- La cláusula 6.3 responsabiliza al usuario de buscar ayuda
- ¿Es suficiente para defensa legal?

### Media prioridad

#### 5. Edad mínima — 18 vs 15+
Propongo 18+ para simplificar. Validar:
- Si podemos bajar a 15+ con consentimiento verificable del tutor (crucial: ¿cómo se verifica digitalmente?)
- En caso de menores, requerimientos adicionales de la Ley General de los Derechos de Niñas, Niños y Adolescentes

#### 6. Transferencias internacionales
Todos los proveedores (Vercel, Supabase, Anthropic, Stripe, Resend) operan desde EE.UU. Validar:
- ¿Cumplimos con Art. 36 LFPDPPP (transferencia internacional)?
- ¿Necesitamos contratos específicos con cada uno?
- ¿Tenemos que notificar al INAI alguna de estas transferencias?

#### 7. Directorio de profesionales — responsabilidad
Los profesionales son independientes. Validar:
- Cláusula 9 del T&C que deslinda a Alivio
- ¿Debemos celebrar contratos de prestación de servicios con cada profesional?
- ¿Verificación de cédula profesional es obligatoria? ¿Cada cuánto revalidar?

#### 8. Stripe como encargado / transferencia
Stripe Inc. procesa pagos. Validar:
- ¿Firmamos acuerdo DPA (Data Processing Agreement)?
- ¿Notificación al INAI?

### Baja prioridad (pero importante)

#### 9. PROFECO y contratos de adhesión
Los T&C son contrato de adhesión sujetos a registro PROFECO en algunos casos. Validar:
- ¿Requerimos registro del modelo de contrato?
- ¿Se aplican las cláusulas abusivas prohibidas?

#### 10. Jurisdicción CDMX vs otras
Propongo CDMX. Validar si conviene:
- Tribunales federales (por ser LFPDPPP federal)
- Arbitraje CANACO
- Mediación previa obligatoria

---

## 🛠️ Datos pendientes de completar

Los borradores tienen marcados con `[CORCHETES]` los campos que necesito que completes o que me digas para llenar:

| Campo | ¿Quién lo provee? |
|---|---|
| Apellido completo de Jorge | Jorge |
| RFC de Jorge | Jorge |
| Domicilio fiscal | Jorge |
| Email legal (ej: legal@alivioia.com) | Jorge + configurar en Resend |
| Teléfono de contacto legal | Jorge |
| Email de privacidad (ej: privacidad@alivioia.com) | Jorge + configurar |
| Persona designada como responsable de datos personales | Jorge/Erik |
| Ciudad para jurisdicción (sugerido: CDMX) | Erik valida |
| Plazos específicos de retención ajustados a obligaciones fiscales | Erik valida |

---

## ✅ Lo que ya incluye el paquete

- Identificación del responsable (sección 1)
- Naturaleza del servicio y deslinde claro (sección 1.3)
- Aceptación expresa y capacidad (sección 2)
- Registro y cuenta (sección 3)
- Usos permitidos y prohibidos (sección 4)
- Planes y pagos transparentes (sección 5)
- Protocolo de crisis documentado (sección 6)
- Propiedad intelectual (sección 7)
- Limitación de responsabilidad (sección 8)
- Directorio de profesionales deslindado (sección 9)
- Terminación con derechos ARCO (sección 10)
- Modificaciones con notificación (sección 11)
- Jurisdicción y legislación (sección 13)
- Aviso de Privacidad completo según Art. 16 LFPDPPP
- Consentimiento expreso para datos sensibles (Art. 9 LFPDPPP)
- Derechos ARCO y procedimiento
- Medidas de seguridad técnicas
- Plazos de conservación
- Transferencias a encargados del tratamiento

---

## 📋 Flujo de implementación sugerido

1. **Erik revisa y corrige** los borradores (T&C + Aviso)
2. Se completan los campos `[CORCHETES]` con info real
3. **Diseñamos el flujo de consentimiento en la app:**
 - Pantalla de registro con 2 checkboxes separados:
 - `[ ] He leído y acepto los Términos y Condiciones`
 - `[ ] Otorgo consentimiento expreso para el tratamiento de mis datos sensibles (Art. 9 LFPDPPP)`
 - Opcional: `[ ] Acepto recibir comunicaciones informativas (finalidad secundaria)`
 - Al aceptar se guarda INSERT en tabla `consentimientos`:
 - user_id, timestamp, ip, user_agent, versión de T&C, versión de Aviso, hash de los documentos aceptados
 - Tabla append-only, jamás UPDATE, jamás DELETE
4. **Sistema de versiones:** cuando cambien T&C o Aviso, re-solicitar consentimiento
5. **Derecho ARCO accesible** desde Configuración → Privacidad
6. **Publicar documentos** en `alivioia.com/terminos` y `alivioia.com/privacidad`

---

## 🔒 Tabla de consentimientos en Supabase (sugerencia técnica)

```sql
CREATE TABLE consentimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  tipo TEXT NOT NULL CHECK (tipo IN (
    'terminos_condiciones',
    'aviso_privacidad',
    'datos_sensibles_art9',
    'finalidades_secundarias',
    'compartir_profesional_externo'
  )),
  version TEXT NOT NULL,  -- ej: "v1.0"
  documento_hash TEXT NOT NULL,  -- SHA-256 del documento aceptado
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET NOT NULL,
  user_agent TEXT,
  revoked_at TIMESTAMPTZ,  -- nulo mientras esté vigente
  revocacion_motivo TEXT
);

-- NO permitir UPDATE de ningún consentimiento existente
-- NO permitir DELETE
-- Solo INSERT y actualización del campo revoked_at
ALTER TABLE consentimientos ADD CONSTRAINT no_modificar_consentimiento
  CHECK (true);  -- Enforceable vía RLS + triggers

CREATE INDEX idx_consentimientos_user ON consentimientos(user_id);
CREATE INDEX idx_consentimientos_tipo_vigente
  ON consentimientos(user_id, tipo) WHERE revoked_at IS NULL;
```

Con trigger que rechace cualquier UPDATE que no sea al campo `revoked_at` / `revocacion_motivo`.

---

## 🎯 Plan de trabajo propuesto

1. **Erik revisa documentos** (1-2 horas de trabajo)
2. **Sesión conjunta** (Jorge + Erik + Claude) para resolver dudas (~1 hora)
3. **Ajustes finales** basados en feedback
4. **Implementación en código:**
 - Páginas `/terminos` y `/privacidad` en Next.js
 - Pantalla de registro con checkboxes de consentimiento
 - Tabla `consentimientos` en Supabase
 - Sistema de versionado de documentos
5. **Publicación y go-live**

---

## 💬 Mensaje para ti, Erik

Este paquete cubre lo que pude redactar con marco legal general de México. Sé que hay cosas que solo un abogado titulado puede validar definitivamente:

- Redacción precisa de cláusulas de limitación de responsabilidad
- Aplicabilidad específica de NOM-024
- Interpretación de "consentimiento por escrito" en entorno digital
- Obligaciones fiscales específicas sobre plazos de conservación
- Procedimientos ante INAI y PROFECO

**Agradezco tu revisión.** Esto protege a Jorge, al proyecto, y sobre todo a los usuarios de Alivio que están en momentos vulnerables.

Si ves que necesitamos agregar algo que no contemplé, por favor hazlo. Si ves redacciones que pueden mejorar, ajústalas. El objetivo es que Alivio opere con legalidad sólida desde el día 1.

Saludos,
Claude (en representación de Jorge)
