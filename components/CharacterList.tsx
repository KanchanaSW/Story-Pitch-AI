import type { StorySchema } from "@/types/story";

interface CharacterListProps {
  characters: StorySchema["characters"];
}

export default function CharacterList({ characters }: CharacterListProps) {
  if (!characters.length) return null;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-2 fade-in">
      <h3
        className="text-sm uppercase tracking-widest text-[var(--gold)] mb-4"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Cast
      </h3>
      <div className="grid gap-2">
        {characters.map((character) => (
          <div
            key={character.name}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-sm"
          >
            <span className="text-[var(--gold)] font-medium min-w-[140px]">
              {character.name}
            </span>
            <span className="text-[var(--cream)]/60 text-sm">
              {character.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
