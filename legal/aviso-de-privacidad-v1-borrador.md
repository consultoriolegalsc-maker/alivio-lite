# AVISO DE PRIVACIDAD INTEGRAL — ALIVIO

**Versión 1.0 — BORRADOR para revisión legal**
**Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento, y los Lineamientos del Aviso de Privacidad.**
**Fecha de última actualización:** [FECHA_PENDIENTE]

---

## 📋 NOTAS AL REVISOR LEGAL (ERIK)

Este borrador cumple con el contenido mínimo del Art. 16 de la LFPDPPP. Campos a validar:

1. **Datos del responsable** — completar domicilio, RFC, contacto
2. **Finalidades** — ¿están todas las necesarias? ¿algún sobrante?
3. **Cláusula de datos sensibles** (Art. 9 LFPDPPP) — redacción del consentimiento expreso
4. **Transferencias** — ¿Stripe, Vercel, Supabase, Anthropic, Resend como encargados/terceros?
5. **Plazo de conservación** — política propuesta, validar
6. **Derechos ARCO** — procedimiento y plazos
7. **INAI** — mencionar competencia del INAI como autoridad reguladora

---

## 1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE

**Jorge Delfín [APELLIDO_PENDIENTE]** (en adelante, **"Alivio"**, **"nosotros"** o **"el Responsable"**), en su carácter de operador de la plataforma accesible en `https://alivioia.com`, es el responsable del tratamiento de sus datos personales.

- **RFC:** [RFC_PENDIENTE]
- **Domicilio:** [DOMICILIO_PENDIENTE]
- **Correo electrónico para asuntos de privacidad:** privacidad@alivioia.com [CONFIRMAR]
- **Departamento de Datos Personales:** [DESIGNAR_PERSONA — LFPDPPP Art. 30 exige designar un responsable]

---

## 2. DATOS PERSONALES QUE RECABAMOS

### 2.1 Datos de identificación
- Correo electrónico
- Nombre de pila (opcional)
- Zona horaria

### 2.2 Datos de contacto
- Correo electrónico (canal principal)

### 2.3 Datos de autenticación
- Tokens de sesión cifrados
- Registro de accesos (IP, navegador, sistema operativo, fecha)

### 2.4 Datos técnicos
- Información del dispositivo
- Tipo de navegador
- Datos de cookies (ver sección 7)

### 2.5 **DATOS PERSONALES SENSIBLES** (Art. 3, fracción VI LFPDPPP)

Derivado de la naturaleza del Servicio, podremos tratar los siguientes **datos sensibles** relacionados con su estado emocional y mental:

- Contenido de conversaciones con el asistente de IA
- Estado de ánimo declarado o inferido
- Temas recurrentes en sus conversaciones
- Categorías de emociones expresadas
- Ejercicios realizados y su resultado subjetivo
- Frecuencia de uso del servicio
- Eventos de crisis detectados (solo metadatos, no el contenido específico)

**Declaración expresa sobre datos sensibles:**
Usted reconoce expresamente que estos datos son de carácter **íntimo y sensible** y que su tratamiento requiere su **consentimiento expreso y por escrito** conforme al Art. 9 de la LFPDPPP. Dicho consentimiento se otorga al aceptar el presente Aviso mediante la casilla correspondiente durante el registro.

### 2.6 Datos de pago (Plan Plus)

Los datos de la tarjeta bancaria son **procesados directamente por Stripe, Inc.**, no son almacenados en nuestros servidores. Nosotros únicamente almacenamos:
- Identificador de suscripción de Stripe
- Últimos 4 dígitos de la tarjeta
- Historial de cobros (montos, fechas, estado)

### 2.7 Datos del profesional externo (si aplica)

Si usted decide invitar a su profesional de salud mental externo a recibir resúmenes:
- Correo electrónico del profesional
- Fecha y contenido del resumen compartido

---

## 3. FINALIDADES DEL TRATAMIENTO

### 3.1 Finalidades primarias (necesarias para la prestación del Servicio)

1. Creación y administración de su cuenta de usuario
2. Prestación del Servicio de acompañamiento emocional mediante IA
3. Generación de respuestas conversacionales personalizadas
4. Detección automática de situaciones de crisis y muestra de líneas de emergencia
5. Generación de bitácoras, resúmenes semanales e insights personales
6. Envío de comunicaciones operativas (restablecimiento de contraseña, confirmaciones, resúmenes)
7. Procesamiento de pagos del Plan Plus
8. Prevención de abuso del Servicio (rate limiting, detección de bots)
9. Cumplimiento de obligaciones legales aplicables (fiscales, de protección de datos, etc.)

### 3.2 Finalidades secundarias (NO necesarias, requieren consentimiento adicional)

