"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PitchInput from "@/components/PitchInput";
import LoadingState from "@/components/LoadingState";
import SynopsisCard from "@/components/SynopsisCard";
import CharacterList from "@/components/CharacterList";
import NarrateButton from "@/components/NarrateButton";
import { getRandomPitch } from "@/lib/randomPitches";
import type { StorySchema } from "@/types/story";

const TYPEWRITER_MS = 18;

function getWarmVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined") return null;
  const voices = window.speechSynthesis.getVoices();
  const en = voices.filter((v) => v.lang.startsWith("en"));

  const warmPatterns = [
    /samantha|karen|victoria|moira|tessa|fiona|serena|ava|aria|zira|susan|allison|kate|jenny|nicole|sarah|emma|hazel|linda|female/i,
    /google (?:us )?english female|microsoft (?:aria|zira|jenny)|enhanced/i,
  ];

  for (const pattern of warmPatterns) {
    const match = en.find((v) => pattern.test(v.name));
    if (match) return match;
  }

  const softMale = en.find((v) =>
    /daniel|james|oliver|thomas|uk english male/i.test(v.name)
  );
  if (softMale) return softMale;

  return en[0] ?? voices[0] ?? null;
}

export default function Home() {
  const [pitch, setPitch] = useState("");
  const [story, setStory] = useState<StorySchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [narrating, setNarrating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const synopsisRef = useRef<HTMLElement>(null);
  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const clearTypewriter = useCallback(() => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
  }, []);

  const stopNarration = useCallback(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
    setNarrating(false);
  }, []);

  const startTypewriter = useCallback(
    (synopsis: string) => {
      clearTypewriter();
      setDisplayedText("");
      setTypewriterDone(false);

      let index = 0;
      typewriterTimerRef.current = setInterval(() => {
        index += 1;
        setDisplayedText(synopsis.slice(0, index));
        if (index >= synopsis.length) {
          clearTypewriter();
          setTypewriterDone(true);
        }
      }, TYPEWRITER_MS);
    },
    [clearTypewriter]
  );

  const handleGenerate = useCallback(async () => {
    const trimmed = pitch.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setStory(null);
    setDisplayedText("");
    setTypewriterDone(false);
    clearTypewriter();
    stopNarration();

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to generate story");
      }

      const generated = data as StorySchema;
      setStory(generated);
      startTypewriter(generated.synopsis);

      requestAnimationFrame(() => {
        setTimeout(() => {
          synopsisRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [pitch, loading, clearTypewriter, stopNarration, startTypewriter]);

  const startNarration = useCallback(() => {
    if (!story || !typewriterDone) return;

    stopNarration();

    const text = `${story.tagline}. ${story.synopsis} And the twist... ${story.twist}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.82;
    utterance.pitch = 0.92;
    utterance.volume = 0.95;

    const voice = getWarmVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => setNarrating(false);
    utterance.onerror = () => setNarrating(false);

    setNarrating(true);
    window.speechSynthesis.speak(utterance);
  }, [story, typewriterDone, stopNarration]);

  const handleNarrateToggle = useCallback(() => {
    if (narrating) {
      stopNarration();
    } else {
      startNarration();
    }
  }, [narrating, stopNarration, startNarration]);

  useEffect(() => {
    const loadVoices = () => getWarmVoice();
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
      clearTypewriter();
      stopNarration();
    };
  }, [clearTypewriter, stopNarration]);

  return (
    <main className="relative z-10 min-h-screen px-4 py-12 md:py-20">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="marquee-title text-3xl md:text-5xl mb-4">
          Story Pitch AI
        </h1>
        <p className="text-[var(--cream)]/50 text-sm md:text-base tracking-wide max-w-md mx-auto">
          One wild sentence in. A cinematic legend out.
        </p>
      </header>

      <PitchInput
        pitch={pitch}
        onPitchChange={setPitch}
        onSubmit={handleGenerate}
        onRandomPitch={() => setPitch(getRandomPitch())}
        loading={loading}
      />

      {error && (
        <p className="mt-6 text-center text-[#c0392b] text-sm max-w-lg mx-auto">
          {error}
        </p>
      )}

      {loading && <LoadingState />}

      {story && !loading && (
        <section className="mt-12 space-y-2">
          <SynopsisCard
            ref={synopsisRef}
            story={story}
            displayedText={displayedText}
            typewriterDone={typewriterDone}
          />
          {typewriterDone && (
            <>
              <CharacterList characters={story.characters} />
              <NarrateButton
                narrating={narrating}
                disabled={!typewriterDone}
                onToggle={handleNarrateToggle}
              />
            </>
          )}
        </section>
      )}
    </main>
  );
}
