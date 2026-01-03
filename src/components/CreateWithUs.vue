<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { CREATE_WITH_US_QUERY, type CreateWithUs } from '@/sanity/queries'

const createWithUsItems = ref<CreateWithUs[]>([])
const loading = ref(true)
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const getImageUrl = (item: CreateWithUs, width = 600, height = 800): string | undefined => {
  if (item.image?.asset) {
    return urlFor(item.image).width(width).height(height).quality(50).url()
  }
  return undefined
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
    const result = await client.fetch(CREATE_WITH_US_QUERY)
    createWithUsItems.value = result || []
  } catch (e) {
    console.error('Failed to fetch create with us items:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && createWithUsItems.length > 0" class="py-16 md:py-24 bg-white">
    <div class="px-6">
      <!-- Desktop Grid (3 per row) -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="item in createWithUsItems"
          :key="item._id"
          class="create-card group relative overflow-hidden rounded-xl h-[600px] transition-all duration-500"
          :class="getImageUrl(item) ? '' : 'bg-gray-100'"
        >
          <!-- Background Image -->
          <div
            v-if="getImageUrl(item)"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            :style="{ backgroundImage: `url(${getImageUrl(item)})` }"
          ></div>
          
          <!-- Dark Overlay for images -->
          <div
            v-if="getImageUrl(item)"
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"
          ></div>

          <!-- Content overlaid on image -->
          <div class="relative h-full flex flex-col justify-end p-6 z-10">
            <h2 class="text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight leading-tight">
              {{ item.title }}
            </h2>
            <p class="text-base lg:text-lg text-white/90 leading-relaxed">
              <span v-if="item.highlight" class="font-medium text-white">{{ item.highlight }} <br> </span>
              <span v-if="item.highlight && item.description"> </span>
              <span v-if="item.description">{{ item.description }}</span>
            </p>
          </div>
          
          <!-- Fallback if no image -->
          <div 
            v-if="!getImageUrl(item)"
            class="absolute inset-0 bg-gray-200 flex items-center justify-center text-black/40"
          >
            No image available
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
            v-for="item in createWithUsItems"
            :key="item._id"
            class="create-card-mobile flex-shrink-0 w-[280px] snap-center relative overflow-hidden rounded-xl h-[450px]"
            :class="getImageUrl(item) ? '' : 'bg-gray-100'"
          >
            <!-- Background Image -->
            <div
              v-if="getImageUrl(item)"
              class="absolute inset-0 bg-cover bg-center"
              :style="{ backgroundImage: `url(${getImageUrl(item)})` }"
            ></div>
            
            <!-- Dark Overlay for images -->
            <div
              v-if="getImageUrl(item)"
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"
            ></div>

            <!-- Content overlaid on image -->
            <div class="relative h-full flex flex-col justify-end p-5 z-10">
              <h2 class="text-2xl font-medium text-white mb-3 tracking-tight leading-tight">
                {{ item.title }}
              </h2>
              <p class="text-sm text-white/90 leading-relaxed">
                <span v-if="item.highlight" class="font-medium text-white">{{ item.highlight }} <br> </span>
                <span v-if="item.highlight && item.description"> </span>
                <span v-if="item.description">{{ item.description }}</span>
              </p>
            </div>
            
            <!-- Fallback if no image -->
            <div 
              v-if="!getImageUrl(item)"
              class="absolute inset-0 bg-gray-200 flex items-center justify-center text-black/40"
            >
              No image available
            </div>
          </div>
        </div>

        <!-- Scroll Indicators -->
        <div class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, index) in createWithUsItems"
            :key="index"
            :aria-label="`Go to item ${index + 1} of ${createWithUsItems.length}`"
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

/* Create card hover effects */
.create-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.create-card:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

/* Mobile card styling */
.create-card-mobile {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
