import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { summarizeWebsite } from "@/inngest/function";

const handler = serve({
  client: inngest,
  functions: [summarizeWebsite],
});

export const GET = (req: any, ctx?: any) => (handler as any)(req, ctx);
export const POST = (req: any, ctx?: any) => (handler as any)(req, ctx);
export const PUT = (req: any, ctx?: any) => (handler as any)(req, ctx);
