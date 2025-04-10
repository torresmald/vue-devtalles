import type { RouteRecordRaw } from "vue-router";
import isNotAuthenticatedGuard from "../guards/is-not-authenticated.guard";


export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  redirect: {name: 'login'},
  beforeEnter: [isNotAuthenticatedGuard],
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/pages/LoginPage.vue')
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/pages/RegisterPage.vue')
    }
  ]
}
