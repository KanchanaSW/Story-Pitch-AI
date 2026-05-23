interface NarrateButtonProps {
  narrating: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export default function NarrateButton({
  narrating,
  disabled,
  onToggle,
}: NarrateButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`px-8 py-3 border border-[var(--gold)] text-[var(--gold)] uppercase tracking-wider text-sm rounded-sm transition-all hover:bg-[var(--gold)]/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent ${
          narrating ? "narrate-pulse" : ""
        }`}
      >
        {narrating ? "Stop Narration" : "Narrate Story"}
      </button>
    </div>
  );
}
