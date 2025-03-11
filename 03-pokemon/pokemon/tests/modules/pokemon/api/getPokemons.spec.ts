import { expect, test } from 'vitest';
import getPokemonApi from '@pokemon/api/getPokemons';
test('should be same URL', () => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  expect(url).toBe(getPokemonApi.defaults.baseURL);
});
