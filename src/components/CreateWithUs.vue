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
  <section v-if="!loading && createWithUsItems.length > 0" class="py-16 md:px-6 bg-white">
    <div>
      <!-- Horizontal scroll on mobile, grid on desktop -->
      <div class="ml-6 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:mx-0 md:pl-0 md:pr-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:overflow-visible scrollbar-hide">
        <div
          v-for="item in createWithUsItems"
          :key="item._id"
          class="relative md:aspect-[14/16] aspect-[10/16] overflow-hidden rounded-xl transition-all duration-200 flex-shrink-0 w-[75vw] snap-start md:w-auto"
          :style="getImageUrl(item) ? { backgroundImage: `url(${getImageUrl(item)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/60"></div>
          
          <!-- Content overlaid on image -->
          <div class="relative z-10 h-full flex flex-col justify-end p-6">
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
