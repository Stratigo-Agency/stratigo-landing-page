<template>
  <div class="bg-white flex flex-col">
    <Hero />
    <TextSection />
    <div>
        <h1 class="text-4xl md:text-5xl text-black font-medium text-left px-6 md:px-12 lg:px-16 pt-16">{{ pageSections?.caseStudiesTitle || 'Website yang Bekerja untuk-Mu' }}</h1>
        <CaseStudiesCarousel />
    </div>
   
    <div id="pricing">
        <h1 class="text-4xl md:text-5xl text-black font-medium text-center text-black px-6 md:px-12 lg:px-16">Paket Terbaik untukmu</h1>
        <Pricing />
    </div>
    <CTA />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { PAGE_SECTIONS_QUERY, type PageSections } from '@/sanity/queries'
import Hero from '@/components/Hero.vue'
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel.vue'
import CTA from '@/components/CTA.vue'
import Pricing from '@/components/Pricing.vue'
import TextSection from '@/components/TextSection.vue'

const pageSections = ref<PageSections | null>(null)

onMounted(async () => {
  try {
    const result = await client.fetch(PAGE_SECTIONS_QUERY)
    pageSections.value = result || null
  } catch (e) {
    console.error('Failed to fetch page sections:', e)
  }
})
</script>
