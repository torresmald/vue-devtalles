import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

describe('<PokemonPicture />', () => {
  test('should render hidden image when prop is false', () => {
    const wrapper = mount(PokemonPicture, {
      props: { showPokemon: false, randomPokemon: 3 },
    });
    const component = wrapper.find('img');
    expect(component.classes('brightness-0')).toBeTruthy();

    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
    );
  });

  test('should render correct image when prop is true', () => {
    const showPokemon = true;
    const wrapper = mount(PokemonPicture, {
      props: { showPokemon: showPokemon, randomPokemon: expect.any(Number) },
    });
    const component = wrapper.find('img');
    expect(component.classes('brightness-0')).toBeFalsy();
  });
});
