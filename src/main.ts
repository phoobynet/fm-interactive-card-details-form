import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/styles.scss'
import { router } from '@/routes/router'
import { vMaska } from 'maska'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).directive('maska', vMaska).use(pinia).use(router).mount('#app')
