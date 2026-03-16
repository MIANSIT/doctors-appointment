import { Phone, MessageCircle, Mail, MapPin, Heart } from "lucide-react";
import { doctorInfo } from "@/data/config";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsapp.replace(/\D/g, "")}`;
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Clinic Info", href: "#clinic" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Book Appointment", href: "#contact" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center font-bold text-lg">
                AR
              </div>
              <div>
                <p
                  className="font-bold text-lg leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {doctorInfo.name}
                </p>
                <p className="text-slate-400 text-sm">{doctorInfo.title}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing compassionate, expert women&apos;s healthcare in Dhaka for
              over 15 years.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${doctorInfo.phone}`}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-700 hover:text-white transition-colors"
                aria-label="Call"
              >
                <Phone size={16} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${doctorInfo.email}`}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wide text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors hover:pl-1 duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wide text-sm">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-primary-400" />
                {doctorInfo.address}
              </li>
              <li>
                <a
                  href={`tel:${doctorInfo.phone}`}
                  className="flex gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Phone size={16} className="flex-shrink-0 text-primary-400" />
                  {doctorInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${doctorInfo.email}`}
                  className="flex gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={16} className="flex-shrink-0 text-primary-400" />
                  {doctorInfo.email}
                </a>
              </li>
            </ul>

            <a
              href={`tel:${doctorInfo.phone}`}
              className="mt-6 flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              <Phone size={14} />
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-slate-500 text-xs">
          <p>
            © {year} {doctorInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-rose-400 fill-rose-400" /> for better healthcare in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}