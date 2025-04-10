import IsAuthenticated from "@/modules/auth/guards/isAuthenticated";
import NotFoundPage from "@/modules/errorPage/NotFoundPage.vue";
import HomePage from "@/modules/landing/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'landing',
    component: () => import('@/modules/landing/layout/LandingLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: HomePage
      },
      {
        path: '/features',
        name: 'features',
        component: () => import('@/modules/landing/pages/FeaturesPage.vue')
      },
      {
        path: '/pricing',
        name: 'pricing',
        component: () => import('@/modules/landing/pages/PricingPage.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/modules/landing/pages/ContactPage.vue'),
      },
      {
        path: '/pokemon/:id',
        name: 'pokemon',
        beforeEnter: [IsAuthenticated],
        props: (route) => {
          const {id} = route.params
          const numberId = +id;
          return {id: numberId}
        },
        component: () => import('@/modules/landing/pages/PokemonPage.vue')
      }
    ]
   },
    //AUTH
    {
      path: '/',
      name: 'auth',
      component: () => import('@/modules/auth/layout/AuthLayout.vue'),
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
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPage
    }

  ]
})


export default router
