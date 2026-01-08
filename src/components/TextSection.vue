<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { TEXT_SECTION_QUERY, type TextSection, type TextSectionCard } from '@/sanity/queries'

const textSections = ref<TextSection[] | null>(null)
const loading = ref(true)
const visibleSections = ref<Set<string>>(new Set())
const currentSlides = ref<Record<string, number>>({})
const carouselRefs = ref<Record<string, HTMLElement | null>>({})

const getImageUrl = (card: TextSectionCard, width = 800, height = 450): string | undefined => {
  if (card.image?.asset) {
    return urlFor(card.image)
      .width(width)
      .height(height)
      .fit('crop')
      .url()
  }
  return undefined
}

const getImageAlt = (card: TextSectionCard): string => {
  const alt = card.image?.alt
  if (alt != null && alt !== '') {
    return alt
  }
  return card.title || 'Card image'
}

// Handle carousel scroll
const handleScroll = (sectionId: string) => {
  const carousel = carouselRefs.value[sectionId]
  if (!carousel) return
  const scrollLeft = carousel.scrollLeft
  const cardWidth = 280 + 16 // card width + gap
  currentSlides.value[sectionId] = Math.round(scrollLeft / cardWidth)
}

// Scroll to specific slide
const scrollToSlide = (sectionId: string, index: number) => {
  const carousel = carouselRefs.value[sectionId]
  if (!carousel) return
  const cardWidth = 280 + 16 // card width + gap
  carousel.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
          if (sectionId) {
            visibleSections.value.add(sectionId)
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  // Observe all section elements
  nextTick(() => {
    document.querySelectorAll('[data-section-id]').forEach((el) => {
      observer.observe(el)
    })
  })
}

onMounted(async () => {
  try {
    textSections.value = await client.fetch(TEXT_SECTION_QUERY)
  } catch (e) {
    console.error('Failed to fetch text sections:', e)
  } finally {
    loading.value = false
    // Setup intersection observer after content loads
    nextTick(() => {
      setupIntersectionObserver()
    })
  }
})
</script>

<template>
  <section
    v-if="textSections && textSections.length > 0 && !loading"
    class="py-20 bg-[var(--bg)]"
  >
    <div class="px-6 md:px-12">
      <div
        v-for="section in textSections"
        :key="section._id"
        :data-section-id="section._id"
        class="mb-16 last:mb-0"
      >
        <div class="mb-12">
          <!-- Section Title -->
          <h2 
            class="text-4xl md:text-5xl lg:max-w-5xl font-medium mb-6 text-[var(--fg)] transition-all duration-1000"
            :class="visibleSections.has(section._id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ section.sectionTitle }}
          </h2>

          <!-- Category Tags -->
          <div
            v-if="section.categoryTags && section.categoryTags.length > 0"
            class="flex flex-wrap gap-2 mb-6 transition-all duration-1000 delay-150"
            :class="visibleSections.has(section._id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <span
              v-for="(tag, index) in section.categoryTags"
              :key="index"
              class="px-4 py-2 bg-[var(--card)] text-[var(--fg)] rounded-full text-sm border border-gray-200"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Description -->
          <p
            v-if="section.description"
            class="text-md md:text-lg lg:max-w-5xl leading-relaxed whitespace-pre-line transition-all duration-1000 delay-300"
            :class="visibleSections.has(section._id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ section.description }}
          </p>
        </div>

        <!-- Image Cards - Horizontal scroll on mobile, grid on desktop -->
        <div class="md:hidden -mx-6">
          <div 
            v-if="section.cards && section.cards.length > 0"
            :ref="(el) => { if (el) carouselRefs[section._id] = el as HTMLElement }"
            class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide"
            @scroll="handleScroll(section._id)"
          >
            <div
              v-for="(card, cardIndex) in section.cards"
              :key="`${section._id}-card-${cardIndex}`"
              class="group cursor-pointer flex-shrink-0 w-[280px] snap-center transition-all duration-1000"
              :class="visibleSections.has(section._id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: `${450 + cardIndex * 100}ms` }"
            >
            <!-- Image -->
            <div class="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
              <img
                v-if="getImageUrl(card, 800, 450)"
                :src="getImageUrl(card, 800, 450)"
                :alt="getImageAlt(card)"
                class="w-full h-full object-cover transition-transform duration-300"
              />
              <div 
                v-else 
                class="w-full h-full flex items-center justify-center bg-gray-100 text-black/40"
              >
                No image available
              </div>
            </div>
            
            <!-- Title and Subtitle -->
            <div v-if="card.title || card.subtitle || card.ctaLink">
              <h3 class="text-2xl md:text-3xl font-medium mb-1">
                {{ card.title }}
              </h3>
              <p v-if="card.subtitle" class="text-sm text-muted mb-3">
                {{ card.subtitle }}
              </p>
              
              <!-- CTA Link -->
              <a
                v-if="card.ctaLink && card.ctaLink.label && card.ctaLink.url"
                :href="card.ctaLink.url"
                :target="card.ctaLink.isExternal ? '_blank' : '_self'"
                :rel="card.ctaLink.isExternal ? 'noopener noreferrer' : ''"
                class="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-black/70 transition-colors duration-200 group"
              >
                {{ card.ctaLink.label }}
                <svg 
                  class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Scroll Indicators (Mobile only) -->
        <div v-if="section.cards && section.cards.length > 1" class="flex justify-center gap-2 mt-4 md:hidden">
          <button
            v-for="(_, index) in section.cards"
            :key="index"
            :aria-label="`Go to card ${index + 1} of ${section.cards.length}`"
            :aria-current="currentSlides[section._id] === index ? 'true' : 'false'"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlides[section._id] === index ? 'bg-black w-6' : 'bg-gray-400'"
            @click="scrollToSlide(section._id, index)"
          ></button>
        </div>
      </div>

      <!-- Desktop Grid -->
      <div 
        v-if="section.cards && section.cards.length > 0"
        class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
      >
        <div
          v-for="(card, cardIndex) in section.cards"
          :key="`${section._id}-card-desktop-${cardIndex}`"
          class="group cursor-pointer transition-all duration-1000"
          :class="visibleSections.has(section._id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${450 + cardIndex * 100}ms` }"
        >
          <!-- Image -->
          <div class="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
            <img
              v-if="getImageUrl(card, 800, 450)"
              :src="getImageUrl(card, 800, 450)"
              :alt="getImageAlt(card)"
              class="w-full h-full object-cover transition-transform duration-300"
            />
            <div 
              v-else 
              class="w-full h-full flex items-center justify-center bg-gray-100 text-black/40"
            >
              No image available
            </div>
          </div>
          
          <!-- Title and Subtitle -->
          <div v-if="card.title || card.subtitle || card.ctaLink">
            <h3 class="text-2xl md:text-3xl font-medium mb-1">
              {{ card.title }}
            </h3>
            <p v-if="card.subtitle" class="text-sm text-muted mb-3">
              {{ card.subtitle }}
            </p>
            
            <!-- CTA Link -->
            <a
              v-if="card.ctaLink && card.ctaLink.label && card.ctaLink.url"
              :href="card.ctaLink.url"
              :target="card.ctaLink.isExternal ? '_blank' : '_self'"
              :rel="card.ctaLink.isExternal ? 'noopener noreferrer' : ''"
              class="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-black/70 transition-colors duration-200 group"
            >
              {{ card.ctaLink.label }}
              <svg 
                class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </a>
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

/* Smooth fade-in with ease-out for natural feel */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.delay-150 {
  transition-delay: 150ms;
}

.delay-300 {
  transition-delay: 300ms;
}
</style>

