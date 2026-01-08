<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const showBanner = ref(false)
const COOKIE_CONSENT_KEY = 'stratigo_cookie_consent'

// Check if user has already made a choice
const checkConsent = (): string | null => {
  return localStorage.getItem(COOKIE_CONSENT_KEY)
}

// Save consent choice
const saveConsent = (accepted: boolean) => {
  localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined')
  showBanner.value = false
  
  if (accepted) {
    grantConsent()
  } else {
    denyConsent()
  }
}

// Grant consent for Google Analytics (script already loaded from index.html)
const grantConsent = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })
  }
}

// Deny consent for Google Analytics
const denyConsent = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    })
  }
  
  // Clear Google Analytics cookies
  const cookies = document.cookie.split(';')
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim()
    if (cookieName.startsWith('_ga') || cookieName.startsWith('_gid') || cookieName.startsWith('_gcl')) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
  })
}

// Accept all cookies
const acceptCookies = () => {
  saveConsent(true)
}

// Decline cookies
const declineCookies = () => {
  saveConsent(false)
}

onMounted(() => {
  // Consent mode is already initialized in index.html with 'denied' by default
  const consent = checkConsent()
  
  if (consent === null) {
    // No choice made yet, show banner
    // Consent remains 'denied' (set in index.html) until user accepts
    showBanner.value = true
  } else if (consent === 'accepted') {
    // User previously accepted, grant consent
    grantConsent()
  } else {
    // User previously declined, ensure consent is denied
    denyConsent()
  }
})

// Declare window types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
</script>

<template>
  <Transition name="slide-up">
    <div 
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-[100] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200"
    >
      <div class="w-full px-6 md:px-12 py-6 md:py-8">
        <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <!-- Text Content -->
          <div class="flex-1">
            <h3 class="text-lg font-medium text-black mb-2">
              Kami menggunakan cookies
            </h3>
            <p class="text-sm text-black/70 leading-relaxed">
              Kami menggunakan cookies untuk meningkatkan pengalaman Anda dan menganalisis traffic website. 
              Dengan mengklik "Terima", Anda menyetujui penggunaan cookies untuk iklan dan analitik.
              <RouterLink 
                to="/privacy" 
                class="text-black underline hover:text-black/70 transition-colors"
                @click="showBanner = false"
              >
                Pelajari lebih lanjut
              </RouterLink>
            </p>
          </div>
          
          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
            <button
              @click="declineCookies"
              class="px-6 py-3 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Tolak
            </button>
            <button
              @click="acceptCookies"
              class="px-6 py-3 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-lg transition-colors duration-200"
            >
              Terima Semua
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

