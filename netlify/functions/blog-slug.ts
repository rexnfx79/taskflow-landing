import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// Get the content path - try multiple locations
const getContentPath = async () => {
  try {
    // Try to get function directory, but handle case where import.meta.url is undefined
    let __dirname: string | undefined;
    try {
      if (import.meta.url) {
        const __filename = fileURLToPath(import.meta.url);
        __dirname = path.dirname(__filename);
      }
    } catch (err) {
      console.log("Could not get __dirname from import.meta.url, using fallback");
    }
    
    // Try multiple possible locations in order of likelihood:
    // With included_files, Netlify copies content/** to the function bundle
    // The content folder should be accessible from process.cwd() in the Lambda environment
    const pathsToTry: string[] = [
      // 1. From process.cwd() - content/blog (most likely with included_files)
      path.join(process.cwd(), "content", "blog"),
    ];
    
    // Add paths relative to function directory if we have it
    if (__dirname) {
      pathsToTry.push(
        // 2. Relative to function directory
        path.join(__dirname, "content", "blog"),
        // 3. Parent directory (if function is in a subdirectory)
        path.join(__dirname, "..", "content", "blog")
      );
    }
    
    // Add fallback paths
    pathsToTry.push(
      // 4. From process.cwd() - netlify/functions/content/blog (fallback)
      path.join(process.cwd(), "netlify", "functions", "content", "blog")
    );
    
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
    if (__dirname) {
      console.error("Function directory (__dirname):", __dirname);
    }
    console.error("Process cwd:", process.cwd());
    return pathsToTry[0]; // Return first path for error message
  } catch (error: any) {
    console.error("Error in getContentPath:", error?.message);
    // Return a default path to prevent crashing
    return path.join(process.cwd(), "content", "blog");
  }
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
    // Extract slug from query parameter (set by redirect) or path
    const slug = event.queryStringParameters?.slug || event.path.split("/").pop() || "";
    
    if (!slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Slug is required" }),
      };
    }
    
    const contentPath = await getContentPath();
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
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(content);
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

