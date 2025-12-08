# Tina CMS "Missing clientId" Debugging Guide

## Quick Checks

### 1. Verify Environment Variables in Netlify

Go to: **Netlify Dashboard → Your Site → Site settings → Environment variables**

**Check for these EXACT variable names (case-sensitive, no spaces):**
- `TINA_CLIENT_ID` (not `TINA_CLIENTID`, not `tina_client_id`, not `TINA-CLIENT-ID`)
- `TINA_TOKEN`
- `TINA_BRANCH`

**Common mistakes:**
- ❌ Extra spaces: `TINA_CLIENT_ID = value` (should be `TINA_CLIENT_ID=value`)
- ❌ Wrong case: `tina_client_id` (should be `TINA_CLIENT_ID`)
- ❌ Quotes around value: `TINA_CLIENT_ID="value"` (should be `TINA_CLIENT_ID=value`)
- ❌ Missing underscore: `TINACLIENTID` (should be `TINA_CLIENT_ID`)

### 2. Check Build Logs

After deploying, check the build logs for the debug output:
```
🔍 Debug: Checking environment variables...
TINA_CLIENT_ID exists: YES/NO
TINA_TOKEN exists: YES/NO
TINA_BRANCH: main
```

**If you see "NO" for TINA_CLIENT_ID:**
- The variable isn't being read during build
- Check variable name spelling
- Make sure you triggered a new deploy after adding variables

### 3. Verify Variable Values

In Netlify, click on each variable to see its value:
- `TINA_CLIENT_ID` should be a long string (starts with something like `abc123...`)
- `TINA_TOKEN` should be a long string (starts with something like `xyz789...`)
- `TINA_BRANCH` should be `main` (or your branch name)

**If values are empty or missing:**
- Re-copy from Tina Cloud dashboard
- Make sure you're copying the full value (no truncation)

### 4. Check Variable Scope

In Netlify environment variables, check:
- **Scope**: Should be "All scopes" or at least "Builds"
- **Context**: Should include "Production" (or your deploy context)

### 5. Clear Cache and Redeploy

After adding/changing variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for build to complete
4. Check build logs

### 6. Verify Tina Cloud Connection

1. Go to https://tina.io
2. Sign in and check your project
3. Verify:
   - GitHub repo is connected (`rexnfx79/taskflow-landing`)
   - Client ID and Token are visible
   - Site URL matches `https://taskflowlanding.netlify.app`

## Still Not Working?

### Option A: Test Locally

1. Create a `.env` file in your project root:
   ```
   TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_token_here
   TINA_BRANCH=main
   ```

2. Run: `pnpm build`
3. If it works locally but not on Netlify, it's a Netlify configuration issue

### Option B: Check Netlify Build Settings

1. Go to **Site settings → Build & deploy → Environment**
2. Make sure environment variables are listed there
3. Check if there are any conflicting variables

### Option C: Use Netlify CLI to Test

```bash
netlify env:list
```

This shows all environment variables for your site.

## Common Solutions

**Solution 1: Variable not in build context**
- Make sure variable scope includes "Builds"
- Redeploy after changing scope

**Solution 2: Typo in variable name**
- Double-check spelling: `TINA_CLIENT_ID` (not `TINA_CLIENTID`)
- Copy-paste the exact name from this guide

**Solution 3: Value has hidden characters**
- Delete and re-add the variable
- Copy the value directly from Tina Cloud (don't type it)

**Solution 4: Variables added but deploy not triggered**
- Always trigger a new deploy after adding/changing variables
- Variables don't apply to builds that are already running

