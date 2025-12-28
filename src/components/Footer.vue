<template>
  <footer class="bg-black border-t border-white/10 mt-auto">
    <div class="px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Logo and Description -->
        <div class="col-span-1 md:col-span-2">
          <router-link to="/" class="inline-block mb-4">
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
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Beranda
              </router-link>
            </li>
            <!-- Hidden for now
            <li>
              <router-link 
                to="/portfolio" 
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Portfolio
              </router-link>
            </li>
            <li>
              <router-link 
                to="/tentang-kami" 
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Tentang Kami
              </router-link>
            </li>
            <li>
              <router-link 
                to="/kontak" 
                class="text-white/70 text-md no-underline hover:text-white transition-colors duration-200"
              >
                Kontak
              </router-link>
            </li>
            -->
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-medium mb-4 text-xl">Kontak</h3>
          <ul class="space-y-2">
            <li class="text-white/70 text-md">
              <a 
                href="mailto:info@stratigo.co.id" 
                class="text-white/70 hover:text-white transition-colors duration-200 no-underline"
              >
                info@stratigo.co.id
              </a>
            </li>
            <li class="text-white/70 text-md">
              <a 
                href="tel:+6281234567890" 
                class="text-white/70 hover:text-white transition-colors duration-200 no-underline"
              >
                +62 812 3456 7890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/50 text-sm">
          © {{ currentYear }} Stratigo. All rights reserved.
        </p>
        <div class="flex gap-6">
          <!-- Social Media Links (optional - can be added later) -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

