import { getGroqChatCompletion } from "@/lib/llm";
import { inngest } from "./client";
import { scrapeUrl } from "@/lib/scrapper";

export const summarizeWebsite = inngest.createFunction(
  {
    id: "summarize-website",
    retries: 3,
    triggers: {
      event: "scraper/requested",
    },
  },
  async ({ event, step }) => {
    const page = await step.run("scrape-webpage", async () => {
      return await scrapeUrl(event.data.url);
    });

    const summary = await step.run("summarize-with-groq", async () => {
      const completion = await getGroqChatCompletion(page);
      return completion.choices[0]?.message?.content ?? "";
    });

    return {
      success: true,
      page,
      summary,
    };
  },
);
