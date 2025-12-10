# Blog System Documentation

Complete guide to the TaskFlow blog system, including CMS setup, content management, formatting, and deployment.

## Table of Contents

1. [Overview](#overview)
2. [CMS Setup (Decap CMS)](#cms-setup-decap-cms)
3. [Blog Post Structure](#blog-post-structure)
4. [Adding and Editing Blog Posts](#adding-and-editing-blog-posts)
5. [Image Management](#image-management)
6. [Formatting Guidelines](#formatting-guidelines)
7. [Technical Architecture](#technical-architecture)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The TaskFlow blog system uses:
- **Decap CMS** (formerly Netlify CMS) for content management
- **Markdown files** stored in `content/blog/` directory
- **Netlify Functions** to serve blog content in production
- **React components** for displaying blog posts
- **Tailwind Typography** for styling

### Key Features

- Git-based content management (all content in repository)
- Visual markdown editor with rich text mode
- Image upload and management
- SEO-friendly structure
- Responsive design
- Fast loading with serverless functions

---

## CMS Setup (Decap CMS)

### Accessing the CMS

1. Navigate to `https://your-site.netlify.app/admin`
2. Log in with Netlify Identity
3. Create an account if you don't have one
4. Start creating and editing blog posts

### Configuration

The CMS is configured in `client/public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: client/public/images
public_folder: /images

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - label: "Title"
        name: "title"
        widget: "string"
        required: true
      - label: "Excerpt"
        name: "excerpt"
        widget: "text"
        required: true
      # ... more fields
```

### Markdown Editor Features

The markdown editor includes:
- **Rich text mode**: Visual editing with formatting toolbar
- **Raw markdown mode**: Direct markdown editing
- **Formatting buttons**: Bold, italic, headings, lists, links, code
- **Image insertion**: Direct image upload and insertion
- **Code blocks**: Syntax-highlighted code blocks

---

## Blog Post Structure

### File Naming Convention

Blog posts should be named with the date prefix:
- Format: `YYYY-MM-DD-slug.md` or `YYYY-MM-DD-slug.mdx`
- Example: `2025-01-15-deep-work.md`

### Frontmatter Structure

Every blog post must include frontmatter at the top:

```yaml
---
title: "Your Blog Post Title"
date: 2025-01-15
image: /images/your-image.png
description: "SEO description for search engines"
excerpt: "Short excerpt shown on blog listing page"
author: "TaskFlow Team"
tags: ["tag1", "tag2", "tag3"]
seoTitle: "SEO Optimized Title | TaskFlow"
seoDescription: "SEO description for meta tags"
---
```

### Required Fields

- `title`: Blog post title
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: Short description for blog listing
- `author`: Author name

### Optional Fields

- `image` or `featuredImage`: Path to featured image (`/images/filename.png`)
- `description`: Full description for SEO
- `tags`: Array of tags for categorization
- `seoTitle`: Custom SEO title
- `seoDescription`: Custom SEO description

---

## Adding and Editing Blog Posts

### Method 1: Using Decap CMS (Recommended)

1. Go to `/admin` on your site
2. Click "New Blog Post" or select an existing post
3. Fill in the frontmatter fields
4. Write your content in the markdown editor
5. Upload images using the image widget
6. Click "Publish" to commit to GitHub

### Method 2: Manual File Creation

1. Create a new file in `content/blog/` with date prefix
2. Add frontmatter with all required fields
3. Write markdown content
4. Commit and push to GitHub
5. Netlify will automatically rebuild

### Content Guidelines

- **Paragraphs**: Keep paragraphs to 2-4 sentences for readability
- **Headings**: Use H2 for major sections, H3 for subsections
- **Sections**: Add horizontal rules (`---`) between major sections
- **Lists**: Use bullet points or numbered lists for clarity
- **Images**: Include relevant images with descriptive alt text

---

## Image Management

### Image Storage

- **Location**: `client/public/images/`
- **Public URL**: `/images/filename.png`
- **Formats**: PNG, JPG, JPEG, SVG, WebP

### Adding Images

#### Through Decap CMS:
1. Click the image widget in the editor
2. Upload from your computer
3. Image is automatically saved to `client/public/images/`
4. Reference in markdown: `![Alt text](/images/filename.png)`

#### Manually:
1. Add image file to `client/public/images/`
2. Reference in markdown: `![Alt text](/images/filename.png)`

### Image Best Practices

- **File names**: Use descriptive, lowercase names with hyphens
  - Good: `deep-work-productivity.png`
  - Bad: `IMG_1234.jpg`
- **Alt text**: Always include descriptive alt text
- **Sizes**: Optimize images before uploading (recommended: max 1200px width)
- **Featured images**: Use for blog post thumbnails (1200x630px recommended)

---

## Formatting Guidelines

### Markdown Formatting

The blog posts use standard markdown with these conventions:

#### Headings

```markdown
## Major Section (H2)

### Subsection (H3)

#### Minor Section (H4)
```

#### Paragraphs

- Keep paragraphs to 2-4 sentences
- Add blank lines between paragraphs
- Use shorter paragraphs for better readability

#### Lists

```markdown
- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3
```

#### Emphasis

```markdown
**Bold text** for important points
*Italic text* for emphasis
`Code` for technical terms
```

#### Links

```markdown
[Link text](https://example.com)
```

#### Images

```markdown
![Alt text](/images/filename.png)
```

#### Horizontal Rules

Use `---` between major sections for visual separation:

```markdown
---

## Next Major Section
```

#### Code Blocks

```markdown
\`\`\`javascript
const code = "example";
\`\`\`
```

### Visual Formatting

The blog posts are automatically styled with:
- **Headings**: Large, bold, with proper spacing
- **Paragraphs**: Comfortable line height and spacing
- **Lists**: Proper indentation and spacing
- **Images**: Rounded corners, borders, shadows
- **Code**: Highlighted with background color
- **Horizontal rules**: Visible separators between sections

### SEO Optimization

- **Title**: Include primary keyword, keep under 60 characters
- **Description**: 150-160 characters, include keywords naturally
- **Headings**: Use keywords in H2 and H3 headings
- **Content**: Aim for 2000-3000 words for comprehensive posts
- **Tags**: Use relevant tags for categorization

---

## Technical Architecture

### File Structure

```
taskflow-landing/
├── content/
│   └── blog/
│       ├── 2025-01-15-deep-work.md
│       ├── 2025-02-08-smart-vs-fast-goals.md
│       └── ...
├── client/
│   ├── public/
│   │   ├── admin/
│   │   │   ├── index.html (Decap CMS interface)
│   │   │   └── config.yml (CMS configuration)
│   │   └── images/ (blog images)
│   └── src/
│       └── pages/
│           ├── Blog.tsx (blog listing page)
│           └── BlogPost.tsx (individual post page)
├── netlify/
│   └── functions/
│       ├── blog.ts (fetch all posts)
│       └── blog-slug.ts (fetch single post)
└── netlify.toml (Netlify configuration)
```

### How It Works

#### Development (Local)

1. **Express Server** (`server/index.ts`):
   - Serves blog posts from `content/blog/`
   - Processes markdown with `remark` and `remark-html`
   - Returns JSON with blog post data

2. **React Components**:
   - `Blog.tsx`: Fetches all posts from `/api/blog`
   - `BlogPost.tsx`: Fetches single post from `/api/blog/:slug`
   - Displays content with Tailwind Typography styling

#### Production (Netlify)

1. **Netlify Functions**:
   - `netlify/functions/blog.ts`: Returns all blog posts
   - `netlify/functions/blog-slug.ts`: Returns single post by slug
   - Functions read from `content/blog/` (included via `included_files`)

2. **Redirects** (`netlify.toml`):
   - `/api/blog` → `/.netlify/functions/blog`
   - `/api/blog/:slug` → `/.netlify/functions/blog-slug?slug=:slug`
   - `/admin` → `/admin/index.html` (Decap CMS)

3. **Content Inclusion**:
   - `netlify.toml` includes `content/**` in function bundle
   - Ensures blog posts are available to functions at runtime

### Markdown Processing

Blog posts are processed using:
- **gray-matter**: Parses frontmatter from markdown files
- **remark**: Processes markdown content
- **remark-html**: Converts markdown to HTML
- **Tailwind Typography**: Styles the HTML output

### Styling

Blog post styling is handled by:
- **Tailwind Typography**: Base prose styles
- **Custom CSS**: Explicit rules in `client/src/index.css` for:
  - Heading sizes and spacing
  - Paragraph spacing
  - List formatting
  - Image styling
  - Horizontal rules
  - Code blocks

---

## Deployment

### Build Process

1. **Content Copying**:
   ```bash
   npm run copy-content
   ```
   - Copies `content/blog/` to `netlify/functions/content/blog/`
   - Ensures content is available to Netlify Functions

2. **Build**:
   ```bash
   npm run build
   ```
   - Builds React app
   - Builds Express server
   - Copies content for functions

3. **Deploy**:
   - Push to GitHub
   - Netlify automatically builds and deploys
   - Functions are bundled with content via `included_files`

### Netlify Configuration

Key settings in `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist/public"
  functions = "netlify/functions"

[functions]
  included_files = ["content/**"]

[[redirects]]
  from = "/api/blog"
  to = "/.netlify/functions/blog"
  status = 200

[[redirects]]
  from = "/api/blog/:slug"
  to = "/.netlify/functions/blog-slug?slug=:slug"
  status = 200
```

### Environment Variables

No environment variables required for basic blog functionality.

---

## Troubleshooting

### Blog Posts Not Showing

**Problem**: Blog posts don't appear on `/blog` page

**Solutions**:
1. Check Netlify Function logs for errors
2. Verify `content/blog/` files exist and have valid frontmatter
3. Ensure `included_files = ["content/**"]` in `netlify.toml`
4. Check that build script runs `copy-content`

### Images Not Loading

**Problem**: Images show as broken

**Solutions**:
1. Verify image path starts with `/images/`
2. Check image exists in `client/public/images/`
3. Ensure image file is committed to Git
4. Verify `public_folder: /images` in `config.yml`

### CMS Admin Page Blank

**Problem**: `/admin` page is blank or shows errors

**Solutions**:
1. Check browser console for errors
2. Verify `client/public/admin/index.html` exists
3. Check `client/public/admin/config.yml` is valid YAML
4. Ensure Netlify Identity is enabled in Netlify dashboard
5. Verify Git Gateway is enabled in Netlify dashboard

### Formatting Issues

**Problem**: Blog posts don't have proper spacing or formatting

**Solutions**:
1. Check `client/src/index.css` has prose styling rules
2. Verify Tailwind CSS is building correctly
3. Clear browser cache and hard refresh
4. Check that prose classes are applied in `BlogPost.tsx`

### 500 Errors on Blog Posts

**Problem**: Getting 500 errors when viewing blog posts

**Solutions**:
1. Check Netlify Function logs
2. Verify markdown files are valid
3. Check that `remark` and `remark-html` are installed
4. Ensure content path is correct in function code
5. Verify `included_files` includes `content/**`

### Content Not Updating After Deploy

**Problem**: Changes to blog posts don't appear after deployment

**Solutions**:
1. Verify changes are committed and pushed to GitHub
2. Check Netlify build logs for errors
3. Ensure `copy-content` script runs during build
4. Clear Netlify cache if needed
5. Verify `included_files` configuration

---

## Best Practices

### Content Creation

1. **Write for your audience**: Focus on value and actionable insights
2. **Use clear headings**: Make content scannable with proper heading hierarchy
3. **Include examples**: Use real-world examples to illustrate points
4. **Add images**: Include relevant images to break up text
5. **Optimize for SEO**: Use keywords naturally, write comprehensive content

### Technical

1. **Test locally**: Always test blog posts locally before deploying
2. **Validate frontmatter**: Ensure all required fields are present
3. **Optimize images**: Compress images before uploading
4. **Use descriptive slugs**: Make file names descriptive and SEO-friendly
5. **Keep content in Git**: All content should be version controlled

### Maintenance

1. **Regular updates**: Keep blog content fresh and relevant
2. **Monitor performance**: Check analytics for popular posts
3. **Fix broken links**: Regularly check for broken internal/external links
4. **Update images**: Replace outdated images as needed
5. **Review SEO**: Periodically review and update SEO metadata

---

## Quick Reference

### Creating a New Blog Post

1. Go to `/admin`
2. Click "New Blog Post"
3. Fill in:
   - Title
   - Excerpt
   - Date
   - Author
   - Tags (optional)
   - Featured Image (optional)
4. Write content in markdown editor
5. Click "Publish"

### File Structure Template

```markdown
---
title: "Your Blog Post Title"
date: 2025-01-15
image: /images/your-image.png
description: "SEO description"
excerpt: "Short excerpt for listing"
author: "TaskFlow Team"
tags: ["tag1", "tag2"]
seoTitle: "SEO Title | TaskFlow"
seoDescription: "SEO description"
---

![Image Alt Text](/images/your-image.png)

## Introduction

Your introduction paragraph here.

---

## Main Section

Content here with proper paragraph breaks.

### Subsection

More content.

---

## Conclusion

Final thoughts.
```

### Common Commands

```bash
# Build locally
pnpm build

# Run development server
pnpm dev

# Copy content for functions
pnpm run copy-content

# Check TypeScript
pnpm check

# Format code
pnpm format
```

---

## Support

For issues or questions:
1. Check Netlify Function logs
2. Review browser console for errors
3. Verify configuration files are correct
4. Check this documentation first
5. Review GitHub issues if applicable

---

**Last Updated**: December 2024
**Maintained By**: TaskFlow Team

