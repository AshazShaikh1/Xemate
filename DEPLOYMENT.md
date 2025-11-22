# 🚀 Deployment Guide - Vercel

This guide will help you deploy Eximate Weather Dashboard to Vercel.

## Prerequisites

- A Vercel account ([Sign up here](https://vercel.com/signup))
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))
- Your code pushed to GitHub (recommended) or ready to deploy

## Quick Deploy

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add new variable:
     - **Name:** `VITE_OPENWEATHER_API_KEY`
     - **Value:** Your OpenWeatherMap API key
     - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name? Enter a name or press Enter for default
   - Directory? `./` (default)
   - Override settings? **No**

4. **Add Environment Variable**
   ```bash
   vercel env add VITE_OPENWEATHER_API_KEY
   ```
   
   - Select environments: Production, Preview, Development
   - Enter your API key value

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required Variables

| Variable Name | Description | Where to Get |
|--------------|-------------|--------------|
| `VITE_OPENWEATHER_API_KEY` | OpenWeatherMap API key | [OpenWeatherMap API](https://openweathermap.org/api) |

### Adding Environment Variables

**Via Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with appropriate environment scope

**Via CLI:**
```bash
vercel env add VITE_OPENWEATHER_API_KEY
```

## Build Configuration

The project includes a `vercel.json` file with optimal settings:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing:** Configured for React Router
- **Caching:** Optimized for static assets

## Post-Deployment

### Verify Deployment

1. Check your deployment URL
2. Test the weather dashboard functionality
3. Verify API calls are working
4. Test on different devices/browsers

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Node.js version (18+)
- Check build logs in Vercel dashboard

### API Errors

- Verify `VITE_OPENWEATHER_API_KEY` is set correctly
- Check API key is valid and has proper permissions
- Ensure environment variable is set for all environments

### Routing Issues

- The `vercel.json` includes SPA routing configuration
- All routes should redirect to `index.html`
- If issues persist, check `vercel.json` rewrites

### Environment Variables Not Working

- Make sure variable name starts with `VITE_`
- Redeploy after adding environment variables
- Check variable is set for correct environment (Production/Preview/Development)

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches or pull requests

## Performance Optimization

The build is optimized with:
- Code splitting for vendor and chart libraries
- Asset caching headers
- Optimized bundle sizes

## Support

For issues:
1. Check Vercel deployment logs
2. Review build output
3. Verify environment variables
4. Check [Vercel Documentation](https://vercel.com/docs)

