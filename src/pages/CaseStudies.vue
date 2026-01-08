<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { CASE_STUDY_PAGES_QUERY, type CaseStudyPage } from '@/sanity/queries'

const caseStudies = ref<CaseStudyPage[]>([])
const loading = ref(true)
const selectedCategory = ref<string | null>(null)

const getImageUrl = (study: CaseStudyPage, width = 800, height = 450): string | undefined => {
  if (study.featuredImage?.asset) {
    return urlFor(study.featuredImage)
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
  caseStudies.value.forEach(study => {
    if (study.category) cats.add(study.category)
  })
  return Array.from(cats)
})

const filteredStudies = computed(() => {
  if (!selectedCategory.value) return caseStudies.value
  return caseStudies.value.filter(study => study.category === selectedCategory.value)
})

onMounted(async () => {
  try {
    caseStudies.value = await client.fetch(CASE_STUDY_PAGES_QUERY)
  } catch (e) {
    console.error('Failed to fetch case studies:', e)
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
        <h1 class="text-4xl md:text-6xl font-medium mb-6">Case Studies</h1>
        <p class="text-lg md:text-xl text-white/70 max-w-2xl">
          Lihat bagaimana kami membantu klien mencapai tujuan digital mereka
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="loading" class="py-20 px-6 md:px-12">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-xl text-black/60">Loading case studies...</p>
      </div>
    </section>

    <!-- Case Studies Content -->
    <section v-else-if="caseStudies.length > 0" class="py-20 px-6 md:px-12">
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

        <!-- Case Studies Grid -->
        <div v-if="filteredStudies.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink
            v-for="study in filteredStudies"
            :key="study._id"
            :to="`/case-studies/${study.slug.current}`"
            class="group no-underline"
          >
            <!-- Image -->
            <div class="aspect-[16/9] overflow-hidden rounded-xl mb-4">
              <img
                v-if="getImageUrl(study, 800, 450)"
                :src="getImageUrl(study, 800, 450)"
                :alt="study.featuredImage?.alt || study.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Content -->
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span v-if="study.category" class="px-3 py-1 bg-gray-100 text-black text-xs font-medium rounded-full capitalize">
                  {{ study.category.replace('-', ' ') }}
                </span>
                <span v-if="study.client" class="text-sm text-black/60">
                  {{ study.client }}
                </span>
              </div>

              <h3 class="text-2xl font-medium mb-2 text-black group-hover:text-black/70 transition-colors">
                {{ study.title }}
              </h3>

              <p class="text-black/70 mb-4 leading-relaxed text-sm">
                {{ study.excerpt }}
              </p>

              <div class="flex items-center gap-3 text-sm text-black/60">
                <span>{{ formatDate(study.publishedAt) }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="py-20 px-6 md:px-12">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-xl text-black/60">No case studies found.</p>
      </div>
    </section>
  </div>
</template>

