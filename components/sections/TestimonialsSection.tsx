import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/config";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Patient Stories
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our{" "}
            <span className="italic text-blue-200">Patients Say</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={22} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-blue-200 font-medium">
              5.0 — 200+ Reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-7 card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -top-4 left-6">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Quote size={16} className="text-white fill-white" />
                </div>
              </div>

              <div className="flex gap-0.5 mb-4 mt-2">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-blue-100 text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-blue-300 text-xs">
                    Age {t.age} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-300 text-sm">
            All reviews are verified patient testimonials. 
            <a
              href="#"
              className="ml-1 text-white underline underline-offset-2 hover:text-blue-100"
            >
              View on Google
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}