"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import ErrorModal from "@/components/error_modal";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter(); // create router instance 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [triggermodal, setTriggerModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  function validateCreds(e: FormEvent) {
    e.preventDefault();

    // api validation logic and variable assignment here
    setInvalid(false); // example value
    sessionStorage.setItem("username", "steve") // example value

    if (!invalid) {
      router.push("/dashboard"); // redirect to dashboard 
    } else {
      setModalTitle("Invalid Credentials");
      setModalText("The email or password you entered is incorrect. Please try again.");
      setTriggerModal(true);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* 1. Top Navigation Bar */}
      <header className="w-full h-16 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md px-6 flex items-center justify-center sticky top-0 z-50">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-black text-lg shadow-sm">
            📸
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Coord<span className="text-emerald-400">Snap</span>
          </span>
        </div>

      </header>

      {/* 2. Centered Login Card */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-md bg-zinc-800/60 border border-zinc-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">

          {/* Header */}
          <div className="text-center mb-8 pt-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs font-medium text-zinc-400 mt-1 font-mono">
              Access your Minecraft world coordinates
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={validateCreds}>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="steve@minecraft.net"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium transition"
                onChange = {(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="password" 
                className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium transition"
                onChange = {(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm rounded-2xl transition shadow-lg shadow-emerald-500/20 active:scale-[0.98] mt-2 cursor-pointer"
            >
              Log In
            </button>

          </form>

          {/* Hyperlink */}
          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition font-mono"
            >
              New here? Sign in
            </Link>
          </div>

        </div>

      </main>

      {/* modal */}
      <div>
        {triggermodal && <
          ErrorModal 
          title = {modalTitle}
          text = {modalText} 
          onClose = {() => setTriggerModal(false)}
          />}
      </div>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}