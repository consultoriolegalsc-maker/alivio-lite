/**
 * Rate limiter simple en memoria — OK para MVP, migrar a Upstash/Vercel KV
 * cuando tengamos múltiples instancias en producción.
 *
 * Techo duro de costo: cada sessionId puede enviar N mensajes por día.
 * Default 30 msgs/día (cubre desahogo real, bloquea abuso).
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const DAY_MS = 24 * 60 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  sessionId: string,
  limitPerDay = Number(process.env.RATE_LIMIT_PER_DAY ?? 30)
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(sessionId);

  if (!existing || now >= existing.resetAt) {
    const bucket = { count: 1, resetAt: now + DAY_MS };
    buckets.set(sessionId, bucket);
    return { allowed: true, remaining: limitPerDay - 1, resetAt: bucket.resetAt };
  }

  if (existing.count >= limitPerDay) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limitPerDay - existing.count,
    resetAt: existing.resetAt,
  };
}

// Limpieza periódica para que el Map no crezca indefinidamente
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now >= bucket.resetAt) buckets.delete(key);
    }
  }, DAY_MS);
}
