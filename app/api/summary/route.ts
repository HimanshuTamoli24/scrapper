import { inngest } from "@/inngest/client";
import { connectDB, SummaryModel } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function waitForSummary(runId: string, maxSeconds = 25) {
  const deadline = Date.now() + maxSeconds * 1000;
  while (Date.now() < deadline) {
    const doc = await SummaryModel.findOne({ runId }).lean();
    if (doc) return doc;
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body?.url?.trim();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    await connectDB();

    const cached = await SummaryModel.findOne({ url })
      .sort({ createdAt: -1 })
      .lean();

    if (cached) {
      return NextResponse.json({
        success: true,
        cached: true,
        page: {
          url: cached.url,
          title: cached.title || "",
          text: cached.text || "",
        },
        summary: cached.summary,
        text: cached.summary,
      });
    }

    const runId = crypto.randomUUID();
    await inngest.send({
      name: "scraper/requested",
      data: { url, runId },
    });

    const result = await waitForSummary(runId);
    if (!result) {
      return NextResponse.json(
        { error: "Summary generation timed out. Please try again." },
        { status: 504 },
      );
    }

    return NextResponse.json({
      success: true,
      cached: false,
      page: {
        url: result.url,
        title: result.title || "",
        text: result.text || "",
      },
      summary: result.summary,
      text: result.summary,
    });
  } catch (error: any) {
    console.error("API /api/summary error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
