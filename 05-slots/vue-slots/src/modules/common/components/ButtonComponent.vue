<template>
    <button class="btn btn-circle fixed" :class="position" @click="buttonClick">
      <slot />
    </button>
</template>

<script lang="ts" setup>

interface Props{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
withDefaults(defineProps<Props>(), {
  position: 'bottom-right'
});
const emit = defineEmits(['miEvento'])
const buttonClick = () => {
  emit('miEvento' )
}
</script>

<style>
@reference "tailwindcss";
.top-left{
  @apply top-10 left-10;
}
.top-right{
  @apply top-10 right-10;
}
.bottom-left{
  @apply bottom-10 left-10;
}
.bottom-right{
  @apply bottom-10 right-10;
}
</style>
