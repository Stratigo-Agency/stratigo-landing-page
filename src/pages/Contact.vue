<template>
  <div class="bg-white min-h-screen">
    <!-- Loading state -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <p class="text-xl text-black/60">Loading contact information...</p>
    </div>

    <!-- Contact Page -->
    <div v-else-if="contact" class="min-h-screen pt-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
        <!-- Left Section -->
        <div class="px-6 md:px-12 lg:px-12 py-16 lg:py-24 flex flex-col justify-between">
          <!-- Title and Subtitle -->
          <div>
            <h1 class="text-4xl md:text-6xl lg:text-5xl font-medium text-black mb-6 leading-tight">
              {{ contact.title }}
            </h1>
            <p class="text-lg md:text-xl text-black/70 leading-relaxed max-w-lg">
              {{ contact.subtitle }}
            </p>
                      <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <!-- Google Calendar Booking Button -->
            <button
              @click="openCalendarModal"
              class="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-lg border-2 border-black font-medium transition-all duration-200 hover:bg-white hover:text-black hover:border-black"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Konsultasi Gratis
            </button>
            
            <!-- WhatsApp Button -->
            <a
              v-if="contact.whatsappLink"
              :href="contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-lg border-2 border-[#25D366] font-medium transition-all duration-200 hover:bg-white hover:text-[#25D366] hover:border-[#25D366]"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
          </div>
          

          <!-- Social Media Links -->
          <div v-if="contact.socialLinks && contact.socialLinks.length > 0" class="mt-12 flex flex-wrap gap-6">
            <a
              v-for="(social, index) in contact.socialLinks"
              :key="index"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-black text-4xl hover:text-black/70 transition-colors duration-200 "
            >
              {{ social.platform }}
            </a>
          </div>
        </div>

        <!-- Right Section -->
        <div class="px-6 md:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-between bg-white">
          <!-- Contact Categories -->
          <div class="space-y-8 mb-8">
            <div
              v-for="(category, index) in contact.contactCategories"
              :key="index"
              class="space-y-2"
            >
              <h3 class="text-sm text-black/50 uppercase tracking-wide">
                {{ category.category }}
              </h3>
              <div class="space-y-1">
                <a
                  v-if="category.email"
                  :href="`mailto:${category.email}`"
                  class="block text-black font-medium hover:text-black/70 transition-colors"
                >
                  {{ category.email }}
                </a>
                <a
                  v-if="category.phone"
                  :href="`tel:${category.phone.replace(/\s/g, '')}`"
                  class="block text-black font-medium hover:text-black/70 transition-colors"
                >
                  {{ category.phone }}
                </a>
                <div v-if="category.address && category.address.length > 0" class="space-y-0">
                  <p
                    v-for="(line, lineIndex) in category.address"
                    :key="lineIndex"
                    class="text-black font-medium"
                  >
                    {{ line }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <p class="text-xl text-black/60">No contact information found. Please create a contact document in Sanity Studio.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { CONTACT_QUERY, type Contact } from '@/sanity/queries'

const contact = ref<Contact | null>(null)
const loading = ref(true)

const openCalendarModal = () => {
  // Open Google Calendar scheduling page in a new window
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NKajXy840Ut9Zflq5snuW5sQslGYsAbqdai5WmP8JqV2MJo6HvEUwqUZrSEYzvj3lx5gZlg4j?gv=true'
  window.open(calendarUrl, '_blank', 'width=800,height=600')
}

onMounted(async () => {
  try {
    const result = await client.fetch(CONTACT_QUERY)
    contact.value = result
  } catch (e) {
    console.error('Failed to fetch contact information:', e)
  } finally {
    loading.value = false
  }
})
</script>

