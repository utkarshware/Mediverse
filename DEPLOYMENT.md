# GitHub Pages Deployment Guide

## Step 1: Deploy Backend (Gemini API Server)

### Option A: Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to server folder: `cd public/ar-med/server`
3. Deploy: `vercel`
4. Add environment variable in Vercel dashboard:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key
5. Note your deployment URL (e.g., `https://your-project.vercel.app`)

### Option B: Render.com

1. Sign up at https://render.com
2. Create new "Web Service"
3. Connect GitHub repo
4. Set:
   - Build Command: `npm install`
   - Start Command: `node public/ar-med/server/index.js`
   - Add environment variable: `GEMINI_API_KEY=your_key`

## Step 2: Update Frontend Configuration

Create `.env` file in project root:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

Create `.env` in `public/ar-med`:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## Step 3: Deploy Frontend to GitHub Pages

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add deploy scripts to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Build and deploy:

```bash
npm run deploy
```

4. Enable GitHub Pages:
   - Go to repo Settings > Pages
   - Source: Deploy from branch `gh-pages`
   - Save

## Step 4: Deploy AR-Med App

Since you're running two React apps, you have two options:

**Option 1: Combine into one app**

- Move ar-med components into main app
- Use React Router to handle /scan route

**Option 2: Deploy ar-med separately**

1. Deploy ar-med to Vercel/Netlify
2. Update scan buttons to point to deployed URL

## Access Your App

- Main site: https://utkarshware.github.io/Mediverse
- Backend API: https://your-backend-url.vercel.app

## Important Notes

- GitHub Pages doesn't support Node.js servers
- Backend MUST be deployed separately
- Update CORS in server to allow your GitHub Pages domain
- Environment variables in GitHub Pages need to be set at build time
