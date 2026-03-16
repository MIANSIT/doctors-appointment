export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  age: number;
  text: string;
  rating: number;
  location: string;
}

export interface ClinicHour {
  day: string;
  time: string;
  closed?: boolean;
}

export interface DoctorInfo {
  name: string;
  title: string;
  specialization: string;
  experience: string;
  hospital: string;
  bio: string;
  certifications: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  appointmentSchedulerUrl: string; // 🆕 Google Appointment Scheduler URL
}
