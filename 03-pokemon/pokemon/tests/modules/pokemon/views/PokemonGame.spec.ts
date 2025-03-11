import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/views/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, type Mock } from 'vitest';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

describe('<PokemonGame />', () => {
  test('should render default values', () => {
    (usePokemonGame as Mock).mockReturnValueOnce({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      pokemonsOptions: [],
      randomPokemon: 1,
      counter: 0,
      counterVictories: 0,

      nextOptions: vi.fn(),
      checkAnswer: vi.fn(),
      resetGame: vi.fn(),
    });
    const wrapper = mount(PokemonGame);
    expect(wrapper.get('h1').text()).toBe('Cargando Pokemon');
    expect(wrapper.get('h3').text()).toBe('Espere por favor');
    expect(wrapper.find('h2').exists()).toBe(false);
  });

  test('should render components Options and Picture', () => {
    (usePokemonGame as Mock).mockReturnValueOnce({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      pokemonsOptions: [
        { id: 1, name: 'Bulbasaur' },
        { id: 2, name: 'asasas' },
        { id: 3, name: 'Buddsfsdfaur' },
        { id: 4, name: 'Charmander' },
      ],
      randomPokemon: { id: 2, name: 'Bulbasaur' },
      counter: 0,
      counterVictories: 0,

      nextOptions: vi.fn(),
      checkAnswer: vi.fn(),
      resetGame: vi.fn(),
    });
    const wrapper = mount(PokemonGame);
    expect(wrapper.get('h1').text()).toBe('Quien es este Pokémon?');
    expect(wrapper.findComponent({ name: 'PokemonPicture' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PokemonOptions' }).exists()).toBe(true);
  });

  test('should Launch Reset Game', () => {
    (usePokemonGame as Mock).mockReturnValueOnce({
      gameStatus: GameStatus.Won,
      isLoading: false,
      pokemonsOptions: [
        { id: 1, name: 'Bulbasaur' },
        { id: 2, name: 'asasas' },
        { id: 3, name: 'Buddsfsdfaur' },
        { id: 4, name: 'Charmander' },
      ],
      randomPokemon: { id: 2, name: 'Bulbasaur' },
      counter: 0,
      counterVictories: 0,

      nextOptions: vi.fn(),
      checkAnswer: vi.fn(),
      resetGame: vi.fn(),
    });
    const wrapper = mount(PokemonGame);
    const button = wrapper.find('button');
    // expect(usePokemonGame().gameStatus).toBe(GameStatus.Won);

    expect(wrapper.find('button').exists()).toBe(true);
  });
});
