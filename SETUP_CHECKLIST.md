# Setup Checklist - Online College Courses Directory

Use this checklist to ensure you've completed all setup steps before launch.

## ☑️ Pre-Launch Checklist

### Database Setup
- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Migration 1 (schema) executed successfully
- [ ] Migration 2 (search/ratings) executed successfully
- [ ] Migration 3 (reviews) executed successfully
- [ ] Tables visible in Table Editor
- [ ] RLS policies active

### Environment Configuration
- [ ] `.env` file created from `.env.example`
- [ ] `VITE_SUPABASE_URL` set correctly
- [ ] `VITE_SUPABASE_ANON_KEY` set correctly
- [ ] `astro.config.mjs` updated with actual domain
- [ ] `robots.txt` updated with actual domain

### Content Population
- [ ] At least 5 course categories added
- [ ] At least 3 colleges/institutions added
- [ ] At least 10 courses added with full details
- [ ] Course images added (or placeholders)
- [ ] College logos added
- [ ] All slugs are URL-friendly (lowercase, hyphens)

### Testing Locally
- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts successfully
- [ ] Homepage loads with courses
- [ ] Course detail pages work (`/courses/[slug]`)
- [ ] College profile pages work (`/colleges/[slug]`)
- [ ] Category pages work (`/categories/[slug]`)
- [ ] Blog index loads (`/blog`)
- [ ] Blog post pages work (`/blog/[slug]`)
- [ ] Rate My Course form loads
- [ ] Search and filters work
- [ ] Mobile responsive (test on phone)

### GitHub Repository
- [ ] Repository created on GitHub
- [ ] `.env` NOT committed (check)
- [ ] Code pushed to main branch
- [ ] Repository is public or accessible to Netlify

### Netlify Deployment
- [ ] Netlify account created
- [ ] Site imported from GitHub
- [ ] Build settings configured:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Environment variables added:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SITE_URL`
- [ ] First deployment successful
- [ ] Site accessible via Netlify URL

### Custom Domain (if applicable)
- [ ] Domain registered/available
- [ ] Domain added in Netlify
- [ ] DNS records configured:
  - A record pointing to Netlify
  - CNAME for www subdomain
- [ ] SSL certificate issued (automatic)
- [ ] Force HTTPS enabled
- [ ] Domain working (may take 24-48 hours)

### SEO Setup
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google
- [ ] Bing Webmaster Tools configured
- [ ] Sitemap submitted to Bing
- [ ] Google Analytics installed (optional)
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Images have alt text

### Content & Legal
- [ ] At least 2 blog posts published
- [ ] Affiliate disclosure page reviewed
- [ ] Contact form tested
- [ ] 404 page works
- [ ] All affiliate links use rel="nofollow"
- [ ] FTC disclosure visible on relevant pages

### Performance & Quality
- [ ] Lighthouse audit run (target: 90+ scores)
- [ ] Mobile-friendly test passed
- [ ] No console errors in browser
- [ ] All images optimized (<500KB each)
- [ ] Page load time <3 seconds
- [ ] No broken links

### Security
- [ ] Environment variables secure
- [ ] No sensitive data committed to GitHub
- [ ] HTTPS working
- [ ] Security headers configured (netlify.toml)
- [ ] RLS policies tested in Supabase

## 🚀 Launch Day Checklist

- [ ] Final content review
- [ ] All placeholder text replaced
- [ ] Social media accounts ready
- [ ] Analytics tracking verified
- [ ] Backup of database (Supabase auto-backs up)
- [ ] Monitoring setup (uptime, errors)

## 📊 Post-Launch (Week 1)

- [ ] Monitor for errors daily
- [ ] Check Google Search Console for indexing
- [ ] Respond to any user feedback
- [ ] Share on social media
- [ ] Submit to relevant directories
- [ ] Reach out to education blogs for backlinks

## 🎯 First Month Goals

- [ ] 50+ courses added
- [ ] 10+ blog posts published
- [ ] First reviews received
- [ ] 100+ organic visitors
- [ ] Site indexed in Google for main keywords

## 📈 Growth Milestones

### Month 3
- [ ] 100+ courses
- [ ] 25+ blog posts
- [ ] 50+ reviews
- [ ] 1,000+ monthly visitors
- [ ] First affiliate conversions

### Month 6
- [ ] 200+ courses
- [ ] 50+ blog posts
- [ ] 200+ reviews
- [ ] 5,000+ monthly visitors
- [ ] Consistent affiliate revenue

### Month 12
- [ ] 500+ courses
- [ ] 100+ blog posts
- [ ] 500+ reviews
- [ ] 20,000+ monthly visitors
- [ ] Profitable operation

## 🔧 Maintenance Checklist (Monthly)

- [ ] Update course information
- [ ] Moderate pending reviews
- [ ] Publish new blog content
- [ ] Check for broken links
- [ ] Review analytics data
- [ ] Update affiliate links if needed
- [ ] Respond to contact form inquiries
- [ ] Backup important data
- [ ] Check for npm package updates
- [ ] Monitor site performance

## 🆘 Emergency Contacts

**If Site Goes Down:**
1. Check Netlify status page
2. Check Supabase status page
3. Review recent deployments in Netlify
4. Check error logs in Netlify
5. Rollback to previous deployment if needed

**Support Resources:**
- Netlify Support: support.netlify.com
- Supabase Discord: supabase.com/discord
- Astro Discord: astro.build/chat

---

## Quick Start Summary

```bash
# 1. Setup
npm install
cp .env.example .env
# Edit .env with your Supabase credentials

# 2. Run migrations in Supabase SQL Editor

# 3. Add initial data via Supabase Table Editor

# 4. Test locally
npm run dev

# 5. Push to GitHub
git add .
git commit -m "Initial setup"
git push origin main

# 6. Deploy via Netlify
# Follow Netlify's GitHub import process
```

---

**✨ You're ready to launch!** Check off each item as you complete it. Good luck with your course directory!
