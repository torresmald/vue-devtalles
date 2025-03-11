<script setup lang="ts">
import type { ChatMessages } from '@/interfaces/chat.interface';
import ChatBubble from './ChatBubble.vue';
import { ref, watch } from 'vue';



interface Props {
  messages: ChatMessages[];
}
const props = defineProps<Props>();

const messagesRef = ref<ChatMessages[]>(props.messages);
  const chatRef = ref<HTMLDivElement | null>(null);

watch( messagesRef.value, () => {
  console.log('scrolling')
  chatRef.value?.scrollTo({
    top: chatRef.value.scrollHeight,
    behavior: 'smooth'
  })
})
</script>

<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>
