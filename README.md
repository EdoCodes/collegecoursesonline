# Online College Courses Directory

A comprehensive, SEO-optimized affiliate directory for online college courses built with Astro and Supabase.

## 🚀 Features

### Core Functionality
- ✅ **Individual Course Detail Pages** - Comprehensive course information with affiliate links
- ✅ **College Profile Pages** - Institutional information with all their courses
- ✅ **Category Landing Pages** - Browse courses by subject area
- ✅ **Advanced Filtering** - Sort and filter by price, level, certificate availability
- ✅ **Search Functionality** - Find courses quickly
- 🔄 **Blog System** - Educational content for SEO (coming soon)
- 🔄 **Rate My Course** - User reviews and testimonials (coming soon)

### SEO Optimization
- ✅ Schema.org structured data (Course, Organization, BreadcrumbList)
- ✅ Dynamic meta tags (Open Graph, Twitter Cards)
- ✅ XML Sitemap generation
- ✅ Robots.txt configuration
- ✅ Mobile-responsive design
- ✅ Fast page loads optimized for Core Web Vitals

### Affiliate Features
- ✅ Affiliate link structure with proper rel attributes
- ✅ FTC disclosure on all pages
- ✅ UTM parameter support
- ✅ Click tracking ready

## 🛠️ Tech Stack

