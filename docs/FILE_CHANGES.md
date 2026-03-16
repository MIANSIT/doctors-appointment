# 📋 File Changes Checklist

## APPROACH 1: Google Scheduler (Iframe Embed)

### Files to ADD:
```
✅ components/ui/BookingModal.tsx
✅ components/sections/HeroSection-v2.tsx (updated hero with modal trigger)
```

### Files to UPDATE:
```
📝 data/config.ts
   → Add: appointmentSchedulerUrl: "https://calendar.google.com/..."

📝 types/index.ts
   → Add: appointmentSchedulerUrl: string; to DoctorInfo interface

📝 app/page.tsx
   → Replace: import HeroSection from "@/components/sections/HeroSection";
   → With: import HeroSection from "@/components/sections/HeroSection-v2";
   (Or just rename HeroSection-v2.tsx to HeroSection.tsx)
```

### Total changes: 2 new files + 3 file updates
### Setup time: 10 minutes

---

## APPROACH 2: Custom Google Calendar API

### Files to ADD:
```
✅ .env.local (copy from .env.local.example)
✅ app/api/auth/[...nextauth]/route.ts
✅ app/api/availability/route.ts
✅ app/api/book/route.ts
✅ components/ui/CustomBookingCalendar.tsx
```

### Files to UPDATE:
```
📝 package.json
   → Add dependencies: next-auth, googleapis, date-fns

📝 data/config.ts
   → (No changes needed for this approach, but you could store calendar ID here)

📝 types/index.ts
   → (Optional) Add booking-related types

📝 components/sections/HeroSection.tsx
   → Import CustomBookingCalendar
   → Add useState for modal open/close
   → Replace button onClick to open modal
```

### Total changes: 5 new files + 2 file updates + Google Cloud setup
### Setup time: 30-45 minutes

---

## 🎯 Quick Decision Tree

```
Do you need full UI control?
├─ No → Use APPROACH 1
│        (Google's scheduler looks professional anyway)
│
└─ Yes → Do you have time for OAuth setup?
         ├─ No → Use APPROACH 1 for now, upgrade later
         │
         └─ Yes → Use APPROACH 2
                  (You'll thank yourself later)
```

---

## 🔄 Migration Path

**Start with Approach 1 → Migrate to Approach 2 later**

Why this works:
1. Launch fast with Approach 1
2. See if patients actually book
3. If yes → invest time in Approach 2
4. If no → you saved 30 minutes of setup

The URLs are different but the user flow is the same (date → time → book).

---

## 📦 Files Included in Project

### Approach 1 Files:
- `components/ui/BookingModal.tsx` ✅
- `components/sections/HeroSection-v2.tsx` ✅

### Approach 2 Files:
- `app/api/auth/[...nextauth]/route.ts` ✅
- `app/api/availability/route.ts` ✅
- `app/api/book/route.ts` ✅
- `components/ui/CustomBookingCalendar.tsx` ✅
- `.env.local.example` ✅
- `package-approach2.json` ✅

### Documentation:
- `BOOKING_SETUP_GUIDE.md` ✅ (Full setup instructions)
- `FILE_CHANGES.md` ✅ (This file)

---

## 🛠️ Implementation Steps

### For Approach 1:
```bash
# 1. Get Google Scheduler URL from doctor
#    (See BOOKING_SETUP_GUIDE.md → Approach 1 → Step 1)

# 2. Add to config.ts
echo 'appointmentSchedulerUrl: "PASTE_URL_HERE"' >> data/config.ts

# 3. Update types
# (Already done in types/index.ts)

# 4. Use the updated HeroSection
mv components/sections/HeroSection.tsx components/sections/HeroSection-old.tsx
mv components/sections/HeroSection-v2.tsx components/sections/HeroSection.tsx

# 5. Test
npm run dev
```

### For Approach 2:
```bash
# 1. Complete Google Cloud setup
#    (See BOOKING_SETUP_GUIDE.md → Approach 2 → Steps 1-4)

# 2. Copy package-approach2.json
cp package-approach2.json package.json

# 3. Install dependencies
npm install

# 4. Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 5. Update HeroSection to import CustomBookingCalendar
# (See HeroSection-v2.tsx for reference, but use CustomBookingCalendar instead of BookingModal)

# 6. Test
npm run dev
```

---

## 🧪 Testing Checklist

- [ ] Click "Book Appointment" button
- [ ] Modal opens
- [ ] (Approach 1) Google scheduler loads in iframe
- [ ] (Approach 2) Date picker shows next 14 days
- [ ] (Approach 2) Selecting date loads time slots
- [ ] (Approach 2) Can select available slot (green)
- [ ] (Approach 2) Cannot select booked slot (gray)
- [ ] (Approach 2) Form validation works
- [ ] (Approach 2) Booking creates calendar event
- [ ] Confirmation email sent to patient
- [ ] Event appears in doctor's Google Calendar

---

*Choose wisely. Both work. One is faster, one is better.*
