import { defineConfig } from "tinacms";

// This is your one true schema
const schema = {
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/blog",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
        },
        {
          type: "string",
          label: "Excerpt",
          name: "excerpt",
          required: true,
          ui: {
            component: "textarea",
          },
        },
        {
          type: "datetime",
          label: "Published Date",
          name: "date",
          required: true,
        },
        {
          type: "string",
          label: "Author",
          name: "author",
          required: true,
        },
        {
          type: "image",
          label: "Featured Image",
          name: "featuredImage",
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true,
          ui: {
            component: "tags",
          },
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          isBody: true,
        },
        {
          type: "string",
          label: "SEO Title",
          name: "seoTitle",
        },
        {
          type: "string",
          label: "SEO Description",
          name: "seoDescription",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};

// Debug: Log environment variables (will be visible in build logs)
// Trim whitespace and ensure non-empty values
const clientId = (process.env.TINA_CLIENT_ID || process.env.VITE_TINA_CLIENT_ID || "").trim();
const token = (process.env.TINA_TOKEN || "").trim();
const branch = (
  process.env.TINA_BRANCH ||
  process.env.VITE_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  process.env.GITHUB_BRANCH ||
  "main"
).trim();

// Log for debugging (will show in build logs)
console.log("🔍 Tina Config Debug (tina/config.ts):");
console.log("  TINA_CLIENT_ID from env:", process.env.TINA_CLIENT_ID ? `${process.env.TINA_CLIENT_ID.substring(0, 10)}... (length: ${process.env.TINA_CLIENT_ID.length})` : "MISSING");
console.log("  TINA_TOKEN from env:", process.env.TINA_TOKEN ? `${process.env.TINA_TOKEN.substring(0, 10)}... (length: ${process.env.TINA_TOKEN.length})` : "MISSING");
console.log("  clientId variable (trimmed):", clientId ? `${clientId.substring(0, 10)}... (length: ${clientId.length})` : "EMPTY");
console.log("  token variable (trimmed):", token ? `${token.substring(0, 10)}... (length: ${token.length})` : "EMPTY");
console.log("  Branch:", branch);

// Validate required values
if (!clientId && process.env.NETLIFY) {
  console.error("❌ ERROR: TINA_CLIENT_ID is empty or missing!");
  console.error("   Check Netlify environment variables and ensure TINA_CLIENT_ID has a value");
}
if (!token && process.env.NETLIFY) {
  console.error("❌ ERROR: TINA_TOKEN is empty or missing!");
  console.error("   Check Netlify environment variables and ensure TINA_TOKEN has a value");
}

export default defineConfig({
  // For local development, these can be empty
  // For production with Tina Cloud, set these environment variables in Netlify
  // IMPORTANT: Tina CLI reads from process.env directly, not VITE_ prefixed vars
  clientId: clientId,
  branch: branch,
  token: token,
  // API URL configuration
  // For Tina Cloud, this is usually auto-detected, but you can override it
  // For self-hosted, set this to your API endpoint (e.g., "https://your-site.netlify.app/.netlify/functions/tina")
  contentApiUrlOverride: process.env.TINA_CONTENT_API_URL || process.env.VITE_TINA_CONTENT_API_URL || undefined,
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "client/public",
    },
  },
  build: {
    outputFolder: "admin",
    publicFolder: "client/public",
  },
  schema,
});
