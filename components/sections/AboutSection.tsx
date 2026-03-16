import { Award, Building2, Clock, GraduationCap } from "lucide-react";
import { doctorInfo } from "@/data/config";

export default function AboutSection() {
  const highlights = [
    {
      icon: Clock,
      label: "Experience",
      value: doctorInfo.experience,
      color: "bg-blue-50 text-primary-700",
    },
    {
      icon: Building2,
      label: "Hospital",
      value: doctorInfo.hospital,
      color: "bg-green-50 text-accent",
    },
    {
      icon: GraduationCap,
      label: "Qualification",
      value: "MBBS, FCPS",
      color: "bg-amber-50 text-amber-700",
    },
    {
      icon: Award,
      label: "Specialization",
      value: "Gynecology & Obstetrics",
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            About the Doctor
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Dedicated to Your{" "}
            <span className="text-primary-700 italic">Health & Well-being</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-slate-600 text-lg leading-relaxed">
              {doctorInfo.bio}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 card-hover border border-slate-100"
                >
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  <p className="text-slate-800 font-semibold text-sm leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 border border-primary-100">
              <h3
                className="text-2xl font-bold text-primary-900 mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Qualifications & Memberships
              </h3>
              <ul className="space-y-4">
                {doctorInfo.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-slate-700 leading-snug">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative bg-primary-800 text-white rounded-2xl p-6">
              <div
                className="text-5xl text-primary-400 font-serif absolute -top-3 left-4"
                aria-hidden
              >
                "
              </div>
              <p className="text-blue-100 italic pt-4 leading-relaxed">
                My mission is to empower every woman with the knowledge and
                care she deserves — from the first appointment to a lifetime of
                wellness.
              </p>
              <p className="mt-4 text-white font-semibold text-sm">
                — {doctorInfo.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}