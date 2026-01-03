<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { HERO_QUERY, type Hero } from '@/sanity/queries'

const hero = ref<Hero | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const getImageUrl = (galleryItem: Hero['imageGallery'][0], width = 800, height = 600): string | undefined => {
  if (galleryItem?.image?.asset) {
    return urlFor(galleryItem.image)
      .width(width)
      .height(height)
      .fit('crop')
      .quality(50)
      .url()
  }
  return undefined
}

const openCalendarModal = () => {
  // Open Google Calendar scheduling page in a new window
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NKajXy840Ut9Zflq5snuW5sQslGYsAbqdai5WmP8JqV2MJo6HvEUwqUZrSEYzvj3lx5gZlg4j?gv=true'
  window.open(calendarUrl, '_blank', 'width=800,height=600')
}

onMounted(async () => {
  try {
    console.log('Fetching hero content...')
    const result = await client.fetch(HERO_QUERY)
    console.log('Hero query result:', result)
    hero.value = result
    if (!hero.value) {
      error.value = 'No hero content found. Please create a hero document in Sanity Studio with isActive set to true.'
    } else {
      console.log('Hero data loaded:', hero.value)
    }
  } catch (e) {
    console.error('Failed to fetch hero content:', e)
    error.value = e instanceof Error ? e.message : 'Failed to fetch hero content'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Loading state -->
  <section v-if="loading" class="relative min-h-screen flex items-center justify-center bg-white text-black px-6 py-16">
    <div class="text-center">
      <p class="text-xl">Loading hero content...</p>
      <p class="text-sm text-black/60 mt-2">Checking Sanity CMS...</p>
    </div>
  </section>

  <!-- Error state -->
  <section v-else-if="error || !hero" class="relative min-h-screen flex items-center justify-center bg-white text-black px-6 py-16">
    <div class="text-center">
      <p class="text-xl mb-4 text-black/60">{{ error || 'No hero content found' }}</p>
      <p class="text-sm text-black/40 mb-4">Please create a hero document in Sanity Studio with isActive set to true.</p>
      <div class="mt-8 p-4 bg-black/5 rounded border border-black/10 text-left">
        <p class="text-sm text-black/80 mb-2">Debug Info:</p>
        <p class="text-xs text-black/60">Loading: {{ loading }}</p>
        <p class="text-xs text-black/60">Has Hero: {{ !!hero }}</p>
        <p class="text-xs text-black/60">Error: {{ error || 'None' }}</p>
      </div>
    </div>
  </section>

  <!-- Hero content -->
  <section v-else-if="hero" class="relative bg-black text-white overflow-hidden pt-8">
    <!-- Image Gallery - Two rows with carousel -->
    <div class="relative py-12 md:py-16 overflow-x-hidden">
      <!-- Black Overlay -->
      <div class="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>
      <div class="relative px-6 md:px-12 lg:px-16 z-0">
        <!-- First Row - Carousel to the right -->
        <div class="flex gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4 lg:mb-5 carousel-right">
          <!-- Duplicate images for seamless loop -->
          <template v-for="(galleryItem, index) in [...hero.imageGallery, ...hero.imageGallery]" :key="`row1-${index}`">
            <div
              class="flex-shrink-0 relative"
              :class="{
                'h-[150px] md:h-[240px] lg:h-[280px]': true,
                'w-[84px] md:w-[140px] lg:w-[160px]': galleryItem.orientation === 'portrait',
                'w-[267px] md:w-[427px] lg:w-[498px]': galleryItem.orientation === 'landscape',
              }"
            >
              <div class="relative overflow-hidden rounded-lg shadow-lg h-full">
                <img
                  :src="getImageUrl(galleryItem, galleryItem.orientation === 'portrait' ? 160 : 800, galleryItem.orientation === 'portrait' ? 280 : 450)"
                  :alt="galleryItem.image?.alt || `Hero gallery image ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </template>
        </div>
        
        <!-- Second Row - Carousel to the left -->
        <div class="flex gap-3 md:gap-4 lg:gap-5 -ml-8 md:-ml-12 lg:-ml-16 carousel-left">
          <!-- Duplicate images for seamless loop -->
          <template v-for="(galleryItem, index) in [...hero.imageGallery, ...hero.imageGallery]" :key="`row2-${index}`">
            <div
              class="flex-shrink-0 relative"
              :class="{
                'h-[150px] md:h-[240px] lg:h-[280px]': true,
                'w-[84px] md:w-[140px] lg:w-[160px]': galleryItem.orientation === 'portrait',
                'w-[267px] md:w-[427px] lg:w-[498px]': galleryItem.orientation === 'landscape',
              }"
            >
              <div class="relative overflow-hidden rounded-lg shadow-lg h-full">
                <img
                  :src="getImageUrl(galleryItem, galleryItem.orientation === 'portrait' ? 160 : 800, galleryItem.orientation === 'portrait' ? 280 : 450)"
                  :alt="galleryItem.image?.alt || `Hero gallery image ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Text and CTA Section -->
    <div class="px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
      <div class="text-left">
        <!-- Title -->
        <h1 class="text-4xl md:text-6xl lg:text-6xl font-light text-white mb-6 leading-tight">
          {{ hero.title }}
        </h1>
        
        <!-- Subtitle -->
        <p v-if="hero.subtitle" class="text-lg md:text-xl text-white/70 mb-12">
          {{ hero.subtitle }}
        </p>

        <!-- CTA Buttons -->
        <div v-if="hero.ctaButtons && hero.ctaButtons.length > 0" class="flex flex-row gap-4 justify-left items-center flex-wrap">
          <template v-for="(button, index) in hero.ctaButtons" :key="index">
            <RouterLink
              v-if="!button.isExternal"
              :to="button.link"
              class="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 rounded-lg border-2 text-sm md:text-base font-medium transition-all duration-200 no-underline"
              :class="{
                'bg-white text-black border-white hover:bg-black hover:text-white': button.variant === 'primary',
                'bg-black text-white border-white hover:bg-white hover:text-black': button.variant === 'secondary',
                'bg-transparent text-white border-white hover:bg-white hover:text-black': button.variant === 'outline',
              }"
            >
              {{ button.label }}
            </RouterLink>
            <a
              v-else
              :href="button.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 rounded-lg border-2 text-sm md:text-base font-medium transition-all duration-200 no-underline"
              :class="{
                'bg-white text-black border-white hover:bg-black hover:text-white': button.variant === 'primary',
                'bg-black text-white border-white hover:bg-white hover:text-black': button.variant === 'secondary',
                'bg-transparent text-white border-white hover:bg-white hover:text-black': button.variant === 'outline',
              }"
            >
              {{ button.label }}
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </template>
          
          <!-- Booking Konsultasi Gratis Button -->
          <button
            @click="openCalendarModal"
            class="inline-flex items-center justify-center gap-2 md:gap-3 bg-transparent text-white px-4 py-2.5 md:px-8 md:py-4 rounded-lg border-2 border-white text-sm md:text-base font-medium transition-all duration-200 hover:bg-white hover:text-black"
          >
          Konsultasi Gratis
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.carousel-right {
  animation: scroll-right 30s linear infinite;
}

.carousel-left {
  animation: scroll-left 30s linear infinite;
}


</style>

