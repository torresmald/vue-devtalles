<template>
  <section v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl">Cargando Pokemon</h1>
    <h3 class="animate-pulse">Espere por favor</h3>
  </section>
  <section v-else class="flex flex-col items-center justify-center h-screen w-screen">
    <h2>Ganadas {{ counterVictories }}</h2>
    <h2>Intentos {{ counter }}</h2>

    <h1 class="text-2xl m-2">Quien es este Pokémon?</h1>

    <h2 v-if="gameStatus !== GameStatus.Playing">{{ endedText }}</h2>
    <!-- PICTURE -->
    <PokemonPicture :randomPokemon="randomPokemon?.id" :showPokemon="gameStatus !== GameStatus.Playing" />


    <!-- OPTIONES -->
    <PokemonOptions :pokemonsOptions="pokemonsOptions" @selectedPokemon="checkAnswer"
      :block-selection="gameStatus !== GameStatus.Playing" :correct-answer="randomPokemon.id" />


    <button
      class="p-3 m-2 cursor-pointer shadow-md rounded-md w-40 transition-all bg-gray-500 uppercase hover:bg-gray  -900"
      @click="resetGame">RESET GAME</button>

  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';
import { computed } from 'vue';


const { isLoading, randomPokemon, gameStatus, pokemonsOptions, checkAnswer, resetGame, counter, counterVictories } = usePokemonGame()

const endedText = computed(() => gameStatus.value === GameStatus.Won ? 'Has ganado' : 'Has perdido')


</script>

<style scoped></style>
