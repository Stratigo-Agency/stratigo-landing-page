<template>
  <div class="bg-white flex flex-col gap-16">
    <Hero />
    <div>
        <h1 class="text-4xl md:text-6xl text-black font-light text-center">Website yang Bekerja untuk-Mu</h1>
        <CaseStudiesCarousel />
    </div>
   
    <VisualizeCenter />
    <div>
        <h1 class="text-4xl md:text-6xl text-black font-light text-center bg-black text-white pt-16">Apa kelebihan website kami?</h1>
        <Deliverables />
    </div>
    <div>
        <h1  class="text-4xl md:text-6xl text-black font-light text-center">Ciptakan keperluan bisnis Anda</h1>
        <CreateWithUs />
    </div>
    <CTA />
  </div>
</template>

<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel.vue'
import VisualizeCenter from '@/components/VisualizeCenter.vue'
import Deliverables from '@/components/Deliverables.vue'
import CreateWithUs from '@/components/CreateWithUs.vue'
import CTA from '@/components/CTA.vue'
</script>
