import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// Get the root directory - Netlify Functions run from repo root
// In Netlify, process.cwd() is the repository root
const getContentPath = () => path.join(process.cwd(), "content", "blog");

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
    
    const contentPath = getContentPath();
    console.log("Content path:", contentPath);
    console.log("Looking for slug:", slug);
    
    // Try both .md and .mdx extensions
    let filePath = path.join(contentPath, `${slug}.mdx`);
    let fileContents: string;
    
    try {
      fileContents = await fs.readFile(filePath, "utf-8");
    } catch {
      filePath = path.join(contentPath, `${slug}.md`);
      try {
        fileContents = await fs.readFile(filePath, "utf-8");
      } catch (err: any) {
        console.error("File not found:", filePath, err?.message);
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Blog post not found" }),
        };
      }
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
  } catch (error: any) {
    console.error("Error reading blog post:", error);
    console.error("Error stack:", error?.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to load blog post",
        message: error?.message || "Unknown error",
      }),
    };
  }
};

