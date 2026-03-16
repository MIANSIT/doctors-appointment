import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { parseISO } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, startTime, endTime, patientName, patientEmail, patientPhone, notes } = body;

    // Validate required fields
    if (!date || !startTime || !endTime || !patientName || !patientEmail || !patientPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Create datetime strings
    const selectedDate = parseISO(date);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(selectedDate);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    // Create calendar event
    const event = {
      summary: `Appointment: ${patientName}`,
      description: `
Patient: ${patientName}
Phone: ${patientPhone}
Email: ${patientEmail}
${notes ? `Notes: ${notes}` : ""}
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Dhaka",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Dhaka",
      },
      attendees: [
        { email: patientEmail, displayName: patientName },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "email", minutes: 60 }, // 1 hour before
        ],
      },
      colorId: "10", // Green color for appointments
    };

    const response = await calendar.events.insert({
      calendarId: process.env.DOCTOR_CALENDAR_ID,
      requestBody: event,
      sendUpdates: "all", // Send email confirmation to patient
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      message: "Appointment booked successfully! You will receive a confirmation email.",
    });
  } catch (error: any) {
    console.error("Booking Error:", error);
    
    // Handle specific errors
    if (error.code === 409) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to book appointment", details: error.message },
      { status: 500 }
    );
  }
}
