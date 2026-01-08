# Google Search Console Setup & Reindexing Guide

This guide will help you submit your sitemap and request reindexing of your website in Google Search Console.

## Prerequisites

1. **Verify your website** in Google Search Console:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property: `https://stratigo.co.id`
   - Verify ownership using one of these methods:
     - HTML file upload
     - HTML tag (meta tag in `index.html`)
     - Domain name provider (DNS verification)
     - Google Analytics (if already connected)

2. **Ensure your sitemap is accessible**:
   - Visit `https://stratigo.co.id/sitemap.xml` in your browser
   - It should display the XML sitemap without errors
   - Your `robots.txt` should reference the sitemap (already configured)

## Step 1: Submit Your Sitemap

1. **Log in to Google Search Console**
   - Go to: https://search.google.com/search-console

2. **Navigate to Sitemaps**
   - In the left sidebar, click on **"Sitemaps"** (under "Indexing")

3. **Add a new sitemap**
   - In the "Add a new sitemap" field, enter:
     ```
     sitemap.xml
     ```
   - Click **"Submit"**

4. **Wait for processing**
   - Google will process your sitemap (usually takes a few minutes to hours)
   - You'll see status updates:
     - ✅ **Success**: Sitemap processed successfully
     - ⚠️ **Warning**: Some URLs couldn't be indexed (check details)
     - ❌ **Error**: Sitemap couldn't be processed (check URL format)

5. **Check sitemap status**
   - After submission, you'll see:
     - **Discovered URLs**: Number of URLs found in sitemap
     - **Submitted URLs**: URLs submitted for indexing
     - **Indexed URLs**: URLs actually indexed by Google

## Step 2: Request Indexing for Individual Pages

If you want to speed up indexing for specific pages:

1. **Use the URL Inspection Tool**
   - In Google Search Console, use the search bar at the top
   - Enter the full URL (e.g., `https://stratigo.co.id/blog/my-post`)
   - Click **"Enter"**

2. **Request Indexing**
   - Click the **"Request Indexing"** button
   - Google will add the URL to its crawl queue
   - Note: You can only request indexing for URLs you own

3. **Bulk Request (for multiple pages)**
   - Use the sitemap submission (Step 1) for bulk indexing
   - Individual requests are limited (about 10 per day per property)

## Step 3: Monitor Indexing Status

1. **Check Coverage Report**
   - Go to **"Pages"** → **"Coverage"** in the left sidebar
   - Review:
     - ✅ **Valid**: Pages indexed successfully
     - ⚠️ **Valid with warnings**: Indexed but has issues
     - ❌ **Excluded**: Pages not indexed (check reasons)

2. **Check Sitemap Status**
   - Go back to **"Sitemaps"**
   - Review the status of your submitted sitemap
   - Check for any errors or warnings

## Step 4: Update Sitemap After Changes

When you add new blog posts or pages:

1. **Regenerate the sitemap**:
   ```bash
   npm run generate-sitemap
   ```

2. **Resubmit in Google Search Console**:
   - Go to **"Sitemaps"**
   - Your existing sitemap will automatically be re-crawled
   - Or click **"Resubmit"** if available

3. **Google will automatically re-crawl**:
   - Google typically re-crawls sitemaps every few days
   - Changes are usually detected within 24-48 hours

## Troubleshooting

### Sitemap Not Found (404 Error)
- **Check**: Ensure `public/sitemap.xml` exists and is deployed
- **Verify**: Visit `https://stratigo.co.id/sitemap.xml` directly
- **Fix**: Rebuild and redeploy your site

### URLs Not Being Indexed
- **Check**: Ensure pages return HTTP 200 status
- **Check**: Verify `robots.txt` allows crawling (`Allow: /`)
- **Check**: Pages should have proper meta tags (`index, follow`)
- **Check**: Content should be substantial (not just empty pages)

### "Sitemap contains invalid URLs"
- **Check**: All URLs in sitemap must use `https://stratigo.co.id` domain
- **Check**: URLs should be absolute (not relative)
- **Fix**: Regenerate sitemap with correct domain

### "Sitemap is HTML, expected XML"
- **Check**: Ensure sitemap is served with `Content-Type: application/xml`
- **Fix**: Your hosting should serve `.xml` files correctly

## Best Practices

1. **Keep sitemap updated**: Run `npm run generate-sitemap` after adding new content
2. **Submit sitemap once**: Don't resubmit unnecessarily
3. **Monitor regularly**: Check Search Console weekly for issues
4. **Fix errors promptly**: Address any indexing errors Google reports
5. **Use canonical URLs**: Ensure each page has a canonical tag (already in `index.html`)

## Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)

## Quick Checklist

- [ ] Website verified in Google Search Console
- [ ] Sitemap accessible at `https://stratigo.co.id/sitemap.xml`
- [ ] Sitemap submitted in Google Search Console
- [ ] Sitemap status shows "Success"
- [ ] Main pages requested for indexing (optional)
- [ ] Monitoring coverage report for issues
- [ ] Set up automatic sitemap regeneration (if possible)

---

**Note**: Indexing can take time. Google typically processes sitemaps within a few hours, but full indexing of all pages may take days or weeks depending on:
- Site authority
- Page quality
- Crawl budget
- How often Google crawls your site

Be patient and monitor progress in Google Search Console!


