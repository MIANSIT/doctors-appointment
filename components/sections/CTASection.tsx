import { Phone, MessageCircle, Calendar } from "lucide-react";
import { doctorInfo } from "@/data/config";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsapp.replace(/\D/g, "")}?text=Hello%20Dr.%20Ayesha%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 mb-6">
          <Calendar size={32} />
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ready to Book Your{" "}
          <span className="text-primary-700 italic">Appointment?</span>
        </h2>

        <p className="text-slate-500 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Don&apos;t wait. Take the first step towards better health today. Our
          team is ready to help you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${doctorInfo.phone}`}
            className="group flex items-center justify-center gap-3 bg-primary-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary-800 transition-all shadow-xl shadow-primary-200 hover:shadow-primary-300 hover:-translate-y-0.5"
          >
            <Phone size={20} />
            Call Now
            <span className="text-blue-300 text-sm font-normal hidden sm:inline">
              {doctorInfo.phone}
            </span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#20bd5a] transition-all shadow-xl shadow-green-200 hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>
        </div>

        <p className="mt-6 sm:hidden text-slate-500 text-sm">
          📞 {doctorInfo.phone}
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { label: "Secure & Private", icon: "🔒" },
            { label: "Same-Day Booking", icon: "⚡" },
            { label: "No Hidden Fees", icon: "✅" },
          ].map(({ label, icon }) => (
            <div key={label} className="text-center">
              <span className="text-2xl">{icon}</span>
              <p className="mt-2 text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}