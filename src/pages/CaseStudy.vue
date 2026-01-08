<script setup lang="ts">
import { ref, onMounted, h, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { CASE_STUDY_PAGE_BY_SLUG_QUERY, CASE_STUDY_PAGES_QUERY, type CaseStudyPage } from '@/sanity/queries'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const caseStudy = ref<CaseStudyPage | null>(null)
const allCaseStudies = ref<CaseStudyPage[]>([])
const loading = ref(true)

// Function to fetch case study data
const fetchCaseStudy = async (slug: string) => {
  loading.value = true
  try {
    const [study, studies] = await Promise.all([
      client.fetch(CASE_STUDY_PAGE_BY_SLUG_QUERY, { slug }),
      allCaseStudies.value.length > 0 ? Promise.resolve(allCaseStudies.value) : client.fetch(CASE_STUDY_PAGES_QUERY)
    ])
    caseStudy.value = study
    if (!allCaseStudies.value.length) {
      allCaseStudies.value = studies || []
    }
    // Scroll to top when content loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    console.error('Failed to fetch case study:', e)
  } finally {
    loading.value = false
  }
}

// Watch for route param changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug && typeof newSlug === 'string') {
      fetchCaseStudy(newSlug)
    }
  }
)

const relatedStudies = computed(() => {
  if (!caseStudy.value || !allCaseStudies.value.length) return []
  
  // Filter out current study and get up to 3 related studies (same category if available)
  const filtered = allCaseStudies.value
    .filter(study => {
      if (study._id === caseStudy.value?._id) return false
      if (caseStudy.value?.category && study.category === caseStudy.value.category) return true
      return true
    })
    .slice(0, 3)
  
  return filtered
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Helper to check if URL is external
const isExternalUrl = (url: string): boolean => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')
}

// Extract YouTube/Vimeo video ID and determine embed URL
const getVideoEmbedUrl = (url: string): string | null => {
  if (!url) return null
  
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }
  
  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }
  
  // Direct video URL
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return url
  }
  
  return null
}

