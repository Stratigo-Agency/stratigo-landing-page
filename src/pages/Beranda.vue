<template>
  <div class="bg-white flex flex-col gap-16">
    <Hero />
    <div>
        <h1 class="text-4xl md:text-6xl text-black font-light text-center">{{ pageSections?.caseStudiesTitle || 'Website yang Bekerja untuk-Mu' }}</h1>
        <CaseStudiesCarousel />
    </div>
   
    <VisualizeCenter />
    <Pricing />

    <div>
        <h1 class="text-4xl md:text-6xl text-black font-light text-center bg-black text-white pt-16">{{ pageSections?.deliverablesTitle || 'Apa kelebihan website kami?' }}</h1>
        <Deliverables />
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
import VisualizeCenter from '@/components/VisualizeCenter.vue'
import Deliverables from '@/components/Deliverables.vue'
import CTA from '@/components/CTA.vue'
import Pricing from '@/components/Pricing.vue'

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
