"use client";

import { useMutation } from "@tanstack/react-query";
import { summaryService } from "./service";

export const useSummary = () => {
  return useMutation({
    mutationFn: ({ url }: { url: string }) => summaryService.scrapeUrl(url),
  });
};
