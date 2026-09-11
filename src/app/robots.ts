import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

export const dynamic = "force-static";

// AI crawlers we explicitly welcome for Generative Engine Optimization (GEO).
// Each bot gets its own rule so every user-agent sees an explicit Allow directive.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Googlebot controls Search crawling; Google-Extended is a separate AI-use control.
  "Google-Extended",
  "Googlebot",
  // Microsoft / Bing / Copilot
  "Bingbot",
  // Apple Intelligence / Siri
  "Applebot",
  "Applebot-Extended",
  // Common Crawl (training corpus for most LLMs)
  "CCBot",
  // ByteDance / Doubao
  "Bytespider",
  // Meta AI
  "Meta-ExternalAgent",
  "FacebookBot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // Diffbot
  "Diffbot",
  // Cohere
  "cohere-ai",
  // Amazon
  "Amazonbot",
  // You.com
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin/", "/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
