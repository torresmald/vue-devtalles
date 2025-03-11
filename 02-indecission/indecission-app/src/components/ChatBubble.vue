<template>
  <!-- Example Message -->
  <div v-if="isMine" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
      {{ message }}
    </div>
  </div>

  <!-- Example Received Message -->
  <div class="flex" v-else>
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span class="capitalize">
        {{ message }}
      </span>
      <img v-if="image" :src="image" alt="Image" class="w-52 h-52 rounded-md object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessages } from '@/interfaces/chat.interface';


defineProps<ChatMessages>();
</script>
