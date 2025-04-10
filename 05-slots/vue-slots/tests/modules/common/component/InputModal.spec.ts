import InputModal from '@/modules/common/components/InputModal.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
describe('<InputModal />', () => {
  test('should render default values', () => {
    const wrapper = mount(InputModal);
    const openAttribute = wrapper.find('dialog').attributes();
    expect(openAttribute.open).toBeUndefined();
  });

  test('render with slot content', () => {
    const wrapper = mount(InputModal, {
      slots: {
        header: '<span>Hola Mundo</span>',
      },
    });
    const slotContent = wrapper.find('.modal-box span');
    expect(slotContent.text()).toBe('Hola Mundo');
  });

  test('close Modal if close is clicked', async () => {
    const wrapper = mount(InputModal);
    const buttonClose = wrapper.find('button');
    await buttonClose.trigger('click');
    expect(wrapper.emitted('close')?.[0]).toStrictEqual([]);
  });

  test('reset inputValue if closeModal', async () => {
    const wrapper = mount(InputModal);
    const input = wrapper.find('input');
    const buttonClose = wrapper.find('button');
    await input.setValue('Hola mundo');
    expect(input.element.value).toBe('Hola mundo');
    await buttonClose.trigger('click');
    expect(input.element.value).toBe('');
  });

  test('open and close dialog if prop changes', async () => {
    const wrapper = mount(InputModal, {
      props: {
        open: true,
      },
    });
    const openAttribute = wrapper.find('dialog').attributes();
    expect(openAttribute.open).toBeDefined();
    await wrapper.setProps({ open: false });
    expect(openAttribute.open).toBe('');
  });

  test('should emit value if input has value', async () => {
    const wrapper = mount(InputModal);
    const input = wrapper.find('input');
    const buttonAccept = wrapper.findAll('button')[1];
    await input.setValue('');
    expect(wrapper.emitted().close).toBe(undefined);
    const value = 'Hola mundo';
    await input.setValue(value);
    expect(input.element.value).toBe(value);
    
    await buttonAccept.trigger('click');
    expect(wrapper.emitted().close).toStrictEqual([[]]);
    expect(wrapper.emitted().value).toStrictEqual([['Hola mundo']]);
    expect(input.element.value).toBe('');

  });
});
