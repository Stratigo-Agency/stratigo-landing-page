<template>
  <footer class="bg-black border-t border-white/10 mt-auto">
    <div class="px-6 lg:px-12 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Logo and Description -->
        <div class="col-span-1 md:col-span-2">
          <router-link to="/" @click="scrollToTop" class="inline-block mb-4">
            <img src="@/assets/logos/stratigo-logo-white.webp" alt="Stratigo" class="h-6" />
          </router-link>
          <p class="text-white/70 text-md leading-relaxed max-w-md">
            Membantu bisnis Anda membangun kehadiran digital yang kuat melalui website profesional dan strategi pemasaran online yang efektif.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-medium mb-4 text-xl">Navigasi</h3>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/" 
                @click="scrollToTop"
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Beranda
              </router-link>
            </li>
            <li>
              <router-link 
                to="/blog" 
                @click="scrollToTop"
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Blog
              </router-link>
            </li>
            <li>
              <router-link 
                to="/case-studies" 
                @click="scrollToTop"
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Case Studies
              </router-link>
            </li>
            <li>
              <router-link 
                to="/contact" 
                @click="scrollToTop"
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Kontak
              </router-link>
            </li>
            <li>
              <router-link 
                to="/privacy" 
                @click="scrollToTop"
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Kebijakan Privasi
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-medium mb-4 text-xl">Kontak</h3>
          <ul class="space-y-2">
            <template v-if="contact">
              <li 
                v-for="(category, index) in contact.contactCategories" 
                :key="index"
                class="text-white/70 text-md"
              >
                <template v-if="category.email">
                  <a 
                    :href="`mailto:${category.email}`" 
                    class="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 no-underline"
                  >
                    <svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ category.email }}
                  </a>
                </template>
                <template v-else-if="category.phone">
                  <a 
                    :href="`tel:${category.phone.replace(/\s/g, '')}`" 
                    class="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 no-underline"
                  >
                    <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {{ category.phone }}
                  </a>
                </template>
              </li>
            </template>
            <template v-else>
              <li class="text-white/70 text-md">
                <a 
                  href="mailto:info@stratigo.co.id" 
                  class="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@stratigo.co.id
                </a>
              </li>
              <li class="text-white/70 text-md">
                <a 
                  href="tel:+6287881332121" 
                  class="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  087881332121
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/50 text-sm">
          © {{ currentYear }} Stratigo. All rights reserved.
        </p>
        <div class="flex gap-4">
          <!-- Instagram -->
          <a
            v-if="contact?.socialLinks?.find(s => s.platform === 'instagram')"
            :href="contact.socialLinks.find(s => s.platform === 'instagram')?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-white/70 transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <!-- WhatsApp -->
          <a
            v-if="contact?.whatsappLink"
            :href="contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-white/70 transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
          <!-- Email -->
          <a
            v-if="contact?.contactCategories?.find(c => c.email)"
            :href="`mailto:${contact.contactCategories.find(c => c.email)?.email}`"
            class="text-white hover:text-white/70 transition-colors duration-200"
            aria-label="Email"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { CONTACT_QUERY, type Contact } from '@/sanity/queries'

const contact = ref<Contact | null>(null)
const currentYear = computed(() => new Date().getFullYear())

// Scroll to top immediately (no animation)
const scrollToTop = () => {
  window.scrollTo(0, 0)
}

onMounted(async () => {
  try {
    const result = await client.fetch(CONTACT_QUERY)
    contact.value = result
  } catch (e) {
    console.error('Failed to fetch contact information for footer:', e)
  }
})
</script>

