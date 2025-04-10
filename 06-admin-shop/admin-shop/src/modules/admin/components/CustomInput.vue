<template>
  <div class="mb-4">
    <label :for="label" class="form-label">{{ label }}</label>
    <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    @blur="$emit('blur')"
    :type="type" :id="label"   class="form-control" :class="{ 'border-red-500': error }" />
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
  </div>
</template>
<script lang='ts' setup>
interface Props {
  label?: string,
  modelValue?: string | number,
  error?: string,
  type?: 'text' | 'number'
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})
</script>
<style scoped>
@reference "tailwindcss";

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
