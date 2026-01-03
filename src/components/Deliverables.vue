<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { DELIVERABLES_QUERY, type Deliverable } from '@/sanity/queries'

const deliverables = ref<Deliverable[]>([])
const loading = ref(true)
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const getImageUrl = (deliverable: Deliverable, width = 800, height = 800): string | undefined => {
  if (deliverable.image?.asset) {
    return urlFor(deliverable.image).width(width).height(height).quality(85).url()
  }
  return undefined
}

const getImageAlt = (deliverable: Deliverable): string => {
  const alt = deliverable.image?.alt
  if (alt != null && alt !== '') {
    return alt
  }
  return deliverable.title || 'Deliverable image'
}

// Handle carousel scroll
const handleScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  const cardWidth = 280 + 16 // card width + gap
  currentSlide.value = Math.round(scrollLeft / cardWidth)
}

// Scroll to specific slide
const scrollToSlide = (index: number) => {
  if (!carouselRef.value) return
  const cardWidth = 280 + 16
  carouselRef.value.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  try {
    const result = await client.fetch(DELIVERABLES_QUERY)
    deliverables.value = result || []
  } catch (e) {
    console.error('Failed to fetch deliverables:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && deliverables.length > 0" class="py-16 md:py-24 bg-black">
    <div class="px-6">
      <!-- Desktop Grid (4 per row) -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="deliverable in deliverables"
          :key="deliverable._id"
          class="deliverable-card group flex flex-col overflow-hidden transition-all duration-500 bg-black rounded-xl"
        >
          <!-- Image on top -->
          <div class="relative aspect-square overflow-hidden bg-black rounded-t-xl">
            <img
              v-if="getImageUrl(deliverable)"
              :src="getImageUrl(deliverable)"
              :alt="getImageAlt(deliverable)"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div 
              v-else 
              class="w-full h-full flex items-center justify-center bg-gray-200 text-black/40"
            >
              No image available
            </div>
          </div>
          
          <!-- Content below image -->
          <div class="py-6 flex flex-col flex-grow bg-black">
            <h2 class="text-3xl lg:text-4xl font-light text-white mb-4 tracking-tight leading-tight">
              {{ deliverable.title }}
            </h2>
            <p class="text-md lg:text-lg text-white/70 leading-relaxed">
              <span v-if="deliverable.highlight" class="text-white font-medium">{{ deliverable.highlight }}. </span>
              <span v-if="deliverable.highlight && deliverable.description"> </span>
              <span v-if="deliverable.description">{{ deliverable.description }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile Swipable Carousel -->
      <div class="md:hidden relative">
        <div 
          ref="carouselRef"
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
          @scroll="handleScroll"
        >
          <div
            v-for="deliverable in deliverables"
            :key="deliverable._id"
            class="deliverable-card-mobile flex-shrink-0 w-[280px] snap-center flex flex-col overflow-hidden bg-black rounded-xl"
          >
            <!-- Image on top -->
            <div class="relative aspect-square overflow-hidden bg-black rounded-t-xl">
              <img
                v-if="getImageUrl(deliverable)"
                :src="getImageUrl(deliverable)"
                :alt="getImageAlt(deliverable)"
                class="w-full h-full object-cover"
              />
              <div 
                v-else 
                class="w-full h-full flex items-center justify-center bg-gray-200 text-black/40"
              >
                No image available
              </div>
            </div>
            
            <!-- Content below image -->
            <div class="py-5 flex flex-col flex-grow bg-black">
              <h2 class="text-2xl font-light text-white mb-3 tracking-tight leading-tight">
                {{ deliverable.title }}
              </h2>
              <p class="text-sm text-white/70 leading-relaxed">
                <span v-if="deliverable.highlight" class="text-white font-medium">{{ deliverable.highlight }}. </span>
                <span v-if="deliverable.highlight && deliverable.description"> </span>
                <span v-if="deliverable.description">{{ deliverable.description }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Scroll Indicators -->
        <div class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, index) in deliverables"
            :key="index"
            :aria-label="`Go to deliverable ${index + 1} of ${deliverables.length}`"
            :aria-current="currentSlide === index ? 'true' : 'false'"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-white w-6' : 'bg-white/40'"
            @click="scrollToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Deliverable card hover effects */
.deliverable-card {
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
}

.deliverable-card:hover {
  box-shadow: 0 8px 40px rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
}

/* Mobile card styling */
.deliverable-card-mobile {
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
}
</style>
