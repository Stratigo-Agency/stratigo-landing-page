<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-white flex flex-col overflow-x-hidden">
    <Navigation />
    <main class="flex-grow overflow-hidden">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

