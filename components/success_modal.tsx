'use client';

interface modalOptions {
    title: string;
    text: string;
    onClose: () => void;
}


export default function SuccessModal(options: modalOptions) {
    return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-4">
          <div className="bg-zinc-900 border border-emerald-400/30 rounded-xl p-7 max-w-sm w-full shadow-[0_24px_90px_rgba(0,0,0,0.5)] text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">

            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 flex items-center justify-center text-2xl mx-auto">
              ✅
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
              className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs rounded-lg transition shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Ok
            </button>

          </div>
        </div>
    );
}