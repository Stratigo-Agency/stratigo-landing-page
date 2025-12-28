<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { DELIVERABLES_QUERY, type Deliverable } from '@/sanity/queries'

const deliverables = ref<Deliverable[]>([])
const loading = ref(true)

const getImageUrl = (deliverable: Deliverable, width = 800, height = 600): string | undefined => {
  if (deliverable.image?.asset) {
    return urlFor(deliverable.image).width(width).height(height).url()
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
  <section v-if="!loading && deliverables.length > 0" class="py-16 md:px-6 bg-black">
    <div>
      <!-- Horizontal scroll on mobile, grid on desktop -->
      <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 ml-6 md:mx-0 md:pl-0 md:pr-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:overflow-visible scrollbar-hide">
        <div
          v-for="deliverable in deliverables"
          :key="deliverable._id"
          class="flex flex-col overflow-hidden transition-all duration-200 bg-black flex-shrink-0 w-[75vw] snap-start md:w-auto"
        >
          <!-- Image on top -->
          <div class="relative aspect-square overflow-hidden bg-black">
            <img
              v-if="getImageUrl(deliverable)"
              :src="getImageUrl(deliverable)"
              :alt="getImageAlt(deliverable)"
              class="w-full h-full object-cover rounded-xl"
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
            <p class="text-md lg:text-lg text-white/70">
              <span v-if="deliverable.highlight" class="text-white">{{ deliverable.highlight }}. </span>
              <span v-if="deliverable.highlight && deliverable.description"> </span>
              <span v-if="deliverable.description">{{ deliverable.description }}</span>
            </p>
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
