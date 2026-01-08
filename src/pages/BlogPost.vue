<script setup lang="ts">
import { ref, onMounted, h, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY, type BlogPost } from '@/sanity/queries'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const blogPost = ref<BlogPost | null>(null)
const allBlogPosts = ref<BlogPost[]>([])
const loading = ref(true)

// Function to fetch blog post data
const fetchBlogPost = async (slug: string) => {
  loading.value = true
  try {
    const [post, posts] = await Promise.all([
      client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }),
      allBlogPosts.value.length > 0 ? Promise.resolve(allBlogPosts.value) : client.fetch(BLOG_POSTS_QUERY)
    ])
    blogPost.value = post
    if (!allBlogPosts.value.length) {
      allBlogPosts.value = posts || []
    }
    // Scroll to top when content loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    console.error('Failed to fetch blog post:', e)
  } finally {
    loading.value = false
  }
}

// Watch for route param changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug && typeof newSlug === 'string') {
      fetchBlogPost(newSlug)
    }
  }
)

const relatedPosts = computed(() => {
  if (!blogPost.value || !allBlogPosts.value.length) return []
  
  // Filter out current post and get up to 3 related posts
  const filtered = allBlogPosts.value
    .filter(post => post._id !== blogPost.value?._id)
    .slice(0, 3)
  
  return filtered
})

