import { scrapeUrl, type ScraperResult } from "@/lib/scrapper";

export const summaryService = {
  scrapeUrl: async (url: string): Promise<ScraperResult> => {
    return await scrapeUrl(url);
  },
};
