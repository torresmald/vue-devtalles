import { test, describe, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonComponent from '@/modules/common/components/ButtonComponent.vue';

describe('<ButtonComponent />', () => {
  test('should have default props value', () => {
    const wrapper = mount(ButtonComponent);
    expect(wrapper.props().position).toBe('bottom-right');
  });

  test('should position correctly if props provided', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        position: 'top-left',
      },
    });
    const clases = wrapper.classes();
    expect(clases.includes('top-left')).toBe(true);
    expect(wrapper.props().position).toBe('top-left');
  });

  test('should emit value if button clicked', async () => {
    const wrapper = mount(ButtonComponent);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('miEvento')?.[0]).toStrictEqual([]);
  });

  test('should render slot content inside button', () => {
    const wrapper = mount(ButtonComponent, {
      slots: { default: '<span>Hola Mundo</span>' },
    });
    const slotContent = wrapper.find('button span');

    expect(slotContent.html().includes('Hola Mundo'));
  });
});
