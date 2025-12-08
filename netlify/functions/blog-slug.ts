import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// Get the root directory - Netlify Functions run from repo root
// Try multiple path resolution methods for compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Netlify Functions run from repo root, so content should be at root level
const contentPath = path.resolve(process.cwd(), "content", "blog");

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Extract slug from query parameter (set by redirect) or path
    const slug = event.queryStringParameters?.slug || event.path.split("/").pop() || "";
    
    if (!slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Slug is required" }),
      };
    }
    
    // Try both .md and .mdx extensions
    let filePath = path.join(contentPath, `${slug}.mdx`);
    let fileContents: string;
    
    try {
      fileContents = await fs.readFile(filePath, "utf-8");
    } catch {
      filePath = path.join(contentPath, `${slug}.md`);
      fileContents = await fs.readFile(filePath, "utf-8");
    }
    
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(remarkHtml).process(content);
    const htmlContent = processedContent.toString();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        slug,
        ...data,
        content: htmlContent,
      }),
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Blog post not found" }),
    };
  }
};

