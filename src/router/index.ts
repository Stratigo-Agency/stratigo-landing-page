import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '@/pages/Beranda.vue'
import TentangKami from '@/pages/TentangKami.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Kontak from '@/pages/Kontak.vue'

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
    }
  ]
})

export default router





