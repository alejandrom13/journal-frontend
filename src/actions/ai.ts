"use server";
import { generateText, generateObject, streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const generateSummary = async (data: any) => {

  console.log("data", data);
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const { text } = await streamText({
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

  const formattedData = dataWithoutCalendar
    .map((entry: any) => {
      if (typeof entry.content === "object") {
        return JSON.stringify(entry.content);
      }
      return entry.content.toString();
    })
    .join("\n\n");

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

  return object.object.sentiment;
};

const generateCustomQuestions = async (message: any) => {
  console.log("message", message);
  const google = createGoogleGenerativeAI({
    // custom settings, e.g.
    apiKey: process.env.GEMINI_API_KEY,
  });

  const { object } = await generateObject({
    model: google("models/gemini-1.5-pro-latest"),
    prompt: `Generate between 1-3 custom and relevant questions that the user can ask about their journal. 
    The questions should be simple, related to the user's daily reflections, and encourage further journaling. All questions in first person. 
    Make sure the questions are concise and directly relevant to the user's journal entries.`,
    schema: z.object({
      object: z.object({
        questions: z.array(z.string()),
      }),
    }),
  });

  console.log(object.object.questions);

  return object.object.questions;
};

export { generateSummary, generateSentimentAnalysis, generateCustomQuestions };
