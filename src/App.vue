<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import CookieConsent from '@/components/CookieConsent.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-white flex flex-col overflow-x-hidden">
    <LoadingScreen />
    <Navigation />
    <main class="flex-grow overflow-hidden">
      <router-view />
    </main>
    <Footer />
    <CookieConsent />
    </div>
</template>

