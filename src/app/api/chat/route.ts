import { streamText, StreamData, convertToCoreMessages, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { promises as fs } from "fs";
import { getAllEntries, getAllEntriesByRange } from "@/actions/entries";
import { formatData } from "@/lib/ai/formatData";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const { messages, from, to } = await req.json();
    const trainingData = await getTrainingData({
      from: from,
      to: to,
    });

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const formattedData = trainingData
      .map((entry: any) => {
        if (typeof entry.content === "object") {
          return JSON.stringify(entry.content);
        }
        return entry.content.toString();
      })
      .join("\n\n");

      console.log("formattedData", formattedData);

    const result = await streamText({
      model: google("models/gemini-1.5-pro-latest"),

      system: `
        You are a helpful assistant designed to answer questions about the user's journal. Your role is to:
    
        1. Provide accurate information based on the user's journal entries.
        2. Act as a "time machine," allowing the user to explore past events and thoughts.
        4. Include audio transcripts when available, but do not display URLs.
        5. Only share information that is directly relevant to the user's query.
        6. Respect the user's privacy and maintain confidentiality.
        7. Provide helpful suggestions and resources when appropriate.
        8. Provide the user with information of the day
      ${formattedData}

        today's date is ${from}
        Remember to be concise yet thorough, and always prioritize the user's needs and well-being.
      `,

      messages: convertToCoreMessages(messages),
    });

    // Respond with the stream and additional StreamData
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
