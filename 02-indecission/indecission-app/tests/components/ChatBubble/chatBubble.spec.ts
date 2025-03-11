import { describe } from 'node:test';
import { expect, test, vi } from 'vitest';
import ChatComponent from '@/components/ChatComponent.vue';
import { mount } from '@vue/test-utils';
import type { ChatMessages } from '@/interfaces/chat.interface';

const messages: ChatMessages[] = [
  {
    isMine: true,
    message: 'Hello',
  },
  {
    isMine: false,
    message: 'Hi',
    image: 'https://via.placeholder.com/150',
  },
];

describe('<ChatBubble />', () => {
  const wrapper = mount(ChatComponent, {
    props: { messages: messages },
  });

  test('should render the chat bubble', () => {
    expect(wrapper.html()).toMatchSnapshot();

    const chatComponent = wrapper.findAllComponents({ name: 'ChatBubble' });

    expect(chatComponent.length).toBe(messages.length);
  });

  // test('scroll component', async () => {
  //   const scrollMock = vi.fn();

  //   const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;

  //   chatRef.scrollTo = scrollMock;

  //   await wrapper.setProps({ messages: [...messages, { message: 'Hey mas', isMine: true }] });

  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   expect(scrollMock).toHaveBeenCalledWith({
  //     top: chatRef.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // });
});
