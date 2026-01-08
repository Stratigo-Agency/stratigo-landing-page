import { createRouter, createWebHistory } from 'vue-router'

// Declare window types for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
import Beranda from '@/pages/Beranda.vue'
import TentangKami from '@/pages/TentangKami.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Kontak from '@/pages/Kontak.vue'
import Contact from '@/pages/Contact.vue'
import Blog from '@/pages/Blog.vue'
import BlogPost from '@/pages/BlogPost.vue'
import Privacy from '@/pages/Privacy.vue'
import CaseStudies from '@/pages/CaseStudies.vue'
import CaseStudy from '@/pages/CaseStudy.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Beranda',
      component: Beranda
    },
    {
      path: '/tentang-kami',
      name: 'TentangKami',
      component: TentangKami
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/kontak',
      name: 'Kontak',
      component: Kontak
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/blog/:slug',
      name: 'BlogPost',
      component: BlogPost
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/case-studies',
      name: 'CaseStudies',
      component: CaseStudies
    },
    {
      path: '/case-studies/:slug',
      name: 'CaseStudy',
      component: CaseStudy
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Track page views on route changes (only if consent is granted)
router.afterEach((to) => {
  // Check if user has granted consent
  const consent = localStorage.getItem('stratigo_cookie_consent')
  if (consent === 'accepted' && typeof window.gtag === 'function') {
    const pagePath = to.fullPath
    const pageTitle = document.title
    
    // Find the GA script tag to get the ID
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]') as HTMLScriptElement
    if (gaScript) {
      const match = gaScript.src.match(/id=([^&]+)/)
      const gaId = match ? match[1] : null
      
      if (gaId && gaId !== 'G-XXXXXXXXXX') {
        // Update config with new page info
        window.gtag('config', gaId, {
          'page_path': pagePath,
          'page_title': pageTitle
        })
      }
    }
  }
})

export default router





