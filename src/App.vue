<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-white flex flex-col">
    <Navigation />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

