<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { CTA_QUERY, type CTA } from '@/sanity/queries'

const cta = ref<CTA | null>(null)
const loading = ref(true)

const backgroundImageUrl = computed(() => {
  if (cta.value?.backgroundImage?.asset) {
    return urlFor(cta.value.backgroundImage).width(1920).height(1080).url()
  }
  return null
})

const openCalendarModal = () => {
  // Open Google Calendar scheduling page in a new window
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NKajXy840Ut9Zflq5snuW5sQslGYsAbqdai5WmP8JqV2MJo6HvEUwqUZrSEYzvj3lx5gZlg4j?gv=true'
  window.open(calendarUrl, '_blank', 'width=800,height=600')
}

onMounted(async () => {
  try {
    const result = await client.fetch(CTA_QUERY)
    cta.value = result
    
    // No longer need to load Google Calendar scripts
  } catch (e) {
    console.error('Failed to fetch CTA content:', e)
  } finally {
    loading.value = false
  }
})

// No cleanup needed - we're using a custom button
</script>

<template>
  <section 
    v-if="!loading && cta" 
    class="relative h-[60vh] px-6 bg-white overflow-hidden flex items-center justify-center"
  >
    <!-- Background Image -->
    <div 
      v-if="backgroundImageUrl"
      class="absolute inset-0 z-0"
    >
      <img
        :src="backgroundImageUrl"
        :alt="cta.backgroundImage?.alt || 'CTA background'"
        class="w-full h-full object-cover"
      />
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto text-center w-full">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight">
        {{ cta.tagline }}
      </h2>
      <p class="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
        {{ cta.description }}
      </p>
      <div class="flex flex-row gap-4 items-center justify-center flex-wrap">
        <a
          :href="cta.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 md:gap-3 bg-white text-black px-4 py-2.5 md:px-8 md:py-4 rounded-lg border-2 border-white no-underline text-sm md:text-base font-medium transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {{ cta.buttonText }}
        </a>
        <!-- Google Calendar Appointment Button -->
        <button
          @click="openCalendarModal"
          class="inline-flex items-center gap-2 md:gap-3 bg-white text-black px-4 py-2.5 md:px-8 md:py-4 rounded-lg border-2 border-white no-underline text-sm md:text-base font-medium transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Konsultasi Gratis
        </button>
      </div>
    </div>
  </section>
</template>

