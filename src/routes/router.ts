import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/routes/home/Home.vue'
import Demo from '@/routes/demo/Demo.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
    },
    {
      path: '/demo',
      component: Demo,
      name: 'demo'
    }
  ],
})
