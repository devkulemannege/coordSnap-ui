"use client";

export default function Footer() {
    return (
      <footer className="w-full border-t border-white/5 bg-zinc-950/50 py-7 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-3">
          
          {/* Copyright */}
          <p className="text-xs font-semibold text-zinc-400 font-mono">
            <span className="text-zinc-400">Coord</span>Snap <span className="text-zinc-600">/</span> 2026
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-bold text-zinc-400 font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
            >
              LinkedIn 1
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
            >
              LinkedIn 2
            </a>
          </div>

        </div>
      </footer>
    )
}