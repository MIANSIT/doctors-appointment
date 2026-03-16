import { ArrowRight } from "lucide-react";
import { services } from "@/data/config";
import { doctorInfo } from "@/data/config";

export default function ServicesSection() {
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsapp.replace(/\D/g, "")}?text=Hello%20Dr.%20Ayesha%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-bold text-slate-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our{" "}
            <span className="text-primary-700 italic">Medical Services</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Comprehensive women's healthcare services delivered with the highest
            standards of medical excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group bg-white rounded-3xl p-7 border border-slate-100 card-hover cursor-default"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3
                className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-700 transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6 text-lg">
            Not sure which service you need?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-colors shadow-lg shadow-primary-200"
          >
            Chat with Us on WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}