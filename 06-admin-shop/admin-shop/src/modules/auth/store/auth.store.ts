import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { type User, AuthStatus } from '../interfaces';
import { authStatusAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);

  const isAuthenticated = computed(() => authStatus.value === AuthStatus.Authenticated);
  const fullName = computed(() => user.value?.fullName);
  const isAdmin = computed(() => user.value?.roles.includes('admin'));

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAction(email, password);
      if ('user' in response) {
        user.value = response.user;
        token.value = response.token;
        authStatus.value = AuthStatus.Authenticated;
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
    }
  };

  const register = async (email: string, fullName: string, password: string) => {
    try {
      const response = await registerAction(email, fullName, password);
      if ('user' in response) {
        await login(email, password);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.NoAuthenticated;
    user.value = undefined;
    token.value = '';
    localStorage.removeItem('token');
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await authStatusAction();
      if (!response.ok) {
        logout();
        return false;
      }
      if ('user' in response) {
        user.value = response.user;
        token.value = response.token;
        authStatus.value = AuthStatus.Authenticated;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    isAuthenticated,
    fullName,
    isAdmin,

    login,
    register,
    checkAuthStatus,
    logout
  };
});
