"use client";

interface PitchInputProps {
  pitch: string;
  onPitchChange: (value: string) => void;
  onSubmit: () => void;
  onRandomPitch: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function PitchInput({
  pitch,
  onPitchChange,
  onSubmit,
  onRandomPitch,
  loading,
  disabled = false,
}: PitchInputProps) {
  const wordCount = pitch.trim()
    ? pitch.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = pitch.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !loading && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <textarea
        value={pitch}
        onChange={(e) => onPitchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="A retired lighthouse keeper discovers the beam reveals alternate timelines..."
        disabled={loading || disabled}
        rows={4}
        className="w-full resize-none rounded-sm bg-[var(--panel)] border border-[var(--border)] px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors disabled:opacity-50"
      />
      <div className="flex justify-between text-xs text-[var(--cream)]/50">
        <span>
          {wordCount} {wordCount === 1 ? "word" : "words"} · {charCount}{" "}
          {charCount === 1 ? "character" : "characters"}
        </span>
        <span className="hidden sm:inline">⌘/Ctrl + Enter to generate</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || disabled || !pitch.trim()}
          className="flex-1 px-6 py-3 bg-[var(--gold)] text-black font-semibold uppercase tracking-wider text-sm rounded-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
        <button
          type="button"
          onClick={onRandomPitch}
          disabled={loading || disabled}
          className="px-6 py-3 border border-[var(--border)] text-[var(--cream)]/80 text-sm rounded-sm hover:border-[var(--gold)]/50 hover:text-[var(--cream)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Try a random pitch
        </button>
      </div>
    </div>
  );
}
