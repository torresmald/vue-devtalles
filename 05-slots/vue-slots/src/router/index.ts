import ProjectLayout from '@/modules/projects/layouts/ProjectLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Projects' },
      component: ProjectLayout,
      children: [
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue'),
        },
        {
          path: 'project/:id',
          name: 'Project',
          props: true,
          component: () => import('@/modules/projects/views/ProjectView.vue'),
        },
      ],
    },
  ],
});

export default router;
