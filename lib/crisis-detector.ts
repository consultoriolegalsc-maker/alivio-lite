/**
 * Crisis Detector — capa de seguridad INDEPENDIENTE del LLM.
 *
 * Se ejecuta ANTES y EN PARALELO con el LLM. Si el LLM falla o responde
 * con latencia, esta capa garantiza escalamiento inmediato.
 *
 * Estrategia: regex + keyword matching en español neutro LATAM.
 * No reemplaza al LLM — es red de seguridad.
 */

type CrisisLevel = 'none' | 'concern' | 'imminent';

interface CrisisSignal {
  level: CrisisLevel;
  categories: string[];
  matchedTerms: string[];
}

// Términos de ideación suicida — alta precisión, baja ambigüedad
const SUICIDE_IDEATION = [
  /\bya no (quiero|puedo) (vivir|seguir|existir|despertar)\b/i,
  /\b(quiero|pienso en) (morir|desaparecer|acabar con todo|acabar conmigo)\b/i,
  /\bno le veo (salida|sentido|caso) (a la vida|a esto|a seguir)\b/i,
  /\bmejor (me muero|si no estuviera|no estar aqu[ií])\b/i,
  /\b(pens[ée]|pienso) en (suicidarme|matarme|quitarme la vida)\b/i,
  /\b(plan|planeo|pensé c[oó]mo) (suicidarme|hacerme da[ñn]o)\b/i,
  /\bno (vale|tiene sentido) (la pena |seguir )?vivir/i,
  /\b(estoy|me siento) (cansad[oa]) de (vivir|existir|luchar)/i,
];

// Métodos específicos — máxima urgencia
const SUICIDE_METHODS = [
  /\b(pastillas|medicamentos|sobredosis|me tom[ée] )/i,
  /\bcolg(arme|ando)\b|\bahorcarme\b/i,
  /\b(saltar|tirarme) (del|desde) (puente|edificio|piso|ventana|balcon)/i,
  /\b(pistola|arma|bala|disparo).{0,20}(me|conmigo|yo)/i,
  /\b(venenos?|gas|cuchillo|navaja).{0,20}(me|para acabar)/i,
];

// Autolesión
const SELF_HARM = [
  /\bme (corto|cort[ée]|estoy cortando|he cortado)\b/i,
  /\bme hago (da[ñn]o|cortes|heridas)\b/i,
  /\bme (golpe[oé]|lastim[oé]|quem[ée]) (a prop[oó]sito|yo)/i,
  /\b(cortarme|lastimarme|hacerme da[ñn]o)\b/i,
];

// Violencia hacia otros
const VIOLENCE_OTHERS = [
  /\b(voy|quiero|pienso) (a )?(matar|lastimar|hacerle da[ñn]o)(lo|la|los|las)?\b/i,
  /\bquiero (que se muera|verl[oa] muert[oa])/i,
];

// Abuso
const ABUSE = [
  /\b(me viola|me violaron|me est[aá]n violando|me toc[oó] sin)/i,
  /\b(abus[oó] sexualmente|abuso sexual de m[ií])/i,
  /\b(viol[oó]|violaci[oó]n) (de |hacia |en contra de )?(m[ií]|un ni[ñn]o|una ni[ñn]a)/i,
];

// Señales de preocupación (no inmediata pero requiere atención)
const CONCERN_SIGNALS = [
  /\bestoy (desesperad[oa]|sin esperanza|vac[ií][oa])\b/i,
  /\bno aguanto m[aá]s\b/i,
  /\bnadie me (quiere|extra[ñn]ar[ií]a|importa)\b/i,
  /\bmi familia estar[ií]a mejor sin m[ií]/i,
  /\btodo ser[ií]a m[aá]s f[aá]cil si (yo )?no/i,
  /\bno valgo (nada|la pena)\b/i,
];

export function detectCrisis(message: string): CrisisSignal {
  const categories: string[] = [];
  const matchedTerms: string[] = [];

  const check = (patterns: RegExp[], category: string) => {
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        categories.push(category);
        matchedTerms.push(match[0]);
      }
    }
  };

  check(SUICIDE_IDEATION, 'suicide_ideation');
  check(SUICIDE_METHODS, 'suicide_method');
  check(SELF_HARM, 'self_harm');
  check(VIOLENCE_OTHERS, 'violence_others');
  check(ABUSE, 'abuse');
  check(CONCERN_SIGNALS, 'concern');

  // Niveles de severidad
  if (
    categories.includes('suicide_method') ||
    categories.includes('violence_others') ||
    categories.includes('abuse')
  ) {
    return { level: 'imminent', categories, matchedTerms };
  }

  if (
    categories.includes('suicide_ideation') ||
    categories.includes('self_harm')
  ) {
    return { level: 'imminent', categories, matchedTerms };
  }

  if (categories.includes('concern')) {
    return { level: 'concern', categories, matchedTerms };
  }

  return { level: 'none', categories: [], matchedTerms: [] };
}

/**
 * Mensaje de crisis pre-escrito, disponible INCLUSO si la API de Claude
 * falla o hay timeout. Frontend lo muestra inmediatamente.
 */
export const CRISIS_FALLBACK_MESSAGE = `Lo que me compartes es muy importante y me preocupa de verdad. Quiero asegurarme de que tengas apoyo de alguien preparado para acompañarte ahora mismo.

Si estás en peligro inmediato, por favor llama:
• SAPTEL (México): 55 5259 8121 — 24/7, gratuito, confidencial
• Línea de la Vida (México): 800 290 0024
• Emergencias: 911

También puedo conectarte con un profesional del directorio de Alivio que puede atenderte hoy mismo. ¿Prefieres llamar ahora o que te muestre opciones?

[CRISIS_DETECTADA]`;