- **Framework:** [Astro 5.2.5](https://astro.build) - Fast, SEO-friendly static site generator
- **Database:** [Supabase](https://supabase.com) - PostgreSQL database with real-time capabilities
- **Styling:** Custom CSS with CSS variables
- **Deployment:** [Netlify](https://netlify.com) - Automated deployments with CDN
- **Language:** TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- A Netlify account (free tier works)
- Git installed

## 🏗️ Project Structure

```
collegecoursesonline/
├── .cursor/                 # Cursor AI configuration
│   └── scratchpad.md       # Project planning document
├── public/                  # Static assets
│   ├── robots.txt          # SEO robots configuration
│   └── favicon.svg         # Site favicon
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── CourseCard.astro
│   │   ├── Hero.astro
│   │   └── Welcome.astro
│   ├── layouts/            # Page layouts
│   │   └── Layout.astro    # Main layout with SEO meta tags
│   ├── lib/                # Utilities and configurations
│   │   └── supabase.ts     # Supabase client and TypeScript types
│   └── pages/              # File-based routing
│       ├── index.astro     # Homepage
│       ├── courses/
│       │   └── [slug].astro     # Individual course pages
│       ├── colleges/
│       │   └── [slug].astro     # College profile pages
│       └── categories/
│           └── [slug].astro     # Category landing pages
├── supabase/
│   └── migrations/         # Database migration files
├── .env.example            # Environment variables template
├── .gitignore
├── astro.config.mjs        # Astro configuration
├── netlify.toml            # Netlify deployment configuration
├── package.json
├── README.md               # This file
└── tsconfig.json

```

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/EdoCodes/collegecoursesonline.git
cd collegecoursesonline
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to initialize (~2 minutes)
3. Go to **Project Settings > API** and copy:
   - Project URL
   - `anon` public key

4. Run the database migrations:
   - Go to **SQL Editor** in Supabase Dashboard
   - Open and execute each migration file in order:
     - `supabase/migrations/20260220141244_create_online_courses_schema.sql`
     - `supabase/migrations/20260220143350_add_search_and_rating_features.sql`

### 4. Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SITE_URL=http://localhost:4321
```

### 5. Update Site Configuration

Edit `astro.config.mjs` and update the `site` URL:
```javascript
export default defineConfig({
  site: 'https://yoursite.com', // Your actual domain
  // ...
});
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📊 Populating Data

### Adding Colleges

Use the Supabase Table Editor or SQL Editor to add colleges:

```sql
INSERT INTO colleges (name, slug, description, logo_url, website_url, country, accreditation, featured)
VALUES (
  'University Name',
  'university-name',
  'Description of the university',
  'https://example.com/logo.png',
  'https://university.edu',
  'USA',
  'Regional Accreditation',
  false
);
```

### Adding Categories

```sql
INSERT INTO course_categories (name, slug, description, icon)
VALUES (
  'Computer Science',
  'computer-science',
  'Learn programming, algorithms, and software development',
  '💻'
);
```

### Adding Courses

```sql
INSERT INTO courses (
  college_id,
  category_id,
  title,
  slug,
  description,
  short_description,
  course_url,
  duration,
  level,
  price,
  certificate_available
) VALUES (
  'college-uuid-here',
  'category-uuid-here',
  'Introduction to Programming',
  'intro-to-programming',
  'Full course description...',
  'Learn the basics of programming',
  'https://college.edu/course-page',
  '8 weeks',
  'Beginner',
  'Free',
  true
);
```

## 🚀 Deployment to Netlify

### Option 1: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Netlify](https://app.netlify.com)
3. Click **Add new site > Import an existing project**
4. Connect your GitHub account and select the repository
5. Configure build settings (should auto-detect):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add environment variables in Netlify:
   - Go to **Site settings > Environment variables**
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
7. Click **Deploy**

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

## 🎨 Customization

### Update Branding

1. Replace `/public/favicon.svg` with your logo
2. Update colors in `/src/layouts/Layout.astro`:
```css
:root {
  --color-primary: #1e40af;        /* Your primary color */
  --color-secondary: #06b6d4;      /* Your secondary color */
  --color-accent: #0ea5e9;         /* Accent color */
}
```

### Add Your Domain

1. In Netlify: **Domain settings > Add custom domain**
2. Update `astro.config.mjs` with your domain
3. Update `public/robots.txt` sitemap URL

## 📝 Affiliate Program Setup

### Adding Affiliate Links

Edit courses in Supabase and add your affiliate URLs to the `course_url` field with UTM parameters:

```
https://college.edu/course?utm_source=yoursite&utm_medium=affiliate&utm_campaign=course-name
```

### FTC Disclosure

The FTC disclosure is already included on all course and college pages. You can customize it in:
- `/src/pages/courses/[slug].astro`
- `/src/pages/colleges/[slug].astro`

## 🔍 SEO Best Practices

1. **Write Unique Meta Descriptions** - Each course should have a unique description
2. **Add Alt Text to Images** - Include descriptive alt text for all course images
3. **Create Quality Content** - Add blog posts targeting relevant keywords
4. **Build Backlinks** - Reach out to education blogs for backlinks
5. **Monitor Performance** - Use Google Search Console to track rankings
6. **Regular Updates** - Keep course information up-to-date

## 📈 Analytics Setup (Optional)

### Google Analytics

1. Get your GA4 Measurement ID from Google Analytics
2. Add to `.env`:
```env
PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```
3. Add tracking script to `Layout.astro`

### Plausible Analytics (Privacy-Friendly Alternative)

Add to `<head>` in `Layout.astro`:
```html
<script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
```

## 🐛 Troubleshooting

### Build Fails with "Missing Supabase environment variables"

- Ensure you've set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in both:
  - Local `.env` file
  - Netlify environment variables

### Pages Show 404 Error

- Check that you've run the database migrations in Supabase
- Ensure you have data in the `colleges`, `course_categories`, and `courses` tables
- Verify the slugs match the URLs

### Styles Not Loading

- Clear your browser cache
- Run `npm run build` locally to check for build errors
- Check browser console for CSS loading errors

## 🎯 Roadmap

- [ ] Blog system with MDX support
- [ ] User reviews and ratings ("Rate My Course")
- [ ] Admin dashboard for content management
- [ ] Newsletter signup integration
- [ ] Course comparison tool
- [ ] User accounts with bookmarking
- [ ] Advanced search with filters
- [ ] Email notifications

## 📄 License

This project is available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation
- Review the `.cursor/scratchpad.md` for technical details

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Powered by [Supabase](https://supabase.com)
- Deployed on [Netlify](https://netlify.com)
- Icons from [Lucide](https://lucide.dev)

---

**Made with ❤️ for the online education community**
