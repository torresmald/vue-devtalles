import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes'
import { adminRoutes } from '@/modules/admin/routes'
import { shopRoutes } from '@/modules/shop/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    shopRoutes,
    adminRoutes,
    authRoutes,
  ],
})

export default router
