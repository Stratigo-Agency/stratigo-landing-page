<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { HERO_QUERY, type Hero } from '@/sanity/queries'

const hero = ref<Hero | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const heroImageUrl = computed(() => {
  if (hero.value?.backgroundImage?.asset) {
    return urlFor(hero.value.backgroundImage).width(1920).height(1080).url()
  }
  return null
})

const heroVideoUrl = computed(() => {
  // Priority: backgroundVideoUrl (external URL) > backgroundVideo (Sanity file)
  if (hero.value?.backgroundVideoUrl) {
    return hero.value.backgroundVideoUrl
  }
  if (hero.value?.backgroundVideo?.asset?.url) {
    return hero.value.backgroundVideo.asset.url
  }
  return null
})

const getSocialIconPath = (platform: string) => {
  const icons: Record<string, string> = {
    twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  }
  return icons[platform] || ''
}

const scrollToPricing = () => {
  const pricingElement = document.getElementById('pricing')
  if (pricingElement) {
    pricingElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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
  <section 
    v-else-if="hero" 
    class="relative flex items-center bg-white text-black px-6 py-16 overflow-hidden h-screen"
    :style="heroImageUrl && !heroVideoUrl ? { backgroundImage: `url(${heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
  >
    <!-- Background Video -->
    <video
      v-if="heroVideoUrl"
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source :src="heroVideoUrl" type="video/mp4" />
      <source :src="heroVideoUrl" type="video/webm" />
      Your browser does not support the video tag.
    </video>
    
    <!-- Overlay for better text readability (for both image and video) -->
    <div v-if="heroImageUrl || heroVideoUrl" class="absolute inset-0 bg-black/40 z-0"></div>
    
    <!-- Grid pattern overlay (fallback when no image or video) -->
    <div v-if="!heroImageUrl && !heroVideoUrl" class="absolute inset-0 opacity-10 z-0" style="background-image: url('@/assets/pattern-2.png'); background-size: 40px 40px; background-repeat: repeat;"></div>
    
    <div class="relative z-20 w-full max-w-7xl mx-auto flex pt-20">
      <!-- Main content -->
      <div class="flex-1">
        <!-- Decorative circles -->
        <div class="flex items-center gap-4 mb-8">
          <div class="lg:w-16 lg:h-16 w-8 h-8 rounded-full border-2 border-white/30 bg-white"></div>
          <div class="lg:w-12 lg:h-12 w-8 h-8 rounded-full border-2 border-white/40 bg-white"></div>
          <div class="lg:w-8 lg:h-8 w-8 h-8 rounded-full border-2 border-white/50 relative bg-white">
            <span class="absolute inset-0 flex items-center justify-center text-white text-xl"></span>
          </div>
        </div>
        
        <!-- Two-part headline -->
        <h1 class="text-5xl md:text-8xl lg:text-8xl font-medium mb-6 tracking-tight text-white leading-tight">
          <span class="text-white">{{ hero.titlePart1 || 'Discover' }}</span>
          <span class="text-white block">{{ hero.titlePart2 || 'Innovation' }}</span>
        </h1>
        
        <!-- Subtitle -->
        <p v-if="hero.subtitle" class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          {{ hero.subtitle }}
        </p>
        
        <!-- Statistics -->
        <div v-if="hero.statistics && hero.statistics.length > 0" class="mt-16 flex gap-12">
          <div v-for="(stat, index) in hero.statistics" :key="index" class="flex flex-col">
            <span class="text-5xl md:text-6xl font-medium text-white">{{ stat.number }}+</span>
            <span class="text-lg text-white/80">{{ stat.label }}</span>
          </div>
        </div>
        
        <!-- Availability status -->
        <div v-if="hero.availabilityStatus" class="mt-8 flex items-center gap-2">
          <span class="w-2 h-2 bg-white rounded-full"></span>
          <span class="text-white/80">{{ hero.availabilityStatus }}</span>
        </div>
        
        <!-- CTA Buttons at bottom -->
        <div class="mt-16 w-full flex flex-col sm:flex-row gap-4">
          <a
            v-if="hero.ctaButton"
            :href="hero.ctaButton.link"
            class="inline-block bg-white text-black px-8 py-4 rounded-lg border-2 border-white no-underline font-medium transition-all duration-200 hover:bg-white/90 flex items-center justify-center gap-2"
          >
            {{ hero.ctaButton.label }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <button
            @click="scrollToPricing"
            class="inline-block bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white/50 font-medium transition-all duration-200 hover:bg-white/10 hover:border-white flex items-center justify-center gap-2"
          >
            Paket Kami
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Social media icons on right -->
      <div v-if="hero.socialLinks && hero.socialLinks.length > 0" class="flex flex-col gap-4 items-center">
        <a
          v-for="(social, index) in hero.socialLinks"
          :key="index"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white/20 group"
        >
          <svg v-if="getSocialIconPath(social.platform)" class="w-6 h-6 fill-white transition-colors" viewBox="0 0 24 24">
            <path :d="getSocialIconPath(social.platform)" />
          </svg>
          <span v-else class="text-sm font-bold text-white">{{ social.platform.charAt(0).toUpperCase() }}</span>
        </a>
      </div>
    </div>
  </section>
</template>


