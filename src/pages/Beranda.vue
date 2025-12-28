<template>
  <div class="bg-white">
    <Hero />
    <h1 class="text-2xl md:text-5xl font-medium text-black px-6 pt-16">Dipercaya oleh pelanggan kami untuk meningkatkan presensi digital bisnis mereka</h1>
    <CaseStudiesCarousel />
    <VisualizeCenter />
    <h1 class="text-2xl md:text-5xl font-medium text-black text-center px-6 pt-16">Apa kelebihan website kami?</h1>
    <Deliverables />
  </div>
</template>

<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel.vue'
import VisualizeCenter from '@/components/VisualizeCenter.vue'
import Deliverables from '@/components/Deliverables.vue'
</script>
