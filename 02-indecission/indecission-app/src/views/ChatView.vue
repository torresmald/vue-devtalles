<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Mi esposa</span>
    </div>

    <ChatComponent :messages="messages" />
    <BoxComponent @submit-message="onAddMessages" />

  </div>
</template>
<script setup lang="ts">
import BoxComponent from '@/components/BoxComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import { useChat } from '@/composables/useChat';

const { messages, onAddMessages } = useChat()



</script>
