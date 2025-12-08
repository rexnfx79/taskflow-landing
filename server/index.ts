import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Blog API routes
  const contentPath = path.resolve(__dirname, "..", "content", "blog");

  // Get all blog posts
  app.get("/api/blog", async (_req, res) => {
    try {
      const files = await fs.readdir(contentPath);
      const posts = await Promise.all(
        files
          .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
          .map(async (file) => {
            const filePath = path.join(contentPath, file);
            const fileContents = await fs.readFile(filePath, "utf-8");
            const { data } = matter(fileContents);
            return {
              slug: file.replace(/\.(md|mdx)$/, ""),
              ...data,
            };
          })
      );
      // Sort by date, newest first
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      res.json(posts);
    } catch (error) {
      console.error("Error reading blog posts:", error);
      res.status(500).json({ error: "Failed to load blog posts" });
    }
  });

  // Get single blog post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
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

      res.json({
        slug,
        ...data,
        content: htmlContent,
      });
    } catch (error) {
      console.error("Error reading blog post:", error);
      res.status(404).json({ error: "Blog post not found" });
    }
  });

  // Decap CMS (Netlify CMS) is available at /admin
  // No backend API needed - it uses Netlify Identity and Git Gateway

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
