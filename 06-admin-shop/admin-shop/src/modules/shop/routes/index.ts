import type { RouteRecordRaw } from 'vue-router'
import ShopLayout from '../layouts/ShopLayout.vue'

export const shopRoutes: RouteRecordRaw= {
  path: '/',
  component: ShopLayout,
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/modules/shop/views/HomeView.vue'),
    },
    {
      path: 'product/:id',
      name: 'productView',
      component: () => import('@/modules/products/components/ProductComponent.vue'),
    },
  ],
}
