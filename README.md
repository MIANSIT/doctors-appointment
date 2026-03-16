# 🏥 Doctor Landing Page - Complete Package

A professional, high-converting doctor/clinic landing page with **integrated calendar booking system**.

Built with **Next.js 14 + TypeScript + Tailwind CSS** for the Bangladesh healthcare market.

---

## ✨ Features

### Core Landing Page
- ✅ Responsive mobile-first design
- ✅ Hero section with doctor profile
- ✅ About section with qualifications
- ✅ Services showcase (6 services)
- ✅ Clinic information with Google Maps
- ✅ Patient testimonials
- ✅ Call-to-action sections
- ✅ Sticky WhatsApp floating button
- ✅ Click-to-call phone integration

### 🗓️ Calendar Booking System (2 Approaches Included)

**APPROACH 1: Google Appointment Scheduler (Default)**
- Embedded Google Calendar scheduler
- Zero coding for availability logic
- Free forever
- Setup time: 10 minutes

**APPROACH 2: Custom Google Calendar API**
- Full UI/UX control
- Custom date picker + time slots
- Patient form with validation
- Setup time: 30-45 minutes

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 📁 Project Structure

```
doctor-landing/
├── app/
│   ├── api/                     ← API routes for Approach 2
│   │   ├── auth/nextauth/       ← NextAuth Google OAuth
│   │   ├── availability/        ← Fetch available slots
│   │   └── book/                ← Create bookings
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 ← Main page (uses Approach 1 by default)
│
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection-v2.tsx   ← With booking button
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ClinicSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/
│       ├── BookingModal.tsx          ← Approach 1 modal
│       ├── CustomBookingCalendar.tsx ← Approach 2 calendar
│       └── WhatsAppButton.tsx
│
├── data/
│   └── config.ts                ← ⭐ EDIT THIS FOR EACH CLIENT
│
├── types/
│   └── index.ts
│
└── docs/                        ← Full documentation
    ├── SETUP_GUIDE.md
    └── BOOKING_SETUP.md
```

---

## ✏️ Customization (Per Client)

**Everything lives in ONE file: `data/config.ts`**

### 1. Update Doctor Info
```typescript
export const doctorInfo = {
  name: "Dr. [Client Name]",
  title: "MBBS, FCPS ([Specialty])",
  phone: "+880 XXXXXXXXXX",
  whatsapp: "+880XXXXXXXXXX",
  email: "doctor@example.com",
  address: "...",
  appointmentSchedulerUrl: "...", // From Google Calendar
  // ...
};
```

### 2. Update Services
```typescript
export const services = [
  { icon: "🦷", title: "Service Name", description: "..." },
  // Add 4-6 services
];
```

### 3. Add Testimonials
```typescript
export const testimonials = [
  { name: "Patient Name", age: 30, text: "...", rating: 5, location: "Dhaka" },
];
```

### 4. Add Doctor Photo
Replace placeholder in `HeroSection-v2.tsx`:
```tsx
import Image from "next/image";
<Image src="/doctor.jpg" alt="Dr. Name" width={400} height={320} priority />
```

---

## 🗓️ Calendar Booking Setup

### APPROACH 1 (Currently Active - Google Scheduler)

**Setup Steps:**

1. Doctor creates appointment scheduler in Google Calendar
   - Go to Google Calendar → Create appointment schedule
   - Set availability, duration, buffer time
   - Copy the shareable URL

2. Add URL to `data/config.ts`:
   ```typescript
   appointmentSchedulerUrl: "https://calendar.google.com/calendar/appointments/schedules/YOUR_ID"
   ```

3. Done! The "Book Appointment" button will open the Google scheduler.

**See `docs/BOOKING_SETUP.md` for detailed instructions.**

---

### APPROACH 2 (Custom API - Optional)

If you want full UI control:

1. Setup Google Cloud Project (see docs/BOOKING_SETUP.md)
2. Create Service Account & OAuth Client
3. Configure `.env.local` with credentials
4. Update `page.tsx` to import `CustomBookingCalendar` instead of using `BookingModal`

**Full guide in `docs/BOOKING_SETUP.md`**

---

## 🌐 Deployment (Vercel - Free)

```bash
# Deploy with one command
npx vercel --prod

# Or connect GitHub repo at vercel.com
```

**Custom Domain**: Add in Vercel Dashboard → Settings → Domains

---

## 📦 Dependencies

```json
{
  "next": "14.2.18",
  "react": "18.3.1",
  "typescript": "5.6.3",
  "tailwindcss": "3.4.15",
  "lucide-react": "0.468.0",
  
  // For Approach 2 only:
  "next-auth": "4.24.11",
  "googleapis": "144.0.0",
  "date-fns": "4.1.0"
}
```

---

## 💡 Features Breakdown

### Mobile Optimized
- 80%+ traffic in Bangladesh is mobile
- WhatsApp button (sticky, always visible)
- Click-to-call works instantly
- Touch-friendly button sizes

### Conversion Optimized
- Clear CTAs (Call, WhatsApp, Book)
- Trust signals (certifications, reviews, stats)
- Social proof (testimonials, ratings)
- Urgency ("Available Today")

### SEO Ready
- Proper meta tags
- Semantic HTML
- Fast loading (optimized fonts)
- Mobile-first indexing

---

## 🎨 Color Customization

Edit `tailwind.config.ts`:

```typescript
primary: {
  700: "#0369a1",  // Main brand color - change this
}
```

Popular alternatives:
- Green (medical): `#166534`
- Teal (dental): `#0d9488`
- Maroon (specialist): `#9f1239`

---

## 📞 Support

- **Setup issues?** Check `docs/SETUP_GUIDE.md`
- **Booking not working?** Check `docs/BOOKING_SETUP.md`
- **Customization questions?** See comments in `data/config.ts`

---

## 💰 Suggested Pricing (Bangladesh)

| Package | Price | Includes |
|---------|-------|----------|
| Basic | ৳15,000 | Landing page + deploy |
| Standard | ৳22,000 | + Google My Business setup |
| Premium | ৳35,000 | + Monthly maintenance + SEO |

**Monthly retainer**: ৳2,500–৳4,000/month

---

## 🏆 Best Practices

1. **Test booking flow yourself** before showing to client
2. **Set buffer time** (15 min) between appointments in Google Calendar
3. **Block lunch breaks** manually in calendar
4. **Add doctor photo** to personalize the landing page
5. **Get real testimonials** from patients (with permission)

---

*Built for the Bangladesh healthcare market. Sell appointments, not code.*
