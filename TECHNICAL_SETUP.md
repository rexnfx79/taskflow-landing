# Technical Setup Documentation

Complete technical documentation for the TaskFlow blog system.

## Architecture Overview

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ├── /blog → Blog Listing Page
         ├── /blog/:slug → Individual Post
         └── /admin → Decap CMS Interface
         │
┌────────▼────────┐
│  Netlify CDN    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│Static │ │Netlify │
│Files  │ │Functions│
└───────┘ └──┬──────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐    ┌──────▼─────┐
│blog.ts │    │blog-slug.ts│
│(list)  │    │(single)    │
└───┬────┘    └──────┬─────┘
    │                │
    └───────┬────────┘
            │
    ┌───────▼────────┐
    │ content/blog/  │
    │ (markdown files)│
    └────────────────┘
```

## File Structure

```
taskflow-landing/
├── content/
│   └── blog/                    # Blog post markdown files
│       ├── 2025-01-15-deep-work.md
│       ├── 2025-02-08-smart-vs-fast-goals.md
│       └── ...
│
├── client/
│   ├── public/
│   │   ├── admin/
│   │   │   ├── index.html       # Decap CMS interface
│   │   │   └── config.yml       # CMS configuration
│   │   └── images/              # Blog images
│   │       ├── deep-work.png
│   │       └── ...
│   │
│   └── src/
│       ├── pages/
│       │   ├── Blog.tsx         # Blog listing page
│       │   └── BlogPost.tsx    # Individual post page
│       └── index.css            # Styling (includes prose rules)
│
├── netlify/
│   └── functions/
│       ├── blog.ts              # Function: Get all posts
│       └── blog-slug.ts         # Function: Get single post
│
├── server/
│   └── index.ts                # Express server (dev only)
│
└── netlify.toml                 # Netlify configuration
```

## Key Components

### 1. Decap CMS Configuration

**File**: `client/public/admin/config.yml`

**Purpose**: Configures the CMS interface, fields, and backend

**Key Settings**:
- Backend: Git Gateway (commits directly to GitHub)
- Media folder: `client/public/images`
- Collections: Blog posts with defined fields
- Markdown editor: Rich text and raw modes

### 2. Netlify Functions

#### `netlify/functions/blog.ts`

**Purpose**: Returns all blog posts as JSON

**Process**:
1. Reads all `.md` and `.mdx` files from `content/blog/`
2. Parses frontmatter using `gray-matter`
3. Returns array of post metadata (no content)
4. Sorted by date (newest first)

**Response Format**:
```json
[
  {
    "slug": "2025-01-15-deep-work",
    "title": "Deep Work Guide",
    "date": "2025-01-15",
    "author": "TaskFlow Team",
    "tags": ["productivity"],
    "image": "/images/deep-work.png",
    ...
  }
]
```

#### `netlify/functions/blog-slug.ts`

**Purpose**: Returns a single blog post with HTML content

**Process**:
1. Reads markdown file by slug
2. Parses frontmatter and content
3. Converts markdown to HTML using `remark` and `remark-html`
4. Returns post with HTML content

**Response Format**:
```json
{
  "slug": "2025-01-15-deep-work",
  "title": "Deep Work Guide",
  "content": "<h2>Introduction</h2><p>...</p>",
  ...
}
```

### 3. React Components

#### `Blog.tsx`

**Purpose**: Displays list of all blog posts

**Functionality**:
- Fetches posts from `/api/blog`
- Displays cards with:
  - Featured image
  - Title
  - Excerpt
  - Date
  - Author
  - Tags
- Links to individual posts

#### `BlogPost.tsx`

**Purpose**: Displays individual blog post

**Functionality**:
- Fetches post from `/api/blog/:slug`
- Displays:
  - Title
  - Metadata (date, author, tags)
  - Featured image
  - HTML content (from markdown)
- Uses Tailwind Typography for styling

### 4. Styling System

**File**: `client/src/index.css`

**Prose Styling**:
- Custom CSS rules for `.prose` class
- Ensures proper formatting:
  - Heading sizes and spacing
  - Paragraph spacing
  - List formatting
  - Image styling
  - Horizontal rules
  - Code blocks

**Key Classes**:
- `.prose`: Base container
- `.prose h2`: Major section headings
- `.prose p`: Paragraphs
- `.prose hr`: Horizontal rules
- `.prose img`: Images
- `.prose ul/ol`: Lists

## Build Process

### Development

1. **Start Server**:
   ```bash
   pnpm dev
   ```
   - Runs Vite dev server
   - Express server serves blog API
   - Hot reload for changes

2. **Blog API** (`server/index.ts`):
   - Serves from `content/blog/`
   - Processes markdown on-the-fly
   - Returns JSON responses

### Production Build

1. **Build Command** (`pnpm build`):
   ```bash
   vite build                    # Build React app
   esbuild server/index.ts       # Build Express server
   npm run copy-content          # Copy content for functions
   ```

2. **Content Copying**:
   - Copies `content/blog/` to `netlify/functions/content/blog/`
   - Ensures content is available to Netlify Functions

3. **Netlify Deployment**:
   - Builds static files to `dist/public`
   - Bundles functions with content via `included_files`
   - Deploys to Netlify CDN

## Netlify Configuration

### `netlify.toml`

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

[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
```

