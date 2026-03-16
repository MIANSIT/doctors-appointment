# 🗓️ Calendar Booking Setup Guide

## APPROACH 1: Google Appointment Scheduler (EASIEST) ✅

### Pros:
- ✅ Zero coding for availability logic
- ✅ Free forever (no Google Workspace needed for basic)
- ✅ Google handles all conflicts automatically
- ✅ Auto-sends email confirmations
- ✅ Patients can reschedule themselves
- ✅ Works on mobile

### Cons:
- ❌ Less customization (uses Google's UI inside iframe)
- ❌ Requires Google account sign-in from patients

---

### Setup Steps (10 minutes):

#### 1. Doctor creates appointment schedule in Google Calendar

1. Open **Google Calendar** (calendar.google.com)
2. Click the **+** button next to "Other calendars"
3. Select **"Create appointment schedule"**

4. Configure:
   ```
   Name: Patient Appointments
   Duration: 30 minutes
   Availability:
     - Saturday-Thursday: 10:00 AM - 2:00 PM
     - Saturday-Thursday: 5:00 PM - 9:00 PM
     - Friday: 5:00 PM - 8:00 PM
   Buffer: 15 minutes between appointments
   Booking window: 60 days in advance
   Max bookings per day: 12
   ```

5. Click **"Get shareable link"** → Copy the URL
   - URL format: `https://calendar.google.com/calendar/appointments/schedules/AcZssZ1...`

#### 2. Add URL to config.ts

```typescript
// data/config.ts
export const doctorInfo: DoctorInfo = {
  // ... other fields
  appointmentSchedulerUrl: "PASTE_THE_URL_HERE",
};
```

#### 3. Use the BookingModal component

Replace `HeroSection.tsx` with `HeroSection-v2.tsx`:

```bash
mv components/sections/HeroSection.tsx components/sections/HeroSection-old.tsx
mv components/sections/HeroSection-v2.tsx components/sections/HeroSection.tsx
```

**Done!** The "Book Appointment" button will open a modal with Google's calendar embed.

---

## APPROACH 2: Custom Google Calendar API (ADVANCED) 🔧

### Pros:
- ✅ Full UI/UX control
- ✅ No patient Google sign-in needed
- ✅ Works with free Gmail accounts
- ✅ Can add custom validation/rules
- ✅ Better branding

### Cons:
- ❌ More setup (OAuth, Service Account, API keys)
- ❌ You handle race conditions
- ❌ More maintenance

---

### Setup Steps (30-45 minutes):

#### 1. Enable Google Calendar API

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Create a new project (e.g., "Doctor Booking")
3. Enable **Google Calendar API**:
   - APIs & Services → Library → Search "Calendar" → Enable

#### 2. Create Service Account (for server-side access)

1. APIs & Services → Credentials → Create Credentials → **Service Account**
2. Name: `calendar-booking-bot`
3. Role: None (we'll grant calendar access directly)
4. Click **Done**
5. Click on the service account → **Keys** → Add Key → Create new key → **JSON**
6. Download the JSON file (keep it safe!)

#### 3. Share Doctor's Calendar with Service Account

1. Open **Google Calendar**
2. Find the doctor's calendar → Settings → "Share with specific people"
3. Add the service account email (from JSON: `client_email`)
   - Format: `calendar-booking-bot@project-id.iam.gserviceaccount.com`
4. Permission: **Make changes to events**

#### 4. Create OAuth Client (for user sign-in flow if needed)

1. APIs & Services → Credentials → Create Credentials → **OAuth client ID**
2. Application type: **Web application**
3. Name: `Doctor Booking Web`
4. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
5. Click **Create** → Copy **Client ID** and **Client Secret**

#### 5. Setup Environment Variables

Create `.env.local` in the project root:

```bash
# From OAuth Client
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz

# From Service Account JSON
GOOGLE_SERVICE_ACCOUNT_EMAIL=calendar-booking-bot@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...paste full key here...\n-----END PRIVATE KEY-----\n"

# Doctor's calendar ID (usually their Gmail)
DOCTOR_CALENDAR_ID=doctor@gmail.com

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run_this_command_to_generate: openssl rand -base64 32
```

#### 6. Install Dependencies

```bash
npm install next-auth googleapis date-fns
```

Use `package-approach2.json` for the full dependency list.

#### 7. Update Hero Section to Use Custom Calendar

```tsx
// components/sections/HeroSection.tsx
import CustomBookingCalendar from "@/components/ui/CustomBookingCalendar";

// ... inside component
const [isBookingOpen, setIsBookingOpen] = useState(false);

// ... in JSX
<button onClick={() => setIsBookingOpen(true)}>
  Book Appointment
</button>

<CustomBookingCalendar
  isOpen={isBookingOpen}
  onClose={() => setIsBookingOpen(false)}
/>
```

#### 8. Test the Flow

```bash
npm run dev
```

1. Click "Book Appointment"
2. Select a date → See available slots (fetched from `/api/availability`)
3. Choose a time → Fill patient form
4. Submit → Creates event in Google Calendar via `/api/book`
5. Patient receives confirmation email automatically

---

## 🎯 Which One to Use?

| Use Case | Recommendation |
|----------|----------------|
| **Simple, fast setup** | Approach 1 (Google Scheduler) |
| **Don't mind Google's UI** | Approach 1 |
| **Need full branding control** | Approach 2 (Custom API) |
| **Complex booking rules** (e.g., different durations per service) | Approach 2 |
| **Want to add payment integration later** | Approach 2 |

---

## 🔒 Security Notes

### Approach 1:
- Patients sign in with Google → secure by default
- Calendar URL is public but only shows availability, not details

### Approach 2:
- **NEVER** commit `.env.local` to Git
- Add `.env.local` to `.gitignore`
- Use Vercel Environment Variables for production
- Service account private key should be treated like a password

---

## 🚀 Deployment (Vercel)

### Approach 1:
No extra config needed. Just deploy.

### Approach 2:
Add all `.env.local` variables to Vercel:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable one by one
3. For `GOOGLE_PRIVATE_KEY`, paste the full key including `\n` characters

---

## 📞 Support

If doctor asks: "Can patients cancel appointments?"

**Approach 1**: Yes, automatically via Google Calendar  
**Approach 2**: You'd need to build a cancel API route (15 min work)

---

## 💡 Pro Tips

1. **Test with fake data first** before giving to real patients
2. **Set reminders** in Google Calendar (1 day + 1 hour before)
3. **Color-code** appointments (green = confirmed, yellow = pending, etc.)
4. **Add buffer time** between appointments so doctor isn't rushed
5. **Block lunch breaks** manually in Google Calendar

---

*Choose Approach 1 for speed. Choose Approach 2 for control.*
