"use server";
import { generateText } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

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
    prompt: "(Use markdown, and well structured text with bold) Summarize me what i did this day: \n" + data,
  });

  return text;
};


export { generateSummary };