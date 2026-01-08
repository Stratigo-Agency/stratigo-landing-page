<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen bg-white pt-20 overflow-hidden">
    <!-- Header -->
    <section class="py-16 px-6 md:px-12 bg-black text-white">
      <div class="max-w-4xl">
        <h1 class="text-4xl md:text-6xl font-medium mb-6">Kebijakan Privasi</h1>
        <p class="text-lg md:text-xl text-white/70">
          Terakhir diperbarui: {{ new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 px-6 md:px-12">
      <div class="max-w-4xl">
        <div class="prose prose-lg max-w-none">
          
          <!-- Introduction -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Pendahuluan</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Stratigo ("kami", "kita", atau "milik kami") menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda mengunjungi website kami.
            </p>
            <p class="text-black/70 leading-relaxed">
              Dengan menggunakan website kami, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
            </p>
          </div>

          <!-- Cookies Section -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Apa itu Cookies?</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Cookies adalah file teks kecil yang disimpan di perangkat Anda (komputer, tablet, atau ponsel) saat Anda mengunjungi website. Cookies membantu website mengingat preferensi Anda dan meningkatkan pengalaman browsing Anda.
            </p>
          </div>

          <!-- Types of Cookies -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Jenis Cookies yang Kami Gunakan</h2>
            
            <div class="space-y-6">
              <!-- Essential Cookies -->
              <div class="p-6 bg-gray-50 rounded-xl">
                <h3 class="text-xl font-medium text-black mb-2">1. Cookies Esensial</h3>
                <p class="text-black/70 leading-relaxed">
                  Cookies ini diperlukan agar website dapat berfungsi dengan baik. Tanpa cookies ini, beberapa fitur website mungkin tidak tersedia. Cookies esensial tidak mengumpulkan informasi pribadi Anda.
                </p>
              </div>

              <!-- Analytics Cookies -->
              <div class="p-6 bg-gray-50 rounded-xl">
                <h3 class="text-xl font-medium text-black mb-2">2. Cookies Analitik</h3>
                <p class="text-black/70 leading-relaxed mb-3">
                  Kami menggunakan Google Analytics untuk memahami bagaimana pengunjung berinteraksi dengan website kami. Informasi yang dikumpulkan termasuk:
                </p>
                <ul class="list-disc list-inside text-black/70 space-y-1">
                  <li>Halaman yang dikunjungi</li>
                  <li>Waktu yang dihabiskan di setiap halaman</li>
                  <li>Sumber traffic (dari mana Anda datang)</li>
                  <li>Jenis perangkat dan browser yang digunakan</li>
                  <li>Lokasi geografis (tingkat kota/negara)</li>
                </ul>
              </div>

              <!-- Advertising Cookies -->
              <div class="p-6 bg-gray-50 rounded-xl">
                <h3 class="text-xl font-medium text-black mb-2">3. Cookies Iklan (Google Ads)</h3>
                <p class="text-black/70 leading-relaxed mb-3">
                  Jika Anda menyetujui penggunaan cookies, kami menggunakan Google Ads untuk:
                </p>
                <ul class="list-disc list-inside text-black/70 space-y-1">
                  <li>Mengukur efektivitas kampanye iklan kami</li>
                  <li>Menampilkan iklan yang relevan berdasarkan minat Anda</li>
                  <li>Melacak konversi dari iklan ke website kami</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Managing Cookies -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Mengelola Cookies</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Anda memiliki kontrol penuh atas cookies. Saat pertama kali mengunjungi website kami, Anda akan melihat banner yang meminta persetujuan Anda untuk menggunakan cookies.
            </p>
            <p class="text-black/70 leading-relaxed mb-4">
              Anda dapat mengubah preferensi cookies Anda kapan saja dengan:
            </p>
            <ul class="list-disc list-inside text-black/70 space-y-2 mb-4">
              <li>Menghapus cookies dari browser Anda</li>
              <li>Mengatur browser untuk memblokir cookies</li>
              <li>Menggunakan mode incognito/private browsing</li>
            </ul>
            <p class="text-black/70 leading-relaxed">
              <strong class="text-black">Catatan:</strong> Menolak cookies mungkin mempengaruhi pengalaman Anda di website kami, tetapi website tetap akan berfungsi dengan normal.
            </p>
          </div>

          <!-- Data We Collect -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Data yang Kami Kumpulkan</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Selain cookies, kami mungkin mengumpulkan informasi berikut saat Anda menghubungi kami:
            </p>
            <ul class="list-disc list-inside text-black/70 space-y-2">
              <li>Nama dan alamat email</li>
              <li>Nomor telepon (jika diberikan)</li>
              <li>Pesan atau pertanyaan yang Anda kirimkan</li>
              <li>Informasi bisnis yang relevan dengan layanan kami</li>
            </ul>
          </div>

          <!-- Data Protection -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Perlindungan Data</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Kami berkomitmen untuk melindungi data Anda. Langkah-langkah keamanan yang kami terapkan:
            </p>
            <ul class="list-disc list-inside text-black/70 space-y-2">
              <li>Enkripsi SSL/TLS untuk semua transmisi data</li>
              <li>Akses terbatas ke data pribadi hanya untuk tim yang memerlukan</li>
              <li>Tidak menjual atau membagikan data pribadi Anda ke pihak ketiga</li>
              <li>Penyimpanan data yang aman dengan backup reguler</li>
            </ul>
          </div>

          <!-- Third Party Services -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Layanan Pihak Ketiga</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Website kami menggunakan layanan pihak ketiga berikut:
            </p>
            <ul class="list-disc list-inside text-black/70 space-y-2">
              <li><strong class="text-black">Google Analytics</strong> - Untuk analisis traffic website</li>
              <li><strong class="text-black">Google Ads</strong> - Untuk pelacakan konversi iklan</li>
              <li><strong class="text-black">Sanity CMS</strong> - Untuk manajemen konten website</li>
            </ul>
            <p class="text-black/70 leading-relaxed mt-4">
              Masing-masing layanan ini memiliki kebijakan privasi mereka sendiri yang mengatur bagaimana mereka mengumpulkan dan menggunakan data.
            </p>
          </div>

          <!-- Your Rights -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Hak Anda</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Anda memiliki hak untuk:
            </p>
            <ul class="list-disc list-inside text-black/70 space-y-2">
              <li>Mengetahui data apa yang kami kumpulkan tentang Anda</li>
              <li>Meminta salinan data pribadi Anda</li>
              <li>Meminta penghapusan data pribadi Anda</li>
              <li>Menolak penggunaan cookies non-esensial</li>
              <li>Menarik persetujuan Anda kapan saja</li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Hubungi Kami</h2>
            <p class="text-black/70 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda terkait data pribadi, silakan hubungi kami:
            </p>
            <div class="p-6 bg-gray-50 rounded-xl">
              <p class="text-black font-medium mb-2">Stratigo</p>
              <p class="text-black/70">Email: info@stratigo.co.id</p>
              <p class="text-black/70">WhatsApp: 087881332121</p>
            </div>
          </div>

          <!-- Updates -->
          <div>
            <h2 class="text-2xl md:text-3xl font-medium text-black mb-4">Perubahan Kebijakan</h2>
            <p class="text-black/70 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal "Terakhir diperbarui" yang baru. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
            </p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>


