"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Copy, Check, AlertCircle } from "lucide-react";

interface SummaryResultProps {
  summary: string | null;
  isLoading: boolean;
  error?: Error | null;
}

export function SummaryResult({
  summary,
  isLoading,
  error,
}: SummaryResultProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-6">
      <div className="border border-zinc-800/80 bg-zinc-950/60 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium tracking-wider uppercase text-zinc-400">
              Summary Output
            </span>
          </div>

          {summary && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleCopy}
              className="h-7 px-2.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 size-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 size-3.5" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>

        <CardContent className="p-5 sm:p-6">
          {isLoading ? (
            <div className="space-y-3 py-1">
              <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/60" />
            </div>
          ) : error ? (
            <div className="flex items-start gap-2.5 text-red-400 text-sm sm:text-base">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <p>
                {error.message || "Failed to summarize webpage. Please check the URL and try again."}
              </p>
            </div>
          ) : summary ? (
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
              {summary}
            </p>
          ) : (
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
              Enter a link above and click summarize to distill the webpage content.
            </p>
          )}
        </CardContent>
      </div>
    </div>
  );
}
