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
    loadGoogleAds()
  } else {
    removeGoogleAds()
  }
}

// Load Google Ads scripts
const loadGoogleAds = () => {
  // Check if already loaded
  if (document.getElementById('google-ads-script')) return
  
  // Google Ads / Google Tag Manager script
  const gtagScript = document.createElement('script')
  gtagScript.id = 'google-ads-script'
  gtagScript.async = true
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-XXXXXXXXX'}`
  document.head.appendChild(gtagScript)
  
  // Initialize gtag
  gtagScript.onload = () => {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-XXXXXXXXX')
    
    // Make gtag available globally
    ;(window as any).gtag = gtag
  }
}

// Remove Google Ads scripts and cookies
const removeGoogleAds = () => {
  const script = document.getElementById('google-ads-script')
  if (script) {
    script.remove()
  }
  
  // Clear Google Ads cookies
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
  const consent = checkConsent()
  
  if (consent === null) {
    // No choice made yet, show banner
    showBanner.value = true
  } else if (consent === 'accepted') {
    // User previously accepted, load Google Ads
    loadGoogleAds()
  }
  // If declined, do nothing (no ads loaded)
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

