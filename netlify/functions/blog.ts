import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Get the root directory - Netlify Functions run from repo root
// In Netlify, process.cwd() is the repository root
const getContentPath = () => {
  const repoRoot = process.cwd();
  return path.join(repoRoot, "content", "blog");
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
    const contentPath = getContentPath();
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
