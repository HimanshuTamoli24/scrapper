import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await inngest.send({
      name: "scraper/requested",
      data: {
        url: body.url,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
