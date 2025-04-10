<template>
  <div class="flex flex-col">
    <TopMenu />

    <main class="flex">

      <SideMenu/>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
