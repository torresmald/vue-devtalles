// import vue from 'vue'
import { expect, vi } from 'vitest';

vi.mock('@/router', () => {
  return { default: 'router' };
});

vi.mock('pinia', async (originalPinia) => {
  const pinia: any = await originalPinia();

  return {
    ...pinia,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('main.ts', () => {
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createApp;

  test('should use pinia and router', async () => {
    await import('@/main');

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');

    console.log(useSpy.mock.calls);

    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