1. Mejora del Servicio mediante análisis agregado y anónimo de uso
2. Envío de comunicaciones informativas sobre nuevas funciones o contenido de bienestar
3. Investigación interna de patrones generales (sin identificar usuarios individuales)

**Usted puede oponerse al tratamiento para finalidades secundarias** marcando la casilla correspondiente al registrarse, o enviando solicitud al correo indicado, sin que esto afecte la prestación del Servicio.

### 3.3 Lo que NO hacemos con sus datos

- **NO vendemos ni rentamos** sus datos personales a terceros
- **NO compartimos el contenido de sus conversaciones** con terceros sin su consentimiento expreso
- **NO utilizamos sus conversaciones para entrenar modelos de IA propios o de terceros**
- **NO usamos su contenido para publicidad** dirigida
- **NO divulgamos sus datos** salvo las excepciones legales del Art. 10 LFPDPPP

---

## 4. TRANSFERENCIAS DE DATOS

### 4.1 Encargados del tratamiento (Art. 2 Reglamento LFPDPPP)

Para prestar el Servicio, utilizamos proveedores tecnológicos que actúan como **encargados del tratamiento**, sin que esto constituya una transferencia:

| Proveedor | Función | Jurisdicción | Certificaciones |
|---|---|---|---|
| Vercel Inc. | Infraestructura web y hosting | EE.UU. | SOC 2 Type II |
| Supabase Inc. | Base de datos y autenticación | EE.UU. | SOC 2, HIPAA |
| Anthropic PBC | Inteligencia artificial (Claude) | EE.UU. | SOC 2, zero-retention on API |
| Stripe, Inc. | Procesamiento de pagos | EE.UU. | PCI-DSS Level 1 |
| Resend Inc. | Envío de correos transaccionales | EE.UU. | SOC 2 |

Con cada uno de estos proveedores se ha celebrado (o se celebrará) el acuerdo de tratamiento de datos requerido conforme a la normativa mexicana e internacional aplicable.

### 4.2 Transferencias que requieren consentimiento

Alivio **NO transferirá** sus datos personales a terceros no autorizados salvo:

- Por requerimiento de autoridad competente en términos de ley
- Para proteger la vida o integridad física del titular en casos de emergencia (Art. 10 LFPDPPP)
- Con su consentimiento expreso adicional

### 4.3 Transferencia opcional a profesional externo

Si usted autoriza expresamente la opción de compartir resúmenes con su profesional de salud mental externo (opción disponible en Plan Plus), usted estará transfiriendo sus datos al profesional, bajo su propia responsabilidad y consentimiento expreso adicional.

---

## 5. DERECHOS ARCO Y REVOCACIÓN DEL CONSENTIMIENTO

Conforme a los Artículos 22 al 24 de la LFPDPPP, usted tiene en todo momento los siguientes derechos:

### 5.1 Derechos

- **Acceso:** Conocer qué datos personales tenemos y los detalles del tratamiento
- **Rectificación:** Corregir datos inexactos o incompletos
- **Cancelación:** Solicitar el borrado de sus datos cuando considere innecesario su tratamiento
- **Oposición:** Oponerse al uso de sus datos para fines específicos

### 5.2 Revocación del consentimiento

Usted puede **revocar en cualquier momento** el consentimiento otorgado para el tratamiento de sus datos personales, particularmente los sensibles. La revocación no tendrá efectos retroactivos.

### 5.3 Procedimiento

Para ejercer sus derechos ARCO o revocar su consentimiento, envíe solicitud por cualquiera de los siguientes medios:

- **Correo electrónico:** privacidad@alivioia.com
- **Dentro de la aplicación:** Configuración → Privacidad → Solicitar mis datos / Borrar mi cuenta

Su solicitud debe incluir:
1. Nombre completo y correo electrónico registrado
2. Descripción clara y precisa del derecho que ejerce
3. Copia de identificación oficial (INE, pasaporte, etc.) o firma electrónica
4. Documentos que acrediten su identidad en caso de representación

### 5.4 Plazos de respuesta

Alivio responderá su solicitud en un plazo máximo de **20 días hábiles** contados a partir de la recepción de su solicitud completa, pudiendo prorrogarse por 20 días adicionales cuando las circunstancias lo ameriten (Art. 32 LFPDPPP).

### 5.5 INAI

En caso de inconformidad con la respuesta, usted podrá acudir al **Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)**:

- Sitio web: `https://home.inai.org.mx/`
- Teléfono: 800 835 4324

---

## 6. SEGURIDAD DE LA INFORMACIÓN

### 6.1 Medidas de seguridad

Implementamos medidas administrativas, técnicas y físicas razonables para proteger sus datos, incluyendo:

