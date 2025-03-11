<template>
  <section class="m-4 flex flex-col items-center justify-center">

    <button class="p-3 m-2 cursor-pointer shadow-md rounded-md w-40 transition-all hover:bg-blue-500 uppercase
      disabled:bg-red-500" :disabled="blockSelection"
      :class="{ 'correct': id === correctAnswer && blockSelection, 'incorrect': id !== correctAnswer && blockSelection, }"
      v-for="({ name, id }, index) in props.pokemonsOptions" :key="index" @click="onSelectPokemon(id)">
      {{ name }}
    </button>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GameStatus, Pokemon } from '../interfaces';


interface Props {
  pokemonsOptions: Pokemon[],
  blockSelection: boolean,
  correctAnswer: number;
}

const props = defineProps<Props>()

const emit = defineEmits<{ selectedPokemon: [pokemon: number] }>()

const onSelectPokemon = (id: number) => {
  emit('selectedPokemon', id)
}
</script>

<style scoped>
.correct {
  background-color: green;
}

.incorrect {
  background-color: red;
}
</style>
