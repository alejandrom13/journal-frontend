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
    const { data, emotions } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await streamText({
      model: google("models/gemini-pro"),
      prompt: `
        Analyze the following emotions associated with my day: ${emotions.join(
          ", "
        )}. Use the provided data to inform your analysis. Follow these guidelines:
  
        1. Provide me with insights on why these emotions might be present based on the day's activities and notes.
        2. If any negative emotions are present, suggest me potential improvements or coping strategies.
        3. Identify factors that may be affecting my emotional state.
        4. Provide 2-3 relevant resources (e.g., articles, apps, techniques) that could help the user manage my emotions or improve my day.
        5. End with a short reflection or key takeaway, incorporating the emotional analysis.
  
        Here's the data to analyze:
  
        ${data}
  
        - If there is no data available, provide a general analysis based on the emotions alone.
        Please ensure the response is concise, informative, and actionable. use Markdown format.`,
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
