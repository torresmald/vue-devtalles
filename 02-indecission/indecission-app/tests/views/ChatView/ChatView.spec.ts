import ChatView from '@/views/ChatView.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('ChatView', () => {
  const wrapper = mount(ChatView);

  test('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.findComponent({ name: 'ChatComponent' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'BoxComponent' }).exists()).toBe(true);
    // ...
  });
});
