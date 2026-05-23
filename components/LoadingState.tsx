export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative w-24 h-20">
        <div className="clapper-top absolute top-0 left-2 w-20 h-8 bg-[var(--gold)] rounded-t-sm border-2 border-black">
          <div className="flex gap-1 p-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-4 bg-black/30 skew-x-12" />
            ))}
          </div>
        </div>
        <div className="clapper-bottom absolute bottom-0 left-0 w-24 h-10 bg-[#1a1712] border-2 border-[var(--gold)] rounded-sm" />
      </div>
      <p className="text-[var(--cream)]/70 text-sm tracking-widest uppercase animate-pulse">
        Developing your story...
      </p>
    </div>
  );
}
