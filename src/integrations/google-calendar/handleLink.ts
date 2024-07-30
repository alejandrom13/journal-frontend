"use server";
import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/api/gcalendar-callback";

export const handleLinkCalendar = async () => {
  console.log("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID);
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );

  // console.log("oauth2Client", oauth2Client);

  try {
    const url = await oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    });

    console.log("url", url);
    return url;
  } catch (error) {
    console.error("Error generating auth URL:", error);
    throw error;
  }
};
