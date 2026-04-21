# Alivio Lite

Compañero de apoyo emocional con IA, en español neutro latino. Gratis, anónimo y disponible 24/7.

## ¿Qué es Alivio Lite?

Alivio Lite es una aplicación web que ofrece un espacio cálido para expresar cómo te sientes. Puedes hablar o escribir, y Alivio (una IA basada en Claude) te acompaña con validación, preguntas abiertas y técnicas breves de respiración o grounding. **No es un servicio médico ni sustituye a un profesional de la salud mental.**

## Cómo conseguir tu API Key de Anthropic

1. Entra a https://console.anthropic.com
2. Inicia sesión o crea una cuenta
3. Ve a **API Keys** en el menú lateral
4. Haz clic en **Create Key**, ponle un nombre (por ejemplo "alivio-lite") y cópiala
5. Abre el archivo `.env.local` en este proyecto
6. Reemplaza `sk-ant-api03-pega-tu-key-aqui` por tu clave real
7. Guarda el archivo

> Importante: **nunca compartas tu API Key** ni la subas a GitHub. El archivo `.env.local` ya está en `.gitignore`.

## Comandos para correr

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en tu navegador (preferiblemente Chrome para modo voz).

## Troubleshooting

**"Falta la ANTHROPIC_API_KEY"**
Edita `.env.local`, pon tu clave real y reinicia el servidor con `Ctrl+C` y `npm run dev`.

**Modo voz no funciona**
La Web Speech API solo funciona en navegadores basados en Chromium (Chrome, Edge, Brave). Safari y Firefox tienen soporte parcial o nulo. Usa el modo texto como alternativa.

**Error 500 al enviar un mensaje**
Revisa la consola del servidor (donde corriste `npm run dev`). Suele ser API Key inválida, sin saldo en Anthropic, o problemas de red.

**No escucho la voz de Alivio**
Algunos sistemas no tienen voces en español instaladas. En Windows puedes añadirlas desde **Configuración → Hora e idioma → Voz**. En Mac desde **Preferencias del sistema → Accesibilidad → Contenido hablado**.

**Los estilos no cargan**
Asegúrate de haber corrido `npm install` completo. Si siguen sin cargar, borra la carpeta `.next` y corre `npm run dev` de nuevo.

## Mejoras futuras

- Integrar ElevenLabs para voz más cálida y natural
- Historial de sesiones con resúmenes automáticos
- Ejercicios de respiración con animación visual guiada
- Modo journaling con entradas privadas
- Check-ins diarios con notificaciones
- Exportar conversación para compartir con profesional
- Versión React Native móvil
- Multi-idioma (portugués, inglés)

## Aviso legal

**Alivio Lite NO es un servicio médico ni sustituye atención profesional.** Si estás en crisis, por favor busca ayuda inmediata:

- **SAPTEL México**: 55 5259 8121
- **Línea de la Vida**: 800 290 0024
- **Emergencias**: 911

## Stack técnico

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Anthropic Claude API (`claude-sonnet-4-5`)
- Web Speech API del navegador
- localStorage para historial
