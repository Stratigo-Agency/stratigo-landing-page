<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { HERO_QUERY, type Hero } from '@/sanity/queries'

const hero = ref<Hero | null>(null)
const loading = ref(true)

const heroImageUrl = computed(() => {
  if (hero.value?.backgroundImage?.asset) {
    return urlFor(hero.value.backgroundImage).width(1920).height(1080).url()
  }
  return null
})

const heroAlignment = computed(() => {
  return hero.value?.alignment || 'left'
})

onMounted(async () => {
  try {
    hero.value = await client.fetch(HERO_QUERY)
  } catch (e) {
    console.error('Failed to fetch hero content:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section 
    v-if="hero && !loading" 
    class="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-[var(--card)] px-6 py-4 mb-16"
    :class="{
      'text-left': heroAlignment === 'left',
      'text-center': heroAlignment === 'center',
      'text-right': heroAlignment === 'right'
    }"
    :style="heroImageUrl ? { backgroundImage: `url(${heroImageUrl})` } : {}"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,15,0.7)] to-[rgba(15,15,15,0.9)] z-[1]"></div>
    <div class="relative z-[2] w-full">
      <h1 class="text-6xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">{{ hero.title }}</h1>
      <h2 v-if="hero.subtitle" class="text-2xl md:text-3xl font-medium mb-4 text-[var(--muted)] leading-snug">{{ hero.subtitle }}</h2>
      <p v-if="hero.description" class="text-lg md:text-xl leading-relaxed mb-8 text-[rgba(250,250,250,0.9)]">{{ hero.description }}</p>
      <div 
        v-if="hero.ctaButtons && hero.ctaButtons.length > 0" 
        class="flex gap-4 flex-wrap flex-col md:flex-row"
        :class="{
          'md:justify-center': heroAlignment === 'center',
          'md:justify-end': heroAlignment === 'right',
          'md:justify-start': heroAlignment === 'left'
        }"
      >
        <a
          v-for="(button, index) in hero.ctaButtons"
          :key="index"
          :href="button.link"
          class="inline-block px-8 py-3.5 text-base font-medium no-underline rounded-md transition-all duration-200 cursor-pointer border-2 w-full md:w-auto text-center"
          :class="{
            'bg-[var(--accent)] text-[var(--fg)] border-transparent hover:bg-[#e11d48] hover:-translate-y-0.5': button.variant === 'primary' || !button.variant,
            'bg-[var(--card)] text-[var(--fg)] border-[var(--muted)] hover:bg-[#252525] hover:border-[var(--fg)]': button.variant === 'secondary',
            'bg-transparent text-[var(--fg)] border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]': button.variant === 'outline'
          }"
        >
          {{ button.label }}
        </a>
      </div>
    </div>
  </section>
</template>


