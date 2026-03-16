"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { doctorInfo } from "@/data/config";
import BookingModal from "../ui/BookingModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Clinic", href: "#clinic" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
            <div>
              <p
                className={`font-semibold text-sm leading-tight transition-colors ${
                  scrolled ? "text-primary-800" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Dr. Ayesha Rahman
              </p>
              <p
                className={`text-xs transition-colors ${
                  scrolled ? "text-slate-500" : "text-blue-100"
                }`}
              >
                MBBS, FCPS
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                  scrolled ? "text-slate-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden transition-colors ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-slate-700 font-medium border-b border-slate-50 text-sm hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${doctorInfo.phone}`}
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        )}
      </header>
      {/* 🆕 BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        appointmentSchedulerUrl={doctorInfo.appointmentSchedulerUrl}
      />
    </>
  );
}
