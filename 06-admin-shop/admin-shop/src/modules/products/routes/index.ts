import type { RouteRecordRaw } from "vue-router";


export const productRoutes: RouteRecordRaw = {
  path: '/product/:id',
  name: 'product',
  component: () => import('@/modules/products/components/ProductComponent.vue'),
}
