# Tina Cloud Pull Troubleshooting

## Issue: Branch is visible but pull doesn't work

### Step 1: Verify Content Path in Tina Cloud

1. Go to https://app.tina.io
2. Open your project
3. Go to **Configuration** or **Content Modeling**
4. Check the **Content Path** for your "Blog Posts" collection
5. It should be: `content/blog`
6. If it's different (e.g., `content/posts`), update it to match your local config

### Step 2: Verify Schema Matches

Your local schema has these fields:
- `title` (string, required)
- `excerpt` (string, required)
- `date` (datetime, required)
- `author` (string, required)
- `featuredImage` (image, optional)
- `tags` (string list, optional)
- `body` (rich-text, required)
- `seoTitle` (string, optional)
- `seoDescription` (string, optional)

**In Tina Cloud:**
1. Go to **Content Modeling** or **Schema**
2. Check that your "Blog Posts" collection has the same fields
3. Field names and types must match exactly

### Step 3: Re-sync the Branch

1. In Tina Cloud dashboard, go to your project
2. Find the branch configuration for `main`
3. Click **Re-sync** or **Refresh** button
4. Wait a few minutes for it to re-index

### Step 4: Verify Files Are in GitHub

Make sure your content files are committed and pushed:

```bash
git status
git add content/blog/
git commit -m "Add blog content"
git push origin main
```

### Step 5: Check File Format

Your config specifies `format: "mdx"`, so make sure:
- Files in `content/blog/` are `.mdx` files (not just `.md`)
- Files have proper frontmatter matching your schema

### Step 6: Common Issues

**Issue: "No content found"**
- Content path mismatch between local and Tina Cloud
- Files not committed/pushed to GitHub
- Wrong file extension (.md vs .mdx)

**Issue: "Schema validation error"**
- Field names don't match
- Required fields are missing
- Field types don't match

**Issue: "Permission denied"**
- GitHub token doesn't have read access
- Branch protection rules blocking access
- Repository is private and token doesn't have access

### Step 7: Test with a Simple File

Create a test file to verify the setup:

1. Create `content/blog/test-post.mdx`:
```mdx
---
title: "Test Post"
excerpt: "This is a test"
date: "2025-12-08T00:00:00.000Z"
author: "Test Author"
tags: ["test"]
---

# Test Content

This is a test post.
```

2. Commit and push:
```bash
git add content/blog/test-post.mdx
git commit -m "Add test post"
git push origin main
```

3. Wait 2-3 minutes, then try pulling in Tina Cloud

### Step 8: Check Tina Cloud Logs

1. In Tina Cloud dashboard, check for any error messages
2. Look at the branch status - it should show "Synced" or "Ready"
3. If it shows "Error" or "Pending", there's a configuration issue

### Still Not Working?

1. **Contact Tina Support** - They can check the backend logs
2. **Try a different branch** - Create a test branch and see if that works
3. **Re-connect GitHub** - Disconnect and reconnect your GitHub repo in Tina Cloud

