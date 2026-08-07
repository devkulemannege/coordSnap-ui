"use client";

interface modalOptions {
    title: string;
    text: string;
    onClose: () => void;
} 

export default function ErrorModal(options: modalOptions) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-zinc-800 border border-rose-500/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">

            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>

            {/* Text Details */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{options.title}</h3>
              <p className="text-xs text-zinc-400 font-mono">{options.text}</p>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => {options.onClose()}}
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-zinc-950 font-bold text-xs rounded-xl transition shadow-md shadow-rose-500/20 cursor-pointer"
            >
              Ok
            </button>

          </div>
        </div>
    ); 
} 