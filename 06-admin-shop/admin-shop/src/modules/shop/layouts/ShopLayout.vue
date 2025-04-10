<template>
  <div>
    <TopMenu />
    <RouterView />
    <Footer />
  </div>
</template>




<script lang='ts' setup>
import TopMenu from '../components/TopMenu.vue';
import Footer from '../components/Footer.vue';
import HomeView from '../views/HomeView.vue';
</script>
