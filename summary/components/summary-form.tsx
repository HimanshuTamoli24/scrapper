"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Globe } from "lucide-react";

interface SummaryFormProps {
  url: string;
  onUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function SummaryForm({
  url,
  onUrlChange,
  onSubmit,
  isLoading,
}: SummaryFormProps) {
  return (
    <form onSubmit={onSubmit} className="pt-2">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Globe className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="url"
            required
            placeholder="https://www.himanshutamoli.site"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="h-12 pl-10 text-base sm:text-sm bg-zinc-950/90 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500 rounded-lg shadow-inner"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="h-12 px-6 bg-white hover:bg-zinc-200 text-black font-medium text-base sm:text-sm rounded-lg transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin text-black" />
              Summarizing
            </>
          ) : (
            <>
              Summarize
              <ArrowRight className="ml-2 size-4 text-black" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
