"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface coordinates {
    id: string
    seed: string,
    name: string,
    description? :string,
    dimension: string,
    x: number,
    y: number,
    z: number,
    image?: number
}

interface CardsRendererProps {
  coordinates: coordinates[];
}

export default function CardsRenderer({ coordinates }: CardsRendererProps) {
  const [selectedCoord, setSelectedCoord] = useState<coordinates | null>(null);
  const router = useRouter(); // create router instance 

  function handleAddNew() {  
    router.push("/new") // go to coordinates addition page 
  }

  return (
    <>
      {coordinates && coordinates.length > 0 ? (
        /* Grid container for cards */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Add New Coordinate Card (Placed first in grid) */}
          <button
            type="button"
            onClick={handleAddNew}
            className="group min-h-55 bg-zinc-800/30 hover:bg-zinc-800/60 border-2 border-dashed border-zinc-700/80 hover:border-emerald-500/60 rounded-3xl p-6 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 group-hover:bg-emerald-500/10 border border-zinc-700/80 group-hover:border-emerald-500/30 text-zinc-400 group-hover:text-emerald-400 flex items-center justify-center text-xl transition mb-3">
              +
            </div>
            <span className="font-bold text-sm text-zinc-300 group-hover:text-white transition">
              Add New Location
            </span>
            <span className="text-[11px] font-mono text-zinc-500 mt-1">
              Save new XYZ coordinates
            </span>
          </button>

          {/* 2. Existing Coordinate Cards */}
          {coordinates.map((coord) => (
            <div
              onClick={() => setSelectedCoord(coord)}
              className="bg-zinc-800/60 border border-zinc-700/80 rounded-3xl p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-extrabold text-base text-white tracking-tight">
                    {coord.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl border ${
                      coord.dimension === "Nether"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : coord.dimension === "The End"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {coord.dimension}
                  </span>
                </div>

                {coord.description && (
                  <p className="text-xs text-zinc-400 font-mono mb-6 leading-relaxed line-clamp-2">
                    {coord.description}
                  </p>
                )}
              </div>

              {/* XYZ Values Display */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-900/80 border border-zinc-700/60 rounded-2xl p-3 text-center font-mono">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 block uppercase">
                    X
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    {coord.x}
                  </span>
                </div>
                <div className="border-x border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-500 block uppercase">
                    Y
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    {coord.y}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 block uppercase">
                    Z
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    {coord.z}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-125 bg-zinc-800/60 border border-zinc-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
              📍
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Coordinate Vault
            </h1>

            <p className="text-xs font-medium text-zinc-400 font-mono leading-relaxed">
              You don&apos;t have any saved dimension locations yet. Start adding coordinates for bases, portals, and biomes.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddNew}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-2xl transition shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                + Add New Coordinates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Card Modal Popup */}
      {selectedCoord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Backdrop Click Handler */}
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedCoord(null)} 
          />

          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden z-10 flex flex-col gap-6">
            
            {/* Modal Header & Close Button */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                      selectedCoord.dimension === "Nether"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : selectedCoord.dimension === "The End"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {selectedCoord.dimension}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {selectedCoord.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCoord(null)}
                className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition font-mono font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="w-full h-48 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center relative">
              {selectedCoord.image ? (
                <img
                  src={`/api/images/${selectedCoord.image}`} // Replace with your actual image route or static path logic
                  alt={selectedCoord.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-xs">
                  <span className="text-2xl">🖼️</span>
                  <span>No image available</span>
                </div>
              )}
            </div>

            {/* Detailed XYZ Coordinates */}
            <div className="grid grid-cols-3 gap-3 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-center font-mono">
              <div>
                <span className="text-[11px] font-bold text-zinc-500 block uppercase">
                  X Coordinate
                </span>
                <span className="text-lg font-black text-emerald-400">
                  {selectedCoord.x}
                </span>
              </div>
              <div className="border-x border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-500 block uppercase">
                  Y Coordinate
                </span>
                <span className="text-lg font-black text-emerald-400">
                  {selectedCoord.y}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-zinc-500 block uppercase">
                  Z Coordinate
                </span>
                <span className="text-lg font-black text-emerald-400">
                  {selectedCoord.z}
                </span>
              </div>
            </div>

            {/* Full Description & Metadata */}
            {selectedCoord.description && (
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                  Description
                </h4>
                <p className="text-sm text-zinc-300 font-mono leading-relaxed bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/60">
                  {selectedCoord.description}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCoord(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl transition font-mono cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}