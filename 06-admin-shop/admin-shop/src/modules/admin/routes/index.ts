import type { RouteRecordRaw } from 'vue-router';
import isAdminGuard from '../guards/is-admin.guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  redirect: {name: 'dashboard'},
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  beforeEnter: [isAdminGuard],
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('@/modules/admin/pages/AdminPage.vue'),
    },
    {
      path: 'products',
      name: 'products',
      component: () => import('@/modules/admin/pages/ProductsPage.vue'),
    },
    {
      path: 'product/:id',
      name: 'product',
      props: true,
      component: () => import('@/modules/admin/pages/ProductPage.vue'),
    },
  ],
};
