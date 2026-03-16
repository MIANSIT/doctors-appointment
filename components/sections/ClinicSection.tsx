import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { doctorInfo, clinicHours } from "@/data/config";

export default function ClinicSection() {
  return (
    <section id="clinic" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Find Us
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-bold text-slate-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Clinic{" "}
            <span className="text-primary-700 italic">Information</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Address
                </p>
                <p className="text-slate-800 font-medium text-sm leading-snug">
                  {doctorInfo.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(doctorInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-primary-600 text-xs font-medium hover:underline"
                >
                  <Navigation size={11} />
                  Get Directions
                </a>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-green-100 text-accent flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${doctorInfo.phone}`}
                  className="text-slate-800 font-semibold text-base hover:text-primary-700"
                >
                  {doctorInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${doctorInfo.email}`}
                  className="text-slate-800 font-medium text-sm hover:text-primary-700"
                >
                  {doctorInfo.email}
                </a>
              </div>
            </div>

            <div className="p-5 bg-primary-800 rounded-2xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-blue-200" />
                <p className="font-semibold">Visiting Hours</p>
              </div>
              <div className="space-y-3">
                {clinicHours.map((hour, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-blue-200 text-sm">{hour.day}</span>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        hour.closed
                          ? "bg-red-500/20 text-red-300"
                          : "bg-accent/20 text-green-300"
                      }`}
                    >
                      {hour.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-full min-h-[420px]">
              <iframe
                src={doctorInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${doctorInfo.name}'s Clinic`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}