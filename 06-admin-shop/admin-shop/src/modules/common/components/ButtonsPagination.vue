<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
    :disabled="page === 1"
    @click="$router.push({ query: { page: page - 1 } })"
    class="text-white flex items-center space-x-1.5 bg-blue-500 rounded-lg px-4 py-1.5 hover:bg-blue-800 disabled:bg-gray-300 cursor-pointer">
      <LeftArrow />
      <span >Anteriores</span>
    </button>

    <button
    :disabled="hasMorePage"
    @click="$router.push({ query: { page: page + 1 } })"
    class="text-white flex items-center space-x-1.5 bg-blue-500 rounded-lg px-4 py-1.5 hover:bg-blue-800 disabled:bg-gray-300 cursor-pointer">
      <span >Siguientes</span>
      <RightArrow />
    </button>
  </div>

</template>
<script lang='ts' setup>
import LeftArrow from '@/icons/LeftArrow.vue';
import RightArrow from '@/icons/RightArrow.vue';

interface Props{
  page: number,
  hasMorePage: boolean
}
defineProps<Props>()
</script>

