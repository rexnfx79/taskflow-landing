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

export default defineConfig({
  // For local development, these can be empty
  // For production with Tina Cloud, set these environment variables in Netlify
  // IMPORTANT: Tina CLI reads from process.env directly, not VITE_ prefixed vars
  clientId: process.env.TINA_CLIENT_ID || process.env.VITE_TINA_CLIENT_ID || "",
  branch:
    process.env.TINA_BRANCH ||
    process.env.VITE_TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    process.env.GITHUB_BRANCH ||
    "main",
  token: process.env.TINA_TOKEN || "",
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
