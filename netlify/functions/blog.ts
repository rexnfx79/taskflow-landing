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
// Try both relative to function location and process.cwd()
let contentPath = path.resolve(__dirname, "..", "..", "content", "blog");
// Fallback to process.cwd() if the above doesn't work
if (!contentPath || contentPath.includes("node_modules")) {
  contentPath = path.resolve(process.cwd(), "content", "blog");
}

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
    // Log for debugging
    console.log("Content path:", contentPath);
    
    const files = await fs.readdir(contentPath);
    console.log("Found files:", files);
    
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
        .map(async (file) => {
          try {
            const filePath = path.join(contentPath, file);
            const fileContents = await fs.readFile(filePath, "utf-8");
            const { data } = matter(fileContents);
            return {
              slug: file.replace(/\.(md|mdx)$/, ""),
              ...data,
            };
          } catch (err) {
            console.error(`Error reading file ${file}:`, err);
            return null;
          }
        })
    );
    
    // Filter out null values and sort by date, newest first
    const validPosts = posts.filter((post) => post !== null);
    validPosts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(validPosts),
    };
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to load blog posts" }),
    };
  }
};

