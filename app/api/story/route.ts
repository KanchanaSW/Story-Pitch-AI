import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import type { StorySchema } from "@/types/story";

const MODEL = "llama-3.3-70b-versatile";
const MAX_PITCH_LENGTH = 500;

const SYSTEM_PROMPT = `You are a Hollywood story analyst. Given a one-sentence pitch,
return ONLY raw valid JSON with no markdown, no backticks, no explanation.
Schema:
{
  "title": string,
  "genre": string,
  "tagline": string,
  "synopsis": string (3-4 paragraphs, full story arc),
  "characters": [{ "name": string, "role": string }],
  "twist": string
}`;

function stripMarkdownFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  return cleaned.trim();
}

function isValidStory(data: unknown): data is StorySchema {
  if (!data || typeof data !== "object") return false;
  const story = data as Record<string, unknown>;
  return (
    typeof story.title === "string" &&
    typeof story.genre === "string" &&
    typeof story.tagline === "string" &&
    typeof story.synopsis === "string" &&
    typeof story.twist === "string" &&
    Array.isArray(story.characters) &&
    story.characters.every(
      (c) =>
        c &&
        typeof c === "object" &&
        typeof (c as { name?: unknown }).name === "string" &&
        typeof (c as { role?: unknown }).role === "string"
    )
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "your_groq_api_key_here") {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const pitch = typeof body.pitch === "string" ? body.pitch.trim() : "";

    if (!pitch) {
      return NextResponse.json(
        { error: "Pitch is required" },
        { status: 400 }
      );
    }

    if (pitch.length > MAX_PITCH_LENGTH) {
      return NextResponse.json(
        { error: `Pitch must be ${MAX_PITCH_LENGTH} characters or fewer` },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.8,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: pitch },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 502 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(stripMarkdownFences(raw));
    } catch {
      return NextResponse.json(
        { error: "Failed to parse story JSON from AI" },
        { status: 502 }
      );
    }

    if (!isValidStory(parsed)) {
      return NextResponse.json(
        { error: "AI response missing required story fields" },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Story generation failed";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
