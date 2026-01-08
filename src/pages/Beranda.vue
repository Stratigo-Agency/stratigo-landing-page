<template>
  <div class="bg-white flex flex-col overflow-hidden">
    <Hero />
    <TextSection />
    
    <!-- Case Studies Section -->
    <div 
      ref="caseStudiesRef"
      class="transition-all duration-500 ease-out"
      :class="visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <h1 class="text-4xl md:text-5xl text-black font-medium text-left px-6 md:px-12 lg:px-16 pt-16">
        {{ pageSections?.caseStudiesTitle || 'Website yang Bekerja untuk-Mu' }}
      </h1>
      <CaseStudiesCarousel />
    </div>
   
    <!-- Pricing Section -->
    <div 
      id="pricing"
      ref="pricingRef"
      class="transition-all duration-500 ease-out"
      :class="visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <h1 class="text-3xl md:text-5xl text-black font-medium md:text-center px-6 md:px-12 lg:px-16">
        Paket Terbaik untukmu
      </h1>
      <Pricing />
    </div>
    
    <!-- CTA Section -->
    <div
      ref="ctaRef"
      class="transition-all duration-500 ease-out"
      :class="visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <CTA />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { client } from '@/sanity/client'
import { PAGE_SECTIONS_QUERY, type PageSections } from '@/sanity/queries'
import Hero from '@/components/Hero.vue'
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel.vue'
import CTA from '@/components/CTA.vue'
import Pricing from '@/components/Pricing.vue'
import TextSection from '@/components/TextSection.vue'

const pageSections = ref<PageSections | null>(null)
const visibleSections = ref<Set<string>>(new Set())

// Section refs
const caseStudiesRef = ref<HTMLElement | null>(null)
const pricingRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section')
          if (sectionId) {
            visibleSections.value.add(sectionId)
          }
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // Observe sections
  if (caseStudiesRef.value) {
    caseStudiesRef.value.setAttribute('data-section', 'caseStudies')
    observer.observe(caseStudiesRef.value)
  }
  if (pricingRef.value) {
    pricingRef.value.setAttribute('data-section', 'pricing')
    observer.observe(pricingRef.value)
  }
  if (ctaRef.value) {
    ctaRef.value.setAttribute('data-section', 'cta')
    observer.observe(ctaRef.value)
  }
}

onMounted(async () => {
  try {
    const result = await client.fetch(PAGE_SECTIONS_QUERY)
    pageSections.value = result || null
  } catch (e) {
    console.error('Failed to fetch page sections:', e)
  }
  
  // Setup intersection observer after mount
  nextTick(() => {
    setupIntersectionObserver()
  })
})
</script>

<style scoped>
.ease-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
