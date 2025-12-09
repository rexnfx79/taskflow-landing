import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

// Get the content path - try multiple locations
const getContentPath = async () => {
  // Get the function directory using import.meta.url
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Try multiple possible locations in order of likelihood:
  const pathsToTry = [
    // 1. Relative to function directory (if bundled with function)
    path.join(__dirname, "content", "blog"),
    // 2. Parent directory (if function is in a subdirectory)
    path.join(__dirname, "..", "content", "blog"),
    // 3. From process.cwd() - netlify/functions/content/blog
    path.join(process.cwd(), "netlify", "functions", "content", "blog"),
    // 4. From process.cwd() - content/blog (repo root)
    path.join(process.cwd(), "content", "blog"),
  ];
  
  // Try each path and return the first one that exists
  for (const contentPath of pathsToTry) {
    try {
      await fs.access(contentPath);
      console.log("Found content at:", contentPath);
      return contentPath;
    } catch (err) {
      // Try next path
      continue;
    }
  }
  
  // If none found, log error and return first path for error message
  console.error("Could not find content directory. Tried paths:", pathsToTry);
  console.error("Function directory (__dirname):", __dirname);
  console.error("Process cwd:", process.cwd());
  return pathsToTry[0]; // Return first path for error message
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
