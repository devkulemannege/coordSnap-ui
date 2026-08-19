"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import CardsRenderer from "@/components/cards_renderer";

export default function Dashboard() {
  interface coordinates {
      id: string,
      name: string,
      description? :string,
      dimension: string,
      x: number,
      y: number,
      z: number,
      image?: number
  }

  const [coordinateArray, setCoordinateArray] = useState<coordinates[]>([]);

  // test data 
  // useEffect runs code after rendering is completed on client side
  useEffect(() => {
      setCoordinateArray([
      {
          id: "1a",
          name: "Base",
          description: "Spawn Base",
          dimension: "Overworld",
          x: 500,
          y: 40,
          z: 782
      },
      {
          id: "2a",
          name: "Village",
          description: "Nearby village",
          dimension: "Overworld",
          x: 800,
          y: 70,
          z: 1200
      }
  ]);
  }, []);

  // Example user state (this can later be fetched from your auth context or backend)
  const [username, setUsername] = useState("Steve");

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      
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

      {/* 2. Main Dashboard Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col items-center justify-center">
        <CardsRenderer coordinates={coordinateArray}/>
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}