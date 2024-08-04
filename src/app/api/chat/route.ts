import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { promises as fs } from "fs";
import { getAllEntries } from "@/actions/entries";
import { formatData } from "@/lib/ai/formatData";

export async function POST(req: Request, res: Response) {
  try {
    const trainingData = await getTrainingData();
    console.log(trainingData);

    const { messages } = await req.json();
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: `
    Be an assistant to answer all the questions about the user, and provide the user with the information they need. like a time machine. be friendly.

    ${trainingData}
      `,
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return new Response("Error: " + error, { status: 500 });
  }
}

async function getTrainingData() {
  const res = await getAllEntries(new Date());
  console.log(res);
  return formatData(res);
}
