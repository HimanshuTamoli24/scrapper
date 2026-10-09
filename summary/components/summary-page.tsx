"use client";

import * as React from "react";
import { Header } from "./header";
import { SummaryForm } from "./summary-form";
import { SummaryResult } from "./summary-result";
import { SummaryFooter } from "./summary-footer";
import { useSummary } from "../use-hook";
import { toast } from "sonner";

export function SummaryPage() {
  const [url, setUrl] = React.useState("");
  const { mutateAsync: summary, isPending, error } = useSummary();
  const [data, setdata] =React.useState<{ text: string }>();

  const handleSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    toast.promise(summary({ url }), {
      loading: "Summarizing",
      success: (data) => {
        setdata(data);
        return "Summary generated successfully";
      },
      error: (error) => {
        console.log(error);
        return "Failed to generate summary";
      },
    });
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between px-6 py-12 sm:px-8 sm:py-16 selection:bg-zinc-800 selection:text-white">
      {/* Background subtle radial gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />

      <div className="w-full max-w-2xl mx-auto relative z-10 flex-1 flex flex-col justify-center py-10">
        <Header githubUrl="https://github.com/HimanshuTamoli24/scrapper" />

        <section className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
              Summarize any webpage.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl">
              Extract the key ideas from any article, documentation, or blog
              post in seconds.
            </p>
          </div>

          <SummaryForm
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleSummarize}
            isLoading={isPending}
          />

          <SummaryResult
            summary={data?.text ?? null}
            isLoading={isPending}
            error={error}
          />
        </section>
      </div>

      <SummaryFooter />
    </main>
  );
}

export default SummaryPage;
