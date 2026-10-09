"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Check, AlertCircle, ExternalLink } from "lucide-react";
import type { SummaryResponse } from "../service";

interface SummaryResultProps {
  data?: SummaryResponse | null;
  isLoading: boolean;
  error?: Error | null;
}

export function SummaryResult({ data, isLoading, error }: SummaryResultProps) {
  const [activeTab, setActiveTab] = React.useState<string>("summary");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "summary") {
      textToCopy = data?.summary || "";
    } else {
      textToCopy = data?.page?.text || "";
    }

    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasData = Boolean(data?.summary || data?.page);

  return (
    <div className="pt-6">
      <div className="border border-zinc-800/80 bg-zinc-950/60 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl shadow-black/40">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as string)}
          className="w-full"
        >
          {/* Card Header with Tabs and Copy Button */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-950/80 gap-2">
            <TabsList className="bg-zinc-900/90 border border-zinc-800 p-0.5 rounded-lg h-9">
              <TabsTrigger
                value="summary"
                className="px-3.5 py-1 text-xs font-medium data-active:bg-zinc-800 data-active:text-white text-zinc-400 rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Summary</span>
              </TabsTrigger>
              <TabsTrigger
                value="scraper"
                className="px-3.5 py-1 text-xs font-medium data-active:bg-zinc-800 data-active:text-white text-zinc-400 rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Scraper Result</span>
              </TabsTrigger>
            </TabsList>

            {hasData && !isLoading && (
              <Button
                variant="ghost"
                size="xs"
                onClick={handleCopy}
                className="h-8 px-2.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 size-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 size-3.5" />
                    <span>
                      Copy {activeTab === "summary" ? "Summary" : "Result"}
                    </span>
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Card Content */}
          <CardContent className="p-5 sm:p-6">
            {isLoading ? (
              <div className="space-y-3.5 py-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800/60" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-800/60" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/60" />
              </div>
            ) : error ? (
              <div className="flex items-start gap-2.5 text-red-400 text-sm sm:text-base py-1">
                <AlertCircle className="size-5 shrink-0 mt-0.5 text-red-400" />
                <p>
                  {error.message ||
                    "Failed to process webpage. Please verify the URL and try again."}
                </p>
              </div>
            ) : !hasData ? (
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal py-1">
                Enter a link above and click summarize to see both the AI
                summary and scraped webpage content.
              </p>
            ) : (
              <>
                {/* Tab 1: AI Summary rendered as clean Markdown */}
                <TabsContent
                  value="summary"
                  className="mt-0 focus-visible:outline-none"
                >
                  {data?.summary ? (
                    <div className="text-zinc-200 leading-relaxed selection:bg-zinc-700">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-xl sm:text-2xl font-bold text-white mt-4 mb-2 first:mt-0 tracking-tight">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg sm:text-xl font-semibold text-white mt-3.5 mb-2 first:mt-0 tracking-tight">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base sm:text-lg font-semibold text-zinc-100 mt-3 mb-1.5 first:mt-0">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-base sm:text-lg leading-relaxed text-zinc-200 mb-3 last:mb-0">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-white">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-outside ml-5 space-y-1.5 my-3 text-zinc-200 text-base sm:text-lg">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-outside ml-5 space-y-1.5 my-3 text-zinc-200 text-base sm:text-lg">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed pl-1">{children}</li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-zinc-700 pl-4 italic text-zinc-400 my-3">
                              {children}
                            </blockquote>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-sm font-mono text-zinc-200 border border-zinc-700/50">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {data.summary}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 italic">
                      No summary generated.
                    </p>
                  )}
                </TabsContent>

                {/* Tab 2: Scraper Result */}
                <TabsContent
                  value="scraper"
                  className="mt-0 focus-visible:outline-none space-y-4"
                >
                  {data?.page ? (
                    <div className="space-y-3.5">
                      {/* Webpage metadata header */}
                      <div className="rounded-lg bg-zinc-900/60 border border-zinc-800/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-1 min-w-0 flex-1">
                          <h4 className="text-sm sm:text-base font-medium text-white truncate">
                            {data.page.title || "Webpage Details"}
                          </h4>
                          {data.page.url && (
                            <a
                              href={data.page.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors truncate max-w-full"
                            >
                              <span className="truncate">{data.page.url}</span>
                              <ExternalLink className="size-3 shrink-0" />
                            </a>
                          )}
                        </div>

                        {data.page.text && (
                          <div className="shrink-0 self-start sm:self-center">
                            <span className="inline-flex items-center rounded-md bg-zinc-800/80 px-2 py-1 text-[11px] font-mono text-zinc-400 border border-zinc-700/60">
                              {data.page.text.length.toLocaleString()}{" "}
                              characters
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Raw scraped content */}
                      <div className="rounded-lg bg-zinc-950/80 border border-zinc-800/80 overflow-hidden">
                        <div className="px-3.5 py-2 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
                          <span className="font-mono text-[11px] uppercase tracking-wider">
                            Raw Extracted Text
                          </span>
                        </div>
                        <pre className="max-h-96 overflow-y-auto p-4 text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap select-text scrollbar-thin">
                          {data.page.text || "No text content found."}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 italic">
                      No scraper output found.
                    </p>
                  )}
                </TabsContent>
              </>
            )}
          </CardContent>
        </Tabs>
      </div>
    </div>
  );
}
