<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolledPastHero 
        ? 'bg-white border-b border-black/10' 
        : 'bg-transparent border-b border-transparent',
      isNavHidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="px-12 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo on left -->
        <router-link to="/" class="no-underline" @click="closeMenu">
          <img 
            :src="logoPath" 
            alt="Stratigo" 
            class="h-8 md:h-8 transition-opacity duration-300" 
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
            <router-link 
              to="/blog" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Blog
            </router-link>
            <router-link 
              to="/contact" 
              class="no-underline font-medium transition-colors duration-200"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
              active-class="text-black"
            >
              Contact
            </router-link>
            <button
              @click="scrollToPricing"
              class="no-underline font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
            >
              Pricing
            </button>
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
          <router-link 
            to="/contact"
            class="px-6 py-3 rounded-lg border-2 no-underline font-medium transition-all duration-200 flex items-center gap-2"
            :class="isScrolledPastHero 
              ? 'bg-black text-white border-black hover:bg-white hover:text-black' 
              : 'bg-white text-black border-white hover:bg-white/90'"
          >
            Hubungi Kami
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>

        <!-- Mobile Hamburger Button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 focus:outline-none transition-colors duration-200"
          :class="isScrolledPastHero ? 'text-black' : 'text-white'"
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
        class="lg:hidden mt-4 pb-4 border-t transition-colors duration-200"
        :class="isScrolledPastHero ? 'border-black/10' : 'border-white/20'"
      >
        <div class="flex flex-col gap-4 pt-4">
          <router-link 
            to="/" 
            @click="closeMenu"
            class="no-underline font-medium transition-colors duration-200 py-2"
            :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
            active-class="text-black"
          >
            Beranda
          </router-link>
          <router-link 
            to="/blog" 
            @click="closeMenu"
            class="no-underline font-medium transition-colors duration-200 py-2"
            :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
            active-class="text-black"
          >
            Blog
          </router-link>
          <router-link 
            to="/contact" 
            @click="closeMenu"
            class="no-underline font-medium transition-colors duration-200 py-2"
            :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
            active-class="text-black"
          >
            Contact
          </router-link>
          <button
            @click="scrollToPricing"
            class="text-left font-medium transition-colors duration-200 py-2 bg-transparent border-none cursor-pointer p-0"
            :class="isScrolledPastHero ? 'text-black hover:text-black/70' : 'text-white hover:text-white/70'"
          >
            Pricing
          </button>
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
          <router-link 
            to="/contact"
            @click="closeMenu"
            class="bg-black text-white px-6 py-3 rounded-lg border-2 border-black no-underline font-medium transition-all duration-200 hover:bg-white hover:text-black flex items-center justify-center gap-2 mt-2"
          >
            Hubungi Kami
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoBlack from '@/assets/logos/stratigo-logo-black.webp'
import logoWhite from '@/assets/logos/stratigo-logo-white.webp'

const isMenuOpen = ref(false)
const isScrolledPastHero = ref(false)
const isNavHidden = ref(false)
const lastScrollY = ref(0)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const route = useRoute()
const router = useRouter()

const logoPath = computed(() => {
  if (isScrolledPastHero.value) {
    return logoBlack
  }
  return logoWhite
})

const scrollToPricing = () => {
  closeMenu()
  if (route.path === '/') {
    // Already on home page, scroll to pricing section
    const pricingElement = document.getElementById('pricing')
    if (pricingElement) {
      const navHeight = 80 // Approximate navbar height
      const elementPosition = pricingElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  } else {
    // Navigate to home page first, then scroll after navigation
    router.push('/').then(() => {
      setTimeout(() => {
        const pricingElement = document.getElementById('pricing')
        if (pricingElement) {
          const navHeight = 80
          const elementPosition = pricingElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    })
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const viewportHeight = window.innerHeight
  
  // Check scroll direction - hide on scroll down, show on scroll up
  // Only start hiding after scrolling past a threshold (e.g., 100px)
  if (currentScrollY > 100) {
    if (currentScrollY > lastScrollY.value) {
      // Scrolling down - hide navbar
      isNavHidden.value = true
    } else {
      // Scrolling up - show navbar
      isNavHidden.value = false
    }
  } else {
    // At the top - always show navbar
    isNavHidden.value = false
  }
  
  lastScrollY.value = currentScrollY
  
  // Check if scrolled past hero for background change (home page only)
  if (route.path === '/') {
    isScrolledPastHero.value = currentScrollY > viewportHeight * 0.8
  } else if (route.path === '/contact') {
    // On contact page, always show white background immediately
    isScrolledPastHero.value = true
  } else {
    // On other pages, always show white background
    isScrolledPastHero.value = true
  }
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Re-check scroll state on resize
  handleScroll()
}

// Watch for route changes to update navbar immediately
watch(() => route.path, (newPath) => {
  if (newPath === '/contact' || newPath.startsWith('/blog') || newPath !== '/') {
    isScrolledPastHero.value = true
  } else {
    // Reset for home page
    handleScroll()
  }
}, { immediate: true })

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
