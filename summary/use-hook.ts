"use client";

import { useMutation } from "@tanstack/react-query";
import { summaryService, type SummaryResponse } from "./service";

export const useSummary = () => {
  return useMutation<SummaryResponse, Error, { url: string }>({
    mutationFn: ({ url }: { url: string }) => summaryService.scrapeUrl(url),
  });
};
