"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { doctorInfo } from "@/data/config";

export default function WhatsAppButton() {
  const [dismissed, setDismissed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${doctorInfo.whatsapp.replace(/\D/g, "")}?text=Hello%20Dr.%20Ayesha%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

  if (dismissed) return null;

  return (
    <div className="whatsapp-sticky flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl max-w-[200px]">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-slate-700"
            aria-label="Close tooltip"
          >
            <X size={10} />
          </button>
          <p className="text-slate-700 text-xs font-medium leading-snug">
            👋 Hi! Book an appointment via WhatsApp
          </p>
        </div>
      )}

      {/* Main button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-400/40 hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="text-white fill-white" />
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] opacity-50 animate-ping" />
      </a>
    </div>
  );
}