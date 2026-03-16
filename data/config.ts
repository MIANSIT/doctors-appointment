import { DoctorInfo, Service, Testimonial, ClinicHour } from "@/types";

// ─── DOCTOR INFO ───────────────────────────────────────────────────
export const doctorInfo: DoctorInfo = {
  name: "Dr. Ayesha Rahman",
  title: "MBBS, FCPS (Gynecology & Obstetrics)",
  specialization: "Gynecologist & Women's Health Specialist",
  experience: "15+ Years Experience",
  hospital: "Dhaka Medical College Hospital",
  bio: "Dr. Ayesha Rahman is a highly qualified Gynecologist and Women's Health Specialist with over 15 years of dedicated practice in Dhaka. She completed her FCPS from Bangladesh College of Physicians and Surgeons and has helped thousands of women lead healthier lives. She believes in compassionate, patient-centred care — making every woman feel safe and heard.",
  certifications: [
    "MBBS – Dhaka Medical College",
    "FCPS (Gynecology & Obstetrics) – BCPS",
    "Member, Bangladesh Medical Association",
    "Certified in Laparoscopic Surgery",
  ],
  phone: "+880 1700-000000",
  whatsapp: "+8801700000000",
  email: "dr.ayesha@example.com",
  address: "House 12, Road 5, Dhanmondi, Dhaka-1205",
mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2617609559!2d90.37448!3d23.7506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAyLjMiTiA5MMKwMjInMjkuNSJF!5e0!3m2!1sen!2sbd!4v1234567890",
  
  // 🆕 GOOGLE APPOINTMENT SCHEDULER URL (embeddable format)
  // Your link: https://calendar.app.google/uSAxqN4sCTeoqjef7
  // Embeddable format (add ?gv=true):
  appointmentSchedulerUrl: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ26Pm11t-bqD2A1waStMXiE-2tfBV9-x9B6o5nTb8skun_sSkEJ4oRcC32zYibu3DBCGNASdAY8?gv=true",
};

// ─── SERVICES ──────────────────────────────────────────────────────
export const services: Service[] = [
  {
    icon: "🤰",
    title: "Pregnancy & Antenatal Care",
    description:
      "Complete guidance and monitoring throughout your pregnancy journey for a safe delivery.",
  },
  {
    icon: "🔬",
    title: "Gynecological Consultation",
    description:
      "Expert diagnosis and treatment of gynecological conditions with a compassionate approach.",
  },
  {
    icon: "🩺",
    title: "Laparoscopic Surgery",
    description:
      "Minimally invasive surgical procedures for faster recovery and reduced discomfort.",
  },
  {
    icon: "💊",
    title: "Hormonal & PCOS Treatment",
    description:
      "Personalised hormone therapy and PCOS management to restore your health and well-being.",
  },
  {
    icon: "👶",
    title: "Infertility Treatment",
    description:
      "Comprehensive fertility assessment and evidence-based treatment plans for couples.",
  },
  {
    icon: "🌸",
    title: "Menopause Management",
    description:
      "Supportive care and modern therapies to help you navigate menopause with confidence.",
  },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Sabrina Islam",
    age: 29,
    text: "Dr. Ayesha is not just a doctor — she is an angel. During my high-risk pregnancy, she was always available, patient, and reassuring. My baby and I are healthy because of her exceptional care.",
    rating: 5,
    location: "Mirpur, Dhaka",
  },
  {
    name: "Nusrat Jahan",
    age: 34,
    text: "I had been struggling with PCOS for years before visiting Dr. Ayesha. Within 3 months of her treatment plan, my cycle normalised and I finally felt like myself again. Highly recommended!",
    rating: 5,
    location: "Gulshan, Dhaka",
  },
  {
    name: "Fatema Begum",
    age: 42,
    text: "Very professional, very kind. She explained everything clearly and made sure I was comfortable before my laparoscopic procedure. The recovery was smooth. I trust her completely.",
    rating: 5,
    location: "Uttara, Dhaka",
  },
];

// ─── CLINIC HOURS ─────────────────────────────────────────────────
export const clinicHours: ClinicHour[] = [
  { day: "Saturday – Thursday", time: "10:00 AM – 2:00 PM" },
  { day: "Saturday – Thursday", time: "5:00 PM – 9:00 PM" },
  { day: "Friday", time: "5:00 PM – 8:00 PM" },
];

// ─── STATS ────────────────────────────────────────────────────────
export const stats = [
  { value: "5,000+", label: "Patients Treated" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "3", label: "Clinic Chambers" },
];
