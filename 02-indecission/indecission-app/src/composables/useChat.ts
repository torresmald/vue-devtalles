import type { ChatMessages } from '@/interfaces/chat.interface';
import { ref } from 'vue';
import { yesNoApi } from '@/api/api';

export const useChat = () => {
  const messages = ref<ChatMessages[]>([]);

  const onAddMessages = async (newMessage: string) => {
    if (!newMessage) return;
    messages.value.push({
      id: messages.value.length + 1,
      message: newMessage,
      isMine: true,
    });
    if (newMessage.endsWith('?')) {
      const { answer, image } = await yesNoApi();
      messages.value.push({
        id: messages.value.length + 1,
        message: answer,
        isMine: false,
        image,
      });
    }
  };

  return {
    messages,
    onAddMessages,
  };
};
