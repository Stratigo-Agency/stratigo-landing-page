<template>
  <nav class="sticky top-0 z-50 bg-white border-b border-black/10">
    <div class="px-6 py-4 flex justify-between items-center">
      <!-- Logo on left -->
      <router-link to="/" class="no-underline">
        <img src="@/assets/logos/stratigo-logo-black.webp" alt="Stratigo" class="h-6" />
      </router-link>
      
      <!-- Navigation links in center (horizontal) -->
      <div class="flex gap-8">
        <router-link 
          to="/" 
          class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70"
          active-class="text-black"
        >
          Beranda
        </router-link>
        <router-link 
          to="/portfolio" 
          class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70"
          active-class="text-black"
        >
          Portfolio
        </router-link>
        <router-link 
          to="/tentang-kami" 
          class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70"
          active-class="text-black"
        >
          Tentang Kami
        </router-link>
        <router-link 
          to="/kontak" 
          class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70"
          active-class="text-black"
        >
          Kontak
        </router-link>
      </div>
      
      <!-- CTA Button on right -->
      <a 
        href="#kontak" 
        class="bg-black text-white px-6 py-3 rounded-lg border-2 border-black no-underline font-medium transition-all duration-200 hover:bg-white hover:text-black flex items-center gap-2"
      >
        Hubungi Kami
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

