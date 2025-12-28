<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { CREATE_WITH_US_QUERY, type CreateWithUs } from '@/sanity/queries'

const createWithUsItems = ref<CreateWithUs[]>([])
const loading = ref(true)

const getImageUrl = (item: CreateWithUs, width = 800, height = 600): string | undefined => {
  if (item.image?.asset) {
    return urlFor(item.image).width(width).height(height).url()
  }
  return undefined
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
  <section v-if="!loading && createWithUsItems.length > 0" class="py-16 px-6 bg-white">
    <div>
      <!-- Grid of cards with background images -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in createWithUsItems"
          :key="item._id"
          class="relative aspect-[14/16] overflow-hidden rounded-xl transition-all duration-200"
          :style="getImageUrl(item) ? { backgroundImage: `url(${getImageUrl(item)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/60"></div>
          
          <!-- Content overlaid on image -->
          <div class="relative z-10 h-full flex flex-col justify-end p-6">
            <h2 class="text-2xl lg:text-5xl font-medium text-white mb-4 tracking-tight leading-tight">
              {{ item.title }}
            </h2>
            <p class="text-base lg:text-lg text-white/90 leading-relaxed">
              <span v-if="item.highlight" class="font-medium text-white">{{ item.highlight }} </span>
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
    </div>
  </section>
</template>
