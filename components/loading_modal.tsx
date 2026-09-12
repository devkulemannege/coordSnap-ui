"use client";

export default function LoadingModal() {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/50 p-4 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex h-[100px] w-full max-w-[300px] items-center gap-5 rounded-xl border border-emerald-400/20 bg-zinc-900/95 px-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
          <div className="absolute inset-y-0 w-2/5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 shadow-[0_0_14px_rgba(52,211,153,0.75)] animate-[loading-bar_1.25s_ease-in-out_infinite]" />
        </div>
        <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono">
          loading...
        </p>
      </div>
    </div>
  );
}
