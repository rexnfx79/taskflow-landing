import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

// Get the content path - content is copied to function bundle during build
const getContentPath = async () => {
  // Get the function directory using import.meta.url
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Content is copied to netlify/functions/content/blog during build
  // In Netlify Functions, the function code is in the function's directory
  // Try relative to function directory first
  let contentPath = path.join(__dirname, "content", "blog");
  
  // Check if path exists, try alternative if not
  try {
    await fs.access(contentPath);
  } catch {
    // If that doesn't work, try going up one level (in case function is in a subdirectory)
    contentPath = path.join(__dirname, "..", "content", "blog");
  }
  
  return contentPath;
};

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
    const contentPath = await getContentPath();
    // Log for debugging
    console.log("Content path:", contentPath);
    console.log("Process cwd:", process.cwd());
    
    // Check if content directory exists
    try {
      await fs.access(contentPath);
    } catch (accessError: any) {
      console.error("Content directory not accessible:", accessError?.message);
      // Return empty array instead of error for now
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([]),
      };
    }
    
    const files = await fs.readdir(contentPath);
    console.log("Found files:", files);
    
    if (files.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([]),
      };
    }
    
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
          } catch (err: any) {
            console.error(`Error reading file ${file}:`, err?.message);
            return null;
          }
        })
    );
    
    // Filter out null values and sort by date, newest first
    const validPosts = posts.filter((post) => post !== null);
    validPosts.sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(validPosts),
    };
  } catch (error: any) {
    console.error("Error reading blog posts:", error);
    console.error("Error stack:", error?.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to load blog posts",
        message: error?.message || "Unknown error",
      }),
    };
  }
};