// Portable Text Components with support for all content types
const portableTextComponents: any = {
  types: {
    image: (props: any) => {
      // Get image URL without cropping to show full image
      const imageUrl = props.value?.asset 
        ? urlFor(props.value)
            .width(1200)
            .fit('max') // Show entire image without cropping
            .url()
        : undefined
      return h('figure', { class: 'my-8' }, [
        h('img', {
          src: imageUrl,
          alt: props.value?.alt || '',
          class: 'w-full rounded-xl object-contain'
        }),
        props.value?.caption ? h('figcaption', { class: 'text-center text-sm text-black/60 mt-3' }, props.value.caption) : null
      ])
    },
    video: (props: any) => {
      const embedUrl = getVideoEmbedUrl(props.value?.url)
      if (!embedUrl) return null
      
      return h('figure', { class: 'my-8' }, [
        h('div', { class: 'relative w-full aspect-video rounded-xl overflow-hidden bg-black' }, [
          embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com')
            ? h('iframe', {
                src: `${embedUrl}${props.value?.autoplay ? '?autoplay=1' : ''}`,
                class: 'absolute inset-0 w-full h-full',
                frameborder: '0',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowfullscreen: true
              })
            : h('video', {
                src: embedUrl,
                controls: true,
                autoplay: props.value?.autoplay || false,
                class: 'w-full h-full object-contain'
              })
        ]),
        props.value?.caption ? h('figcaption', { class: 'text-center text-sm text-black/60 mt-3' }, props.value.caption) : null
      ])
    },
    heading: (props: any) => {
      const level = props.value?.level || 'h2'
      const classes = {
        h1: 'text-4xl md:text-5xl font-medium mt-16 mb-8 text-black',
        h2: 'text-3xl md:text-4xl font-medium mt-12 mb-6 text-black',
        h3: 'text-2xl md:text-3xl font-medium mt-10 mb-4 text-black',
        h4: 'text-xl md:text-2xl font-medium mt-8 mb-4 text-black'
      }
      return h(level, { class: classes[level as keyof typeof classes] || classes.h2 }, props.value?.text || '')
    },
    textBlock: (props: any) => {
      const alignment = props.value?.alignment || 'left'
      const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      }
      return h('div', {
        class: `text-lg leading-relaxed mb-6 text-black/80 ${alignClasses[alignment as keyof typeof alignClasses] || alignClasses.left}`
      }, props.value?.text || '')
    },
    table: (props: any) => {
      if (!props.value?.rows) return null
      return h('div', { class: 'my-8 overflow-x-auto' }, [
        h('table', { class: 'w-full border-collapse' }, [
          h('tbody', {},
            props.value.rows.map((row: any, rowIndex: number) =>
              h('tr', {
                class: rowIndex === 0 ? 'bg-black text-white' : rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                key: rowIndex
              },
                row.cells?.map((cell: string, cellIndex: number) =>
                  h('td', {
                    class: `border border-gray-200 px-4 py-3 text-left ${rowIndex === 0 ? 'font-medium' : ''}`,
                    key: cellIndex
                  }, cell)
                )
              )
            )
          )
        ])
      ])
    }
  },
  block: {
    h1: (_: any, { slots }: any) => h('h1', { class: 'text-4xl md:text-5xl font-medium mt-16 mb-8 text-black' }, slots.default?.()),
    h2: (_: any, { slots }: any) => h('h2', { class: 'text-3xl md:text-4xl font-medium mt-12 mb-6 text-black' }, slots.default?.()),
    h3: (_: any, { slots }: any) => h('h3', { class: 'text-2xl md:text-3xl font-medium mt-10 mb-4 text-black' }, slots.default?.()),
    h4: (_: any, { slots }: any) => h('h4', { class: 'text-xl md:text-2xl font-medium mt-8 mb-4 text-black' }, slots.default?.()),
    normal: (_: any, { slots }: any) => h('p', { class: 'text-lg leading-relaxed mb-6 text-black/80' }, slots.default?.()),
    blockquote: (_: any, { slots }: any) => h('blockquote', { class: 'border-l-4 border-black pl-6 py-2 my-8 italic text-xl text-black/70' }, slots.default?.())
  },
  list: {
    bullet: (_: any, { slots }: any) => h('ul', { class: 'list-disc list-inside mb-6 space-y-2 text-lg text-black/80' }, slots.default?.()),
    number: (_: any, { slots }: any) => h('ol', { class: 'list-decimal list-inside mb-6 space-y-2 text-lg text-black/80' }, slots.default?.())
  },
  listItem: {
    bullet: (_: any, { slots }: any) => h('li', { class: 'ml-4' }, slots.default?.()),
    number: (_: any, { slots }: any) => h('li', { class: 'ml-4' }, slots.default?.())
  },
  marks: {
    strong: (_: any, { slots }: any) => h('strong', { class: 'font-semibold' }, slots.default?.()),
    em: (_: any, { slots }: any) => h('em', { class: 'italic' }, slots.default?.()),
    code: (_: any, { slots }: any) => h('code', { class: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono' }, slots.default?.()),
    link: (props: any, { slots }: any) => {
      const href = props.value?.href || ''
      const external = isExternalUrl(href)
      if (external) {
        return h('a', {
          href: href,
          class: 'text-black underline hover:text-black/70 transition-colors',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, slots.default?.())
      } else {
        return h(RouterLink, {
          to: href,
          class: 'text-black underline hover:text-black/70 transition-colors'
        }, () => slots.default?.())
      }
    }
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  if (slug) {
    fetchCaseStudy(slug)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white pt-20 overflow-hidden">
    <!-- Loading State -->
    <section v-if="loading" class="py-20 px-6 md:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-xl text-black/60">Loading case study...</p>
      </div>
    </section>

    <!-- Not Found State -->
    <section v-else-if="!loading && !caseStudy" class="py-20 px-6 md:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-medium mb-4">Case Study Not Found</h1>
        <p class="text-lg text-black/60 mb-8">The case study you're looking for doesn't exist.</p>
        <RouterLink to="/case-studies" class="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors">
          Lihat Semua Case Studies
        </RouterLink>
      </div>
    </section>

    <!-- Case Study Content -->
    <article v-else-if="caseStudy" class="pb-20">
      <!-- Featured Image -->
      <section v-if="caseStudy.featuredImage" class="px-6 md:px-12 py-12">
        <div>
          <img
            :src="caseStudy.featuredImage?.asset 
              ? urlFor(caseStudy.featuredImage)
                  .width(1400)
                  .fit('max')
                  .url()
              : undefined"
            :alt="caseStudy.featuredImage.alt || caseStudy.title"
            class="w-full rounded-2xl max-w-4xl mx-auto object-contain"
          />
        </div>
      </section>

      <!-- Main Content -->
      <section class="px-6 md:px-12 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- Content -->
          <div class="lg:col-span-8">
            <div class="blog-content prose prose-lg max-w-none">
              <PortableText
                v-if="caseStudy.content"
                :value="caseStudy.content"
                :components="portableTextComponents"
              />
            </div>
          </div>

          <!-- Sidebar - Related Case Studies (Desktop Only) -->
          <aside v-if="relatedStudies.length > 0" class="lg:col-span-4 self-start lg:sticky lg:top-24">
            <div class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-xl font-medium mb-4 text-black">Related Case Studies</h3>
              <div class="space-y-4">
                <RouterLink
                  v-for="study in relatedStudies"
                  :key="study._id"
                  :to="`/case-studies/${study.slug.current}`"
                  class="block group"
                >
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-black">
                      <img
                        v-if="study.featuredImage?.asset"
                        :src="urlFor(study.featuredImage)
                          .width(200)
                          .height(200)
                          .fit('max')
                          .url()"
                        :alt="study.featuredImage?.alt || study.title"
                        class="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div v-if="study.category" class="mb-1">
                        <span class="text-xs text-black/60 capitalize">
                          {{ study.category.replace('-', ' ') }}
                        </span>
                      </div>
                      <h4 class="text-sm font-medium mb-1 group-hover:underline line-clamp-2 -webkit-line-clamp-2">
                        {{ study.title }}
                      </h4>
                      <p class="text-xs text-black/50">
                        {{ formatDate(study.publishedAt) }}
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </aside>
        </div>

        <!-- Back to Case Studies CTA -->
        <div class="mt-16 pt-8 border-t border-gray-200 text-center">
          <RouterLink 
            to="/case-studies" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition-colors no-underline"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Lihat Semua Case Studies
          </RouterLink>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.blog-content :deep(p) {
  @apply text-lg leading-relaxed mb-6 text-black/80;
}

.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4) {
  @apply font-medium text-black;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  @apply mb-6 space-y-2;
}

.blog-content :deep(li) {
  @apply text-lg text-black/80;
}

.blog-content :deep(strong) {
  @apply font-semibold;
}

.blog-content :deep(em) {
  @apply italic;
}

.blog-content :deep(a) {
  @apply text-black underline hover:text-black/70 transition-colors;
}

.blog-content :deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}
</style>

