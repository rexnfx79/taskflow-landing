# Decap CMS Quick Start Guide

Decap CMS (formerly Netlify CMS) has been successfully integrated into your project! Follow these steps to complete the setup.

## ✅ What's Been Done

- ✅ Created admin configuration (`client/public/admin/config.yml`)
- ✅ Created admin HTML page (`client/public/admin/index.html`)
- ✅ Updated `netlify.toml` with proper redirects
- ✅ Removed Tina CMS dependencies and code
- ✅ Updated build scripts

## 🚀 Next Steps (Required)

### Step 1: Enable Netlify Identity

1. Go to your Netlify site dashboard: https://app.netlify.com
2. Select your site
3. Navigate to **Site settings** → **Identity**
4. Click **Enable Identity**
5. Under **Registration preferences**, choose:
   - **Invite only** (recommended for security) - You'll need to invite users
   - **Open** - Anyone can register (less secure)

### Step 2: Enable Git Gateway

1. Still in **Site settings** → **Identity**
2. Scroll down to **Services** section
3. Find **Git Gateway**
4. Click **Enable Git Gateway**
5. This allows Decap CMS to commit changes directly to your GitHub repository

### Step 3: Install Dependencies

Run this command to remove Tina packages (they're already removed from package.json):

```bash
pnpm install
```

### Step 4: Deploy

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Migrate from Tina CMS to Decap CMS"
   git push
   ```

2. Netlify will automatically deploy

### Step 5: Access the Admin

1. Visit `https://your-site.netlify.app/admin`
2. You'll be prompted to log in with Netlify Identity
3. If you chose "Invite only", you'll need to:
   - Go to **Site settings** → **Identity** → **Invite users**
   - Enter your email and send an invitation
   - Check your email and accept the invitation

## 📝 Creating Your First Post

1. Log in to `/admin`
2. Click **New Blog Post**
3. Fill in the fields:
   - Title
   - Excerpt
   - Publish Date
   - Author
   - Tags (optional)
   - Body (markdown)
4. Click **Save**
5. Your post will be committed to GitHub and trigger a new Netlify build

## 🔧 Configuration

The CMS is configured in `client/public/admin/config.yml`. You can customize:

- **Collections**: Add more content types
- **Fields**: Modify field types and validation
- **Media folder**: Change where images are stored
- **Backend settings**: Switch to GitHub backend if needed

## 🐛 Troubleshooting

### Admin page shows blank
- Make sure `client/public/admin/index.html` exists
- Check browser console for errors
- Verify Netlify Identity is enabled

### Can't log in
- Check that Netlify Identity is enabled
- Verify Git Gateway is enabled
- Try clearing browser cache
- Check that you've been invited (if using "Invite only")

### Can't save changes
- Verify Git Gateway is enabled
- Check that the branch name in `config.yml` matches your default branch
- Ensure Netlify has access to your GitHub repository
- Check Netlify build logs for errors

### Images not uploading
- Verify `media_folder` path in `config.yml` is correct
- Check that the folder exists: `client/public/images`
- Ensure Netlify has write permissions

## 📚 Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Docs](https://docs.netlify.com/visitor-access/git-gateway/)

## 🎉 You're All Set!

Your CMS is now ready to use. All content will be stored in your GitHub repository as markdown files, just like before, but now you have a working admin interface!


