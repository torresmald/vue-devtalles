import { AuthStatus } from '@/modules/auth/interfaces';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  authStore.isAdmin ? next() : next({ name: 'home' });
};

export default isAdminGuard;
