import { describe } from 'node:test';
import { expect, test } from 'vitest';
import BoxComponent from '@/components/BoxComponent.vue';
import { mount } from '@vue/test-utils';

describe('<BoxComponent />', () => {
  const wrapper = mount(BoxComponent);
  test('should render the counter', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render input and button', () => {
    const input = wrapper.find('input');
    const button = wrapper.find('button');

    expect(input.exists()).toBeTruthy();
    expect(button.exists()).toBeTruthy();
  });

  test('should emit an event when the button is clicked or input triggered', async () => {
    const value = 'Hola mundo';

    const input = wrapper.find('input');
    const button = wrapper.find('button');
    await input.setValue(value);
    await button.trigger('click');
    await input.trigger('keydown.enter');

    expect(wrapper.emitted('submitMessage')?.[0]).toEqual([value]);
    expect(input.element.value).toBe('');
  });

  test('should do nothing if the value is empty', async () => {
    // const value = '';
    const wrapper = mount(BoxComponent);

    const input = wrapper.find('input');
    const button = wrapper.find('button');
    // await input.setValue(value);

    await button.trigger('click');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('submitMessage')).toBeFalsy();
  });
});
