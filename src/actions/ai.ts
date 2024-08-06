"use server";
import { generateText, generateObject } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { SentimentSchema } from "@/lib/sentimentSchema";
import { formatData, processArray } from "@/lib/ai/formatData";

const generateSummary = async (data: any) => {
  // const openai = createOpenAI({
  //   // custom settings, e.g.
  //   compatibility: "strict", // strict mode, enable when using the OpenAI API
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const { text } = await generateText({
  //   model: openai("gpt-3.5-turbo"),
  //   prompt: "(Use markdown, and well structured text with bold) Summarize me what i did this day: \n" + data,
  // });

  const google = createGoogleGenerativeAI({
    // custom settings, e.g.
    apiKey: process.env.GEMINI_API_KEY,
  });

  const { text } = await generateText({
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
    
    Please ensure the response is concise, informative, and easy to read.`,
  });

  return text;
};

const generateSentimentAnalysis = async (data: any) => {
  const google = createGoogleGenerativeAI({
    // custom settings, e.g.
    apiKey: process.env.GEMINI_API_KEY,
  });

  //data without calendar type
  const dataWithoutCalendar = data.filter(
    (item: any) => item.type !== "calendar"
  );

  console.log("Data without calendar", dataWithoutCalendar);

  const formattedData = dataWithoutCalendar
    .map((entry: any) => {
      if (typeof entry.content === "object") {
        return JSON.stringify(entry.content);
      }
      return entry.content.toString();
    })
    .join("\n\n");

  console.log("Formatted Data", formattedData);

  const { object } = await generateObject({
    model: google("models/gemini-1.5-pro-latest"),
    prompt: `Analyze the sentiment of these journal entries:
    ${formattedData || "No data available"}

    Classify the overall sentiment into the following categories: Happy, Sad, Angry, Anxious, Calm, Stress. 
For each category, provide a score from 0 to 100, where 0 means the sentiment is not present at all, and 100 means it's strongly present.
Return the results as a JSON object with an array of sentiments, each containing a 'feeling' and a 'score'.
    `,
    schema: z.object({
      object: z.object({
        sentiment: z.array(
          z.object({
            feeling: z.string(),
            score: z.number().min(0).max(100),
          })
        ),
      }),
    }),
  });

  console.log("Sentiment Analysis", object.object.sentiment);
  return object.object.sentiment;
};

export { generateSummary, generateSentimentAnalysis };
