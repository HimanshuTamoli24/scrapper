"use server";
import * as cheerio from "cheerio";

export interface ScraperResult {
  url: string;
  title: string;
  text: string;
}

export async function scrapeUrl(url: string): Promise<ScraperResult> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    throw new Error("The URL must point to an HTML page.");
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();

  $("script, style, nav, footer, header, aside, noscript").remove();

  const content =
    $("article").text().trim() ||
    $("main").text().trim() ||
    $("body").text().trim();

  const text = content.replace(/\s+/g, " ").trim();

  if (!text) {
    throw new Error("No readable content found.");
  }

  return {
    url,
    title,
    text: text.slice(0, 20_000),
  };
}