### Key Settings

- **`functions`**: Location of Netlify Functions
- **`included_files`**: Files to bundle with functions
- **Redirects**: Route API calls to functions
- **Admin redirect**: Serves Decap CMS interface

## Dependencies

### Core Dependencies

```json
{
  "@netlify/functions": "^5.1.0",    // Netlify Functions runtime
  "gray-matter": "^4.0.3",          // Frontmatter parsing
  "remark": "^15.0.1",              // Markdown processing
  "remark-html": "^16.0.1"          // Markdown to HTML
}
```

### Dev Dependencies

```json
{
  "@tailwindcss/typography": "^0.5.15",  // Typography plugin
  "tailwindcss": "^4.1.14"               // CSS framework
}
```

## Environment Setup

### Required Setup

1. **Netlify Identity**:
   - Enable in Netlify dashboard
   - Required for Decap CMS authentication

2. **Git Gateway**:
   - Enable in Netlify dashboard
   - Allows Decap CMS to commit to GitHub

3. **GitHub Repository**:
   - Connected to Netlify
   - Content stored in `content/blog/`

### No Environment Variables Required

The blog system works without any environment variables for basic functionality.

## Path Resolution

### Netlify Functions

Functions need to locate `content/blog/` directory. The `getContentPath()` function tries multiple locations:

1. `process.cwd()/content/blog` (primary)
2. `__dirname/content/blog` (if available)
3. `__dirname/../content/blog` (if available)
4. `process.cwd()/netlify/functions/content/blog` (fallback)

### Content Inclusion

- `included_files = ["content/**"]` in `netlify.toml`
- Ensures `content/blog/` is copied to function bundle
- Functions can read from `process.cwd()/content/blog`

## Markdown Processing Pipeline

```
Markdown File
    │
    ├─ gray-matter ──► Frontmatter (data)
    │                    Content (markdown)
    │
    └─ remark ────────► Process markdown
         │
         └─ remark-html ──► HTML output
```

### Processing Steps

1. **Read File**: `fs.readFile()` reads markdown file
2. **Parse Frontmatter**: `gray-matter` extracts YAML frontmatter
3. **Process Markdown**: `remark()` processes markdown syntax
4. **Convert to HTML**: `remark-html` converts to HTML
5. **Return**: JSON with frontmatter + HTML content

## Styling System

### Tailwind Typography

- Base prose classes provide default styling
- Custom CSS rules override and enhance
- Ensures consistent formatting across posts

### Custom Prose Rules

Located in `client/src/index.css`:

```css
.prose h2 {
  @apply text-3xl font-bold mb-6 mt-16;
}

.prose p {
  @apply text-muted-foreground mb-6 leading-7;
}

.prose hr {
  @apply border-white/10 my-16 border-t-2;
}
```

## API Endpoints

### Development (Express)

- `GET /api/blog` → Returns all posts
- `GET /api/blog/:slug` → Returns single post

### Production (Netlify Functions)

- `GET /.netlify/functions/blog` → Returns all posts
- `GET /.netlify/functions/blog-slug?slug=:slug` → Returns single post

### Redirects

- `/api/blog` → `/.netlify/functions/blog`
- `/api/blog/:slug` → `/.netlify/functions/blog-slug?slug=:slug`

## Error Handling

### Function Errors

- **404**: Post not found (invalid slug)
- **500**: Server error (file read, processing error)
- **400**: Missing required parameters

### Client Errors

- **Network errors**: Displayed to user
- **Invalid responses**: Logged to console
- **Missing data**: Graceful fallbacks

## Performance Considerations

### Optimization

1. **Content Bundling**: Content included in function bundle
2. **Caching**: Netlify CDN caches static files
3. **Function Cold Starts**: Minimized by bundling content
4. **Image Optimization**: Optimize images before upload

### Monitoring

- Check Netlify Function logs for errors
- Monitor function execution time
- Track API response times
- Monitor build times

## Security

### Content Security

- Markdown is sanitized during processing
- HTML output is safe (via remark-html)
- No user input directly rendered

### Authentication

- Netlify Identity for CMS access
- Git Gateway for GitHub commits
- No public write access to content

## Troubleshooting Guide

### Common Issues

1. **Functions can't find content**:
   - Check `included_files` in `netlify.toml`
   - Verify `copy-content` script runs
   - Check function logs for path errors

2. **Styling not applied**:
   - Verify CSS is built correctly
   - Check prose classes in component
   - Ensure Tailwind is configured

3. **Images not loading**:
   - Verify image paths start with `/images/`
   - Check images exist in `client/public/images/`
   - Ensure images are committed to Git

4. **CMS not working**:
   - Verify Netlify Identity is enabled
   - Check Git Gateway is enabled
   - Verify `config.yml` is valid YAML

---

**Last Updated**: December 2024

