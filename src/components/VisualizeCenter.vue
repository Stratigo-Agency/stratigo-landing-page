<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})
</script>

<template>
  <section class="py-16 md:py-20 px-6 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Two Column Layout: Visualization Left, Text Right on Desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        <!-- Left Column: Visualization -->
        <div class="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center order-2 lg:order-1">
          
          <!-- SVG Lines -->
          <svg 
            class="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <g 
              class="transition-opacity duration-700" 
              :class="isVisible ? 'opacity-100' : 'opacity-0'"
            >
              <!-- Top Left Line (to Social Media) -->
              <line 
                x1="50%" y1="35%" 
                x2="10%" y2="8%" 
                stroke="black" 
                stroke-width="2" 
                stroke-dasharray="6,6"
                class="line-animate"
                :style="{ animationDelay: '0.4s' }"
              />
              
              <!-- Top Right Line (to SEO) -->
              <line 
                x1="50%" y1="35%" 
                x2="90%" y2="8%" 
                stroke="black" 
                stroke-width="2" 
                stroke-dasharray="6,6"
                class="line-animate"
                :style="{ animationDelay: '0.5s' }"
              />
              
              <!-- Bottom Left Line (to Customer Service) -->
              <line 
                x1="50%" y1="65%" 
                x2="10%" y2="92%" 
                stroke="black" 
                stroke-width="2" 
                stroke-dasharray="6,6"
                class="line-animate"
                :style="{ animationDelay: '0.7s' }"
              />
              
              <!-- Bottom Right Line (to Advertisement) -->
              <line 
                x1="50%" y1="65%" 
                x2="90%" y2="92%" 
                stroke="black" 
                stroke-width="2" 
                stroke-dasharray="6,6"
                class="line-animate"
                :style="{ animationDelay: '0.8s' }"
              />
            </g>
          </svg>

          <!-- Central Laptop -->
          <div 
            class="relative z-10 transition-all duration-700"
            :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'"
          >
            <!-- Screen -->
            <div class="w-48 md:w-64 lg:w-72 bg-black rounded-t-xl p-2 shadow-2xl">
              <div class="bg-white rounded-lg overflow-hidden aspect-[16/10]">
                <!-- Browser Bar -->
                <div class="bg-gray-100 px-2 py-1.5 flex items-center gap-2 border-b border-gray-200">
                  <div class="flex gap-1">
                    <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400"></div>
                    <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400"></div>
                    <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div class="flex-1 bg-white rounded px-1.5 py-0.5 text-[6px] md:text-[7px] text-gray-400 truncate">
                    www.yourwebsite.com
                  </div>
                </div>
                <!-- Website Content -->
                <div class="p-2">
                  <!-- Nav -->
                  <div class="flex justify-between items-center mb-1.5">
                    <div class="w-6 md:w-8 h-1 md:h-1.5 bg-black rounded"></div>
                    <div class="flex gap-0.5">
                      <div class="w-3 md:w-4 h-0.5 md:h-1 bg-gray-200 rounded"></div>
                      <div class="w-3 md:w-4 h-0.5 md:h-1 bg-gray-200 rounded"></div>
                      <div class="w-3 md:w-4 h-0.5 md:h-1 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <!-- Hero -->
                  <div class="flex gap-1.5 mb-1.5">
                    <div class="flex-1">
                      <div class="w-full h-1 md:h-1.5 bg-black rounded mb-0.5"></div>
                      <div class="w-3/4 h-1 md:h-1.5 bg-black rounded mb-1"></div>
                      <div class="w-full h-0.5 md:h-1 bg-gray-200 rounded mb-0.5"></div>
                      <div class="w-2/3 h-0.5 md:h-1 bg-gray-200 rounded mb-1"></div>
                      <div class="w-6 md:w-8 h-1.5 md:h-2 bg-black rounded"></div>
                    </div>
                    <div class="w-8 md:w-12 h-8 md:h-12 bg-gray-100 rounded flex items-center justify-center">
                      <svg class="w-4 md:w-6 h-4 md:h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>
                  </div>
                  <!-- Cards -->
                  <div class="flex gap-0.5">
                    <div class="flex-1 h-4 md:h-5 bg-gray-100 rounded"></div>
                    <div class="flex-1 h-4 md:h-5 bg-gray-100 rounded"></div>
                    <div class="flex-1 h-4 md:h-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Laptop Base -->
            <div class="relative">
              <div class="w-56 md:w-72 lg:w-80 h-2 bg-gray-300 rounded-b-xl mx-auto shadow-lg" style="margin-left: -4%;"></div>
              <div class="w-8 md:w-10 h-0.5 bg-gray-400 rounded-full mx-auto"></div>
            </div>
          </div>

          <!-- Service Icons -->
          <!-- Top Left - Social Media -->
          <div 
            class="absolute top-0 left-0 transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
            :style="{ transitionDelay: '0.3s' }"
          >
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span class="text-[10px] md:text-xs font-medium text-black">Social Media</span>
            </div>
          </div>

          <!-- Top Right - SEO -->
          <div 
            class="absolute top-0 right-0 transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
            :style="{ transitionDelay: '0.4s' }"
          >
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <span class="text-[10px] md:text-xs font-medium text-black">SEO</span>
            </div>
          </div>

          <!-- Bottom Left - Customer Service -->
          <div 
            class="absolute bottom-0 left-0 transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '0.6s' }"
          >
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              </div>
              <span class="text-[10px] md:text-xs font-medium text-black text-center">Customer Service</span>
            </div>
          </div>

          <!-- Bottom Right - Advertisement -->
          <div 
            class="absolute bottom-0 right-0 transition-all duration-700"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '0.7s' }"
          >
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <span class="text-[10px] md:text-xs font-medium text-black">Advertisement</span>
            </div>
          </div>

        </div>

        <!-- Right Column: Text Content -->
        <div class="order-1 lg:order-2">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-6 leading-tight">
            Website adalah Pusat dan Langkah Awal Fondasi Bisnis Anda di Internet
          </h2>
          <p class="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed">
            Situs web Anda adalah fondasi terpenting untuk strategi pemasaran online yang sukses. Tidak hanya melalui desain web, tetapi juga melalui konten yang tepat dan pengaturan teknis yang rapi, situs web Anda akan mudah ditemukan oleh mesin pencari dan mampu mengonversi pengunjung menjadi prospek atau permintaan yang bernilai di tempat yang tepat.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.line-animate {
  stroke-dashoffset: 200;
  animation: draw-line 1s ease-out forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
