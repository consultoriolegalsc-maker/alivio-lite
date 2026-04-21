const CRISIS_PHRASES = [
  "suicid",
  "quitarme la vida",
  "matarme",
  "no quiero vivir",
  "autolesion",
  "hacerme daño",
  "cortarme",
  "acabar con todo",
  "mejor muerto",
  "no vale la pena vivir",
  "quiero morir",
  "desaparecer para siempre",
];

export function detectCrisis(text: string): boolean {
  if (!text) return false;
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return CRISIS_PHRASES.some((phrase) => normalized.includes(phrase));
}
