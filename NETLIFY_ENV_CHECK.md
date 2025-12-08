# Netlify Environment Variables Checklist

## Required Variables for Tina CMS

In your Netlify dashboard (Site settings → Environment variables), you MUST have:

### Required Variables:
1. **`TINA_CLIENT_ID`** = Your Tina Cloud Client ID
   - This is the PRIMARY variable that Tina CLI reads during build
   - Get this from https://tina.io after connecting your repo

2. **`TINA_TOKEN`** = Your Tina Cloud Token
   - Get this from https://tina.io after connecting your repo

3. **`TINA_BRANCH`** = `main` (or your default branch name)
   - This tells Tina which Git branch to use

### Optional (for Vite runtime):
4. **`VITE_TINA_CLIENT_ID`** = Same as TINA_CLIENT_ID
   - Only needed if you want to access clientId in your React code
   - Can be the same value as TINA_CLIENT_ID

5. **`VITE_TINA_BRANCH`** = `main`
   - Only needed if you want to access branch in your React code

## Important Notes:

- **Variable names are CASE-SENSITIVE** - must be exactly as shown
- **No spaces** around the `=` sign
- **No quotes** needed around the values
- After adding/changing variables, you **MUST trigger a new deploy** (they don't apply to running builds)

## How to Verify:

1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Check that you see:
   - `TINA_CLIENT_ID` (with a value)
   - `TINA_TOKEN` (with a value)  
   - `TINA_BRANCH` (set to `main` or your branch name)
3. If any are missing, add them
4. Go to Deploys → Trigger deploy → Clear cache and deploy site
5. Check the build logs - you should see "Starting Tina build" without errors

## Common Issues:

- ❌ **"Missing clientId"** → `TINA_CLIENT_ID` not set or misspelled
- ❌ **"Missing token"** → `TINA_TOKEN` not set or misspelled  
- ❌ **Build still fails** → Variables were added but deploy wasn't triggered
- ❌ **Variables not showing** → Make sure you're in the right site's settings

## Getting Your Credentials:

1. Go to https://tina.io
2. Sign in and connect your GitHub repo (`rexnfx79/taskflow-landing`)
3. You'll see your Client ID and Token
4. Copy them exactly as shown

