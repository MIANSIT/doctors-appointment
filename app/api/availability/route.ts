import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { addMinutes, startOfDay, endOfDay, parseISO, format } from "date-fns";

// Configuration
const SLOT_DURATION = 30; // minutes
const BUFFER_TIME = 15; // minutes between appointments
const WORKING_HOURS = {
  start: 10, // 10 AM
  end: 21, // 9 PM
  breakStart: 14, // 2 PM
  breakEnd: 17, // 5 PM
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // Format: YYYY-MM-DD

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Initialize Google Calendar API with service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Get busy times for the date
    const selectedDate = parseISO(date);
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        items: [{ id: process.env.DOCTOR_CALENDAR_ID }],
      },
    });

    const busySlots =
      freeBusyResponse.data.calendars?.[process.env.DOCTOR_CALENDAR_ID!]
        ?.busy || [];

    // Generate all possible slots
    const allSlots: { start: string; end: string; available: boolean }[] = [];
    let currentTime = new Date(selectedDate);
    currentTime.setHours(WORKING_HOURS.start, 0, 0, 0);

    const endTime = new Date(selectedDate);
    endTime.setHours(WORKING_HOURS.end, 0, 0, 0);

    while (currentTime < endTime) {
      const hour = currentTime.getHours();

      // Skip break time
      if (hour >= WORKING_HOURS.breakStart && hour < WORKING_HOURS.breakEnd) {
        currentTime = new Date(selectedDate);
        currentTime.setHours(WORKING_HOURS.breakEnd, 0, 0, 0);
        continue;
      }

      const slotStart = new Date(currentTime);
      const slotEnd = addMinutes(slotStart, SLOT_DURATION);

      // Check if slot conflicts with busy times
      const isAvailable = !busySlots.some((busy: any) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      allSlots.push({
        start: format(slotStart, "HH:mm"),
        end: format(slotEnd, "HH:mm"),
        available: isAvailable,
      });

      currentTime = addMinutes(currentTime, SLOT_DURATION + BUFFER_TIME);
    }

    return NextResponse.json({ slots: allSlots });
  } catch (error: any) {
    console.error("Calendar API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability", details: error.message },
      { status: 500 }
    );
  }
}
