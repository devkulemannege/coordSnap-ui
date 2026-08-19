"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Footer from "@/components/footer";

interface newCoords {
  username: string;
  seed: string;
  name: string;
  description?: string;
  x: number;
  y: number;
  z: number;
}

export default function NewCoordinateForm(variables: newCoords) {
  const [username, setUsername] = useState("guest");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "guest");
  }, []);

  function handleSubmit() {
    // Placeholder for form submission logic
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-zinc-950">
      {/* 1. Top Navigation Bar */}
      <header className="w-full h-16 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        
        {/* Left: Website Logo & Name */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-black text-lg shadow-sm">
            📸
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Coord<span className="text-emerald-400">Snap</span>
          </span>
        </Link>

        {/* Right: Logged-in Username Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-zinc-800/80 border border-zinc-700/80 shadow-sm">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-zinc-200 font-mono">
              {username}
            </span>
          </div>
        </div>

      </header>

      {/* Form Container with Padding */}
      <div className="flex-1 flex items-center justify-center w-full p-4 my-auto py-8">
        <form className="w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 text-white">

          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Add New Location</h2>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">Enter target world coordinates and details</p>
            </div>
            <span className="text-2xl">📍</span>
          </div>

          {/* Location Name & Dimension */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="name" className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
                Location Name <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Stronghold Portal"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="dimension" className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
                Dimension
              </label>
              <select
                id="dimension"
                name="dimension"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none transition font-mono cursor-pointer"
              >
                <option value="Overworld">Overworld</option>
                <option value="Nether">Nether</option>
                <option value="The End">The End</option>
              </select>
            </div>
          </div>

          {/* World Seed */}
          <div className="space-y-1.5">
            <label htmlFor="seed" className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
              World Seed <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              id="seed"
              name="seed"
              required
              placeholder="e.g. -829502948204"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono"
            />
          </div>

          {/* XYZ Coordinates Group */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
              Coordinates (X, Y, Z) <span className="text-emerald-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80">
              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">X</span>
                <input
                  type="number"
                  name="x"
                  required
                  defaultValue={0}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg p-2 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">Y</span>
                <input
                  type="number"
                  name="y"
                  required
                  defaultValue={64}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg p-2 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">Z</span>
                <input
                  type="number"
                  name="z"
                  required
                  defaultValue={0}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg p-2 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
                />
              </div>
            </div>
          </div>

          {/* Optional Description */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
              Description <span className="text-zinc-600">(Optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Notes about biome features, chest contents, or surrounding landmarks..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800/80">
            <button
              type="button"
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition font-mono cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer font-mono"
            >
              Save Coordinate
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}