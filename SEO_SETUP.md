# SEO Setup Guide for Stratigo Landing Page

## Files Created for SEO

1. **`public/robots.txt`** - Tells search engines which pages to crawl
2. **`public/sitemap.xml`** - Lists all pages for search engines
3. **`src/composables/useSEO.ts`** - Composable for dynamic meta tags per page

## Setup Steps

### 1. Update Domain URLs

Replace `https://your-domain.com` with your actual domain in:

- `index.html` (multiple places):
  - Open Graph URLs
  - Canonical URL
  - Structured Data JSON-LD
  - Twitter Card URLs

- `public/robots.txt`:
  - Sitemap URL

- `public/sitemap.xml`:
  - All `<loc>` URLs

- `src/composables/useSEO.ts`:
  - `baseUrl` constant

### 2. Google Search Console Verification

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website URL)
3. Choose "HTML tag" verification method
4. Copy the `content` value from the meta tag
5. Replace `your-verification-code-here` in `index.html` line with the verification code

### 3. Generate Dynamic Sitemap (Optional)

To include blog posts in sitemap:

```bash
npm run generate-sitemap
```

This will fetch blog posts from Sanity and update `public/sitemap.xml`.

**Note:** Make sure your `.env` file has:
```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

### 4. Submit Sitemap to Google Search Console

1. Go to Google Search Console → Sitemaps
2. Enter: `https://your-domain.com/sitemap.xml`
3. Click "Submit"

### 5. Add Open Graph Image

Create an `og-image.jpg` (1200x630px) and place it in `public/` folder, then update the image URLs in `index.html`.

### 6. Test Your Setup

- **Robots.txt**: Visit `https://your-domain.com/robots.txt`
- **Sitemap**: Visit `https://your-domain.com/sitemap.xml`
- **Meta Tags**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Mobile-Friendly**: Use [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Using Dynamic SEO Per Page

Example usage in a Vue component:

```vue
<script setup lang="ts">
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Blog Post Title - Stratigo Agency',
  description: 'Blog post description...',
  image: 'https://your-domain.com/blog-image.jpg',
  type: 'article'
})
</script>
```

## Important Notes

- ✅ All pages are set to `index, follow` in robots meta tag
- ✅ Canonical URLs prevent duplicate content
- ✅ Open Graph tags for social media sharing
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Language set to Indonesian (`lang="id"`)
- ✅ Mobile-responsive viewport meta tag

## Monitoring

After deployment:
1. Submit sitemap to Google Search Console
2. Monitor indexing status in Search Console
3. Check for crawl errors
4. Monitor search performance


