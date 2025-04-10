<template>
  <div>
    <RouterView />
    <VueQueryDevtools />
    <LoadingComponent v-if="false"/>
  </div>
</template>
<script lang='ts' setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import LoadingComponent from './modules/common/components/LoadingComponent.vue';
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute()

authStore.$subscribe((mutation, state) => {
  if(state.authStatus === AuthStatus.Checking){
    authStore.checkAuthStatus();
    return false
  }
  if(route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated){
    router.replace({name: 'home'})
  }
}, {
  immediate: true
});

</script>
