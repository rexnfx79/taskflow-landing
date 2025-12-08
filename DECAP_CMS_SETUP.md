# Decap CMS (Netlify CMS) Setup Guide

This guide will help you migrate from Tina CMS to Decap CMS, which works seamlessly with Netlify and GitHub.

## Why Decap CMS?

- ✅ **No backend required** - Works directly with GitHub
- ✅ **Built for Netlify** - Designed specifically for this use case
- ✅ **Free forever** - Open-source, no costs
- ✅ **Git-based** - All content in your repository
- ✅ **Simple setup** - Just configuration, no complex setup

## Step 1: Install Decap CMS

```bash
pnpm add netlify-cms-app
```

## Step 2: Create Admin Configuration

Create `client/public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main # Branch to update (optional, defaults to master)

media_folder: client/public/images
public_folder: /images

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Author", name: "author", widget: "string" }
      - { label: "Tags", name: "tags", widget: "list", allow_add: true }
      - { label: "Featured Image", name: "featuredImage", widget: "image", required: false }
      - { label: "SEO Title", name: "seoTitle", widget: "string", required: false }
      - { label: "SEO Description", name: "seoDescription", widget: "text", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

## Step 3: Create Admin HTML Page

Create `client/public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Decap CMS -->
  <script src="https://unpkg.com/netlify-cms@^3.0.0/dist/netlify-cms.js"></script>
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
</body>
</html>
```

## Step 4: Enable Netlify Identity

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Identity**
3. Click **Enable Identity**
4. Under **Registration preferences**, select **Invite only** (or **Open** if you want)
5. Scroll down to **Services** → **Git Gateway**
6. Click **Enable Git Gateway**

## Step 5: Update netlify.toml

Add Identity settings to `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist/public"

# Netlify Identity
[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200

# Client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Step 6: Remove Tina CMS Dependencies

```bash
pnpm remove @tinacms/cli @tinacms/datalayer tinacms
```

## Step 7: Update Your Code

Remove Tina-specific code from your React app. The admin interface will be served directly from `/admin/index.html`.

## Step 8: Deploy and Test

1. Commit and push your changes
2. Netlify will deploy automatically
3. Visit `https://your-site.netlify.app/admin`
4. You'll be prompted to log in with Netlify Identity
5. Start creating content!

## Alternative: GitHub Backend (No Netlify Identity)

If you prefer to use GitHub authentication directly (no Netlify Identity), update `config.yml`:

```yaml
backend:
  name: github
  repo: rexnfx79/taskflow-landing # Your GitHub repo
  branch: main
  base_url: https://your-site.netlify.app # Your site URL
  auth_type: implicit # or pkce
  auth_endpoint: https://your-site.netlify.app/.netlify/functions/auth
```

Then create a Netlify Function for GitHub OAuth (more complex but gives you direct GitHub auth).

## Troubleshooting

### Admin page shows blank
- Make sure `client/public/admin/index.html` exists
- Check that the script URL is correct
- Verify Netlify Identity is enabled

### Can't log in
- Check Netlify Identity settings
- Ensure Git Gateway is enabled
- Try clearing browser cache

### Can't save changes
- Verify Git Gateway is enabled
- Check that the branch name in config.yml matches your default branch
- Ensure Netlify has access to your GitHub repo

## Migration Notes

- Your existing markdown files in `content/blog/` will work as-is
- Frontmatter format is the same
- No changes needed to your blog rendering code
- Just remove Tina-specific code

## Next Steps

Would you like me to:
1. Implement Decap CMS setup in your codebase?
2. Help migrate your content structure?
3. Set up a different CMS option?

