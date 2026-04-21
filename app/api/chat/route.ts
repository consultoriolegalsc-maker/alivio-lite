import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { detectCrisis } from "@/lib/crisisDetection";

export const runtime = "nodejs";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.includes("pega-tu-key-aqui")) {
      return NextResponse.json(
        {
          error:
            "Falta la ANTHROPIC_API_KEY. Agrega tu clave en el archivo .env.local y reinicia el servidor.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { messages?: IncomingMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No se recibieron mensajes." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    const crisisDetected = lastUserMessage
      ? detectCrisis(lastUserMessage.content)
      : false;

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({
      reply: reply || "Estoy aquí contigo. ¿Puedes contarme un poco más?",
      crisisDetected,
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado procesando tu mensaje.";
    return NextResponse.json(
      { error: `No pude responder en este momento: ${message}` },
      { status: 500 }
    );
  }
}
