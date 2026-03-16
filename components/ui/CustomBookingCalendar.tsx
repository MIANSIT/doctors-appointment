"use client";

import { useState, useEffect } from "react";
import { X, Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

interface CustomBookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomBookingCalendar({
  isOpen,
  onClose,
}: CustomBookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<"date" | "time" | "form" | "success">("date");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailability = async (date: Date) => {
    setLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/availability?date=${formattedDate}`);
      const data = await response.json();
      
      if (response.ok) {
        setAvailableSlots(data.slots || []);
        setBookingStep("time");
      } else {
        setErrorMessage(data.error || "Failed to load availability");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
    setBookingStep("form");
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate!, "yyyy-MM-dd"),
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          patientName: formData.name,
          patientEmail: formData.email,
          patientPhone: formData.phone,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus("success");
        setBookingStep("success");
      } else {
        setBookingStatus("error");
        setErrorMessage(data.error || "Booking failed");
      }
    } catch (error) {
      setBookingStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  const resetAndClose = () => {
    setBookingStep("date");
    setSelectedDate(null);
    setSelectedSlot(null);
    setFormData({ name: "", email: "", phone: "", notes: "" });
    setBookingStatus("idle");
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
              {bookingStep === "success" ? "Booking Confirmed!" : "Book Your Appointment"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {bookingStep === "date" && "Select a date"}
              {bookingStep === "time" && "Choose a time slot"}
              {bookingStep === "form" && "Enter your details"}
              {bookingStep === "success" && "We'll see you soon!"}
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* SUCCESS STATE */}
          {bookingStep === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Appointment Confirmed!</h3>
              <p className="text-slate-600 mb-4">
                {format(selectedDate!, "EEEE, MMMM d, yyyy")} at {selectedSlot.start}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 max-w-md mx-auto">
                <p className="text-sm text-slate-700">
                  📧 A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-8 bg-primary-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-800"
              >
                Close
              </button>
            </div>
          )}

          {/* DATE SELECTION */}
          {bookingStep === "date" && (
            <div className="grid grid-cols-7 gap-3">
              {dates.map((date) => {
                const isSelected = selectedDate && format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary-600 bg-primary-50"
                        : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs text-slate-500 uppercase">{format(date, "EEE")}</div>
                    <div className={`text-lg font-bold ${isSelected ? "text-primary-700" : "text-slate-800"}`}>
                      {format(date, "d")}
                    </div>
                    <div className="text-xs text-slate-400">{format(date, "MMM")}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TIME SLOT SELECTION */}
          {bookingStep === "time" && (
            <div>
              <div className="mb-4 flex items-center gap-2 text-slate-700">
                <CalendarIcon size={18} />
                <span className="font-semibold">{format(selectedDate!, "EEEE, MMMM d, yyyy")}</span>
              </div>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 size={32} className="animate-spin text-primary-600" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => slot.available && handleSlotSelect(slot)}
                      disabled={!slot.available}
                      className={`p-4 rounded-xl border-2 transition-all text-sm font-semibold ${
                        slot.available
                          ? "border-slate-200 hover:border-accent hover:bg-green-50 text-slate-700 cursor-pointer"
                          : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Clock size={14} className="inline mr-1" />
                      {slot.start}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setBookingStep("date")}
                className="mt-6 text-primary-600 hover:underline text-sm font-medium"
              >
                ← Change date
              </button>
            </div>
          )}

          {/* PATIENT FORM */}
          {bookingStep === "form" && (
            <div>
              <div className="mb-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <div className="flex items-center gap-2 text-primary-800 font-semibold mb-1">
                  <CalendarIcon size={16} />
                  {format(selectedDate!, "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2 text-primary-700">
                  <Clock size={16} />
                  {selectedSlot.start} - {selectedSlot.end}
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <User size={14} className="inline mr-1" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail size={14} className="inline mr-1" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Phone size={14} className="inline mr-1" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+880 1700-000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any specific concerns or questions?"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setBookingStep("time")}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 rounded-full font-semibold hover:bg-slate-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={bookingStatus === "loading"}
                    className="flex-1 px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-dark disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {bookingStatus === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
