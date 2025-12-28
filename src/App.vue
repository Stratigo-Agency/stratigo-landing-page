<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-white">
    <Navigation />
    <main>
      <router-view />
    </main>
  </div>
</template>

