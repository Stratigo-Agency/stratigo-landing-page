import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

// Import test utilities (only available in development)
if (import.meta.env.DEV) {
  import('./utils/testAnalytics')
}

createApp(App).use(router).mount('#app')

