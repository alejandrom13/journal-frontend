import { z } from "zod";

const SentimentSchema = z.array(
  z.object({
    feeling: z.string(),
    score: z.number(),
  })
);

export type SentimentType = z.infer<typeof SentimentSchema>;

export { SentimentSchema };
