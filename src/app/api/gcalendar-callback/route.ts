import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { createIntegration } from "@/actions/integrations";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      console.error("No code provided in the URL parameters");
      return NextResponse.redirect(
        new URL("/integrations?error=no_code", req.url)
      );
    }

    const oauth2Client: OAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3001/api/gcalendar-callback"
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    if (tokens.refresh_token) {
      // TODO: Securely store the refresh token associated with the user
      // You'll need to implement this part based on your user management system

      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const calendarResponse = await calendar.calendars.get({
        calendarId: "primary",
      });

      await createIntegration("google-calendar", {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        calendar_id: calendarResponse.data.id,
      });
    } else {
    }

    // TODO: Associate these tokens with the user in your system
    // You'll need to implement a way to identify the user making this request

    return NextResponse.redirect(
      new URL("/integrations?success=true", req.url)
    );
  } catch (error) {
    if ((error as any).response) {
      console.error("Error response data:", (error as any).response.data);
    }
    return NextResponse.redirect(new URL("/integrations?error=true", req.url));
  }
}
