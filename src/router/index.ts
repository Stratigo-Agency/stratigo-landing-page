import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '@/pages/Beranda.vue'
import TentangKami from '@/pages/TentangKami.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Kontak from '@/pages/Kontak.vue'
import Contact from '@/pages/Contact.vue'
import Blog from '@/pages/Blog.vue'
import BlogPost from '@/pages/BlogPost.vue'

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
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router





