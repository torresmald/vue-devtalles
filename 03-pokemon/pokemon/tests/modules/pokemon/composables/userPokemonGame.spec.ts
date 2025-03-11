import { describe, expect, test } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import getPokemonApi from '@/modules/pokemon/api/getPokemons';
import { pokemonFake } from '../utils/pokemonFake';

const mockPokemonApi = new MockAdapter(getPokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonFake,
});

describe('composable test', async () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonsOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonsOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });
  test('handle nextRound', async () => {
    const [results] = withSetup(usePokemonGame);
    results.gameStatus.value = GameStatus.Won;
    await results.nextOptions();
    await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();
    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonsOptions.value.length).toBe(4);
  });

  test('should resolve check answe properly', async () => {
    const [results] = withSetup(usePokemonGame);
    results.gameStatus.value = GameStatus.Playing;
    await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();
    const correctId = results.randomPokemon.value.id;
    const idSended = 3;
    results.checkAnswer(idSended);
    if (correctId === idSended) {
      expect(results.gameStatus.value).toBe(GameStatus.Won);
      expect(results.counter.value).toBe(results.counter.value++);
      expect(results.counterVictory.value).toBe(results.counterVictory.value++);
    } else {
      expect(results.counter.value).toBe(results.counter.value++);
      expect(results.gameStatus.value).toBe(GameStatus.Lost);
    }
  });

  test('should Reset Game', async () => {
    const [results] = withSetup(usePokemonGame);
    results.gameStatus.value = GameStatus.Won;
    results.resetGame();
    await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();
    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonsOptions.value.length).toBe(4);
  });
});
