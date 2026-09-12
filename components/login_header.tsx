"use client";

import Link from "next/link";

interface AuthHeaderProps {
  linkHome?: boolean;
}

export default function AuthHeader({ linkHome = false }: AuthHeaderProps) {
  const brand = (
    <>
      <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border-emerald-400/25 text-emerald-300 flex items-center justify-center font-mono font-black text-lg shadow-[0_0_24px_rgba(52,211,153,0.12)]">
        <img src="./icon.png" alt="CoordSnap Logo" className="w-10 h-10" />
      </div>
      <span className="font-extrabold text-2xl tracking-tight text-white">
        Coord<span className="text-emerald-400">Snap</span>
      </span>
    </>
  );

  return (
    <header className="w-full h-[72px] border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl px-6 flex items-center justify-center sticky top-0 z-50">
      {linkHome ? (
        <Link href="/" className="flex items-center gap-3">{brand}</Link>
      ) : (
        <div className="flex items-center gap-3">{brand}</div>
      )}
    </header>
  );
}