- **Cifrado en tránsito:** TLS 1.3 en todas las comunicaciones
- **Cifrado en reposo:** Datos sensibles cifrados con AES-256 en base de datos
- **Row Level Security (RLS):** Aislamiento estricto de datos por usuario en Supabase
- **Autenticación segura:** Magic link con expiración, sin almacenamiento de contraseñas en texto plano
- **Rate limiting:** Prevención de abuso y enumeración de cuentas
- **Logs sin contenido sensible:** Los registros operativos nunca incluyen contenido de conversaciones
- **Auditoría de acceso:** Registro inmutable de accesos administrativos

### 6.2 Notificación de brechas

En caso de vulneración de seguridad que afecte significativamente sus derechos patrimoniales o morales, le notificaremos conforme al Art. 20 de la LFPDPPP, en un plazo máximo razonable desde el conocimiento de la brecha.

---

## 7. COOKIES Y TECNOLOGÍAS SIMILARES

Utilizamos cookies y tecnologías similares para:

### 7.1 Cookies esenciales (no requieren consentimiento)
- Mantener su sesión activa
- Guardar preferencias básicas de la aplicación
- Recordar que aceptó los Términos y Aviso de Privacidad

### 7.2 Cookies analíticas (requieren consentimiento)
- Medir uso agregado de la aplicación
- Identificar funciones más utilizadas
- [PENDIENTE: ¿vamos a usar Plausible, Google Analytics, o similar?]

Usted puede configurar su navegador para rechazar cookies, pero algunas funciones del Servicio podrían no operar correctamente.

---

## 8. PLAZO DE CONSERVACIÓN

Conservamos sus datos personales por los siguientes plazos:

| Tipo de dato | Plazo de conservación |
|---|---|
| Datos de cuenta activa | Mientras su cuenta esté activa |
| Conversaciones (contenido) | 6 meses desde última interacción, salvo que usted elija conservarlas |
| Metadatos de uso (fecha, duración, categorías) | Hasta 24 meses para mejora del servicio |
| Registros de eventos de crisis | 5 años (por obligación de resguardo) |
| Datos fiscales y de facturación | 5 años conforme al Código Fiscal de la Federación |
| Datos después de terminación de cuenta | 30 días de gracia, luego eliminación definitiva |

[REVISAR CON ABOGADO: ¿El plazo de 6 meses es razonable? ¿Obligaciones fiscales obligan más tiempo?]

Después de estos plazos, procederemos al borrado definitivo o anonimización de sus datos.

---

## 9. DATOS DE MENORES DE EDAD

Alivio **NO está dirigido a menores de 18 años**. Si detectamos que un menor se ha registrado sin consentimiento verificable de tutor, procederemos a eliminar su cuenta y datos inmediatamente.

[REVISAR: ¿Permitimos 15-17 con consentimiento de tutor? Si sí, requiere flujo diferente.]

---

## 10. CAMBIOS AL AVISO DE PRIVACIDAD

Alivio podrá modificar el presente Aviso de Privacidad. Los cambios sustanciales serán notificados:

- Por correo electrónico con al menos **15 días naturales** de anticipación
- Mediante aviso destacado en la aplicación
- Con nueva solicitud de consentimiento expreso si los cambios afectan datos sensibles

La fecha de última actualización aparece al inicio de este documento. Versiones históricas disponibles bajo solicitud.

---

## 11. ACEPTACIÓN Y CONSENTIMIENTO EXPRESO

### 11.1 Consentimiento expreso — DATOS SENSIBLES

Al marcar la casilla correspondiente durante el registro, usted manifiesta:

> **"He leído y comprendo el Aviso de Privacidad. Otorgo mi CONSENTIMIENTO EXPRESO para el tratamiento de mis datos personales, incluyendo los datos sensibles relacionados con mi estado emocional y mental, con las finalidades primarias indicadas. Reconozco que este consentimiento es libre, específico, informado e inequívoco."**

Sin este consentimiento expreso no es posible acceder al Servicio debido a la naturaleza del mismo.

### 11.2 Consentimiento para finalidades secundarias

Por separado, se le presentará una casilla opcional para finalidades secundarias (mejora del servicio, newsletters). Su decisión no afecta el acceso al Servicio.

---

## 12. CONTACTO

Para cualquier consulta o ejercicio de derechos:

- **Correo:** privacidad@alivioia.com
- **Domicilio:** [PENDIENTE]
- **Teléfono:** [PENDIENTE]
- **Horario de atención:** Lunes a viernes, 9:00-18:00 hrs (tiempo de CDMX)

---

**Versión del documento:** v1.0 BORRADOR
**Fecha de elaboración:** 2026-04-24
**Estado:** Pendiente de revisión por abogado titulado (Erik Alvarado)
