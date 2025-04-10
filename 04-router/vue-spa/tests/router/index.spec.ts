import App from "@/App.vue"
import router from "@/router"
import { mount } from "@vue/test-utils"

describe('router/index.ts', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router]
    }
  })

  test('renders the home page', async() => {
    await router.isReady()
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('Bienvenido a nuestro sitio web')
  })

  test('renders the features page', async() => {
    await router.isReady()
    await router.push('/features')
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('Master Cleanse Reliac Heirloom')
  })

  test('renders the pricing page', async() => {
    await router.isReady()
    await router.push('/pricing')
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('Flexible Plans')
  })

  test('renders the contact page', async() => {
    await router.isReady()
    await router.push('/contact')
    const h1 = wrapper.find('h2')
    expect(h1.text()).toBe('Feedback')
  })


  test('renders the Login page if no authenticated', async() => {
    localStorage.clear()
    await router.isReady()
    await router.push('/pokemon/151')
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
  })


  test('renders the PokemonPage if authenticated', async() => {
    localStorage.setItem('userId', 'ABD')
    await router.isReady()
    await router.push('/pokemon/151')
    expect(wrapper.find('h1').text()).toContain('Pokemon #151')
    expect(wrapper.html()).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg')
  })

  test('renders the NotFound if no matched route', async() => {
    await router.isReady()
    await router.push('/noExiste')
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.find('circle').exists()).toBe(true)
  })
})
