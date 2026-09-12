"use client";

import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import ErrorModal from "@/components/error_modal";
import LoadingModal from "@/components/loading_modal";
import SuccessModal from "@/components/success_modal";
import Footer from "@/components/footer";
import DashboardHeader from "@/components/dashboard_header";

export default function NewCoordinateForm() {
  const [username, setUsername] = useState("guest");
  const [seed, setSeed] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dimension, setDiemension] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");

  const [triggerErrormodal, setTriggerErrorModal] = useState(false);
  const [triggerSuccessmodal, setTriggerSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  const router = useRouter(); // create router instance 

  let response: AxiosResponse<any, any>; // declare response variable

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "guest");
  }, []);

  async function handleSubmit(e: FormEvent) {
    // hande new coordinate data submission to the backend API
    e.preventDefault();
    setIsLoading(true);

    try{
      response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/render`,
        responseType: 'json',
        data: {
          username: username,
          seed: seed,
          name: name,
          description: description,
          dimension: dimension,
          x: x,
          y: y,
          z: z
        }
      })

      if (!response || response.status !== 200) {
        setIsLoading(false);
        setModalTitle("Failed to Add Location");
        setModalText("There was an error while trying to add your new location. Please try again later");
        setTriggerErrorModal(true);
      } else {
        setIsLoading(false);
        setModalTitle("Successfully Added Location");
        setModalText("Your new location has been successfully added to the database.");
        setTriggerSuccessModal(true);
      }
    } catch (error) {
        setIsLoading(false);
        setModalTitle("Failed to Add Location");
        setModalText("There was an error while trying to add your new location. Please try again later");
        setTriggerErrorModal(true);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <DashboardHeader username={username} />

      {/* Form Container with Padding */}
      <div className="flex-1 flex items-center justify-center w-full px-5 sm:px-8 py-10">
        <form className="w-full max-w-2xl bg-zinc-900/70 border border-white/10 rounded-xl p-6 md:p-9 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl flex flex-col gap-5 text-white"
          onSubmit={handleSubmit}>

          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400/80">New entry</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Add new location</h2>
              <p className="text-sm font-mono text-zinc-500 mt-1">Enter target world coordinates and details.</p>
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
                onChange = {(e) => setName(e.target.value)}
                className="w-full bg-zinc-950/80 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg px-3.5 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="dimension" className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
                Dimension
              </label>
              <select
                id="dimension"
                name="dimension"
                onChange = {(e) => setDiemension(e.target.value)}
                className="w-full bg-zinc-950/80 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg px-3 py-3 text-sm text-zinc-200 focus:outline-none transition font-mono cursor-pointer"
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
              type="number"
              id="seed"
              name="seed"
              required
              placeholder="e.g. -829502948204"
              onChange = {(e) => setSeed(e.target.value)}
              className="w-full bg-zinc-950/80 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg px-3.5 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono"
            />
          </div>

          {/* XYZ Coordinates Group */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-zinc-400 block">
              Coordinates (X, Y, Z) <span className="text-emerald-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3 bg-zinc-950/70 p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">X</span>
                <input
                  type="number"
                  name="x"
                  required
                  defaultValue={0}
                  onChange = {(e) => setX(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg p-2.5 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">Y</span>
                <input
                  type="number"
                  name="y"
                  required
                  defaultValue={0}
                  onChange = {(e) => setY(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg p-2.5 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold font-mono text-zinc-500 block mb-1">Z</span>
                <input
                  type="number"
                  name="z"
                  required
                  defaultValue={0}
                  onChange = {(e) => setZ(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg p-2.5 text-center text-sm font-extrabold text-emerald-400 focus:outline-none transition font-mono"
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
              onChange = {(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950/80 border border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 rounded-lg p-3.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition font-mono resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition font-mono cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-extrabold text-xs rounded-xl transition shadow-[0_10px_28px_rgba(52,211,153,0.18)] active:scale-[0.98] cursor-pointer font-mono"
            >
              Save Coordinate
            </button>
          </div>

        </form>
      </div>

      <div>
        {isLoading && <LoadingModal />}
        {triggerErrormodal && <
          ErrorModal 
          title = {modalTitle}
          text = {modalText} 
          onClose = {() => setTriggerErrorModal(false)}/>}

        {triggerSuccessmodal && <
          SuccessModal
          title = {modalTitle}
          text = {modalText}
          onClose = {() => {setTriggerSuccessModal(false); router.push('/dashboard')}}/>}
      </div>

      <Footer />
    </div>
  );
}