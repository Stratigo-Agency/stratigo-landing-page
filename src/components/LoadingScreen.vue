<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-4">
        <img
          :src="whiteSquareLogo"
          alt="Stratigo"
          class="w-16 h-16 md:w-20 md:h-20 animate-spin"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import whiteSquareLogo from '@/assets/icon/white-square.webp'

const isLoading = ref(true)

onMounted(() => {
  // Hide loading screen after a minimum delay to ensure smooth transition
  // Also wait for window load event to ensure all resources are loaded
  const minDelay = 800 // Minimum 800ms for smooth UX
  const startTime = Date.now()

  const hideLoader = () => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minDelay - elapsed)
    
    setTimeout(() => {
      isLoading.value = false
    }, remaining)
  }

  if (document.readyState === 'complete') {
    hideLoader()
  } else {
    window.addEventListener('load', hideLoader)
  }
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
