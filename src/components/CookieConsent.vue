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
    // Find the GA script tag to get the ID
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
    const gaId = gaScript ? gaScript.src.match(/id=([^&]+)/)?.[1] : null
    
    if (!gaId || gaId === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics ID not found or not configured. Please update index.html with your GA ID.')
      return
    }
    
    // Update consent to granted FIRST
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })
    
    // Wait a bit for consent to be processed, then send page view
    setTimeout(() => {
      const pagePath = window.location.pathname + window.location.search
      const pageTitle = document.title
      
      // Update config with page info - this triggers a page view
      window.gtag('config', gaId, {
        'page_path': pagePath,
        'page_title': pageTitle,
        'send_page_view': true
      })
      
      console.log('✅ Google Analytics tracking enabled for:', pagePath)
    }, 300)
  } else {
    console.warn('gtag function not available. Google Analytics script may not be loaded.')
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
  
  // Check if GA ID is configured
  const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
  const gaId = gaScript ? gaScript.src.match(/id=([^&]+)/)?.[1] : null
  
  if (gaId === 'G-XXXXXXXXXX' || !gaId) {
    console.warn('⚠️ Google Analytics ID not configured! Please replace G-XXXXXXXXXX in index.html with your actual GA ID.')
  }
  
  if (consent === null) {
    // No choice made yet, show banner
    // Consent remains 'denied' (set in index.html) until user accepts
    showBanner.value = true
  } else if (consent === 'accepted') {
    // User previously accepted, grant consent immediately
    // Note: index.html should have already granted consent, but we ensure it here too
    grantConsent()
  } else {
    // User previously declined, ensure consent is denied
    denyConsent()
  }
})

// Debug helper - available in console
const debugGA = () => {
  console.log('=== Google Analytics Debug ===')
  console.log('1. Consent:', localStorage.getItem('stratigo_cookie_consent'))
  console.log('2. gtag available:', typeof window.gtag === 'function')
  console.log('3. dataLayer length:', window.dataLayer?.length || 0)
  console.log('4. dataLayer:', window.dataLayer)
  
  const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
  const gaId = gaScript ? gaScript.src.match(/id=([^&]+)/)?.[1] : null
  console.log('5. GA ID:', gaId)
  
  if (gaId === 'G-XXXXXXXXXX' || !gaId) {
    console.error('❌ GA ID not configured! Replace G-XXXXXXXXXX in index.html')
  }
  
  const cookies = document.cookie.split(';').filter(c => c.includes('_ga'))
  console.log('6. GA Cookies:', cookies.length > 0 ? cookies : 'None')
  
  // Check consent commands in dataLayer
  const consentCommands = window.dataLayer?.filter((item: any) => 
    Array.isArray(item) && item[0] === 'consent'
  ) || []
  console.log('7. Consent commands:', consentCommands)
  
  return {
    consent: localStorage.getItem('stratigo_cookie_consent'),
    gtagAvailable: typeof window.gtag === 'function',
    gaId,
    hasCookies: cookies.length > 0
  }
}

// Manual trigger function for testing
const triggerPageView = () => {
  const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
  const gaId = gaScript ? gaScript.src.match(/id=([^&]+)/)?.[1] : null
  
  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    console.error('❌ GA ID not configured!')
    return
  }
  
  if (typeof window.gtag === 'function') {
    const pagePath = window.location.pathname + window.location.search
    const pageTitle = document.title
    
    // Grant consent first
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    })
    
    // Then send page view
    setTimeout(() => {
      window.gtag('config', gaId, {
        'page_path': pagePath,
        'page_title': pageTitle,
        'send_page_view': true
      })
      console.log('✅ Page view sent:', pagePath)
    }, 100)
  }
}

// Make functions available globally
if (typeof window !== 'undefined') {
  ;(window as any).debugGA = debugGA
  ;(window as any).triggerPageView = triggerPageView
}

// Declare window types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    debugGA?: () => any
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

