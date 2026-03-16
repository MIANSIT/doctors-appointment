# 🚀 Quick Start Guide

Get your doctor landing page running in **5 minutes**.

---

## Step 1: Install Dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind CSS, and all required packages.

---

## Step 2: Customize Doctor Info

Open `data/config.ts` and update:

```typescript
export const doctorInfo: DoctorInfo = {
  name: "Dr. [Your Client's Name]",
  title: "MBBS, FCPS ([Specialty])",
  specialization: "[e.g., Gynecologist & Women's Health Specialist]",
  experience: "[e.g., 15+ Years Experience]",
  hospital: "[Hospital Name]",
  phone: "+880 1700-000000",      // ← Change this
  whatsapp: "+8801700000000",     // ← Change this
  email: "doctor@example.com",     // ← Change this
  address: "[Full Address]",
  // ...
};
```

---

## Step 3: Update Services

Still in `data/config.ts`, edit the services array:

```typescript
export const services: Service[] = [
  {
    icon: "🤰",  // Use emoji or change in component
    title: "Pregnancy & Antenatal Care",
    description: "Complete guidance throughout pregnancy...",
  },
  // Add 4-6 services total
];
```

---

## Step 4: Add Testimonials

```typescript
export const testimonials: Testimonial[] = [
  {
    name: "Real Patient Name",
    age: 29,
    text: "Actual testimonial text from patient...",
    rating: 5,
    location: "Mirpur, Dhaka",
  },
  // Add 3-5 testimonials
];
```

---

## Step 5: Setup Google Appointment Scheduler (Optional but Recommended)

1. Doctor opens **Google Calendar**
2. Click **+** next to "Other calendars" → "Create appointment schedule"
3. Configure:
   - Name: "Patient Appointments"
   - Duration: 30 minutes
   - Availability: Set weekly hours
   - Buffer: 15 minutes
4. Click "Get shareable link" → Copy URL
5. Add to `data/config.ts`:
   ```typescript
   appointmentSchedulerUrl: "PASTE_URL_HERE"
   ```

**See `docs/BOOKING_SETUP_GUIDE.md` for full instructions.**

---

## Step 6: Add Doctor Photo (Optional)

1. Add photo to `public/doctor.jpg`
2. In `components/sections/HeroSection-v2.tsx`, replace the placeholder:

```tsx
import Image from "next/image";

// Replace the emoji div with:
<Image
  src="/doctor.jpg"
  alt={doctorInfo.name}
  width={400}
  height={320}
  className="w-full h-full object-cover"
  priority
/>
```

---

## Step 7: Run Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Step 8: Test Everything

- [ ] Click "Book Appointment" button
- [ ] Test WhatsApp button
- [ ] Test click-to-call phone number
- [ ] Check mobile responsiveness (use browser DevTools)
- [ ] Verify all links work
- [ ] Test Google Maps embed

---

## Step 9: Deploy to Vercel

```bash
npx vercel --prod
```

Or:
1. Push to GitHub
2. Go to **vercel.com**
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

**Done! Your site is live.**

---

## 🎯 What's Next?

- **Add custom domain**: Vercel Dashboard → Settings → Domains
- **Setup Google My Business**: Increase local visibility
- **Enable Google Analytics**: Track visitor behavior
- **Collect patient reviews**: Build social proof

---

## ⚡ Common Issues

**Issue**: Booking modal doesn't open  
**Fix**: Make sure `appointmentSchedulerUrl` is set in `data/config.ts`

**Issue**: WhatsApp button not working  
**Fix**: Verify `whatsapp` field has correct format: "+8801700000000" (no spaces or dashes)

**Issue**: Build errors  
**Fix**: Run `npm install` again, delete `node_modules` and `.next` folders first

---

*Need more help? Check the other docs or reach out!*
