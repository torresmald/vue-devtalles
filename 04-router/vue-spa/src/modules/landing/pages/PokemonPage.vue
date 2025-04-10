<template>
  <div class="grid text-center gap-5">
    <h1 class="text-xl font-bold">Pokemon <span class="
    text-blue-500">#{{ props.id }}</span></h1>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`"
      alt="Pokemon" class="w-50 h-50">

    <RouterLink :to="{
      name: 'pokemon',
      params: { id: String(Number(props.id) + 1) }
    }">
      <button type="submit"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full my-4 cursor-pointer">Siguiente
        Pokemon</button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number
}

const props = defineProps<Props>()
</script>
