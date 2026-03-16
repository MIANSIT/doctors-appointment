import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    
    if (!token?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { startTime, endTime, summary, description } = body;

    // Initialize Google Calendar API
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token.accessToken as string });
    
    const calendar = google.calendar({ version: 'v3', auth });

    // Create event
    const event = {
      summary: summary || 'Appointment',
      description: description || '',
      start: {
        dateTime: startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: endTime,
        timeZone: 'UTC',
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json({ 
      success: true, 
      event: response.data 
    });
    
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}