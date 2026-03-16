# 📂 Project Structure

Complete file tree with explanations.

```
doctor-landing/
│
├── app/                              ← Next.js App Router
│   ├── api/                          ← API routes (for Approach 2 booking)
│   │   ├── auth/
│   │   │   └── nextauth/
│   │   │       └── route.ts          ← NextAuth Google OAuth
│   │   ├── availability/
│   │   │   └── route.ts              ← GET available time slots
│   │   └── book/
│   │       └── route.ts              ← POST create booking
│   ├── globals.css                   ← Global styles + custom fonts
│   ├── layout.tsx                    ← Root layout + SEO meta tags
│   └── page.tsx                      ← Home page (assembles all sections)
│
├── components/
│   ├── sections/                     ← Page sections (8 components)
│   │   ├── Navbar.tsx                ← Sticky navigation + mobile menu
│   │   ├── HeroSection-v2.tsx        ← Hero with booking button
│   │   ├── AboutSection.tsx          ← Doctor bio + certifications
│   │   ├── ServicesSection.tsx       ← 6-service grid
│   │   ├── ClinicSection.tsx         ← Hours + map + contact
│   │   ├── TestimonialsSection.tsx   ← Patient reviews
│   │   ├── CTASection.tsx            ← Final call-to-action
│   │   └── Footer.tsx                ← Links + contact info
│   │
│   └── ui/                           ← Reusable UI components
│       ├── BookingModal.tsx          ← Approach 1: Google Scheduler modal
│       ├── CustomBookingCalendar.tsx ← Approach 2: Custom calendar UI
│       └── WhatsAppButton.tsx        ← Sticky floating button
│
├── data/
│   └── config.ts                     ← ⭐ ALL CLIENT DATA (edit this!)
│
├── types/
│   └── index.ts                      ← TypeScript interfaces
│
├── docs/                             ← Documentation
│   ├── QUICK_START.md                ← 5-minute setup guide
│   ├── BOOKING_SETUP_GUIDE.md        ← Booking system setup (both approaches)
│   ├── FILE_CHANGES.md               ← What to change for each approach
│   └── PROJECT_STRUCTURE.md          ← This file
│
├── public/                           ← Static assets
│   └── (add doctor photo here)
│
├── .env.local.example                ← Environment variables template
├── .gitignore
├── next.config.mjs                   ← Next.js configuration
├── package.json                      ← Dependencies
├── postcss.config.js                 ← PostCSS config (for Tailwind)
├── tailwind.config.ts                ← Tailwind theme + colors
├── tsconfig.json                     ← TypeScript configuration
└── README.md                         ← Main documentation
```

---

## 📝 File Explanations

### Core Configuration

**`data/config.ts`** - The single source of truth
- Doctor information (name, title, contact)
- Services list
- Testimonials
- Clinic hours
- Stats
- Google Scheduler URL

**`types/index.ts`** - TypeScript types
- DoctorInfo interface
- Service interface
- Testimonial interface
- ClinicHour interface

### Styling

**`app/globals.css`**
- Google Fonts import
- Tailwind directives
- Custom animations (fadeUp, shimmer)
- Utility classes (whatsapp-sticky, card-hover)
- Scrollbar styling

**`tailwind.config.ts`**
- Theme extension (colors, fonts, animations)
- Primary color palette
- Custom keyframes

### Components

**Section Components** (`components/sections/`)
Each section is a self-contained component:
- Imports data from `data/config.ts`
- Handles its own styling and layout
- Exported as default function

**UI Components** (`components/ui/`)
- Reusable across multiple sections
- Client-side interactive elements ("use client")
- BookingModal & CustomBookingCalendar are alternatives (use one)

### API Routes (Approach 2 Only)

**`app/api/auth/[...nextauth]/route.ts`**
- Handles Google OAuth login
- Manages access tokens for Calendar API

**`app/api/availability/route.ts`**
- Fetches doctor's Google Calendar
- Returns available time slots for a given date

**`app/api/book/route.ts`**
- Creates new calendar events
- Sends confirmation emails to patients

---

## 🔄 Data Flow

### Approach 1 (Google Scheduler)
```
User clicks "Book Appointment"
  ↓
BookingModal opens
  ↓
Google Scheduler iframe loads
  ↓
User books directly in Google's UI
  ↓
Done (Google handles everything)
```

### Approach 2 (Custom API)
```
User clicks "Book Appointment"
  ↓
CustomBookingCalendar opens
  ↓
Selects date → API call to /api/availability
  ↓
Selects time → Fills form → Submits
  ↓
API call to /api/book → Creates event
  ↓
Success! Confirmation email sent
```

---

## 🎨 Customization Points

**Colors**: `tailwind.config.ts` → theme.extend.colors  
**Fonts**: `app/globals.css` → Google Fonts import + CSS variables  
**Content**: `data/config.ts` → All text, data, URLs  
**Images**: `public/` folder → Add doctor photo, logos  
**Components**: `components/sections/` → Modify individual sections  

---

## 📦 Build Output

```bash
npm run build
```

Creates optimized production build in `.next/` folder:
- Static HTML pages
- Optimized JavaScript bundles
- CSS files
- Image assets

Deploy the entire project folder to Vercel (or any Next.js hosting).

---

*Understanding the structure helps you customize faster!*
