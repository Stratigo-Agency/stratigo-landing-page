<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { DELIVERABLES_QUERY, type Deliverable } from '@/sanity/queries'

const deliverables = ref<Deliverable[]>([])
const loading = ref(true)

const getImageUrl = (deliverable: Deliverable, width = 1600, height = 900): string | undefined => {
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
  <section v-if="!loading && deliverables.length > 0" class="py-16 px-6 bg-white">
    <div>
      <div
        v-for="deliverable in deliverables"
        :key="deliverable._id"
        class="grid grid-cols-1 lg:grid-cols-2 overflow-hidden min-h-[400px] lg:min-h-[500px] mb-8 last:mb-0"
      >
        <!-- Left: Text Content with gray background -->
        <div class="py-8 lg:p-12 flex flex-col order-2 lg:order-1">
          <h2 class="text-3xl lg:text-5xl font-medium text-black mb-6 tracking-tight leading-tight">
            {{ deliverable.title }}
          </h2>
          <p class="text-xl lg:text-2xl text-black/70 leading-relaxed">
            <span v-if="deliverable.highlight" class="font-medium text-black">{{ deliverable.highlight }}. </span>
            <span v-if="deliverable.highlight && deliverable.description"> </span>
            <span v-if="deliverable.description">{{ deliverable.description }}</span>
          </p>
        </div>
        
        <!-- Right: Image takes full space -->
        <div class="order-1 lg:order-2 relative rounded-xl overflow-hidden">
          <img
            v-if="getImageUrl(deliverable, 1600, 900)"
            :src="getImageUrl(deliverable, 1600, 900)"
            :alt="getImageAlt(deliverable)"
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
    </div>
  </section>
</template>

