import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../RunningArtist/home.vue')
    },
    {
      path: '/business/challenges',
      name: 'challenges',
      component: () => import('../RunningArtist/challenges.vue')
    }
  ]
})

export default router
