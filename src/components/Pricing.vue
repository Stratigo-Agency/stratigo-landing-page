<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { PRICING_PACKAGES_QUERY, type PricingPackage } from '@/sanity/queries'

const pricingPackages = ref<PricingPackage[]>([])
const loading = ref(true)
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

// Handle carousel scroll
const handleScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  // Calculate card width dynamically based on viewport
  const cardElement = carouselRef.value.querySelector('.pricing-card-mobile') as HTMLElement
  const cardWidth = cardElement ? cardElement.offsetWidth + 16 : 320 + 16 // card width + gap
  currentSlide.value = Math.round(scrollLeft / cardWidth)
}

// Scroll to specific slide
const scrollToSlide = (index: number) => {
  if (!carouselRef.value) return
  const cardElement = carouselRef.value.querySelector('.pricing-card-mobile') as HTMLElement
  const cardWidth = cardElement ? cardElement.offsetWidth + 16 : 320 + 16
  carouselRef.value.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  try {
    const result = await client.fetch(PRICING_PACKAGES_QUERY)
    pricingPackages.value = result || []
  } catch (e) {
    console.error('Failed to fetch pricing packages:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && pricingPackages.length > 0" class="py-16 md:py-24 bg-white">
    <div class="px-6">
      <!-- Desktop Grid -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-6">
        <div
          v-for="pkg in pricingPackages"
          :key="pkg._id"
          class="pricing-card group relative flex flex-col overflow-hidden rounded-lg transition-all duration-500 bg-white border-2"
          :class="pkg.isPopular ? 'border-black' : 'border-gray-200'"
        >
          <!-- Content -->
          <div class="flex flex-col flex-grow p-6">
            <!-- Package Name with Popular Badge -->
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-3xl lg:text-4xl font-medium text-black tracking-tight">
                {{ pkg.packageName }}
              </h3>
              <span
                v-if="pkg.isPopular"
                class="bg-black text-white px-3 py-1 text-xs font-medium rounded-full"
              >
                Popular
              </span>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <span class="text-4xl lg:text-5xl font-light text-black">{{ pkg.price }}</span>
            </div>

            <!-- Features List -->
            <ul class="flex flex-col gap-4 mb-8 flex-grow">
              <li
                v-for="(feature, index) in pkg.features"
                :key="index"
                class="flex items-start gap-3"
              >
                <div class="flex flex-col gap-1">
                  <span class="text-base font-medium text-black leading-relaxed">{{ feature.feature }}</span>
                  <span v-if="feature.description" class="text-sm text-black/60 leading-relaxed">{{ feature.description }}</span>
                </div>
              </li>
            </ul>

            <!-- CTA Button -->
            <a
              v-if="pkg.ctaButton"
              :href="pkg.ctaButton.link"
              class="mt-auto w-full px-6 py-3 rounded-lg border-2 no-underline font-medium transition-all duration-200 flex items-center justify-center gap-2 text-center"
              :class="pkg.isPopular
                ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                : 'bg-white text-black border-black hover:bg-black hover:text-white'"
            >
              {{ pkg.ctaButton.label }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
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
            v-for="pkg in pricingPackages"
            :key="pkg._id"
            class="pricing-card-mobile flex-shrink-0 w-[85vw] max-w-[320px] snap-center flex flex-col overflow-hidden rounded-xl bg-white border-2"
            :class="pkg.isPopular ? 'border-black' : 'border-gray-200'"
          >
            <!-- Content -->
            <div class="flex flex-col flex-grow p-5">
              <!-- Package Name with Popular Badge -->
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-2xl font-medium text-black tracking-tight">
                  {{ pkg.packageName }}
                </h3>
                <span
                  v-if="pkg.isPopular"
                  class="bg-black text-white px-2 py-0.5 text-xs font-medium rounded-full"
                >
                  Popular
                </span>
              </div>

              <!-- Price -->
              <div class="mb-4">
                <span class="text-3xl font-light text-black">{{ pkg.price }}</span>
              </div>

              <!-- Features List -->
              <ul class="flex flex-col gap-3 mb-6 flex-grow">
                <li
                  v-for="(feature, index) in pkg.features"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <svg
                    class="w-4 h-4 text-black flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium text-black leading-relaxed">{{ feature.feature }}</span>
                    <span v-if="feature.description" class="text-xs text-black/60 leading-relaxed">{{ feature.description }}</span>
                  </div>
                </li>
              </ul>

              <!-- CTA Button -->
              <a
                v-if="pkg.ctaButton"
                :href="pkg.ctaButton.link"
                class="mt-auto w-full px-5 py-3 rounded-lg border-2 no-underline font-medium transition-all duration-200 flex items-center justify-center gap-2 text-center text-sm"
                :class="pkg.isPopular
                  ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'"
              >
                {{ pkg.ctaButton.label }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Scroll Indicators -->
        <div class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, index) in pricingPackages"
            :key="index"
            :aria-label="`Go to package ${index + 1} of ${pricingPackages.length}`"
            :aria-current="currentSlide === index ? 'true' : 'false'"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-black w-6' : 'bg-black/40'"
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

/* Pricing card hover effects */
.pricing-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Mobile card styling */
.pricing-card-mobile {
  min-height: 500px;
}

/* Ensure border respects border-radius */
.pricing-card-mobile {
  border-radius: 0.75rem !important; /* rounded-xl for mobile */
}

@media (min-width: 768px) {
  .pricing-card {
    border-radius: 0.5rem !important; /* rounded-lg for desktop */
  }
}
</style>
