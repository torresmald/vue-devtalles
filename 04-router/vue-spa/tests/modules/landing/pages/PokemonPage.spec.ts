import PokemonPage from '@/modules/landing/pages/PokemonPage.vue';
import router from '@/router';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('<PokemonPage />', () => {
  test('should renderPokemonImage', () => {
    const wrapper = mount(PokemonPage, {
      props: { id: 25 },
      global: {
        plugins: [router],
      },
    });
    const image = wrapper.find('img');
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wrapper.props().id}.svg`;
    expect(image.attributes('src')).toBe(url);
  });

  test('sould navigate to next Pokemon', () => {
    const wrapper = mount(PokemonPage, {
      props: { id: 25 },
      global: {
        plugins: [router],
      },
    });
    const link = wrapper.findComponent({ name: 'RouterLink' });
    const nextPokemon = String(wrapper.props().id + 1);

    expect(link.props().to.params.id).toBe(nextPokemon);
  });

  test('should render Next Pokemon', async () => {
    const wrapper = mount(PokemonPage, {
      props: { id: 25 },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props().to).toEqual({
      name: 'pokemon',
      params: { id: '26' }, // 25 + 1
    });
  });
});
