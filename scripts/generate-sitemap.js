/**
 * Generate sitemap.xml with blog posts from Sanity
 * Run with: node scripts/generate-sitemap.js
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
function loadEnv() {
  const envPath = path.join(__dirname, '../.env')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '')
          process.env[key.trim()] = value.trim()
        }
      }
    })
  }
}

loadEnv()

// Update these with your actual values
const SITE_URL = 'https://stratigo.co.id'
const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || ''
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production'
const SANITY_API_VERSION = process.env.VITE_SANITY_API_VERSION || '2024-01-01'

// Validate configuration
if (!SANITY_PROJECT_ID) {
  console.error('❌ Error: VITE_SANITY_PROJECT_ID not found in environment variables')
  console.error('   Make sure you have a .env file with VITE_SANITY_PROJECT_ID set')
  process.exit(1)
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true
})

// Fetch blog posts from Sanity
async function fetchBlogPosts() {
  try {
    const query = `*[_type == "blogPost" && isActive == true] | order(publishedAt desc) {
      "slug": slug.current,
      _updatedAt
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Generate sitemap XML
function generateSitemap(blogPosts = []) {
  const now = new Date().toISOString().split('T')[0]
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'monthly' }
  ]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })
  
  // Add blog posts
  blogPosts.forEach(post => {
    const lastmod = post._updatedAt 
      ? new Date(post._updatedAt).toISOString().split('T')[0]
      : now
    
    xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  })
  
  xml += `</urlset>`
  
  return xml
}

// Main function
async function main() {
  console.log('Generating sitemap...')
  console.log(`Sanity Project ID: ${SANITY_PROJECT_ID ? '✅ Configured' : '❌ Missing'}`)
  
  let blogPosts = []
  try {
    blogPosts = await fetchBlogPosts()
    console.log(`Found ${blogPosts.length} blog posts`)
  } catch (error) {
    console.warn('⚠️  Could not fetch blog posts from Sanity, generating sitemap with static pages only')
    console.warn('   Error:', error.message)
  }
  
  const sitemap = generateSitemap(blogPosts)
  const outputPath = path.join(__dirname, '../public/sitemap.xml')
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, sitemap, 'utf8')
  console.log(`✅ Sitemap generated: ${outputPath}`)
  console.log(`   - ${4 + blogPosts.length} URLs included`)
}

main().catch(error => {
  console.error('❌ Failed to generate sitemap:', error.message)
  process.exit(1)
})

