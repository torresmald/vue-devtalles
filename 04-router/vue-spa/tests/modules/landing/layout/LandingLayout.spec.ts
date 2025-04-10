import LandingLayout from "@/modules/landing/layout/LandingLayout.vue"
import router from "@/router"
import { shallowMount } from "@vue/test-utils"

describe('<LandingLayout />', () => {
  test('should have RouterView', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router]
      }
    })
    const routerView = wrapper.findComponent({ name: 'RouterView' })
    expect(routerView.exists()).toBe(true)
  })

  test('should have header, main and footer', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  test('should have params the RouterView', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router]
      }
    })
    const routerView = wrapper.findAllComponents({ name: 'RouterView' })
    console.log(routerView.forEach(element => {
      console.log(element.classes());
    }
    ));

    // nav.forEach(element => {
    //   console.log(element);

    // });
  })
})
