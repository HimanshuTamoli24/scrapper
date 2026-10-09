import * as React from "react";

export function SummaryFooter() {
  return (
    <footer className="w-full max-w-2xl mx-auto pt-10 border-t border-zinc-900 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
      <p>Simple summaries. Less reading.</p>
      <p className="text-zinc-600">Built with Next.js & Turbopack</p>
    </footer>
  );
}
