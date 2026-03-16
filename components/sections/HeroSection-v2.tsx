"use client";

import { Phone, MessageCircle, Star, CheckCircle, Calendar } from "lucide-react";
import { doctorInfo, stats } from "@/data/config";
import { useState } from "react";
import BookingModal from "@/components/ui/BookingModal";

export default function HeroSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsapp.replace(/\D/g, "")}?text=Hello%20Dr.%20Ayesha%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary-600/30 blur-3xl" />
          <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Text */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="opacity-0-start animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                Trusted by 5,000+ Patients in Dhaka
              </div>

              {/* Headline */}
              <div className="opacity-0-start animate-fade-up delay-100">
                <h1
                  className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {doctorInfo.name}
                </h1>
                <p className="mt-2 text-lg text-blue-200 font-light">
                  {doctorInfo.title}
                </p>
                <div className="mt-3 inline-block bg-accent/20 border border-accent/40 text-accent px-4 py-1.5 rounded-full text-sm font-medium">
                  {doctorInfo.specialization}
                </div>
              </div>

              {/* Sub headline */}
              <p className="opacity-0-start animate-fade-up delay-200 text-blue-100 text-lg leading-relaxed max-w-lg">
                Compassionate, expert women's healthcare — from pregnancy to
                menopause. Book your consultation today and feel the difference.
              </p>

              {/* Trust bullets */}
              <div className="opacity-0-start animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
                {[
                  `${doctorInfo.experience}`,
                  "Same-Day Appointments",
                  "Evening Chambers Available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="opacity-0-start animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
                {/* 🆕 BOOK APPOINTMENT BUTTON - Opens Modal */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="flex items-center justify-center gap-2.5 bg-white text-primary-800 px-8 py-4 rounded-full font-semibold text-base hover:bg-blue-50 transition-colors shadow-xl shadow-primary-900/30"
                >
                  <Calendar size={18} />
                  Book Appointment
                </button>
                
                <a
                  href={`tel:${doctorInfo.phone}`}
                  className="flex items-center justify-center gap-2.5 bg-accent text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-accent-dark transition-colors shadow-xl shadow-green-900/30"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                
                {/* <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#20bd5a] transition-colors shadow-xl shadow-green-900/30"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a> */}
              </div>
            </div>

            {/* RIGHT: Doctor photo card */}
            <div className="opacity-0-start animate-fade-in delay-300 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 to-primary-400/30 blur-2xl scale-105" />
                
                {/* Photo card */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden w-80 lg:w-96">
                  {/* Placeholder photo area */}
                  <div className="w-full h-80 bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mx-auto mb-4 text-5xl">
                        👩‍⚕️
                      </div>
                      <p className="text-white/70 text-sm">Replace with doctor photo</p>
                    </div>
                  </div>

                  {/* Info strip */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-white/80 text-sm">5.0 Google Rating</span>
                    </div>
                    <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                      {doctorInfo.name}
                    </p>
                    <p className="text-blue-200 text-sm">{doctorInfo.hospital}</p>
                  </div>
                </div>

                {/* Floating availability badge */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-4 py-3 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                    <span className="text-slate-700 font-semibold text-sm">Available Today</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">Evening slots open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="opacity-0-start animate-fade-up delay-500 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl font-bold shimmer-text"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V20C1200 70 900 0 600 40C300 80 150 10 0 50V80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* 🆕 BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        appointmentSchedulerUrl={doctorInfo.appointmentSchedulerUrl}
      />
    </>
  );
}