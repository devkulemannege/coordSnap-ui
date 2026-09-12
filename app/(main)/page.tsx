"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

import ErrorModal from "@/components/error_modal";
import LoadingModal from "@/components/loading_modal";
import Footer from "@/components/footer";
import AuthHeader from "@/components/login_header";

export default function Home() {
  const router = useRouter(); // create router instance 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggermodal, setTriggerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  let response: AxiosResponse<any, any>; // declare response variable

  async function validateCreds(e: FormEvent) {
    e.preventDefault();

    localStorage.clear();
    setIsLoading(true);

    try {
      response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signin`,
        responseType: 'json',
        data: {
          email: email,
          password: password
        }
      })

      if (response.status == 200) {
        setIsLoading(false);
        localStorage.setItem("username", response.data.username) 
        router.push("/dashboard"); // redirect to dashboard 
      } else {
        setIsLoading(false);
        setModalTitle("Invalid Credentials");
        setModalText("The email or password you entered is incorrect. Please try again.");
        setTriggerModal(true);
      }
    } catch (error) {
      setIsLoading(false);
      setModalTitle("Unable to Sign In");
      setModalText("An error occured trying to sign in. Please try again.");
      setTriggerModal(true);
    }
  }

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col font-sans">
      
      <AuthHeader />

      {/* 2. Centered Login Card */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-10 sm:px-8 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-md bg-zinc-900/65 border border-white/10 rounded-xl p-7 sm:p-9 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl relative overflow-hidden">

          {/* Header */}
          <div className="text-center mb-8 pt-2">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm font-medium text-zinc-500 mt-2 font-mono">
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
                className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 font-medium transition"
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
                className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 font-medium transition"
                onChange = {(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-sm rounded-lg transition shadow-[0_10px_28px_rgba(52,211,153,0.18)] active:scale-[0.98] mt-3 cursor-pointer"
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
              New here? Sign up
            </Link>
          </div>

        </div>

      </main>

      {/* modal */}
      <div>
        {isLoading && <LoadingModal />}
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