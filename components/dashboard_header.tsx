"use client";

import Link from "next/link";

interface DashboardHeaderProps {
  username: string;
}

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <header className="w-full h-[72px] border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl px-5 sm:px-8 flex items-center justify-between sticky top-0 z-50">
      <Link href="/dashboard" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border-emerald-400/25 text-emerald-300 flex items-center justify-center font-mono font-black text-lg shadow-[0_0_24px_rgba(52,211,153,0.12)]">
          <img src="./icon.png" alt="CoordSnap Logo" className="w-10 h-10" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-white">
          Coord<span className="text-emerald-400">Snap</span>
        </span>
      </Link>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 shadow-sm">
        <div className="w-6 h-6 rounded-lg bg-emerald-400/10 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs font-bold text-zinc-200 font-mono">{username}</span>
      </div>
    </header>
  );
}
