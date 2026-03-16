"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentSchedulerUrl: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  appointmentSchedulerUrl,
}: BookingModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col animate-fade-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shrink-0">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-slate-800"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Book Your Appointment
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select an available time slot below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Google Calendar iframe */}
        <div className="flex-1 overflow-hidden bg-white">
          <iframe
            src={appointmentSchedulerUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ 
              border: 0, 
              minHeight: "600px",
              height: "100%",
              display: "block"
            }}
            title="Book appointment"
            allow="payment"
          />
        </div>

        {/* Footer note */}
        {/* <div className="p-4 bg-slate-50 border-t border-slate-200 text-center shrink-0">
          <p className="text-slate-600 text-xs">
            🔒 Your information is secure. You&apos;ll receive a confirmation email
            after booking.
          </p>
        </div> */}
      </div>
    </div>
  );
}