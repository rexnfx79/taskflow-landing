# Tina Cloud GitHub Connection Troubleshooting

## Issue: Tina Cloud can't pull from GitHub

### Step 1: Check GitHub App Permissions

1. Go to your GitHub repository: https://github.com/rexnfx79/taskflow-landing
2. Go to **Settings** → **Integrations** → **Installed GitHub Apps**
3. Find **TinaCloud** or **Tina CMS** app
4. Check that it has these permissions:
   - ✅ **Contents**: Read & Write
   - ✅ **Metadata**: Read
   - ✅ **Pull Requests**: Read & Write
   - ✅ **Webhooks**: Read & Write

**If permissions are missing:**
- Click on the TinaCloud app
- Review and approve the requested permissions
- Re-authorize if needed

### Step 2: Refresh Webhooks in Tina Cloud

1. In Tina Cloud dashboard, go to **Advanced Settings**
2. Click **"Refresh Webhooks"** button
3. Wait 1-2 minutes for webhooks to be recreated
4. Verify in GitHub:
   - Go to your repo → **Settings** → **Webhooks**
   - You should see webhooks from TinaCloud
   - They should show as "Active" (green checkmark)

### Step 3: Verify Repository Connection

1. In Tina Cloud, go to **Configuration** tab
2. Check the **Connected Repository**:
   - Should show: `rexnfx79/taskflow-landing`
   - If different, you need to reconnect

### Step 4: Check Branch Protection Rules

If your `main` branch has protection rules:

1. Go to GitHub → **Settings** → **Branches**
2. Check branch protection rules for `main`
3. Ensure TinaCloud app can bypass protection OR
4. Enable **Editorial Workflow** in Tina Cloud (creates PRs instead of direct commits)

### Step 5: Test Webhook Delivery

1. In GitHub → **Settings** → **Webhooks**
2. Find the TinaCloud webhook
3. Click on it to see recent deliveries
4. Check if there are any failed deliveries
5. If failures, click "Redeliver" to test

### Step 6: Reconnect Repository (Last Resort)

1. In Tina Cloud, disconnect the repository
2. Reconnect it:
   - Authorize the GitHub App again
   - Select the correct repository
   - Ensure all permissions are granted

### Step 7: Check Repository Visibility

- If your repo is **private**, ensure:
  - TinaCloud GitHub App has access
  - Your GitHub account has granted access
  - Organization settings allow the app (if in an org)

### Common Error Messages:

- **"Webhook delivery failed"** → Refresh webhooks in Advanced Settings
- **"Permission denied"** → Check GitHub App permissions
- **"Repository not found"** → Reconnect repository in Tina Cloud
- **"Branch protection blocking"** → Enable Editorial Workflow or adjust branch rules

### Still Not Working?

1. Check Tina Cloud dashboard for error messages
2. Check GitHub repository webhook logs
3. Contact Tina Support with:
   - Your project ID
   - Repository URL
   - Screenshot of webhook status
   - Any error messages

