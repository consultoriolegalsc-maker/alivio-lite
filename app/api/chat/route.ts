import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import {
  ALIVIO_SYSTEM_PROMPT_BASE,
  buildAlivioDynamicContext,
  type AlivioDynamicContext,
} from '@/lib/alivio-system-prompt';
import { ALIVIO_KNOWLEDGE_BASE } from '@/lib/alivio-knowledge-base';
import { detectCrisis, CRISIS_FALLBACK_MESSAGE } from '@/lib/crisis-detector';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5-20251001';

interface ChatRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  session: AlivioDynamicContext;
  sessionId: string;
}

export async function POST(req: NextRequest) {
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return new Response('bad_request', { status: 400 });
  }

  const { messages, session, sessionId } = body;
  if (!Array.isArray(messages) || !sessionId) {
    return new Response('missing_fields', { status: 400 });
  }

  // Rate limiting — techo duro de costo
  const limit = checkRateLimit(sessionId);
  if (!limit.allowed) {
    return new Response(
      JSON.stringify({
        type: 'rate_limited',
        content:
          'Llegaste al límite de mensajes por hoy. Regresa mañana, o si necesitas ayuda inmediata, SAPTEL 55 5259 8121 está disponible 24/7.',
        resetAt: limit.resetAt,
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Detector de crisis independiente — capa de seguridad
  const lastUserMessage = messages.filter((m) => m.role === 'user').pop()?.content ?? '';
  const crisis = detectCrisis(lastUserMessage);

  if (crisis.level === 'imminent') {
    console.log('[ALIVIO_CRISIS_IMMINENT]', {
      sessionId,
      categories: crisis.categories,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        type: 'crisis_fallback',
        content: CRISIS_FALLBACK_MESSAGE,
        crisis,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Flujo normal — Claude con prompt caching
  const dynamicContext = buildAlivioDynamicContext(session);

  try {
    const stream = await anthropic.messages.create({
      model: MODEL,
      max_tokens: session.modo === 'voz' ? 300 : 600,
      system: [
        {
          type: 'text',
          text: ALIVIO_SYSTEM_PROMPT_BASE,
          cache_control: { type: 'ephemeral' },
        },
        {
          type: 'text',
          text: ALIVIO_KNOWLEDGE_BASE,
          cache_control: { type: 'ephemeral' },
        },
        { type: 'text', text: dynamicContext },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('[ALIVIO_STREAM_ERROR]', { sessionId, error: String(error) });
          controller.enqueue(
            encoder.encode('\n\nPerdona, tuve un problema técnico. ¿Me cuentas de nuevo?')
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'X-RateLimit-Remaining': String(limit.remaining),
      },
    });
  } catch (error) {
    console.error('[ALIVIO_API_ERROR]', { sessionId, error: String(error) });
    return new Response(
      JSON.stringify({
        type: 'error',
        content: 'Perdona, algo falló de mi lado. Intenta de nuevo en un momento.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
