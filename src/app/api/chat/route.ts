import { streamText, StreamData, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { promises as fs } from "fs";
import { getAllEntries } from "@/actions/entries";
import { formatData } from "@/lib/ai/formatData";
import { createGoogleGenerativeAI } from "@ai-sdk/google";



export async function POST(req: Request, res: Response) {
  try {
    const trainingData = await getTrainingData();

    const { messages } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const data = new StreamData();

    data.append(trainingData);

    const result = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      onFinish() {
        data.close();
      },
      system: `
              Be an assistant to answer all the questions about the user, 
        and provide the user with the information they need. like a time machine. 
        be friendly, provide audio transcript if any, (don't show url).

        ${formatData(trainingData)}
      `,
      messages: convertToCoreMessages(messages),
    });

    // Respond with the stream and additional StreamData
    return result.toDataStreamResponse();
  } catch (error) {
    return new Response("Error: " + error, { status: 500 });
  }
}
async function getTrainingData() {
  const res = await getAllEntries(new Date());

  return res;
}
