"use server";
import Pocketbase from "pocketbase";
import { createEntry } from "./entries";
import { getTranscript } from "./speech-to-text";

const pb = new Pocketbase("https://journal-storage.up.railway.app");

export const saveRecording = async (
  formData: FormData,
  date: Date
): Promise<void> => {

  const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL as string;
  const adminPassword = process.env.POCKETBASE_ADMIN_PASS as string;

  const authData = await pb.admins.authWithPassword(adminEmail, adminPassword);

  const userId = formData.get("userId") as string;
  const res = await pb.collection("files").create(formData);
  const getUrl = pb.files.getUrl(res, res.file);
  const url = extractApiPath(getUrl);

  const transcript = await getTranscript(getUrl);

  const newEntry = await createEntry({
    type: "audio",
    content: {
      url: url,
      transcript: transcript ? transcript?.text! : "",
    },
    createdAt: date.toISOString(),
  });

};

function extractApiPath(url: string): string {
  // Create a URL object from the input string
  const urlObj = new URL(url);

  // Find the index of '/api' in the pathname
  const apiIndex = urlObj.pathname.indexOf("/api");

  // If '/api' is found, return the path after it
  if (apiIndex !== -1) {
    return urlObj.pathname.substring(apiIndex + 4); // 4 is the length of '/api'
  }

  // If '/api' is not found, return an empty string or handle as needed
  return "";
}
