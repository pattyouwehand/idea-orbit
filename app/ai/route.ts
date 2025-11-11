import { NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      Jij bent de IdeaOrbit AI-co-pilot.
      Je helpt creatieve mensen (vaak met ADHD) hun ideeën te structureren, aan te moedigen en overzicht te bewaren.
      Spreek positief, vriendelijk en praktisch. Houd antwoorden kort en activerend.
    `;

    // streamText retourneert een object met textStream / fullStream en helper methods
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      // optioneel: maxOutputTokens, temperature, etc.
    });

    // Gebruik de nieuwe helper om het stream-result terug te geven als HTTP Response
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
