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

    <!-- Empty State -->
    <section v-else-if="!loading && caseStudies.length === 0" class="py-20 px-6 md:px-12">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-xl text-black/60">No case studies available yet.</p>
      </div>
    </section>

    <!-- Content -->
    <section v-else class="py-12 px-6 md:px-12">
      <div>
        <!-- Category Filters -->
        <div v-if="categories.length > 0" class="mb-12 flex flex-wrap gap-3">
          <button
            @click="selectedCategory = null"
            :class="[
              'px-4 py-2 rounded-lg border-2 transition-colors duration-200',
              selectedCategory === null
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black/20 hover:border-black/40'
            ]"
          >
            Semua
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-lg border-2 transition-colors duration-200 capitalize',
              selectedCategory === category
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black/20 hover:border-black/40'
            ]"
          >
            {{ category.replace('-', ' ') }}
          </button>
        </div>

        <!-- Case Studies Grid -->
        <div v-if="filteredStudies.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <RouterLink
            v-for="study in filteredStudies"
            :key="study._id"
            :to="`/case-studies/${study.slug.current}`"
            class="group block"
          >
            <div class="bg-white border border-black/10 rounded-xl overflow-hidden h-full flex flex-col">
              <div class="relative aspect-video overflow-hidden bg-black">
                <img
                  v-if="getImageUrl(study)"
                  :src="getImageUrl(study)"
                  :alt="study.featuredImage?.alt || study.title"
                  class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <div v-if="study.category" class="mb-3">
                  <span class="px-2 py-1 bg-black/5 rounded text-xs font-medium capitalize">
                    {{ study.category.replace('-', ' ') }}
                  </span>
                </div>
                <h3 class="text-xl font-medium mb-2 group-hover:underline line-clamp-2">
                  {{ study.title }}
                </h3>
                <p v-if="study.client" class="text-sm text-black/60 mb-3">
                  {{ study.client }}
                </p>
                <p class="text-sm text-black/70 line-clamp-3 mb-4 flex-1">
                  {{ study.excerpt }}
                </p>
                <div class="flex items-center gap-2 text-black/60 text-sm pt-2 border-t border-black/5">
                  <span>{{ formatDate(study.publishedAt) }}</span>
                  <span class="group-hover:text-black transition-colors font-medium">Read More →</span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

