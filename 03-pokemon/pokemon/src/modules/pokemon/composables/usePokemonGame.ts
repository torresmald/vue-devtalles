import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import getPokemonApi from '../api/getPokemons.ts';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const counter = ref(0);
  const counterVictories = ref(0);
  const getRandomInt = (value: number = 4) => {
    return Math.floor(Math.random() * value);
  };

  const randomPokemon = computed(() => pokemonsOptions.value[getRandomInt()]);

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async () => {
    const response = await getPokemonApi.get<PokemonListResponse>('?limit=151');

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const splitUrl = pokemon.url.split('/');
      const id = splitUrl[splitUrl.length - 2] ?? 0;

      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const nextOptions = (options: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, options);
    pokemons.value = pokemons.value.slice(options);
  };

  const checkAnswer = (id: number) => {
    counter.value++;
    if (id === randomPokemon.value.id) {
      gameStatus.value = GameStatus.Won;
      counterVictories.value++;
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };

  const resetGame = async () => {
    gameStatus.value = GameStatus.Playing;
    pokemons.value = await getPokemons();
    nextOptions();
  };

  onMounted(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
    pokemons.value = await getPokemons();
    nextOptions();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    counter,
    counterVictories,

    nextOptions,
    checkAnswer,
    resetGame,
  };
};
