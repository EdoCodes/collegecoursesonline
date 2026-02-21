# Deployment Guide - Online College Courses

Complete guide to deploy your course directory to Netlify with Supabase backend.

## Prerequisites

- ✅ GitHub account
- ✅ Netlify account (free tier works)
- ✅ Supabase account (free tier works)
- ✅ Custom domain (optional but recommended)

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **New Project**
3. Choose organization and project name
4. Set a strong database password (save it!)
5. Select region closest to your users
6. Wait ~2 minutes for initialization

### 1.2 Run Database Migrations

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Copy and paste the contents of each migration file IN ORDER:

**Migration 1:**
```
supabase/migrations/20260220141244_create_online_courses_schema.sql
```
Click **RUN** and wait for success message.

**Migration 2:**
```
supabase/migrations/20260220143350_add_search_and_rating_features.sql
```
Click **RUN** and wait for success message.

**Migration 3:**
```
supabase/migrations/20260220150000_create_reviews_system.sql
```
Click **RUN** and wait for success message.

### 1.3 Get API Credentials

1. Go to **Project Settings** > **API**
2. Copy the following (you'll need these later):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

⚠️ **Keep these safe but don't worry** - the `anon` key is safe to expose in client-side code.

### 1.4 Verify Tables Created

1. Go to **Table Editor**
2. Verify these tables exist:
   - `colleges`
   - `course_categories`
   - `courses`
   - `course_reviews`
   - `review_helpful_votes`

## Step 2: Prepare Your Code

### 2.1 Update Configuration Files

**Edit `astro.config.mjs`:**
```javascript
export default defineConfig({
  site: 'https://your-actual-domain.com', // Replace with your domain
  // ...
});
```

**Edit `public/robots.txt`:**
```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

### 2.2 Verify .gitignore

Ensure `.gitignore` includes:
```
.env
.env.local
.env.production
node_modules/
dist/
```

⚠️ **NEVER commit your `.env` file with real credentials!**

## Step 3: Push to GitHub

### 3.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Online college courses directory"
```

### 3.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **New Repository**
3. Name it (e.g., `collegecoursesonline`)
4. Keep it **Public** or **Private** (your choice)
5. DON'T initialize with README (you already have one)
6. Click **Create Repository**

### 3.3 Push Your Code

```bash
git remote add origin https://github.com/YourUsername/collegecoursesonline.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Netlify

### 4.1 Import Project to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** > **Import an existing project**
3. Choose **Deploy with GitHub**
4. Authorize Netlify to access your GitHub
5. Select your `collegecoursesonline` repository

### 4.2 Configure Build Settings

Netlify should auto-detect settings. Verify:

```
Build command: npm run build
Publish directory: dist
```

If not auto-detected, enter these manually.

### 4.3 Set Environment Variables

Before deploying, add environment variables:

1. Click **Advanced build settings** (or do this after initial deploy)
2. Click **Add environment variable**
3. Add each of these:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbG...your-key-here
SITE_URL = https://your-site.netlify.app (update later with custom domain)
```

### 4.4 Deploy!

1. Click **Deploy site**
2. Wait 2-3 minutes for build to complete
3. Your site is live! 🎉

You'll get a URL like: `https://random-name-123456.netlify.app`

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Custom Domain in Netlify

1. In your site dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourcoursedirectory.com`)
4. Click **Verify**

### 5.2 Configure DNS

**If your domain is on Netlify DNS:**
- Netlify handles everything automatically

**If using external DNS (GoDaddy, Namecheap, etc.):**

Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

⏱️ DNS changes can take 24-48 hours to propagate.

### 5.3 Enable HTTPS

1. Wait for DNS to propagate
2. Netlify automatically provisions SSL certificate (free)
3. Enable **Force HTTPS** in Domain settings

### 5.4 Update Configuration

Update these files with your real domain:

**`astro.config.mjs`:**
```javascript
site: 'https://your-actual-domain.com'
```

**`public/robots.txt`:**
```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

Commit and push changes:
```bash
git add .
git commit -m "Update domain configuration"
git push
```

Netlify will auto-deploy the update.

## Step 6: Populate Initial Data

### 6.1 Add Course Categories

Go to Supabase **Table Editor** > **course_categories** > **Insert row**

Example categories:
```
Computer Science | computer-science | Learn programming and software development | 💻
Business Administration | business-administration | Management, finance, and entrepreneurship | 💼
Healthcare | healthcare | Nursing, medical, and health services | 🏥
Data Science | data-science | Analytics, machine learning, and AI | 📊
```

### 6.2 Add Colleges

Go to **colleges** table > **Insert row**

Example:
```
Name: University of Example
Slug: university-of-example
Description: A leading institution in online education
Website URL: https://example.edu
Country: USA
Accreditation: Regional Accreditation
Featured: false
```

### 6.3 Add Courses

Go to **courses** table > **Insert row**

Link each course to:
- A college (select from dropdown)
- A category (select from dropdown)

Fill in all fields including:
- Title, slug, description
- Course URL (your affiliate link!)
- Duration, level, price
- Certificate availability

### 6.4 Test on Your Live Site

Visit your site and verify:
- ✅ Homepage loads with courses
- ✅ Course detail pages work
- ✅ College profile pages work
- ✅ Category pages work
- ✅ Blog pages load
- ✅ Rate My Course form works

## Step 7: SEO Setup

### 7.1 Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (your domain)
3. Verify ownership (Netlify makes this easy)
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### 7.2 Google Analytics (Optional)

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add tracking code to `Layout.astro`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 7.3 Submit to Search Engines

**Google:**
- Already done via Search Console

**Bing:**
- Go to [bing.com/webmasters](https://www.bing.com/webmasters)
- Add your site
- Submit sitemap

## Step 8: Ongoing Maintenance

### Regular Tasks

**Weekly:**
- ✅ Check for new course submissions
- ✅ Moderate pending reviews
- ✅ Monitor site performance

**Monthly:**
- ✅ Add new courses (aim for 10+ per month)
- ✅ Publish 2-4 new blog posts
- ✅ Check analytics and adjust strategy
- ✅ Update outdated course information
- ✅ Respond to user feedback

**Quarterly:**
- ✅ Review SEO performance
- ✅ Update affiliate links if needed
- ✅ Audit site speed and performance
- ✅ Check for security updates

## Troubleshooting Common Issues

### Build Fails

**Error: "Missing Supabase environment variables"**
- Solution: Check environment variables in Netlify are set correctly
- Verify variable names start with `VITE_`

**Error: "Cannot read property 'slug'"**
- Solution: Ensure you have data in your Supabase tables
- At least 1 college, 1 category, and 1 course needed

### Reviews Not Showing

**Issue: Reviews submitted but not visible**
- Check: Reviews need `status = 'approved'` to display
- Solution: Manually approve in Supabase or build moderation dashboard

### Sitemap Not Generating

**Issue: sitemap.xml shows 404**
- Solution: Rebuild site after adding courses
- Check `astro.config.mjs` has correct `site` URL

### Slow Performance

**Issue: Pages load slowly**
- Check: Large images not optimized
- Solution: Compress images, use WebP format
- Enable Netlify image optimization

## Monitoring & Analytics

### Key Metrics to Track

1. **Traffic Sources**
   - Organic search (Google, Bing)
   - Direct traffic
   - Referrals
   - Social media

2. **Top Pages**
   - Which courses get most views?
   - Which blog posts drive traffic?
   - Which categories are popular?

3. **Affiliate Performance**
   - Click-through rate on course links
   - Conversion rate (clicks → enrollments)
   - Revenue per visitor

4. **User Engagement**
   - Average time on site
   - Pages per session
   - Bounce rate
   - Review submission rate

### Tools to Use

- **Google Analytics** - Traffic and behavior
- **Google Search Console** - SEO performance
- **Netlify Analytics** - Server-side analytics (paid)
- **Supabase Dashboard** - Database queries and activity

## Scaling Your Site

### Adding More Courses

**Manual Entry:**
- Use Supabase Table Editor
- Add 5-10 courses at a time

**Bulk Import:**
- Create CSV with course data
- Use Supabase SQL import feature
- Or build admin dashboard for bulk uploads

### Growing Traffic

**SEO Strategy:**
1. Publish 2-4 blog posts per month
2. Target long-tail keywords
3. Build backlinks from education sites
4. Optimize existing content
5. Add more detailed course descriptions

**Social Media:**
- Share new courses on social platforms
- Join education-focused communities
- Engage in Reddit, Facebook groups
- Create helpful content people want to share

**Email Marketing:**
- Build email list with newsletter signup
- Send weekly course recommendations
- Share blog content via email
- Nurture leads to conversions

## Support Resources

- **Astro Docs:** [docs.astro.build](https://docs.astro.build)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Project Scratchpad:** `.cursor/scratchpad.md`

## Quick Reference Commands

```bash
# Local development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build

# Deployment (happens automatically on git push)
git add .
git commit -m "Update content"
git push origin main

# Check for issues
npm run astro check        # Type checking
```

---

## 🎉 Congratulations!

Your online college courses directory is now live and ready to generate affiliate revenue!

**Next Steps:**
1. Add 50+ courses across multiple categories
2. Write 10+ SEO-optimized blog posts
3. Encourage users to leave reviews
4. Monitor analytics and optimize
5. Build backlinks for SEO

**Questions?** Check the main README.md or open an issue on GitHub.
