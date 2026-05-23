"use client";

import { forwardRef } from "react";
import type { StorySchema } from "@/types/story";

interface SynopsisCardProps {
  story: StorySchema;
  displayedText: string;
  typewriterDone: boolean;
}

const SynopsisCard = forwardRef<HTMLElement, SynopsisCardProps>(
  function SynopsisCard({ story, displayedText, typewriterDone }, ref) {
    return (
      <article
        ref={ref}
        id="synopsis-card"
        className="parchment-card relative p-8 max-w-3xl mx-auto"
      >
        <span className="genre-badge absolute top-6 right-6 px-3 py-1 text-xs rounded-full uppercase tracking-wider">
          {story.genre}
        </span>

        <h2
          className="marquee-title text-2xl md:text-3xl mb-2 pr-24"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {story.title}
        </h2>

        <p className="text-[var(--gold)] italic mb-6 text-lg">{story.tagline}</p>

        <div
          className="text-[var(--cream)]/90 leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "var(--font-special-elite), monospace" }}
        >
          {displayedText}
          {!typewriterDone && <span className="typewriter-cursor" />}
        </div>

        {typewriterDone && (
          <div className="mt-8 fade-in">
            <p className="twist-divider text-center mb-4">— THE TWIST —</p>
            <p
              className="text-[var(--cream)]/85 leading-relaxed"
              style={{ fontFamily: "var(--font-special-elite), monospace" }}
            >
              {story.twist}
            </p>
          </div>
        )}
      </article>
    );
  }
);

export default SynopsisCard;