const getImageUrl = (image: any, width = 1200, height = 600): string | undefined => {
  if (image?.asset) {
    return urlFor(image)
      .width(width)
      .height(height)
      .fit('crop')
      .url()
  }
  return undefined
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Portable Text Components - using any to bypass strict typing
const portableTextComponents: any = {
  types: {
    image: (props: any) => {
      const imageUrl = getImageUrl(props.value, 1200, 800)
      return h('figure', { class: 'my-8' }, [
        h('img', {
          src: imageUrl,
          alt: props.value?.alt || '',
          class: 'w-full rounded-xl'
        }),
        props.value?.caption ? h('figcaption', { class: 'text-center text-sm text-black/60 mt-3' }, props.value.caption) : null
      ])
    },
    table: (props: any) => {
      if (!props.value?.rows) return null
      return h('div', { class: 'my-8 overflow-x-auto' }, [
        h('table', { class: 'w-full border-collapse' }, [
          h('tbody', {},
            props.value.rows.map((row: any, rowIndex: number) =>
              h('tr', {
                class: rowIndex === 0 ? 'bg-black text-white' : rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                key: rowIndex
              },
                row.cells?.map((cell: string, cellIndex: number) =>
                  h('td', {
                    class: `border border-gray-200 px-4 py-3 text-left ${rowIndex === 0 ? 'font-medium' : ''}`,
                    key: cellIndex
                  }, cell)
                )
              )
            )
          )
        ])
      ])
    }
  },
  block: {
    h2: (_: any, { slots }: any) => h('h2', { class: 'text-3xl md:text-4xl font-medium mt-12 mb-6 text-black' }, slots.default?.()),
    h3: (_: any, { slots }: any) => h('h3', { class: 'text-2xl md:text-3xl font-medium mt-10 mb-4 text-black' }, slots.default?.()),
    h4: (_: any, { slots }: any) => h('h4', { class: 'text-xl md:text-2xl font-medium mt-8 mb-4 text-black' }, slots.default?.()),
    normal: (_: any, { slots }: any) => h('p', { class: 'text-lg leading-relaxed mb-6 text-black/80' }, slots.default?.()),
    blockquote: (_: any, { slots }: any) => h('blockquote', { class: 'border-l-4 border-black pl-6 py-2 my-8 italic text-xl text-black/70' }, slots.default?.())
  },
  list: {
    bullet: (_: any, { slots }: any) => h('ul', { class: 'list-disc list-inside mb-6 space-y-2 text-lg text-black/80' }, slots.default?.()),
    number: (_: any, { slots }: any) => h('ol', { class: 'list-decimal list-inside mb-6 space-y-2 text-lg text-black/80' }, slots.default?.())
  },
  listItem: {
    bullet: (_: any, { slots }: any) => h('li', { class: 'ml-4' }, slots.default?.()),
    number: (_: any, { slots }: any) => h('li', { class: 'ml-4' }, slots.default?.())
  },
  marks: {
    strong: (_: any, { slots }: any) => h('strong', { class: 'font-semibold' }, slots.default?.()),
    em: (_: any, { slots }: any) => h('em', { class: 'italic' }, slots.default?.()),
    code: (_: any, { slots }: any) => h('code', { class: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono' }, slots.default?.()),
    link: (props: any, { slots }: any) => h('a', {
      href: props.value?.href,
      class: 'text-black underline hover:text-black/70 transition-colors',
      target: '_blank',
      rel: 'noopener noreferrer'
    }, slots.default?.())
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  if (slug) {
    fetchBlogPost(slug)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white pt-20 overflow-hidden">
    <!-- Loading State -->
    <section v-if="loading" class="py-20 px-6 md:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-xl text-black/60">Loading...</p>
      </div>
    </section>

    <!-- Blog Post Content -->
    <article v-else-if="blogPost" class="py-12 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-8">
        <!-- Back Link -->
        <RouterLink 
          to="/blog" 
          class="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8 no-underline"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </RouterLink>

        <!-- Meta Information -->
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <span v-if="blogPost.category" class="px-4 py-2 bg-black text-white text-sm font-medium rounded-full capitalize">
              {{ blogPost.category.replace('-', ' ') }}
            </span>
            <span v-if="blogPost.readTime" class="text-black/60">
              {{ blogPost.readTime }} min read
            </span>
            <span class="text-black/60">
              {{ formatDate(blogPost.publishedAt) }}
            </span>
          </div>

          <h1 class="text-2xl md:text-5xl lg:text-5xl font-medium mb-6 text-black leading-tight">
            {{ blogPost.title }}
          </h1>

          <p v-if="blogPost.author" class="text-lg text-black/70">
            By {{ blogPost.author }}
          </p>
        </div>

        <!-- Featured Image -->
        <div v-if="blogPost.featuredImage" class="mb-12">
          <img
            :src="getImageUrl(blogPost.featuredImage, 1200, 600)"
            :alt="blogPost.featuredImage.alt || blogPost.title"
            class="w-full rounded-xl"
          />
        </div>

        <!-- Content -->
        <div class="blog-content">
          <div v-if="!blogPost.content || blogPost.content.length === 0" class="text-black/60">
            No content available
          </div>
          <PortableText 
            v-else
            :value="blogPost.content" 
            :components="portableTextComponents"
          />
        </div>

        <!-- Tags -->
        <div v-if="blogPost.tags && blogPost.tags.length > 0" class="mt-12 pt-8 border-t border-gray-200">
          <h3 class="text-sm font-medium text-black/60 mb-4">Tags:</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in blogPost.tags"
              :key="index"
              class="px-3 py-1 bg-gray-100 text-black text-sm rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

          <!-- Back to Blog CTA -->
          <div class="mt-16 pt-8 border-t border-gray-200 text-center">
            <RouterLink 
              to="/blog" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition-colors no-underline"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Lihat Semua Artikel
            </RouterLink>
          </div>
        </div>

        <!-- Sidebar - Related Posts (Desktop Only) -->
        <aside class="hidden lg:block lg:col-span-4 self-start">
          <div class="sticky top-24">
            <h3 class="text-xl font-medium mb-6 text-black">Related Posts</h3>
            
            <div v-if="relatedPosts.length > 0" class="space-y-6">
              <RouterLink
                v-for="post in relatedPosts"
                :key="post._id"
                :to="`/blog/${post.slug.current}`"
                class="block group no-underline"
              >
                <!-- Image -->
                <div class="aspect-[16/9] overflow-hidden rounded-lg mb-3">
                  <img
                    v-if="getImageUrl(post.featuredImage, 400, 225)"
                    :src="getImageUrl(post.featuredImage, 400, 225)"
                    :alt="post.featuredImage?.alt || post.title"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <!-- Category -->
                <span v-if="post.category" class="text-xs font-medium text-black/60 uppercase tracking-wide">
                  {{ post.category.replace('-', ' ') }}
                </span>

                <!-- Title -->
                <h4 class="text-base font-medium text-black mt-2 group-hover:text-black/70 transition-colors line-clamp-2">
                  {{ post.title }}
                </h4>

                <!-- Meta -->
                <div class="flex items-center gap-2 mt-2 text-xs text-black/60">
                  <span v-if="post.readTime">{{ post.readTime }} min read</span>
                  <span v-if="post.readTime">•</span>
                  <span>{{ formatDate(post.publishedAt) }}</span>
                </div>
              </RouterLink>
            </div>

            <div v-else class="text-sm text-black/60">
              No related posts available
            </div>
          </div>
        </aside>

        </div>
      </div>
    </article>

    <!-- Not Found State -->
    <section v-else class="py-20 px-6 md:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-medium mb-4">Post Not Found</h1>
        <p class="text-xl text-black/60 mb-8">The blog post you're looking for doesn't exist.</p>
        <RouterLink 
          to="/blog" 
          class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition-colors no-underline"
        >
          Back to Blog
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
article {
  min-height: 0;
}

.blog-content {
  max-width: 100%;
  min-height: 0;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
}

.blog-content :deep(h2) {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.blog-content :deep(h3) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.blog-content :deep(h4) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-bottom: 1.5rem;
}

.blog-content :deep(blockquote) {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.blog-content :deep(figure) {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.blog-content :deep(table) {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure sidebar doesn't cause layout issues */
aside {
  min-height: 0;
}
</style>

