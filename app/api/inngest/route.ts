import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { summarizeWebsite } from "@/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [summarizeWebsite],
});
