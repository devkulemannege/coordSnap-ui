"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

import Footer from "@/components/footer";
import ErrorModal from "@/components/error_modal";
import LoadingModal from "@/components/loading_modal";
import AuthHeader from "@/components/login_header";

export default function SignUp() {
  const router = useRouter(); // create router instance 

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [triggermodal, setTriggerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [modalText, setModalText] = useState("");

  let response: AxiosResponse<any, any>; // declare response variable

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    localStorage.clear();

    // Basic password validation check
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, // to be specified later
        responseType: 'json',
        data: {
          username: username,
          email: email,
          password: password
        }
      })

      if (!response || response.status !== 200) {
        setIsLoading(false);
        setModalTitle("Sign Up Failed");
        setModalText("There was an error while trying to create your account. Please try again later.");
        setTriggerModal(true);
      }

      setIsLoading(false);
      router.push("/")
    } catch (error) {
        setIsLoading(false);
        setModalTitle("Sign Up Failed");
        setModalText("There was an error while trying to create your account. Please try again later.");
        setTriggerModal(true);
    }
  }

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col font-sans">
      
      <AuthHeader linkHome />

      {/* 2. Centered Register Card */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-10 sm:px-8 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-md bg-zinc-900/65 border border-white/10 rounded-xl p-7 sm:p-9 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl relative overflow-hidden my-6">

          {/* Header */}
          <div className="text-center mb-8 pt-2">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Create an Account
            </h1>
            <p className="text-sm font-medium text-zinc-500 mt-2 font-mono">
              Join to save and share your world coordinates
            </p>
          </div>

          {/* Inline Error Notice */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignUp}>
            
            {/* Minecraft Username Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="username" 
                className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono"
              >
                 Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Steve"
                className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 font-medium transition"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="confirmPassword" 
                className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 font-medium transition"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-sm rounded-lg transition shadow-[0_10px_28px_rgba(52,211,153,0.18)] active:scale-[0.98] mt-3 cursor-pointer"
            >
              Create Account
            </button>

          </form>

          {/* Navigation link back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition font-mono"
            >
              Already have an account? Log in
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