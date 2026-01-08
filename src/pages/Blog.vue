<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { BLOG_POSTS_QUERY, type BlogPost } from '@/sanity/queries'

const blogPosts = ref<BlogPost[]>([])
const loading = ref(true)
const selectedCategory = ref<string | null>(null)

const getImageUrl = (post: BlogPost, width = 800, height = 450): string | undefined => {
  if (post.featuredImage?.asset) {
    return urlFor(post.featuredImage)
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

const categories = computed(() => {
  const cats = new Set<string>()
  blogPosts.value.forEach(post => {
    if (post.category) cats.add(post.category)
  })
  return Array.from(cats)
})

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return blogPosts.value
  return blogPosts.value.filter(post => post.category === selectedCategory.value)
})

const featuredPost = computed(() => {
  return filteredPosts.value.find(post => post.isFeatured) || filteredPosts.value[0]
})

const regularPosts = computed(() => {
  if (!featuredPost.value) return filteredPosts.value
  return filteredPosts.value.filter(post => post._id !== featuredPost.value?._id)
})

onMounted(async () => {
  try {
    blogPosts.value = await client.fetch(BLOG_POSTS_QUERY)
  } catch (e) {
    console.error('Failed to fetch blog posts:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-white pt-20 overflow-hidden">
    <!-- Hero Section -->
    <section class="py-16 px-6 md:px-12 bg-black text-white">
      <div>
        <h1 class="text-4xl md:text-6xl font-medium mb-6">Blog</h1>
        <p class="text-lg md:text-xl text-white/70 max-w-2xl">
          Insight, tips, dan cerita terbaru dari dunia web design dan development
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="loading" class="py-20 px-6 md:px-12">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-xl text-black/60">Loading blog posts...</p>
      </div>
    </section>

    <!-- Blog Content -->
    <section v-else-if="blogPosts.length > 0" class="py-20 px-6 md:px-12">
      <div>
        <!-- Category Filter -->
        <div v-if="categories.length > 0" class="mb-8 flex flex-wrap gap-3">
          <button
            @click="selectedCategory = null"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="selectedCategory === null 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-black hover:bg-gray-200'"
          >
            All
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize"
            :class="selectedCategory === category 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-black hover:bg-gray-200'"
          >
            {{ category.replace('-', ' ') }}
          </button>
        </div>

        <!-- Featured Post -->
        <RouterLink
          v-if="featuredPost"
          :to="`/blog/${featuredPost.slug.current}`"
          class="block mb-8 md:mb-16 no-underline group"
        >
          <div class="grid md:grid-cols-2 gap-4 items-center bg-gray-50 rounded-xl overflow-hidden">
            <!-- Image -->
            <div class="aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
              <img
                v-if="getImageUrl(featuredPost, 1200, 800)"
                :src="getImageUrl(featuredPost, 1200, 800)"
                :alt="featuredPost.featuredImage?.alt || featuredPost.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Content -->
            <div class="p-4 md:p-8 md:p-12">
              <div class="flex items-center gap-4 mb-4">
                <span v-if="featuredPost.category" class="px-3 py-1 bg-black text-white text-xs font-medium rounded-full capitalize">
                  {{ featuredPost.category.replace('-', ' ') }}
                </span>
                <span v-if="featuredPost.readTime" class="text-sm text-black/60">
                  {{ featuredPost.readTime }} min read
                </span>
              </div>

              <h2 class="text-xl md:text-4xl font-medium mb-4 text-black group-hover:text-black/70 transition-colors">
                {{ featuredPost.title }}
              </h2>

              <p class="text-black/70 mb-6 leading-relaxed">
                {{ featuredPost.excerpt }}
              </p>

              <div class="flex items-center gap-4 text-sm text-black/60">
                <span v-if="featuredPost.author">{{ featuredPost.author }}</span>
                <span>•</span>
                <span>{{ formatDate(featuredPost.publishedAt) }}</span>
              </div>
            </div>
          </div>
        </RouterLink>

        <!-- Regular Posts Grid -->
        <div v-if="regularPosts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink
            v-for="post in regularPosts"
            :key="post._id"
            :to="`/blog/${post.slug.current}`"
            class="group no-underline"
          >
            <!-- Image -->
            <div class="aspect-[16/9] overflow-hidden rounded-xl mb-4">
              <img
                v-if="getImageUrl(post, 800, 450)"
                :src="getImageUrl(post, 800, 450)"
                :alt="post.featuredImage?.alt || post.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Content -->
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span v-if="post.category" class="px-3 py-1 bg-gray-100 text-black text-xs font-medium rounded-full capitalize">
                  {{ post.category.replace('-', ' ') }}
                </span>
                <span v-if="post.readTime" class="text-sm text-black/60">
                  {{ post.readTime }} min
                </span>
              </div>

              <h3 class="text-2xl font-medium mb-2 text-black group-hover:text-black/70 transition-colors">
                {{ post.title }}
              </h3>

              <p class="text-black/70 mb-4 leading-relaxed text-sm">
                {{ post.excerpt }}
              </p>

              <div class="flex items-center gap-3 text-sm text-black/60">
                <span v-if="post.author">{{ post.author }}</span>
                <span>•</span>
                <span>{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="py-20 px-6 md:px-12">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-xl text-black/60">No blog posts found.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>

