<template>
  <img class="h-[200px] fade-in" :class="{ 'brightness-0': !showPokemon }" :src="pokemonImage" alt="Alt Image">
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  randomPokemon: number,
  showPokemon: boolean
}

const props = defineProps<Props>();

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.randomPokemon}.svg`
})



</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-drag: none;

}
</style>
