"use client";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import Footer from "@/components/footer";
import CardsRenderer from "@/components/cards_renderer";
import DashboardHeader from "@/components/dashboard_header";

export default function Dashboard() {
  interface coordinates {
      seed: string,
      name: string,
      description? :string,
      dimension: string,
      x: number,
      y: number,
      z: number,
      img_base64_str?: string
  }

  const [coordinateArray, setCoordinateArray] = useState<coordinates[]>([]);
  const [username, setUsername] = useState("");

  // useEffect runs code after rendering is completed on client side
  useEffect(() => {
    async function getCoords() {
      try {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coords`, {
          params: {
            username: localStorage.getItem("username")
          }
        });
        setCoordinateArray(response.data.coordinates)
      } catch (error) {
        console.log('An error occured trying to retireve coordinate data: ', error)
      }
    }
    getCoords();
    
    setUsername(localStorage.getItem("username") || "")
  }, []);

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col font-sans">
      
      <DashboardHeader username={username} />

      {/* 2. Main Dashboard Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-10 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400/80">Your collection</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white">Coordinate vault</h1>
            <p className="mt-2 text-sm text-zinc-500">Keep every important Minecraft location within reach.</p>
          </div>
          <span className="hidden sm:block rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-[11px] font-mono text-zinc-500">SYNCED</span>
        </div>
        <CardsRenderer coordinates={coordinateArray}/>
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}