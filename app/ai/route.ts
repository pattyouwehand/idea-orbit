import { NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "edge"; // sneller, goedkoper, geen cold starts

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Hier geef je GPT een specifieke "persoonlijkheid"
    const systemPrompt = `
      Jij bent de IdeaOrbit AI-co-pilot.
      Je helpt creatieve mensen (vaak met ADHD) hun ideeën te structureren, aan te moedigen en overzicht te bewaren.
      Spreek positief, vriendelijk en praktisch.
      Houd antwoorden kort, activerend, en met een vleugje humor of warmte.
    `;

    const response = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    return response.toAIStreamResponse();
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
