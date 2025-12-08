# Tina CMS Setup for Netlify

## Option 1: Tina Cloud (Recommended) ⭐

Tina Cloud is the easiest way to use Tina CMS with Netlify. It handles all the backend infrastructure for you.

### Setup Steps:

1. **Sign up for Tina Cloud**
   - Go to https://tina.io
   - Create an account and connect your GitHub repository

2. **Get your credentials**
   - After connecting your repo, you'll get:
     - `Client ID`
     - `Token`

3. **Set Netlify Environment Variables**
   - Go to your Netlify site dashboard
   - Navigate to Site settings → Environment variables
   - Add these variables (IMPORTANT: Add BOTH versions):
     ```
     VITE_TINA_CLIENT_ID=your_client_id_here
     TINA_CLIENT_ID=your_client_id_here
     TINA_TOKEN=your_token_here
     VITE_TINA_BRANCH=main
     TINA_BRANCH=main
     ```
   - Note: You need both `VITE_TINA_CLIENT_ID` (for Vite) and `TINA_CLIENT_ID` (for Tina CLI build step)

4. **Redeploy**
   - Trigger a new deployment in Netlify
   - The admin interface will be available at `https://your-site.netlify.app/admin`

## Option 2: Self-Hosted (Advanced)

If you prefer to self-host, you'll need to:

1. Implement a proper Tina CMS backend in `netlify/functions/tina.ts`
2. Set up GitHub authentication
3. Handle file system operations through Git

This is more complex and not recommended unless you have specific requirements.

## Accessing the Admin Interface

Once set up, access the Tina CMS admin at:
- **Production**: `https://your-site.netlify.app/admin`
- **Local**: `http://localhost:3000/admin` (when running `pnpm dev:tina`)

## Troubleshooting

- **Admin page not loading**: Make sure `tinacms build` runs during the build process (it's included in the `build` script)
- **Can't save changes**: Verify your Tina Cloud credentials are set correctly in Netlify environment variables
- **GraphQL errors**: Check that your `.tina/config.ts` schema matches your content structure

