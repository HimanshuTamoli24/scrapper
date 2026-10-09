import { axiosInstance } from "@/lib/axios";

export interface SummaryResponse {
  page: {
    url: string;
    title: string;
    text: string;
  };
  summary: string;
  text?: string;
  cached?: boolean;
}

export const summaryService = {
  scrapeUrl: async (url: string): Promise<SummaryResponse> => {
    const res = await axiosInstance.post<SummaryResponse>("/summary", { url });
    return res.data;
  },
};
