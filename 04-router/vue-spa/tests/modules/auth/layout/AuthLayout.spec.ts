import AuthLayout from '@/modules/auth/layout/AuthLayout.vue';
import router from '@/router';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('<AuthLayout />', () => {
  const wrapper = mount(AuthLayout, {
    global: {
      plugins: [router],
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });
  test('should render RouterView', () => {
    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBe(true);
  });

  test('should navigate to home', () => {
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props().to).toBe('/');
  });
});
