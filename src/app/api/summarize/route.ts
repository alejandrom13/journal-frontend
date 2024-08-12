const generateSummary = async (data: any) => {};

import { streamText, StreamData, convertToCoreMessages, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { promises as fs } from "fs";
import { getAllEntries, getAllEntriesByRange } from "@/actions/entries";
import { formatData } from "@/lib/ai/formatData";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const { data } = await req.json();
    console.log("data", data);

    console.log("data", data);
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await streamText({
      model: google("models/gemini-pro"),
      prompt: `
      Generate a well-structured summary of the day's activities using markdown format. Follow these guidelines:
      
      1. Start with a brief overall summary in bold.
      2. Break down the activities into categories (e.g., work, personal, health).
      3. Use bullet points for individual activities.
      4. Include a separate section for audio summaries, if any.
      5. End with a short reflection or key takeaway from the day.
      
      Here's the data to summarize:
      
      ${data}
  
      - If there is no data available for, you can say that there is no data available for that date.
      Please ensure the response is concise, informative, and easy to read.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response("Error: " + error, { status: 500 });
  }
}
async function getTrainingData({ from, to }: { from: string; to: string }) {
  const newFrom = new Date(from);
  const newTo = new Date(to);
  const res = await getAllEntriesByRange({
    from: newFrom,
    to: newTo,
  });

  return res;
}
