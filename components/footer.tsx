"use client";

export default function Footer() {
    return (
      <footer className="w-full border-t border-zinc-800 bg-zinc-900/90 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-3">
          
          {/* Copyright */}
          <p className="text-xs font-semibold text-zinc-400 font-mono">
            CoordSnap 2026, all rights reserved
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