import { getGroqChatCompletion } from "@/lib/llm";
import { inngest } from "./client";
import { scrapeUrl } from "@/lib/scrapper";
import { connectDB, SummaryModel } from "@/lib/db";

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

    await step.run("save-to-db", async () => {
      await connectDB();
      await SummaryModel.create({
        url: event.data.url,
        title: page?.title || "",
        text: page?.text || "",
        summary,
        runId: event.data.runId,
      });

      return { saved: true };
    });

    return {
      success: true,
      page,
      summary,
    };
  },
);
