import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatComponent from '@/components/ChatComponent.vue';
import ChatView from '@/views/ChatView.vue';
import BoxComponent from '@/components/BoxComponent.vue';
import ChatBubble from '@/components/ChatBubble.vue';

import { useCounter } from '@/composables/useCounter';
describe('MyCounter', () => {
  test('should render the counter', () => {
    const wrapper = mount(ChatComponent, {
      props: {
        messages: [],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render the View', () => {
    const wrapper = mount(ChatView);

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('span').text()).toBe('Mi esposa');
  });

  test('should trigger the input', async () => {
    const wrapper = mount(BoxComponent);
    const input = wrapper.find('input');
    await input.trigger('keydown.enter');
  });

  test('test Counter', () => {
    const value = 10;
    const { counter, square } = useCounter(value);
    expect(counter.value).toBe(value);
    expect(square.value).toBe(value * value);
  });

  test('test Counter default values', () => {
    const { counter, square } = useCounter();
    expect(counter.value).toBe(5);
    expect(square.value).toBe(25);
  });

  test('test Bubble renders own message', () => {
    const message = 'Hola Mundo';
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        isMine: true,
      },
    });

    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
  });

  test('test Bubble renders response', () => {
    const message = 'Respues';
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        isMine: false,
      },
    });
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('span').exists()).toBeTruthy();
    expect(wrapper.find('img').exists()).toBeFalsy();
  });

  test('test Bubble renders response with IMAGE', () => {
    const message = 'Respues';
    const image = 'kjhfkjdhfs';
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        isMine: false,
        image,
      },
    });
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('span').exists()).toBeTruthy();
    expect(wrapper.find('img').exists()).toBeTruthy();
  });
});
