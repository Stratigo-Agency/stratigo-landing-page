<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolledPastHero && windowWidth >= 1024 
        ? 'bg-white border-b border-black/10' 
        : windowWidth >= 1024 
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-white border-b border-black/10'
    ]"
  >
    <div class="px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo on left -->
        <router-link to="/" class="no-underline" @click="closeMenu">
          <img 
            :src="logoPath" 
            alt="Stratigo" 
            class="h-8 md:h-12 transition-opacity duration-300" 
          />
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <!-- Navigation links in center -->
          <div class="flex gap-8">
            <router-link 
              to="/" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Beranda
            </router-link>
            <!-- Hidden for now
            <router-link 
              to="/portfolio" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Portfolio
            </router-link>
            <router-link 
              to="/tentang-kami" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Tentang Kami
            </router-link>
            <router-link 
              to="/kontak" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Kontak
            </router-link>
            -->
          </div>
          
          <!-- CTA Button on right -->
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 rounded-lg border-2 no-underline font-medium transition-all duration-200 flex items-center gap-2"
            :class="isScrolledPastHero 
              ? 'bg-black text-white border-black hover:bg-white hover:text-black' 
              : 'bg-white text-black border-white hover:bg-white/90'"
          >
            Hubungi Kami
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <!-- Mobile Hamburger Button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg 
            v-if="!isMenuOpen"
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            v-else
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMenuOpen"
        class="lg:hidden mt-4 pb-4 border-t border-black/10"
      >
        <div class="flex flex-col gap-4 pt-4">
          <router-link 
            to="/" 
            @click="closeMenu"
            class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70 py-2"
            active-class="text-black"
          >
            Beranda
          </router-link>
          <!-- Hidden for now
          <router-link 
            to="/portfolio" 
            @click="closeMenu"
            class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70 py-2"
            active-class="text-black"
          >
            Portfolio
          </router-link>
          <router-link 
            to="/tentang-kami" 
            @click="closeMenu"
            class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70 py-2"
            active-class="text-black"
          >
            Tentang Kami
          </router-link>
          <router-link 
            to="/kontak" 
            @click="closeMenu"
            class="text-black no-underline font-medium transition-colors duration-200 hover:text-black/70 py-2"
            active-class="text-black"
          >
            Kontak
          </router-link>
          -->
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMenu"
            class="bg-black text-white px-6 py-3 rounded-lg border-2 border-black no-underline font-medium transition-all duration-200 hover:bg-white hover:text-black flex items-center justify-center gap-2 mt-2"
          >
            Hubungi Kami
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import logoBlack from '@/assets/logos/stratigo-logo-black.webp'
import logoWhite from '@/assets/logos/stratigo-logo-white.webp'

const isMenuOpen = ref(false)
const isScrolledPastHero = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const route = useRoute()

const logoPath = computed(() => {
  if (isScrolledPastHero.value || windowWidth.value < 1024) {
    return logoBlack
  }
  return logoWhite
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  // Only check on desktop and when on home page
  if (windowWidth.value >= 1024 && route.path === '/') {
    // Hero is h-screen, so check if scrolled past viewport height
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight
    isScrolledPastHero.value = scrollY > viewportHeight * 0.8 // Trigger slightly before full scroll
  } else {
    // On other pages or mobile, always show white background
    isScrolledPastHero.value = true
  }
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Re-check scroll state on resize
  handleScroll()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    // Check initial state
    handleScroll()
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  }
})
</script>
