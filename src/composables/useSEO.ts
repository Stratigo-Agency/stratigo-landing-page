import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export const useSEO = (seoData?: SEOData) => {
  const route = useRoute()
  
  const updateMetaTag = (name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name'
    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', content)
  }
  
  const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`)
    
    if (!element) {
      element = document.createElement('link')
      element.setAttribute('rel', rel)
      document.head.appendChild(element)
    }
    
    element.setAttribute('href', href)
  }
  
  const updateSEO = (data: SEOData) => {
    const baseUrl = 'https://your-domain.com' // Update with your actual domain
    const currentUrl = baseUrl + route.fullPath
    
    // Update title
    if (data.title) {
      document.title = data.title
    }
    
    // Update meta tags
    if (data.description) {
      updateMetaTag('description', data.description)
      updateMetaTag('og:description', data.description, true)
      updateMetaTag('twitter:description', data.description, true)
    }
    
    if (data.title) {
      updateMetaTag('og:title', data.title, true)
      updateMetaTag('twitter:title', data.title, true)
    }
    
    if (data.url || currentUrl) {
      const url = data.url || currentUrl
      updateMetaTag('og:url', url, true)
      updateMetaTag('twitter:url', url, true)
      updateLinkTag('canonical', url)
    }
    
    if (data.image) {
      updateMetaTag('og:image', data.image, true)
      updateMetaTag('twitter:image', data.image, true)
    }
    
    if (data.type) {
      updateMetaTag('og:type', data.type, true)
    }
  }
  
  // Update SEO on mount if data provided
  if (seoData) {
    onMounted(() => {
      updateSEO(seoData)
    })
    
    // Watch for route changes
    watch(() => route.fullPath, () => {
      updateSEO(seoData)
    })
  }
  
  return {
    updateSEO
  }
}

