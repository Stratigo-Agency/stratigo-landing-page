<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { CASE_STUDIES_QUERY, type CaseStudy } from '@/sanity/queries'

const caseStudies = ref<CaseStudy[]>([])
const loading = ref(true)
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

// Get featured case study (first one marked as featured, or first one)
const featuredStudy = computed(() => {
  const featured = caseStudies.value.find(cs => cs.isFeatured)
  return featured || caseStudies.value[0]
})

// Get remaining case studies (not featured)
const remainingStudies = computed(() => {
  if (!featuredStudy.value) return caseStudies.value
  return caseStudies.value.filter(cs => cs._id !== featuredStudy.value?._id)
})

const getImageUrl = (caseStudy: CaseStudy, width = 800, height = 600): string | undefined => {
  if (caseStudy.image?.asset) {
    return urlFor(caseStudy.image).width(width).height(height).url()
  }
  return undefined
}

const getImageAlt = (caseStudy: CaseStudy): string => {
  const alt = caseStudy.image?.alt
  if (alt != null && alt !== '') {
    return alt
  }
  return caseStudy.title || 'Case study image'
}

// Handle carousel scroll
const handleScroll = () => {
  const carousel = carouselRef.value
  if (!carousel) return
  const scrollLeft = carousel.scrollLeft
  const cardWidth = 280 + 16 // card width + gap
  currentSlide.value = Math.round(scrollLeft / cardWidth)
}

// Scroll to specific slide
const scrollToSlide = (index: number) => {
  const carousel = carouselRef.value
  if (!carousel) return
  const cardWidth = 280 + 16 // card width + gap
  carousel.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  try {
    const result = await client.fetch(CASE_STUDIES_QUERY)
    caseStudies.value = result || []
  } catch (e) {
    console.error('Failed to fetch case studies:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && caseStudies.length > 0" class="py-16 md:px-6 bg-white">
    <div>
      <!-- Bento Grid Layout -->
      <div class="flex flex-col gap-8">
        
        <!-- Featured Case Study (Large) -->
        <div 
          v-if="featuredStudy" 
          class="grid grid-cols-1 lg:grid-cols-2 overflow-hidden min-h-[400px] lg:min-h-[500px] rounded-xl overflow-hidden mx-6"
        >
          <!-- Left: Text Content with dark background -->
          <div class="bg-gray-100 p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
            <h2 class="text-2xl md:text-4xl lg:text-4xl font-normal text-black mb-6 tracking-tight leading-tight">
              {{ featuredStudy.title }}
            </h2>
            <p class="text-md md:text-xl text-black/70 leading-relaxed">
              <span v-if="featuredStudy.highlight" class="font-light text-black">{{ featuredStudy.highlight }}</span>
              <span v-if="featuredStudy.highlight && featuredStudy.description"> </span>
              <span v-if="featuredStudy.description">{{ featuredStudy.description }}</span>
            </p>
            <p v-if="featuredStudy.client" class="text-sm text-black/50 uppercase tracking-wider mt-6">
              {{ featuredStudy.client }}
            </p>
          </div>
          
          <!-- Right: Image takes full space -->
          <div class="order-1 lg:order-2 relative">
            <img
              v-if="getImageUrl(featuredStudy, 1600, 900)"
              :src="getImageUrl(featuredStudy, 1600, 900)"
              :alt="getImageAlt(featuredStudy)"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div 
              v-else 
              class="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200 text-black/40"
            >
              No image available
            </div>
            <!-- Mobile: ensure minimum height -->
            <div class="lg:hidden aspect-[16/9]"></div>
          </div>
        </div>

        <!-- Smaller Case Studies - Mobile Carousel -->
        <div v-if="remainingStudies.length > 0" class="md:hidden">
          <div 
            ref="carouselRef"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pl-6 scrollbar-hide"
            @scroll="handleScroll"
          >
            <div
              v-for="caseStudy in remainingStudies"
              :key="caseStudy._id"
              class="group cursor-pointer flex-shrink-0 w-[280px] snap-center"
            >
              <!-- Image -->
              <div class="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  v-if="getImageUrl(caseStudy, 800, 450)"
                  :src="getImageUrl(caseStudy, 800, 450)"
                  :alt="getImageAlt(caseStudy)"
                  class="w-full h-full object-cover transition-transform duration-300"
                />
                <div 
                  v-else 
                  class="w-full h-full flex items-center justify-center bg-gray-100 text-black/40"
                >
                  No image available
                </div>
              </div>
              
              <!-- Title and Client -->
              <div v-if="caseStudy.title || caseStudy.client">
                <h3 class="text-2xl font-light text-black mb-1">
                  {{ caseStudy.title }}
                </h3>
                <p v-if="caseStudy.client" class="text-sm text-black/50">
                  {{ caseStudy.client }}
                </p>
              </div>
            </div>
            <!-- Spacer for right padding on mobile -->
            <div class="flex-shrink-0 w-2" aria-hidden="true"></div>
          </div>

          <!-- Scroll Indicators (Mobile only) -->
          <div v-if="remainingStudies.length > 1" class="flex justify-center gap-2 mt-4">
            <button
              v-for="(_, index) in remainingStudies"
              :key="index"
              :aria-label="`Go to case study ${index + 1} of ${remainingStudies.length}`"
              :aria-current="currentSlide === index ? 'true' : 'false'"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-black w-6' : 'bg-gray-400'"
              @click="scrollToSlide(index)"
            ></button>
          </div>
        </div>

        <!-- Smaller Case Studies - Desktop Grid -->
        <div 
          v-if="remainingStudies.length > 0" 
          class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 px-6"
        >
          <div
            v-for="caseStudy in remainingStudies"
            :key="caseStudy._id"
            class="group cursor-pointer"
          >
            <!-- Image -->
            <div class="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
              <img
                v-if="getImageUrl(caseStudy, 800, 450)"
                :src="getImageUrl(caseStudy, 800, 450)"
                :alt="getImageAlt(caseStudy)"
                class="w-full h-full object-cover transition-transform duration-300"
              />
              <div 
                v-else 
                class="w-full h-full flex items-center justify-center bg-gray-100 text-black/40"
              >
                No image available
              </div>
            </div>
            
            <!-- Title and Client -->
            <div v-if="caseStudy.title || caseStudy.client">
              <h3 class="text-2xl md:text-4xl font-light text-black mb-1">
                {{ caseStudy.title }}
              </h3>
              <p v-if="caseStudy.client" class="text-sm text-black/50">
                {{ caseStudy.client }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
